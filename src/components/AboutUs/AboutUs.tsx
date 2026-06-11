// import type { FC } from 'react';
// import './AboutUs.scss';

// interface AboutUsProps {}

// const AboutUs: FC<AboutUsProps> = () => (
//   <div className="AboutUs">
//     AboutUs Component
//   </div>
// );

// export default AboutUs;
import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutUs.scss';

interface AboutUsProps {}

const AboutUs: FC<AboutUsProps> = () => {
  const navigate = useNavigate();

  return (
    <div className="AboutUs" dir="rtl">
      {/* כותרת הדף העליונה עם תמונת רקע דרמטית */}
      <section className="about-hero">
        <div className="hero-overlay"></div>
        <div className="hero-text">
          <h1>הסיפור שלנו</h1>
          <p className="gold-subtitle">Drive Go — מגדירים מחדש את חווית הנסיעה</p>
        </div>
      </section>

      {/* חלק 1: החזון והרעיון מאחורי המותג */}
      <section className="story-section container">
        <div className="story-grid">
          <div className="story-content">
            <span className="section-tag">מאז ועד היום</span>
            <h2>איך הכל התחיל?</h2>
            <div className="gold-line"></div>
            <p>
              חברת <strong>Drive Go</strong> נולדה מתוך תשוקה אמיתית להגה, לעיצוב עוצר נשימה ולחוויית נהיגה אקסקלוסיבית. 
              הבנו שלפעמים נסיעה היא לא רק הגעה מיעד א' ליעד ב' – היא הדרך, הריגוש והזיכרון שנשאר איתך.
            </p>
            <p>
              הקמנו את החברה במטרה להנגיש את רכבי העילית והספורט המובילים בעולם, 
              תוך שמירה על סטנדרט שירות אירופאי קפדני, דיסקרטיות מלאה וחווית לקוח חסרת פשרות.
            </p>
          </div>
          <div className="story-image">
            <img 
              src="https://images.pexels.com/photos/3136673/pexels-photo-3136673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Drive Go Luxury Interior" 
            />
          </div>
        </div>
      </section>

      {/* חלק 2: האני מאמין שלנו / ערכי המותג */}
      <section className="values-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>הערכים שמובילים אותנו</h2>
            <div className="gold-divider"></div>
          </div>
          
          <div className="values-grid">
            <div className="value-card">
              <div className="value-number">01</div>
              <h3>איכות ללא פשרות</h3>
              <p>כל רכב בצי שלנו עובר בדיקות קפדניות, טיפולים שוטפים והכנה ברמת מצב תצוגה לפני שהוא מגיע אליך.</p>
            </div>
            
            <div className="value-card">
              <div className="value-number">02</div>
              <h3>שירות בגובה העיניים</h3>
              <p>ליווי אישי ומסור מרגע ההתעניינות ועד להחזרת המפתח. היוקרה היא במוצר, המשפחתיות היא בשירות.</p>
            </div>
            
            <div className="value-card">
              <div className="value-number">03</div>
              <h3>שקיפות ואמינות</h3>
              <p>בלי אותיות קטנות ובלי הפתעות. הכל ברור, מתומחר בצורה הוגנת ומותאם בדיוק לצרכים והשאיפות שלך.</p>
            </div>
          </div>
        </div>
      </section>

      {/* חלק 3: הנעה לפעולה לקטלוג */}
      <section className="about-cta text-center">
        <h2>הגה החלומות שלך במרחק קליק אחד</h2>
        <p>נבחרת רכבי הפרימיום שלנו מחכה לעורר בך השראה.</p>
        <button className="gold-btn" onClick={() => navigate('/Cars')}>
          לצפייה בצי הרכבים שלנו
        </button>
      </section>
    </div>
  );
};

export default AboutUs;