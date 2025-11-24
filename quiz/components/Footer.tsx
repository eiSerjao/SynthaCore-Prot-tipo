export default function Footer() {
  return (
    <footer className="site-footer-dark" aria-label="Rodapé do site">
      <div className="footer-inner container">
        <div className="footer-columns">
          <div className="footer-col">
            <h4>Sobre o Sistema</h4>
            <p className="muted">Sistema educacional interativo desenvolvido para ensinar animação em sistemas multimídia com recursos de quiz e navegação não-linear.</p>
          </div>

          <div className="footer-col">
            <h4>Recursos</h4>
            <ul className="footer-list">
              <li>✨ Animações GSAP</li>
              <li>📚 Histórico Salvo</li>
              <li>🎯 Quiz Interativo</li>
              <li>📘 Conteúdo Completo</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Tecnologias</h4>
            <ul className="footer-list">
              <li>GSAP 3.12.5</li>
              <li>Data SDK</li>
              <li>Elements SDK</li>
              <li>HTML5 + CSS3</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contato</h4>
            <p className="muted">Sistema desenvolvido como projeto educacional sobre animação em sistemas multimídia.</p>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">© {new Date().getFullYear()} Sistema Educacional de Animação Multimídia. Todos os direitos reservados.</div>
          <div className="footer-icons">
            <a href="#" className="icon">📧</a>
            <a href="#" className="icon">🌐</a>
            <a href="#" className="icon">▦</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
