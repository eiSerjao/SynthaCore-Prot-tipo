# 🎨 SynthaCore - Sistema Educacional Interativo

<div align="center">

**Sistema educacional multimídia sobre Animação em Sistemas Multimídia**

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.13-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## 📚 Sobre o Projeto

O **SynthaCore** é um sistema educacional interativo desenvolvido como protótipo para o ensino de **Animação em Sistemas Multimídia**. O projeto foi criado para a disciplina de Sistemas Multimídia e cumpre todos os requisitos definidos no Documento de Requisitos de Software (DRS).

### 🎯 Tema: Animação em Sistemas Multimídia

Este sistema apresenta de forma interativa e envolvente os conceitos fundamentais de animação digital, desde técnicas tradicionais até tecnologias modernas, com demonstrações práticas e um quiz interativo para avaliar o aprendizado.

---

## ✨ Características Principais

### 📋 Requisitos Funcionais Cumpridos

✅ **Integração completa das 6 mídias obrigatórias:**
- 🖼️ **Imagens Matriciais**: Fotografias e texturas capturadas e tratadas
- 🎨 **Imagens Vetoriais**: Logo e elementos de design vetorizados
- 🔊 **Áudio**: Efeitos sonoros (Foley) para interações
- 🎵 **Música (MIDI)**: Trilha sonora original composta em MIDI
- 🎬 **Vídeo**: Tutorial/Making-of produzido pela equipe
- ✨ **Animação**: Stop Motion criado frame-by-frame (113 fotos, 11 segundos)

✅ **Sistema de Quiz Interativo:**
- Banco com 15+ perguntas sobre animação
- Sorteio aleatório de 5 perguntas por execução
- Sistema de pontuação e feedback visual/sonoro
- Histórico de desempenho salvo localmente

✅ **Navegação Não-Linear:**
- Sistema de abas para navegar entre módulos
- Acesso direto a qualquer conteúdo
- Experiência fluida e responsiva

✅ **Todo conteúdo original** criado pela equipe

---

## 🚀 Tecnologias Utilizadas

### Core Stack
| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **Next.js** | 16.0.3 | Framework React com SSR e otimizações |
| **React** | 19.2.0 | Biblioteca para UI componetizada |
| **TypeScript** | 5.x | Type safety e melhor DX |
| **Tailwind CSS** | 4.0 | Estilização utility-first |
| **GSAP** | 3.13.0 | Animações profissionais |

### Funcionalidades Implementadas
- ⚡ **Performance otimizada** com code splitting
- 📱 **100% Responsivo** para todos os dispositivos
- ♿ **Acessível** (WCAG 2.1)
- 🎨 **Animações fluidas** com GSAP
- 💾 **LocalStorage** para persistência de dados
- 🎵 **Sistema de áudio** com controles
- 🌐 **SEO otimizado** com metadata completa
- 🔒 **Segurança** com headers otimizados

---

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/eiSerjao/SynthaCore-Prot-tipo.git

# Entre na pasta do projeto
cd SynthaCore-Prot-tipo/quiz

# Instale as dependências
npm install

# Execute o projeto em modo desenvolvimento
npm run dev

# Acesse no navegador
# http://localhost:3000
```

### Scripts Disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Cria build de produção
npm run start    # Inicia servidor de produção
npm run lint     # Verifica código com ESLint
```

---

## 📁 Estrutura do Projeto

```
quiz/
├── app/
│   ├── globals.css          # Estilos globais + responsividade
│   ├── layout.tsx           # Layout principal + SEO
│   ├── page.tsx             # Página inicial (redirect)
│   ├── loading.tsx          # Loading state
│   ├── error.tsx            # Error boundary
│   ├── not-found.tsx        # Página 404
│   ├── prototype/
│   │   └── page.tsx         # Página do protótipo
│   └── legacy/
│       └── page.tsx         # Versão legada
├── components/
│   ├── PrototypeShell.tsx   # Shell principal com navegação
│   ├── Quiz.tsx             # Componente do quiz interativo
│   ├── Footer.tsx           # Rodapé
│   └── LegacyPage.tsx       # Página legada
├── data/
│   └── questions.ts         # Banco de perguntas do quiz
├── hooks/
│   └── useCommon.ts         # Hooks customizados
├── lib/
│   ├── utils.ts             # Utilitários gerais
│   └── constants.ts         # Constantes do projeto
├── types/
│   └── index.ts             # Definições TypeScript
├── public/
│   ├── logo.png             # Logo vetorizado
│   ├── fundofacul.jpg       # Imagem de fundo
│   ├── animação.gif         # Stop Motion
│   ├── Acertou.mp3          # SFX de acerto
│   ├── Errou.mp3            # SFX de erro
│   ├── Musica.mp3           # Trilha MIDI
│   ├── manifest.json        # PWA manifest
│   └── robots.txt           # SEO
├── package.json
├── tsconfig.json            # Config TypeScript
├── next.config.ts           # Config Next.js otimizado
└── postcss.config.mjs       # Config PostCSS
```

---

## 👥 Equipe de Desenvolvimento

### Contribuições Específicas

- **👩‍💻 Ingryd Vitória de Araújo Barbosa** - Lead Developer
  - Desenvolvimento full-stack, arquitetura Next.js/TypeScript, UI/UX
  - [GitHub](https://github.com/ingrydaraujob)

- **🎬 Paulo Sérgio Barros de Souza** - Project Manager & Multimedia Producer
  - Gestão de projeto, DRS, produção de vídeo, trilha MIDI, animação Stop Motion
  - [GitHub](https://github.com/eiSerjao)

- **🎨 Kauan Henrique Barbosa da Costa** - Content Creator & Vector Designer
  - Identidade visual, logo vetorizado, narração, curadoria de conteúdo
  - [GitHub](https://github.com/KauanH1300)

- **🔊 Luiz Otávio de Souza Azevedo** - Sound Designer & Assistant Developer
  - Captação e processamento de áudio (Foley), suporte ao desenvolvimento
  - [GitHub](https://github.com/0Tavinn)

- **🖼️ Murilo William Trindade Guedes** - Visual Designer (Matrix)
  - Fotografia matricial, tratamento de imagens, texturas

---

## 🎓 Contexto Acadêmico

### Disciplina
Sistemas Multimídia

### Unidade
Unidade 2 - Avaliação

### Requisitos Atendidos
- ✅ Implementação das 6 mídias obrigatórias (original)
- ✅ Sistema de quiz com 15+ perguntas
- ✅ Navegação não-linear
- ✅ Interface interativa e responsiva
- ✅ Documentação completa (DRS)
- ✅ Controle de versão (Git)

---

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais como parte da disciplina de Sistemas Multimídia.

---

## 🌟 Agradecimentos

Agradecemos aos professores e colegas que contribuíram com feedback valioso durante o desenvolvimento deste projeto, e à comunidade open-source pelas ferramentas incríveis que tornaram este trabalho possível.

---

<div align="center">

**Desenvolvido com ❤️ pela Equipe SynthaCore**

</div>
