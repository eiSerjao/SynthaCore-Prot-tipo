"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { pickRandomQuestions, Question } from "../data/questions";

// Componente Quiz: exibe 5 perguntas sorteadas e calcula percentual de acerto.
// Para evitar erros de hidratação (server vs client) não sorteamos perguntas
// durante o render do servidor. Em vez disso, carregamos/embaralhamos no
// cliente dentro de useEffect. Enquanto isso, renderizamos um estado de
// carregamento simples para manter a marcação idêntica entre server e client.
export default function Quiz() {
  // Perguntas carregadas quando o usuário inicia o quiz
  const [questions, setQuestions] = useState<Question[]>([]);
  // Estado: índice da pergunta atual
  const [current, setCurrent] = useState(0);
  // Respostas do usuário: -1 indica não respondida
  const [answers, setAnswers] = useState<number[]>([]);
  // Indica se o usuário finalizou o quiz
  const [showResult, setShowResult] = useState(false);
  // Indica se o usuário iniciou o quiz (landing -> quiz)
  const [started, setStarted] = useState(false);

  // Starta o quiz: sorteia perguntas e inicializa respostas
  function startQuiz() {
    const qs = pickRandomQuestions(5);
    setQuestions(qs);
    setAnswers(Array(qs.length).fill(-1));
    setCurrent(0);
    setShowResult(false);
    setStarted(true);
  }

  // Iniciar automaticamente quando o componente montar no cliente
  // (removemos a tela de landing, portanto devemos sortear as perguntas aqui)
  

  // Marca a opção selecionada para a pergunta atual
  const optionAnim = useRef<gsap.core.Tween | null>(null);
  const landingRef = useRef<HTMLDivElement | null>(null);
  function selectOption(index: number, e?: React.MouseEvent<HTMLButtonElement>) {
    const copy = [...answers];
    copy[current] = index;
    setAnswers(copy);
    // microfeedback: animar o botão clicado
    try {
      const target = e?.currentTarget;
      if (target) {
        // animação rápida de escala
        gsap.fromTo(target, { scale: 0.98 }, { scale: 1.03, duration: 0.12, yoyo: true, repeat: 1, ease: "power1.out" });
      }
    } catch (err) {
      // fail silently — não bloqueara a aplicação
    }
  }

  // Vai para uma pergunta específica (navegação não-linear)
  function goto(i: number) {
    if (i < 0 || i >= questions.length) return;
    setCurrent(i);
  }

  // Calcula pontuação e mostra resultado
  function submit() {
    setShowResult(true);
    // parar música de fundo quando finalizar
    stopMusic();
    // tocar som conforme resultado: se acertou 4 ou 5 -> 'acertou', senão -> 'errou'
    // calculamos score já acima; usar guardas para evitar tocar sem perguntas
    if (questions.length) {
      if (score >= 4) {
        playAudio(acertouRef, 0.6);
      } else {
        playAudio(errouRef, 0.6);
      }
    }
  }

  // Reinicia o quiz com novo sorteio (apenas no cliente)
  function reset() {
    // animação de saída do painel de resultado antes de resetar o estado
    // se o elemento ainda existir, anima para baixo e então limpa o estado
    // parar música se estiver tocando
    stopMusic();
    const el = document.querySelector('.quiz-result') as HTMLDivElement | null;
    if (el) {
      gsap.to(el, {
        y: 12,
        autoAlpha: 0,
        duration: 0.45,
        ease: 'power2.in',
        onComplete: () => {
          setQuestions([]);
          setAnswers([]);
          setCurrent(0);
          setShowResult(false);
          setStarted(false);
        }
      });
      return;
    }

    // fallback imediato
    setQuestions([]);
    setAnswers([]);
    setCurrent(0);
    setShowResult(false);
    setStarted(false);
  }

  // Quando mostrar resultado, calculamos score (se perguntas já existirem)
  const score = questions.length
    ? answers.reduce((acc, ans, idx) => {
        if (ans === questions[idx].answerIndex) return acc + 1;
        return acc;
      }, 0)
    : 0;

  const percent = questions.length ? Math.round((score / questions.length) * 100) : 0;

  // ref para animação de contagem no resultado
  const scoreRef = useRef<HTMLSpanElement | null>(null);
  // refs para players de áudio (coloque os arquivos em /public)
  const acertouRef = useRef<HTMLAudioElement | null>(null);
  const errouRef = useRef<HTMLAudioElement | null>(null);
  // ref para música de fundo do quiz (loop)
  const musicRef = useRef<HTMLAudioElement | null>(null);
  // estado para controlar se a música está habilitada (persistido em localStorage)
  const [musicEnabled, setMusicEnabled] = useState<boolean>(true);

  // carregar preferência do localStorage ao montar (cliente)
  useEffect(() => {
    try {
      const raw = localStorage.getItem('quizMusicEnabled');
      if (raw === 'false') setMusicEnabled(false);
    } catch (e) {
      // ignore
    }
  }, []);

  function playAudio(ref: React.RefObject<HTMLAudioElement | null>, volume = 1) {
    try {
      const el = ref.current as HTMLAudioElement | null;
      if (!el) return;
      el.volume = volume;
      el.currentTime = 0;
      const p = el.play();
      if (p && typeof (p as any).catch === 'function') (p as any).catch(() => {});
    } catch (e) {
      // silencioso em caso de erro de reprodução
    }
  }

  function startMusic() {
    if (!musicEnabled) return;
    try {
      const el = musicRef.current;
      if (!el) return;
      el.loop = true;
      el.volume = 0.18;
      el.currentTime = 0;
      const p = el.play();
      if (p && typeof (p as any).catch === 'function') (p as any).catch(() => {});
    } catch {}
  }

  function stopMusic() {
    try {
      const el = musicRef.current;
      if (!el) return;
      // fade out suave antes de pausar (usa gsap para animar a propriedade volume)
      const init = typeof el.volume === 'number' ? el.volume : 0.18;
      gsap.to(el, {
        volume: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => {
          try {
            el.pause();
            el.currentTime = 0;
            el.volume = init; // restaurar volume para próximas execuções
          } catch {}
        }
      });
    } catch {}
  }

  // animação da contagem quando showResult se torna true
  useEffect(() => {
    if (!showResult) return;
    if (!questions.length) return;
    const obj = { value: 0 };
    gsap.to(obj, {
      value: score,
      duration: 1.1,
      ease: "power2.out",
      onUpdate: () => {
        if (scoreRef.current) scoreRef.current.textContent = String(Math.round(obj.value));
      },
    });
  }, [showResult, questions.length, score]);

  // animação de entrada do painel de resultado
  useEffect(() => {
    if (!showResult) return;
    const el = document.querySelector('.quiz-result') as HTMLDivElement | null;
    if (!el) return;
    gsap.fromTo(el, { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55, ease: 'power2.out' });
  }, [showResult]);

  // animação do card de landing (entrada suave)
  // NOTE: este useEffect precisa estar antes de qualquer return condicional
  // para não alterar a ordem de Hooks entre renders (Rules of Hooks).
  useEffect(() => {
    if (started) return;
    if (!landingRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(landingRef.current, { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power2.out' });
    }, landingRef);
    return () => ctx.revert();
  }, [started]);

  // Garantir que a música só seja iniciada quando o quiz já estiver
  // iniciado *e* o elemento <audio> estiver montado. Também reage à
  // mudança de preferência `musicEnabled` (ex.: usuário liga/desliga).
  useEffect(() => {
    if (!started) return;
    if (musicEnabled) {
      // deferir ligeiramente para o React montar a ref do <audio>
      const t = setTimeout(() => startMusic(), 0);
      return () => clearTimeout(t);
    } else {
      stopMusic();
    }
  }, [started, musicEnabled]);

  // Mostramos a tela de introdução até o usuário iniciar o quiz.
  if (!started) {
    return (
      <div className="w-full quiz-root">
        <div className="content-card text-center" ref={landingRef}>
          <h2>Quiz Interativo sobre Animação</h2>
          <div className="title-underline" />
          <p className="mt-4 text-gray-700">Teste seus conhecimentos! 5 perguntas serão sorteadas de um banco de 15 questões.</p>
          {/* toggle de música removido por solicitação do usuário */}
          <div className="mt-8 flex justify-center">
            <button onClick={startQuiz} className="px-6 py-3 rounded-md btn-accent">Iniciar Quiz</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full quiz-root">
      {/* players de áudio (invisíveis) */}
      <audio ref={acertouRef} src="/Acertou.mp3" preload="auto" />
      <audio ref={errouRef} src="/Errou.mp3" preload="auto" />
      <audio ref={musicRef} src="/Musica.mp3" preload="auto" />
      <div className="quiz-wrap">
        <div className="content-card">
        <h2 className="text-center">Quiz Interativo sobre Animação</h2>
  <div className="title-underline" />
        <div className="flex flex-col items-center">
          <p className="text-center text-gray-600 mt-2">Teste seus conhecimentos! 5 perguntas serão sorteadas de um banco de 15 questões.</p>
          {/* toggle de música removido por solicitação do usuário */}
        </div>

        {!showResult ? (
          <div className="mt-6">
            {/* barra de progresso */}
            <div className="quiz-progress">
              <div className="quiz-progress-bar" style={{ width: `${Math.round(((current + 1) / questions.length) * 100)}%` }} />
            </div>

            <div className="mt-6 p-4 bg-white rounded-md border question-panel">
              <div className="question-header">Pergunta {current + 1} de {questions.length}:</div>
              <div className="question-text">{questions[current].question}</div>
              <div className="grid gap-3">
                {questions[current].options.map((opt, i) => {
                  const selected = answers[current] === i;
                  return (
                    <button
                      key={i}
                      onClick={(ev) => selectOption(i, ev)}
                      aria-pressed={selected}
                      className={`option-btn ${selected ? 'selected' : ''}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between items-start">
                <div className="flex gap-3 items-center pagination-dots">
                  {questions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goto(i)}
                      className={`dot ${i === current ? "active" : ""}`}
                      aria-label={`Ir para pergunta ${i + 1}`}
                    />
                  ))}
                </div>
                {/* removed the separate Finalizar button here — Next will become Finalizar on the last question */}
                <div />
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4 p-4 bg-white rounded-md text-center quiz-result">
            <div className="text-2xl font-bold">Resultado</div>
            <div className="mt-2 text-gray-600">Você acertou <span ref={scoreRef} className="font-semibold">{showResult ? score : 0}</span> de <span className="font-semibold">{questions.length}</span></div>
            <div className="mt-3 text-gray-700 text-lg">Percentual: <span className="font-bold">{percent}%</span></div>
            <div className="mt-4 flex justify-center gap-3">
              <button onClick={reset} className="px-4 py-2 rounded-md btn-accent">Refazer</button>
            </div>
          </div>
        )}
        </div>

        {/* controles externos (botões Anterior / Próxima posicionados fora do card, como no print) */}
        {!showResult && (
          <div className="quiz-controls">
            <button onClick={() => goto(current - 1)} disabled={current === 0} className="quiz-prev">← Anterior</button>
            <button
              onClick={() => {
                if (current === questions.length - 1) {
                  submit();
                } else {
                  goto(current + 1);
                }
              }}
              disabled={questions.length === 0 || answers[current] === -1}
              aria-disabled={questions.length === 0 || answers[current] === -1}
              className="quiz-next"
            >
              {current === questions.length - 1 ? 'Finalizar →' : 'Próxima →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
