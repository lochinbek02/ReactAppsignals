import './Main.css';
import Footer from './footer/Footer';

const FEATURES = [
  {
    icon: '🏥',
    title: 'Tibbiyot',
    text: 'EMG signallari orqali mushak kasalliklari va asab tizimi faoliyatini baholash mumkin.',
  },
  {
    icon: '🏃',
    title: 'Sport',
    text: 'Mushak kuchini va chidamliligini tahlil qilib, mashg\'ulot samaradorligini oshirish.',
  },
  {
    icon: '🤖',
    title: 'Robototexnika',
    text: 'EMG signallari yordamida protezlar va boshqaruv tizimlari yaratiladi.',
  },
];

const STATS = [
  { value: '3', label: 'Gestura turi' },
  { value: '20+', label: 'Signal xususiyatlari' },
  { value: '4', label: 'ML modellar' },
];

function Main() {
  return (
    <>
      <main className="main-page">
        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-text fade-in-up">
              <span className="hero-badge">EMG Signal Tahlili</span>
              <h1 className="hero-title">
                Mushak signallarini <span className="hero-gradient">aqlli</span> tahlil qiling
              </h1>
              <p className="hero-description">
                <strong>EMG (Electromyography)</strong> — mushaklarning elektr faoliyatini o&apos;lchaydigan
                bioelektrik signal. Bu platforma signallarni vizual tahlil qilish va mashinaviy
                o&apos;qitish modellarini sinash uchun mo&apos;ljallangan.
              </p>

              <div className="hero-stats">
                {STATS.map((s) => (
                  <div key={s.label} className="hero-stat">
                    <div className="hero-stat-value">{s.value}</div>
                    <div className="hero-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-visual fade-in-up">
              <div className="hero-card">
                <img
                  src="https://www.handtherapyacademy.com/wp-content/uploads/2021/11/Screenshot-2021-11-28-at-12.57.30-PM-600x255.png"
                  alt="Mushak signali ko'rinishi"
                  loading="lazy"
                />
              </div>
              <div className="hero-glow" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section className="features container">
          <div className="features-header">
            <h2>Qo&apos;llanilishi</h2>
            <p>EMG signallari turli sohalarda muhim ahamiyatga ega</p>
          </div>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <article key={f.title} className="feature-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Main;
