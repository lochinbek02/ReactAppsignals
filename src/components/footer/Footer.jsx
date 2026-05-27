import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">🧠 Biosignal</div>
          <p className="footer-tagline">
            EMG signallarini tahlil qilish va mashinaviy o&apos;qitish platformasi
          </p>
        </div>

        <div className="footer-meta">
          <p>&copy; {new Date().getFullYear()} Biosignal Platform</p>
          <p>Barcha huquqlar himoyalangan</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
