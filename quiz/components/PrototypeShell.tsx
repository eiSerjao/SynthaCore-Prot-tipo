"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Quiz from "./Quiz";

// Shell do protótipo: navegação entre seções e área do quiz
export default function PrototypeShell() {
  const [section, setSection] = useState<"intro" | "animation" | "video" | "examples" | "quiz" | "historico">("intro");

  const rootRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);
  const asideRef = useRef<HTMLElement | null>(null);
  const demoRef = useRef<HTMLDivElement | null>(null);

  // Animação de entrada com GSAP (apenas no cliente)
  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, { y: 8, opacity: 0, duration: 0.6, ease: "power2.out" });
      const cards = rootRef.current?.querySelectorAll('.card');
      if (cards && cards.length) {
        gsap.from(cards, { y: 12, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power2.out", delay: 0.08 });
      }
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // Animação de transição entre seções: quando `section` muda, anima o conteúdo e a aside
  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(contentRef.current, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.38, ease: 'power2.out' });
      }
      if (asideRef.current) {
        gsap.fromTo(asideRef.current, { x: 14, opacity: 0 }, { x: 0, opacity: 1, duration: 0.38, ease: 'power2.out' });
      }
    }, rootRef);
    return () => ctx.revert();
  }, [section]);

  // Handlers para demonstração interativa em "Exemplos"
  const runRotate = () => {
    if (!demoRef.current) return;
    gsap.to(demoRef.current, { rotation: '+=360', duration: 1, ease: 'power2.out' });
  };
  const runScale = () => {
    if (!demoRef.current) return;
    gsap.fromTo(demoRef.current, { scale: 1 }, { scale: 1.25, duration: 0.45, yoyo: true, repeat: 1, ease: 'power1.inOut' });
  };
  const runBounce = () => {
    if (!demoRef.current) return;
    gsap.fromTo(demoRef.current, { y: 0 }, { y: -48, duration: 0.35, yoyo: true, repeat: 1, ease: 'bounce.out' });
  };
  const runElastic = () => {
    if (!demoRef.current) return;
    gsap.fromTo(demoRef.current, { scale: 1 }, { scale: 1.35, duration: 0.8, yoyo: true, repeat: 1, ease: 'elastic.out(1, 0.6)' });
  };
  const runColor = () => {
    if (!demoRef.current) return;
    const el = demoRef.current;
    const tl = gsap.timeline();
    tl.to(el, { backgroundColor: '#60a5fa', duration: 0.35 });
    tl.to(el, { backgroundColor: 'linear-gradient(90deg,#7c3aed,#4f46e5)' as any, duration: 0.4 });
    tl.to(el, { backgroundColor: '#7c3aed', duration: 0.35 });
  };
  const runSequence = () => {
    if (!demoRef.current) return;
    const tl = gsap.timeline();
    tl.to(demoRef.current, { rotation: '+=180', duration: 0.6, ease: 'power2.inOut' });
    tl.to(demoRef.current, { scale: 1.15, duration: 0.35, ease: 'power1.out' }, '-=0.2');
    tl.to(demoRef.current, { x: 24, duration: 0.35, ease: 'power2.out' });
    tl.to(demoRef.current, { x: 0, duration: 0.35, ease: 'power2.in' });
    tl.to(demoRef.current, { scale: 1, rotation: '+=0', duration: 0.2 });
  };

  return (
    <div ref={rootRef} className="min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <div className="hero-wrap max-w-5xl mx-auto">
            <div ref={headerRef} className="hero">
            <h1 className="text-4xl font-semibold tracking-tight">Animação em Sistemas Multimídia</h1>
            <p className="text-sm mt-2 max-w-2xl mx-auto">Sistema Educacional Interativo</p>
            </div>

            <div className="mt-6 flex justify-center">
              <div className="pill-row">
              {[
                ["intro", "🏠 Início"],
                ["animation", "📚 Conceitos"],
                ["video", "🎨 Técnicas"],
                ["examples", "✨ Exemplos"],
                ["quiz", "🎯 Quiz"],
                ["historico", "📊 Histórico"],
              ].map(([key, label]) => (
                <button
                  key={String(key)}
                  onClick={() => setSection(key as any)}
                  className={`nav-pill ${section === key ? 'active' : ''}`}
                >
                  <span>{label}</span>
                </button>
              ))}
              </div>
            </div>
          </div>
        </header>

        {/* Content area: left = content, right = quiz (desktop). Quiz só aparece quando o usuário seleciona 'quiz' */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {section === 'quiz' ? (
            <main className="lg:col-span-3">
              <section className="content-card">
                <h2>Quiz Interativo</h2>
                <p className="mt-2 text-gray-700">Responda 5 perguntas sorteadas da base para testar seus conhecimentos.</p>
                <div className="mt-4">
                  <Quiz />
                </div>
              </section>
            </main>
          ) : (
            <>
              <main ref={contentRef} className="lg:col-span-2 space-y-6">
            {section === "intro" && (
              <section className="content-card">
                <h2>Bem-vindo ao Sistema de Aprendizado de Animação!</h2>
                <div className="section-underline" />
                <p className="mt-3 text-gray-700">Este sistema multimídia interativo foi desenvolvido para ensinar os conceitos fundamentais de animação em sistemas multimídia. Explore o conteúdo de forma não-linear navegando pelos diferentes módulos.</p>
                <h3 className="section-title">O que você vai aprender:</h3>
                <ul className="mt-3 text-gray-700 list-disc pl-6 space-y-2">
                  <li>Conceitos básicos de animação digital</li>
                  <li>Princípios de animação aplicados a sistemas multimídia</li>
                  <li>Técnicas de implementação (CSS, JavaScript, bibliotecas)</li>
                  <li>Ferramentas e frameworks modernos (GSAP, Anime.js, etc)</li>
                  <li>Aplicações práticas em interfaces educacionais</li>
                </ul>

                <h3 className="section-title">Recursos do Sistema:</h3>
                <ul className="resources-list mt-3 list-none pl-0">
                  <li><span className="icon">📘</span><span className="text">Conteúdo teórico organizado em módulos</span></li>
                  <li><span className="icon">✨</span><span className="text">Demonstrações interativas com GSAP</span></li>
                  <li><span className="icon">🎯</span><span className="text">Quiz com 15 perguntas (5 sorteadas por tentativa)</span></li>
                  <li><span className="icon">💾</span><span className="text">Histórico de desempenho salvo automaticamente</span></li>
                  <li><span className="icon">🔀</span><span className="text">Navegação não-linear entre os módulos</span></li>
                </ul>
              </section>
            )}

            {section === "animation" && (
              <section className="content-card">
                <h2>Conceitos Fundamentais de Animação</h2>
                <div className="section-underline" />

                <h3 className="section-subtitle mt-4">O que é Animação em Sistemas Multimídia?</h3>
                <p className="mt-2 text-gray-700">Animação é a técnica de criar a ilusão de movimento através da exibição rápida de uma sequência de imagens estáticas. Em sistemas multimídia, a animação é um recurso fundamental para:</p>
                <ul className="mt-3 list-disc pl-6 text-gray-700">
                  <li>Melhorar a experiência do usuário (UX)</li>
                  <li>Direcionar a atenção para elementos importantes</li>
                  <li>Fornecer feedback visual de ações</li>
                  <li>Tornar interfaces mais intuitivas e agradáveis</li>
                  <li>Facilitar o aprendizado através de visualizações dinâmicas</li>
                </ul>

                <h3 className="section-subtitle mt-6">Os 12 Princípios de Animação</h3>
                <p className="mt-2 text-gray-700">Desenvolvidos pela equipe da Disney, esses princípios ajudam a criar animações realistas e expressivas:</p>
                <ul className="mt-3 list-none pl-0 text-gray-700">
                  <li><strong>Squash and Stretch:</strong> Deformação para dar peso e flexibilidade.</li>
                  <li><strong>Anticipation:</strong> Preparação antes de uma ação principal.</li>
                  <li><strong>Staging:</strong> Apresentação clara da ideia principal.</li>
                  <li><strong>Straight Ahead e Pose to Pose:</strong> Técnicas de criação frame a frame ou por poses chave.</li>
                  <li><strong>Follow Through &amp; Overlapping:</strong> Continuação do movimento.</li>
                  <li><strong>Ease In e Ease Out:</strong> Aceleração e desaceleração natural.</li>
                  <li><strong>Arcs:</strong> Movimentos em trajetórias curvas.</li>
                  <li><strong>Secondary Action:</strong> Ações complementares que enriquecem a cena.</li>
                  <li><strong>Timing:</strong> Velocidade e ritmo do movimento.</li>
                  <li><strong>Exaggeration:</strong> Exagero para maior impacto visual.</li>
                  <li><strong>Solid Drawing:</strong> Habilidade de desenhar formas tridimensionais críveis.</li>
                  <li><strong>Appeal:</strong> Carisma e atração visual.</li>
                </ul>

                <h3 className="section-subtitle mt-6">Tipos de Animação Digital</h3>
                <ul className="mt-3 list-disc pl-6 text-gray-700">
                  <li><strong>Frame-by-frame:</strong> Cada frame é desenhado individualmente.</li>
                  <li><strong>Tweening:</strong> Interpolação automática entre keyframes.</li>
                  <li><strong>Procedural:</strong> Gerada por algoritmos e código.</li>
                  <li><strong>Física:</strong> Baseada em simulações físicas realistas.</li>
                  <li><strong>Morph:</strong> Transformação gradual entre formas.</li>
                </ul>
              </section>
            )}

            {section === "video" && (
              <section className="content-card">
                <h2>Técnicas de Implementação</h2>
                <div className="section-underline" />

                <h3 className="section-subtitle mt-4">1. Animações CSS</h3>
                <p className="mt-2 text-gray-700">CSS oferece duas formas principais de criar animações:</p>
                <ul className="mt-2 list-disc pl-6 text-gray-700">
                  <li><strong>Transitions:</strong> Animações simples entre estados (hover, focus, etc)</li>
                  <li><strong>Keyframes:</strong> Animações complexas com múltiplos estágios</li>
                </ul>
                <p className="mt-2 text-gray-700"><strong>Vantagens:</strong> Performance otimizada, fácil implementação, não requer JavaScript</p>
                <p className="text-gray-700"><strong>Limitações:</strong> Controle limitado, difícil coordenação de múltiplos elementos</p>

                <h3 className="section-subtitle mt-6">2. JavaScript / Web Animations API</h3>
                <p className="mt-2 text-gray-700">JavaScript oferece controlo programático completo sobre animações:</p>
                <ul className="mt-2 list-disc pl-6 text-gray-700">
                  <li><strong>requestAnimationFrame:</strong> Método nativo para animações suaves</li>
                  <li><strong>Web Animations API:</strong> Interface moderna para controlo preciso</li>
                  <li><strong>Canvas/WebGL:</strong> Animações complexas e gráficos 2D/3D</li>
                </ul>

                <h3 className="section-subtitle mt-6">3. Bibliotecas e Frameworks</h3>
                <p className="mt-2 text-gray-700">Ferramentas especializadas facilitam animações complexas:</p>
                <ul className="mt-2 list-none pl-0 text-gray-700">
                  <li><strong>GSAP:</strong> Biblioteca profissional com recursos avançados</li>
                  <li><strong>Anime.js:</strong> Leve e versátil para animações gerais</li>
                  <li><strong>Three.js:</strong> Especializada em gráficos 3D</li>
                  <li><strong>Lottie:</strong> Reprodução de animações do After Effects</li>
                  <li><strong>Motion One:</strong> Moderna e focada em performance</li>
                </ul>

                <h3 className="section-subtitle mt-6">Quando usar cada técnica?</h3>
                <ul className="mt-2 list-disc pl-6 text-gray-700">
                  <li><strong>CSS:</strong> Transições simples, hovers, loading spinners</li>
                  <li><strong>JavaScript Vanilla:</strong> Animações customizadas específicas</li>
                  <li><strong>GSAP:</strong> Sequências complexas, timelines, scroll animations</li>
                  <li><strong>Canvas:</strong> Partículas, jogos, visualizações de dados</li>
                  <li><strong>SVG + JS:</strong> Ilustrações animadas, morphing de formas</li>
                </ul>
              </section>
            )}

            {section === "examples" && (
              <section className="content-card">
                <h2>Exemplos Práticos com GSAP</h2>
                <div className="section-underline" />

                <h3 className="section-subtitle mt-4">Demonstração Interativa</h3>
                <p className="mt-2 text-gray-700">Clique nos botões abaixo para ver diferentes tipos de animação em ação:</p>

                <div className="mt-6 flex flex-col items-center gap-4">
                  <div ref={demoRef} className="demo-square">Clique nos botões!</div>

                  <div className="example-buttons">
                    <button className="example-btn" onClick={runRotate}>🌀 Rotação</button>
                    <button className="example-btn" onClick={runScale}>📐 Escala</button>
                    <button className="example-btn" onClick={runBounce}>↕ Bounce</button>
                    <button className="example-btn" onClick={runElastic}>🎯 Elastic</button>
                    <button className="example-btn" onClick={runColor}>🎨 Cor</button>
                    <button className="example-btn" onClick={runSequence}>📜 Sequência</button>
                  </div>
                </div>

                <h3 className="section-subtitle mt-8">Aplicações em Sistemas Educacionais</h3>
                <ul className="mt-3 list-none pl-0 text-gray-700">
                  <li><strong>Feedback Visual:</strong> Confirmar ações do usuário (botões, formulários)</li>
                  <li><strong>Transições de Conteúdo:</strong> Suavizar mudanças entre seções</li>
                  <li><strong>Revelação Progressiva:</strong> Apresentar informações gradualmente</li>
                  <li><strong>Gamificação:</strong> Recompensas visuais por conquistas</li>
                  <li><strong>Visualização de Dados:</strong> Animar gráficos e estatísticas</li>
                  <li><strong>Storytelling:</strong> Narrativas visuais interativas</li>
                  <li><strong>Scroll Animations:</strong> Ativar animações conforme rolagem</li>
                </ul>

                <h3 className="section-subtitle mt-6">Boas Práticas</h3>
                <ul className="mt-3 list-disc pl-6 text-gray-700">
                  <li>Mantenha animações rápidas (200–500ms para transições)</li>
                  <li>Use easing apropriado (ease-out para entrada, ease-in para saída)</li>
                  <li>Evite animações excessivas que distraem</li>
                  <li>Garanta acessibilidade (respeite prefers-reduced-motion)</li>
                  <li>Teste em dispositivos diferentes para performance</li>
                </ul>
              </section>
            )}
      </main>

              
            </>
          )}
        </div>
      </div>
    </div>
  );
}
