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

  // Marca a opção selecionada para a pergunta atual
  const optionAnim = useRef<gsap.core.Tween | null>(null);
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
  }

  // Reinicia o quiz com novo sorteio (apenas no cliente)
  function reset() {
    // voltar para a tela inicial (landing)
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

  // Se o quiz ainda não foi iniciado, mostramos a tela de entrada/landing
  if (!started) {
    return (
      <div className="w-full quiz-root">
        <div className="content-card text-center">
          <h2>Quiz Interativo sobre Animação</h2>
          <div className="title-underline" />
          <p className="mt-4 text-gray-700">Teste seus conhecimentos! 5 perguntas serão sorteadas de um banco de 15 questões.</p>
          <div className="mt-6">
            <button onClick={startQuiz} className="px-5 py-3 rounded-md btn-accent">Iniciar Quiz</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full quiz-root">
      <div className="content-card">
        <h2 className="text-center">Quiz Interativo sobre Animação</h2>
  <div className="title-underline" />
        <p className="text-center text-gray-600 mt-2">Teste seus conhecimentos! 5 perguntas serão sorteadas de um banco de 15 questões.</p>

        {!showResult ? (
          <div className="mt-6">
            {/* barra de progresso */}
            <div className="quiz-progress">
              <div className="quiz-progress-bar" style={{ width: `${Math.round(((current + 1) / questions.length) * 100)}%` }} />
            </div>

            <div className="mt-6 p-4 bg-white rounded-md border question-panel">
              <div className="text-gray-900 font-semibold mb-3">Pergunta {current + 1} de {questions.length}:</div>
              <div className="text-gray-800 font-medium mb-4">{questions[current].question}</div>
              <div className="grid gap-3">
                {questions[current].options.map((opt, i) => {
                  const selected = answers[current] === i;
                  return (
                    <button
                      key={i}
                      onClick={(ev) => selectOption(i, ev)}
                      className={`w-full text-left rounded-md px-4 py-3 transition-colors border ${selected ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-white border-gray-100 text-gray-700 hover:bg-gray-50"}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between items-center">
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
                <div>
                  <button onClick={submit} className="px-4 py-3 rounded-md btn-accent">Finalizar</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4 p-4 bg-white rounded-md text-center">
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
        <div className="quiz-controls">
          <button onClick={() => goto(current - 1)} disabled={current === 0} className="quiz-prev btn-accent">← Anterior</button>
          <button onClick={() => goto(current + 1)} disabled={current === questions.length - 1} className="quiz-next btn-accent">Próxima →</button>
        </div>
    </div>
  );
}
