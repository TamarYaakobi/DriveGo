import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';

interface HomeProps { }

const Home: FC<HomeProps> = () => {
  const navigate = useNavigate();

  const featuredCategories = [
    {
      id: '1',
      name: 'רכב אטרקציות',
      img: 'https://www.asfir.co.il/cdn/shop/articles/front-bar-547006-_1__optimized.jpg?v=1771413066'
    },
    {
      id: '2',
      name: 'רכבי אספנות',
      img: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '3',
      name: 'רכבי יוקרה',
      img: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
  ];

  return (
    <div className="Home" dir="rtl">
      <section className="hero-section">
        <div className="video-overlay"></div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="bg-video"
          src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054ba274ee7b0dd79dd69cc5a7b6e9b&profile_id=165&oauth2_token_id=57447761"
        />

        <div className="hero-content">
          <div className="logo-container">
            <img src="/public/logo_without_back.png" alt="Drive Go" className="hero-main-logo" />
          </div>
          <h2 className="main-headline">אל תסתפק בנסיעה. תבחר בחוויה.</h2>
          <p className="sub-headline">חוויית הנהיגה האולטימטיבית מחכה לך עם צי הרכבים המובחר בישראל.</p>
          <button className="cta-button" onClick={() => navigate('/Cars')}>
            לצפייה בקולקציה
          </button>
        </div>

        <div className="scroll-down-hint" onClick={() => {
          document.querySelector('.features-section')?.scrollIntoView({ behavior: 'smooth' });
        }}>
          <span className="arrow">↓</span>
        </div>
      </section>

      <section className="features-section container">
        <div className="section-header">
          <h3>הסטנדרט שלנו</h3>
          <div className="gold-divider"></div>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💎</div>
            <h4>חווית פרימיום</h4>
            <p>רכבים מוקפדים, נקיים ומתוחזקים ברמה הגבוהה ביותר בשוק.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h4>זמינות מיידית</h4>
            <p>תהליך הזמנה דיגיטלי ומהיר ללא בירוקרטיה מיותרת.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h4>ביטחון מלא</h4>
            <p>כיסוי ביטוחי מקיף ושירות לקוחות אישי הזמין עבורך 24/7.</p>
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="section-header">
          <h3>הקטגוריות שלנו</h3>
          <div className="gold-divider"></div>
        </div>
        <div className="categories-grid container">
          {featuredCategories.map(cat => (
            <div
              key={cat.id}
              className="category-card"
              onClick={() => navigate(`/Cars/${cat.name}`)}
              style={{ backgroundImage: `url(${cat.img})` }}
            >
              <div className="category-overlay">
                <h4>{cat.name}</h4>
                <span className="discover-more">גלה עוד ←</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact-section" className="footer-cta">
        <h3>מוכנים להתחיל את החוויה?</h3>
        <p>הירשמו עכשיו וקבלו גישה מיידית לצי הרכבים האקסקלוסיבי שלנו.</p>

        <div className="cta-actions">
          <button className="btn-primary-gold" onClick={() => navigate('/SignUp')}>הרשמה מהירה</button>
          <button className="btn-secondary-outline" onClick={() => navigate('/AboutUs')}>קראו עלינו</button>
        </div>

        <div className="footer-bottom-links">
          
          {/* בלוק פרטי קשר יוקרתי - גלוי ישירות בדף */}
          <div className="visible-contact-info">
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <span className="contact-text">050-1234567</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📬</span>
              <span className="contact-text">info@drivego.co.il</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span className="contact-text">א׳-ה׳ 09:00 - 18:00</span>
            </div>
          </div>

          <span className="link-separator">|</span>

          {/* תנאי שימוש - נשאר בתוך Tooltip אלגנטי */}
          <div className="tooltip-container">
            <span className="tooltip-trigger">📜 תנאי שימוש</span>
            <div className="custom-tooltip wide-tooltip">
              <p>• השכרת הרכב מותנית בהצגת רישיון נהיגה בתוקף של שנתיים לפחות.</p>
              <p>• גיל מינימלי להזמנת רכבי יוקרה ואטרקציות: 24.</p>
              <p>• אישור סופי של ההזמנה כפוף לחתימה על חוזה השכירות הדיגיטלי.</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;