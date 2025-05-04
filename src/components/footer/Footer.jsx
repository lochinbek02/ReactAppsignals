import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <h3>Biz haqimizda</h3>
          <p>
            Ushbu loyiha zamonaviy texnologiyalar va ta'limni birlashtirgan platforma bo'lib, foydalanuvchilarni 
            o'qitish va rivojlantirish uchun mo'ljallangan.
          </p>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h3>Kontakt ma'lumotlar</h3>
          
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        {/* Author Section */}
        <div className="footer-section">
          <h3>Muallif haqida</h3>
         
          <p>
            Ushbu platforma foydalanuvchilarning ta'limga bo'lgan qiziqishini oshirishga qaratilgan. 
            Har qanday savollar uchun murojaat qiling.
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Barcha huquqlar himoyalangan </p>
      </div>
    </footer>
  );
}

export default Footer;
