"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { pickRandomQuestions, QUESTIONS } from "../data/questions";

export default function LegacyPage() {
  const [section, setSection] = useState<string>("home");

  // Demo box
  const demoBoxRef = useRef<HTMLDivElement | null>(null);

  // Quiz state
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState(QUESTIONS.slice(0, 5));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Array<number | null>>([]);
  const [showResults, setShowResults] = useState(false);
  const [finalPercentage, setFinalPercentage] = useState(0);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    // load history from localStorage
    try {
      const raw = localStorage.getItem("quizHistory");
      if (raw) setHistory(JSON.parse(raw));
    } catch (e) {
      console.warn("failed to read quiz history", e);
    }
  }, []);

  // Nav animation
  useEffect(() => {
    const activeEl = document.querySelector(`.nav-btn[data-section=\"${section}\"]`);
    if (activeEl) {
      gsap.fromTo(activeEl, { scale: 0.96 }, { scale: 1, duration: 0.22, ease: "power2.out" });
    }
  }, [section]);

  // Demo controls
  function animateRotate() {
    if (!demoBoxRef.current) return;
    gsap.to(demoBoxRef.current, { rotation: 360, duration: 1, ease: "power2.inOut" });
  }
  function animateScale() {
    if (!demoBoxRef.current) return;
    gsap.to(demoBoxRef.current, { scale: 1.5, duration: 0.5, yoyo: true, repeat: 1, ease: "power2.inOut" });
  }
  function animateBounce() {
    if (!demoBoxRef.current) return;
    gsap.to(demoBoxRef.current, { y: -100, duration: 0.5, ease: "bounce.out", yoyo: true, repeat: 1 });
  }
  function animateElastic() {
    if (!demoBoxRef.current) return;
    gsap.to(demoBoxRef.current, { rotation: 360, duration: 1, ease: "elastic.out(1, 0.3)" });
  }
  function animateColor() {
    if (!demoBoxRef.current) return;
    const el = demoBoxRef.current;
    gsap.to(el, {
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      duration: 1,
      onComplete: () => {
        gsap.to(el, { background: "linear-gradient(135deg, #667eea, #764ba2)", duration: 1 });
      }
    });
  }
  function animateSequence() {
    if (!demoBoxRef.current) return;
    const tl = gsap.timeline();
    tl.to(demoBoxRef.current, { scale: 0.5, duration: 0.3 })
      .to(demoBoxRef.current, { rotation: 180, duration: 0.4 })
      .to(demoBoxRef.current, { scale: 1.3, duration: 0.3 })
      .to(demoBoxRef.current, { rotation: 360, scale: 1, duration: 0.4 });
  }

  // Quiz functions
  function startQuiz() {
    const qs = pickRandomQuestions(5);
    setQuestions(qs);
    setUserAnswers(Array(qs.length).fill(null));
    setCurrentIndex(0);
    setStarted(true);
    setShowResults(false);
    // animate
    gsap.fromTo('#quiz-questions', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.2)' });
  }

  function selectOption(idx: number) {
    const copy = [...userAnswers];
    copy[currentIndex] = idx;
    setUserAnswers(copy);
    // micro animation on option
    const optionEls = document.querySelectorAll('.answer-option');
    const el = optionEls[currentIndex * 1]; // not precise — use event-based animation in DOM level below
  }

  function nextQuestion() {
    if (currentIndex < questions.length - 1) setCurrentIndex(i => i + 1);
  }
  function prevQuestion() {
    if (currentIndex > 0) setCurrentIndex(i => i - 1);
  }

  function finishQuiz() {
    const correct = questions.reduce((acc, q, i) => acc + (userAnswers[i] === q.answerIndex ? 1 : 0), 0);
    const percentage = Math.round((correct / questions.length) * 100);
    setFinalPercentage(percentage);
    setShowResults(true);
    // save history
    const record = { quiz_id: `quiz_${Date.now()}`, score: correct, total_questions: questions.length, percentage, completed_at: new Date().toISOString() };
    const newHistory = [record, ...history].slice(0, 20);
    setHistory(newHistory);
    try { localStorage.setItem('quizHistory', JSON.stringify(newHistory)); } catch (e) {}

    // animate result
    gsap.fromTo('#quiz-results', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)' });
    const scoreEl = document.getElementById('final-score');
    if (scoreEl) {
      const obj = { value: 0 };
      gsap.to(obj, { value: percentage, duration: 1.6, ease: 'power2.out', onUpdate: () => { scoreEl.textContent = Math.round(obj.value) + '%'; } });
    }
  }

  function restartQuiz() {
    setStarted(false);
    setShowResults(false);
    gsap.fromTo('#quiz-start', { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
  }

  return (
    <div className="container">
      <div className="header">
        <h1 id="app-title">Animação em Sistemas Multimídia</h1>
        <p id="app-subtitle">Sistema Educacional Interativo</p>
      </div>

      <nav className="nav-menu">
        {['home','conceitos','tecnicas','ferramentas','exemplos','quiz','historico'].map(key => (
          <button key={key} className={`nav-btn ${section===key? 'active':''}`} data-section={key} onClick={() => setSection(key)}>{key}</button>
        ))}
      </nav>

      <div className={`content-section ${section==='home' ? 'active' : ''}`} id="home">
        <h2>Bem-vindo ao Sistema de Aprendizado de Animação!</h2>
        <p>Este sistema multimídia interativo foi desenvolvido para ensinar os conceitos fundamentais de animação em sistemas multimídia. Explore o conteúdo de forma não-linear navegando pelos diferentes módulos.</p>
      </div>

      <div className={`content-section ${section==='exemplos' ? 'active' : ''}`} id="exemplos">
        <h2>Exemplos Práticos com GSAP</h2>
        <div className="demo-box" id="demoBox" ref={demoBoxRef}>Clique nos botões!</div>
        <div className="demo-controls">
          <button className="demo-btn" onClick={animateRotate}>🔄 Rotação</button>
          <button className="demo-btn" onClick={animateScale}>📏 Escala</button>
          <button className="demo-btn" onClick={animateBounce}>⚡ Bounce</button>
          <button className="demo-btn" onClick={animateElastic}>🎯 Elastic</button>
          <button className="demo-btn" onClick={animateColor}>🎨 Cor</button>
          <button className="demo-btn" onClick={animateSequence}>🎬 Sequência</button>
        </div>
      </div>

      <div className={`content-section ${section==='quiz' ? 'active' : ''}`} id="quiz">
        <div className="quiz-container">
          <div className="quiz-header">
            <h2 id="quiz-title">Quiz Interativo sobre Animação</h2>
            <p id="quiz-intro">Teste seus conhecimentos! 5 perguntas serão sorteadas de um banco de 15 questões.</p>
          </div>

          {!started && !showResults && (
            <div id="quiz-start">
              <button className="restart-btn" id="start-quiz-btn" onClick={startQuiz}>Iniciar Quiz</button>
            </div>
          )}

          {started && !showResults && (
            <div id="quiz-questions">
              <div className="quiz-progress">
                <div className="quiz-progress-bar" id="progress-bar" style={{width: `${((currentIndex+1)/questions.length)*100}%`}} />
              </div>
              <div className="question-card">
                <div className="question-text"><strong>Pergunta {currentIndex+1} de {questions.length}:</strong><br />{questions[currentIndex].question}</div>
                {questions[currentIndex].options.map((opt, idx) => (
                  <div key={idx} className={`answer-option ${userAnswers[currentIndex]===idx? 'selected':''}`} onClick={(e) => { const copy=[...userAnswers]; copy[currentIndex]=idx; setUserAnswers(copy); const target = e.currentTarget as HTMLElement; gsap.fromTo(target,{scale:0.95},{scale:1,duration:0.2,ease:'back.out(2)'}); }}>
                    {opt}
                  </div>
                ))}
              </div>
              <div className="quiz-navigation">
                <button className="quiz-nav-btn" id="prev-btn" onClick={prevQuestion} disabled={currentIndex===0}>← Anterior</button>
                {currentIndex < questions.length -1 ? (
                  <button className="quiz-nav-btn" id="next-btn" onClick={nextQuestion} disabled={userAnswers[currentIndex]===null}>Próxima →</button>
                ) : (
                  <button className="quiz-nav-btn" id="finish-btn" onClick={finishQuiz} disabled={userAnswers[currentIndex]===null}>Finalizar</button>
                )}
              </div>
            </div>
          )}

          {showResults && (
            <div id="quiz-results">
              <div className="results-container">
                <h2>🎉 Quiz Finalizado!</h2>
                <div className="results-score" id="final-score">{finalPercentage}%</div>
                <p className="results-message" id="results-message">Parabéns por concluir o quiz!</p>
                <button className="restart-btn" id="restart-quiz-btn" onClick={restartQuiz}>Fazer Novamente</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={`content-section ${section==='historico' ? 'active' : ''}`} id="historico">
        <h2>Histórico de Desempenho</h2>
        <div className="history-list" id="history-list">
          {history.length===0 ? <div className="no-history">Nenhum quiz realizado ainda. Faça o quiz para começar!</div> : history.map(item => (
            <div key={item.quiz_id} className="history-item">
              <div>
                <div className="history-score">{Math.round(item.percentage)}%</div>
                <div className="history-date">{new Date(item.completed_at).toLocaleString('pt-BR')}</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontSize:17,color:'#333'}}>{item.score}/{item.total_questions} corretas</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
