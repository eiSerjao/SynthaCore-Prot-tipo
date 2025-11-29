"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Quiz from "./Quiz";

// Shell do protótipo: navegação entre seções e área do quiz
export default function PrototypeShell() {
  const [section, setSection] = useState<"intro" | "animation" | "video" | "examples" | "quiz" | "devs">("intro");

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
    // Aplica a classe `color-alt` de forma persistente para fixar o gradient rosa.
    if (!demoRef.current) return;
    const el = demoRef.current;
    // Se já tiver a classe, não faz nada (permanece). Caso contrário, aplica com um pequeno cross-fade.
    if (el.classList.contains('color-alt')) return;
    const tl = gsap.timeline();
    tl.to(el, { autoAlpha: 0.06, scale: 0.96, duration: 0.16, ease: 'power1.in' });
    tl.call(() => { el.classList.add('color-alt'); });
    tl.to(el, { autoAlpha: 1, scale: 1, duration: 0.26, ease: 'power2.out' });
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
              <div className="logo-wrap">
                <img src="/logo.png" alt="Logo" className="site-logo" />
              </div>
              <h1 className="text-4xl font-semibold tracking-tight">SynthaCore</h1>
              <p className="text-sm mt-2 max-w-2xl mx-auto">Sistema Educacional Interativo</p>
            </div>
          </div>

          {/*
            NOTE: movemos o bloco de navigation "pills" para FORA do .hero-wrap
            para que os botões não fiquem presos dentro do background arredondado
            do hero. O posicionamento visual (overlap) continua sendo controlado
            via CSS em `.pill-row` (margin-top / transform).
          */}
          <div className="mt-6 flex justify-center">
            <div className="pill-row">
              {[
                ["intro", "🏠 Início"],
                ["animation", "📚 Tipos de Animação"],
                ["video", "🎨 Como uma animação é produzida"],
                ["examples", "✨ Exemplos"],
                ["quiz", "🎯 Quiz"],
                ["devs", "👥 Devs"],
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
        </header>

        {/* Content area: left = content, right = quiz (desktop). Quiz só aparece quando o usuário seleciona 'quiz' */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {section === 'quiz' ? (
            <main className="lg:col-span-3">
              <section className="content-card">
                
                  <Quiz />
                
              </section>
            </main>
          ) : (
            <>
              <main ref={contentRef} className="lg:col-span-2 space-y-6">
                {section === 'devs' && (
                  <section className="content-card">
                    <h2>Sobre os Desenvolvedores</h2>
                    <div className="section-underline" />
                    <p className="mt-3 text-gray-700">Conheça a equipe responsável por este sistema educacional:</p>

                    <div className="mt-6 devs-grid">
                      <div className="dev-card">
                        <div className="text-center">
                          <div className="emoji">👨‍💻</div>
                          <h4 className="dev-name">João Silva</h4>
                          <div className="dev-role">Desenvolvedor Frontend</div>
                          <p className="dev-desc">Especialista em animações web e experiência do usuário. Responsável pela implementação das animações GSAP e interface interativa.</p>
                        </div>
                      </div>

                      <div className="dev-card">
                        <div className="text-center">
                          <div className="emoji">👩‍💻</div>
                          <h4 className="dev-name">Maria Santos</h4>
                          <div className="dev-role">Designer UX/UI</div>
                          <p className="dev-desc">Designer focada em criar experiências educacionais envolventes. Desenvolveu toda a identidade visual e fluxo de navegação do sistema.</p>
                        </div>
                      </div>

                      <div className="dev-card">
                        <div className="text-center">
                          <div className="emoji">🎓</div>
                          <h4 className="dev-name">Pedro Costa</h4>
                          <div className="dev-role">Especialista em Conteúdo</div>
                          <p className="dev-desc">Professor de sistemas multimídia com 10 anos de experiência. Responsável pela curadoria e desenvolvimento do conteúdo educacional.</p>
                        </div>
                      </div>

                      <div className="dev-card">
                        <div className="text-center">
                          <div className="emoji">👩‍🔬</div>
                          <h4 className="dev-name">Ana Oliveira</h4>
                          <div className="dev-role">Desenvolvedora Backend</div>
                          <p className="dev-desc">Engenheira de software especializada em arquitetura de dados. Implementou o sistema de persistência e gerenciamento de quiz.</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="section-title">Sobre o Projeto</h3>
                      <p className="mt-2 text-gray-700">Este sistema educacional foi desenvolvido como parte de um projeto acadêmico sobre Animação em Sistemas Multimídia. O objetivo é proporcionar uma experiência de aprendizado interativa e envolvente, utilizando as mais modernas tecnologias web para demonstrar na prática os conceitos de animação digital.</p>

                      <h3 className="section-title mt-6">Agradecimentos</h3>
                      <p className="mt-2 text-gray-700">Agradecemos aos professores e colegas que contribuíram com feedback valioso durante o desenvolvimento deste projeto, e à comunidade open-source pelas ferramentas incríveis que tornaram este trabalho possível.</p>
                    </div>
                  </section>
                )}
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
                <h2>TIPOS DE ANIMAÇÃO</h2>
                <div className="section-underline" />

                <h3 className="section-subtitle mt-4">Tipos de Animação em Multimídia</h3>
                <p className="mt-2 text-gray-700">A animação é a técnica de criar a ilusão de movimento através de imagens sequenciais. Existem várias formas de produzir animações ao longo da história e em diferentes tecnologias. A seguir estão os principais tipos usados em sistemas multimídia:</p>

                <div className="mt-4">
                  <h4 className="section-subtitle">1⃣ Animação Tradicional</h4>
                  <p className="text-gray-700">A técnica consiste em desenhar cada quadro à mão. Quando os desenhos são exibidos em sequência, geram a sensação de movimento.</p>
                  <p className="text-gray-700"><strong>Como é feita:</strong></p>
                  <ul className="mt-2 list-disc pl-6 text-gray-700">
                    <li>Desenhos feitos em papel ou acetato (cels)</li>
                    <li>Pintura e fotografia quadro a quadro</li>
                    <li>Reproduzido em película ou digitalizado</li>
                  </ul>
                  <p className="text-gray-700"><strong>Exemplos:</strong></p>
                  <ul className="mt-2 list-disc pl-6 text-gray-700">
                    <li>“A Pequena Sereia”</li>
                    <li>“O Rei Leão” (versões clássicas)</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h4 className="section-subtitle">2⃣ Pixilation</h4>
                  <p className="text-gray-700">Uma variação do stop motion onde pessoas atuam como bonecos, movendo-se em pequenas etapas entre as fotos.</p>
                  <p className="text-gray-700"><strong>Como é feita:</strong></p>
                  <ul className="mt-2 list-disc pl-6 text-gray-700">
                    <li>Captura quadro a quadro de pessoas reais</li>
                    <li>Movimentos fracionados para gerar efeito de animação</li>
                  </ul>
                  <p className="text-gray-700"><strong>Exemplos:</strong></p>
                  <ul className="mt-2 list-disc pl-6 text-gray-700">
                    <li>Curtas experimentais de Norman McLaren</li>
                    <li>Videoclipes criativos</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h4 className="section-subtitle">3⃣ Animação na Película</h4>
                  <p className="text-gray-700">A animação é feita diretamente sobre o filme, sem uso de câmera. O artista risca, pinta ou altera o filme físico.</p>
                  <p className="text-gray-700"><strong>Como é feita:</strong></p>
                  <ul className="mt-2 list-disc pl-6 text-gray-700">
                    <li>Tinta, ferramentas ou arranhões aplicados no filme fotográfico</li>
                    <li>Depois a película é projetada</li>
                  </ul>
                  <p className="text-gray-700"><strong>Exemplos:</strong></p>
                  <ul className="mt-2 list-disc pl-6 text-gray-700">
                    <li>Trabalhos de Len Lye e Norman McLaren</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h4 className="section-subtitle">4⃣ Animação com Areia</h4>
                  <p className="text-gray-700">Utiliza areia em uma mesa iluminada para formar desenhos que são alterados quadro a quadro.</p>
                  <p className="text-gray-700"><strong>Como é feita:</strong></p>
                  <ul className="mt-2 list-disc pl-6 text-gray-700">
                    <li>Desenhos em areia sobre superfície transparente</li>
                    <li>Iluminação por baixo</li>
                    <li>Movimento capturado quadro a quadro</li>
                  </ul>
                  <p className="text-gray-700"><strong>Exemplos:</strong></p>
                  <ul className="mt-2 list-disc pl-6 text-gray-700">
                    <li>Filmes curtos de Caroline Leaf</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h4 className="section-subtitle">5⃣ Analog Computer Animation – Scanimate</h4>
                  <p className="text-gray-700">Técnica eletrônica analógica muito usada para animações gráficas de TV antes do computador digital.</p>
                  <p className="text-gray-700"><strong>Como é feita:</strong></p>
                  <ul className="mt-2 list-disc pl-6 text-gray-700">
                    <li>Equipamento chamado Scanimate distorce imagens ao vivo</li>
                    <li>Manipulação eletrônica de gráficos e textos</li>
                  </ul>
                  <p className="text-gray-700"><strong>Exemplos:</strong></p>
                  <ul className="mt-2 list-disc pl-6 text-gray-700">
                    <li>Vinhetas e logotipos de TV nos anos 70 e 80</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h4 className="section-subtitle">6⃣ Rotoscopia</h4>
                  <p className="text-gray-700">Técnica onde se desenha por cima de filmagens reais para criar animação mais realista.</p>
                  <p className="text-gray-700"><strong>Como é feita:</strong></p>
                  <ul className="mt-2 list-disc pl-6 text-gray-700">
                    <li>Filmagem real</li>
                    <li>Artista redesenha cada movimento em cima da gravação</li>
                  </ul>
                  <p className="text-gray-700"><strong>Exemplos:</strong></p>
                  <ul className="mt-2 list-disc pl-6 text-gray-700">
                    <li>“A Scanner Darkly”</li>
                    <li>Técnica usada no personagem Branca de Neve (1937)</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h4 className="section-subtitle">7⃣ Stop Motion</h4>
                  <p className="text-gray-700">A animação é criada fotografando objetos físicos quadro a quadro com pequenas alterações entre as fotos.</p>
                  <p className="text-gray-700"><strong>Como é feita:</strong></p>
                  <ul className="mt-2 list-disc pl-6 text-gray-700">
                    <li>Construção de bonecos e cenários</li>
                    <li>Captura fotográfica dos movimentos</li>
                    <li>Edição em sequência</li>
                  </ul>
                  <p className="text-gray-700"><strong>Exemplos:</strong></p>
                  <ul className="mt-2 list-disc pl-6 text-gray-700">
                    <li>“O Estranho Mundo de Jack”</li>
                    <li>“Coraline”</li>
                    <li>“Fuga das Galinhas”</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h4 className="section-subtitle">8⃣ Animação 3D (Computer Animation)</h4>
                  <p className="text-gray-700">Produzida inteiramente no computador com modelagem, rigging e renderização 3D.</p>
                  <p className="text-gray-700"><strong>Como é feita:</strong></p>
                  <ul className="mt-2 list-disc pl-6 text-gray-700">
                    <li>Criação do modelo 3D</li>
                    <li>Colocação de esqueleto (rig)</li>
                    <li>Animação dos movimentos</li>
                    <li>Iluminação e render final</li>
                  </ul>
                  <p className="text-gray-700"><strong>Exemplos:</strong></p>
                  <ul className="mt-2 list-disc pl-6 text-gray-700">
                    <li>“Toy Story”</li>
                    <li>“Procurando Nemo”</li>
                    <li>Jogos modernos com gráficos 3D</li>
                  </ul>
                </div>
              </section>
            )}

            {section === "video" && (
              <section className="content-card">
                <h2>Processo de Produção da Animação</h2>
                <div className="section-underline" />

                <p className="mt-2 text-gray-700">Independente da técnica escolhida, a criação de uma animação segue etapas fundamentais:</p>

                <div className="mt-4">
                  <h4 className="section-subtitle">1⃣ Roteiro</h4>
                  <p className="text-gray-700">Definição da história, personagens e diálogos.</p>
                </div>

                <div className="mt-3">
                  <h4 className="section-subtitle">2⃣ Storyboard</h4>
                  <p className="text-gray-700">Desenhos simples organizando as cenas da história na ordem certa. Funciona como uma “revista em quadrinhos” do filme.</p>
                </div>

                <div className="mt-3">
                  <h4 className="section-subtitle">3⃣ Animatic</h4>
                  <p className="text-gray-700">Versão prévia da animação com:</p>
                  <ul className="mt-2 list-disc pl-6 text-gray-700">
                    <li>Storyboard em sequência</li>
                    <li>Duração aproximada das cenas</li>
                    <li>Trilha e falas temporárias</li>
                  </ul>
                  <p className="text-gray-700">Serve para testar ritmo e tempo total.</p>
                </div>

                <div className="mt-3">
                  <h4 className="section-subtitle">4⃣ Produção da Animação</h4>
                  <p className="text-gray-700">Aqui a técnica escolhida é aplicada. Abaixo uma visão simplificada do que acontece em cada abordagem:</p>
                  <div className="mt-2 text-gray-700">
                    <ul className="mt-2 list-disc pl-6 text-gray-700">
                      <li><strong>2D tradicional:</strong> Desenho quadro a quadro.</li>
                      <li><strong>2D digital:</strong> Uso de softwares como Toon Boom e Animate.</li>
                      <li><strong>Stop motion:</strong> Captura fotográfica quadro a quadro de objetos e bonecos.</li>
                      <li><strong>3D:</strong> Modelagem, rigging, animação digital, iluminação e renderização.</li>
                    </ul>
                    <p className="mt-3 text-gray-700">Também são criados cenários, texturas e efeitos visuais.</p>
                  </div>
                </div>

                <div className="mt-3">
                  <h4 className="section-subtitle">5⃣ Pós-produção</h4>
                  <ul className="mt-2 list-disc pl-6 text-gray-700">
                    <li>Edição final</li>
                    <li>Trilha sonora</li>
                    <li>Dublagem</li>
                    <li>Efeitos visuais</li>
                    <li>Renderização</li>
                  </ul>
                  <p className="mt-2 text-gray-700">É onde tudo ganha vida e fica com qualidade profissional.</p>
                </div>
              </section>
            )}

            {section === "examples" && (
              <section className="content-card">
                <h2>Exemplo prático de animação - Stop Motion</h2>
                <div className="section-underline" />

                <p className="mt-3 text-gray-700">Nesta página apresentamos um exemplo de animação em Stop Motion produzida pela nossa equipe utilizando a técnica quadro a quadro.</p>

                <div className="mt-4">
                  <div className="w-full rounded overflow-hidden shadow-md">
                    <img src="/animação.gif" alt="Stop Motion - exemplo" className="w-full h-auto block" />
                  </div>
                  
                </div>

                <div className="mt-6">
                  <h3 className="section-subtitle">Dados da animação</h3>
                  <ul className="mt-2 list-disc pl-6 text-gray-700">
                    <li>113 fotos tiradas manualmente</li>
                    <li>12 minutos de captação</li>
                    <li>11 segundos de duração final</li>
                    <li>Movimentação feita com pequenos ajustes entre cada foto</li>
                  </ul>
                  <p className="mt-2 text-gray-700">Esse processo mostra como a técnica exige paciência, planejamento e precisão nos movimentos.</p>
                </div>

                <div className="mt-6">
                  <h3 className="section-subtitle">O que é Stop Motion?</h3>
                  <p className="mt-2 text-gray-700">Stop Motion é uma técnica de animação em que objetos físicos são fotografados repetidamente, sendo movidos sutilmente entre cada foto. Ao exibir as imagens em sequência, cria-se a ilusão de movimento.</p>
                </div>

                <div className="mt-6">
                  <h3 className="section-subtitle">Características detalhadas do Stop Motion</h3>
                  <div className="mt-3 text-gray-700">
                    <p><strong>Técnica:</strong> Quadro a Quadro — cada imagem é uma fotografia individual.</p>
                    <p className="mt-2"><strong>Objeto / Material:</strong> Argila, brinquedos, papel, LEGO, pessoas, etc.</p>
                    <p className="mt-2"><strong>Movimentos:</strong> Gradativos — pequenas mudanças garantem fluidez.</p>
                    <p className="mt-2"><strong>Iluminação:</strong> Controlada — deve permanecer igual para evitar cintilação.</p>
                    <p className="mt-2"><strong>Quantidade de fotos:</strong> Geralmente 12 a 24 fotos para 1 segundo de animação.</p>
                    <p className="mt-2"><strong>Processo:</strong> Lento e manual — pode usar fios, palitos, massinha, recortes.</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="section-subtitle">Etapas para criação do nosso Stop Motion</h3>
                  <ol className="mt-2 list-decimal pl-6 text-gray-700">
                    <li>Planejamento do roteiro e ideias básicas</li>
                    <li>Definição do cenário e materiais usados</li>
                    <li>Posicionamento da câmera estática</li>
                    <li>Fotografar com movimentos pequenos por vez</li>
                    <li>Importar e organizar as fotos no editor</li>
                    <li>Ajustar tempo por quadro e exportar o vídeo</li>
                  </ol>
                </div>

                <div className="mt-6">
                  <h3 className="section-subtitle">Dificuldades e aprendizados</h3>
                  <ul className="mt-2 list-disc pl-6 text-gray-700">
                    <li>A câmera não podia se mover para não “tremer” a animação — usamos tripé</li>
                    <li>Precisamos manter a iluminação constante</li>
                    <li>Cada movimento tinha que ser bem pequeno para ficar natural</li>
                    <li>Apesar do trabalho minucioso, o resultado é muito gratificante</li>
                  </ul>
                  <p className="mt-3 text-gray-700">Criar apenas 11 segundos de animação levou 12 minutos fotografando e 113 cliques — isso mostra como o Stop Motion é uma técnica trabalhosa, porém recompensadora.</p>
                </div>
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
