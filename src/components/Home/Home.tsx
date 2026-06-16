// import { type FC } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Home.scss';

// interface HomeProps {}

// const Home: FC<HomeProps> = () => {
//   const navigate = useNavigate();

//   // נתונים סטטיים זמניים לתצוגת קטגוריות מרשימה בדף הבית
//   const featuredCategories = [
//     { id: 1, name: 'ספורט', img: 'https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
//     { id: 2, name: 'יוקרה', img: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
//     { id: 3, name: 'שטח / SUV', img: 'https://images.pexels.com/photos/977003/pexels-photo-977003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
//   ];

//   return (
//     <div className="Home" dir="rtl">
//       {/* אגף ה-Hero: וידאו רקע וטקסט מעורר השראה */}
//       <section className="hero-section">
//         <div className="video-overlay"></div>
//         <video 
//           autoPlay 
//           loop 
//           muted 
//           playsInline 
//           className="bg-video"
//           src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054ba274ee7b0dd79dd69cc5a7b6e9b&profile_id=165&oauth2_token_id=57447761" // וידאו רכב יוקרה לדוגמה
//         />
        
//         <div className="hero-content">
//           <div className="logo-container">
//             {/* כאן תוכלי לשים את הנתיב האמיתי של הלוגו שלך, כרגע נשים פלייסהולדר יוקרתי */}
//             <h1 className="brand-title">Drive Go</h1>
//             <p className="brand-subtitle">- Drive the experience -</p>
//           </div>
//           <h2 className="main-headline">אל תסתפק בנסיעה. תבחר בחוויה.</h2>
//           <p className="sub-headline">חוויית הנהיגה האולטימטיבית מחכה לך עם נבחרת רכבי היוקרה המובילה בישראל.</p>
//           <button className="cta-button" onClick={() => navigate('/Cars')}>
//             לצפייה בקולקציה
//           </button>
//         </div>
//       </section>

//       {/* אגף למה אנחנו? (יתרונות) */}
//       <section className="features-section container">
//         <div className="section-header">
//           <h3>הסטנדרט שלנו</h3>
//           <div className="gold-divider"></div>
//         </div>
//         <div className="features-grid">
//           <div className="feature-card">
//             <div className="feature-icon">💎</div>
//             <h4>חווית פרימיום</h4>
//             <p>רכבים מוקפדים, נקיים ומתוחזקים ברמה הגבוהה ביותר בשוק.</p>
//           </div>
//           <div className="feature-card">
//             <div className="feature-icon">⚡</div>
//             <h4>זמינות מיידית</h4>
//             <p>תהליך הזמנה דיגיטלי ומהיר ללא בירוקרטיה מיותרת.</p>
//           </div>
//           <div className="feature-card">
//             <div className="feature-icon">🛡️</div>
//             <h4>ביטחון מלא</h4>
//             <p>כיסוי ביטוחי מקיף ושירות לקוחות אישי הזמין עבורך 24/7.</p>
//           </div>
//         </div>
//       </section>

//       {/* אגף קטגוריות חמות */}
//       <section className="categories-section">
//         <div className="section-header">
//           <h3>הקטגוריות המובילות</h3>
//           <div className="gold-divider"></div>
//         </div>
//         <div className="categories-grid container">
//           {featuredCategories.map(cat => (
//             <div 
//               key={cat.id} 
//               className="category-card"
//               onClick={() => navigate(`/Cars/${cat.name}`)}
//               style={{ backgroundImage: `url(${cat.img})` }}
//             >
//               <div className="category-overlay">
//                 <h4>{cat.name}</h4>
//                 <span className="discover-more">גלה עוד ←</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* פוטר מהיר / הנעה לפעולה סופית */}
//       <section className="footer-cta">
//         <h3>מוכנים להתחיל את החוויה?</h3>
//         <p>הירשמו עכשיו וקבלו גישה מיידית לצי הרכבים האקסקלוסיבי שלנו.</p>
//         <div className="cta-actions">
//           <button className="btn-primary-gold" onClick={() => navigate('/SignUp')}>הרשמה מהירה</button>
//           <button className="btn-secondary-outline" onClick={() => navigate('/AboutUs')}>קראו עלינו</button>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;
import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const navigate = useNavigate();

  // עדכון הקטגוריות המדויקות של הפרויקט עם תמונות מתאימות
  const featuredCategories = [
    { 
      id: '1', 
      name: 'רכב אטרקציות', 
      img: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' // רכב ספורט/חוויה צהוב ומרשים
    },
    { 
      id: '2', 
      name: 'רכבי אספנות', 
      img: 'https://images.pexels.com/photos/831413/pexels-photo-831413.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' // רכב קלאסי נוסטלגי ויוקרתי
    },
    { 
      id: '3', 
      name: 'רכבי יוקרה', 
      img: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' // מרצדס שחורה קלאסית
    },
  ];

  return (
    <div className="Home" dir="rtl">
      {/* אגף ה-Hero */}
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
            <h1 className="brand-title">Drive Go</h1>
            <p className="brand-subtitle">- Drive the experience -</p>
          </div>
          <h2 className="main-headline">אל תסתפק בנסיעה. תבחר בחוויה.</h2>
          <p className="sub-headline">חוויית הנהיגה האולטימטיבית מחכה לך עם צי הרכבים המובחר בישראל.</p>
          <button className="cta-button" onClick={() => navigate('/Cars')}>
            לצפייה בקולקציה
          </button>
        </div>
      </section>

      {/* אגף הסטנדרט שלנו */}
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

      {/* אגף קטגוריות מעודכן */}
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

      {/* אגף צור קשר ותנאים חדש ומורחב */}
      <section id="contact-section" className="footer-cta">
        <h3>מוכנים להתחיל את החוויה?</h3>
        <p>הירשמו עכשיו וקבלו גישה מיידית לצי הרכבים האקסקלוסיבי שלנו.</p>
        
        <div className="cta-actions">
          <button className="btn-primary-gold" onClick={() => navigate('/SignUp')}>הרשמה מהירה</button>
          <button className="btn-secondary-outline" onClick={() => navigate('/AboutUs')}>קראו עלינו</button>
        </div>

        {/* חלק תחתון מיוחד עם הודעות צצות (Tooltips) בלי אלרטים */}
        <div className="footer-bottom-links">
          
          <div className="tooltip-container">
            <span className="tooltip-trigger">📞 צור קשר</span>
            <div className="custom-tooltip">
              <p>📬 מייל: info@drivego.co.il</p>
              <p>📱 טלפון: 050-1234567</p>
              <p>📍 שעות פעילות: 09:00 - 18:00</p>
            </div>
          </div>

          <span className="link-separator">|</span>

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