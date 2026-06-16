import type { FC } from 'react';
import './ErrorPage.scss';
import { useNavigate } from 'react-router-dom';

interface ErrorProps {}

const ErrorPage: FC<ErrorProps> = () => {
  const navigate = useNavigate();

  return (
    <div className="Error" dir="rtl">
      <div className="error-overlay">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">המסלול לא נמצא</h2>
        <p className="error-message">
          נראה שלקחת פנייה לא נכונה. הדף שחיפשת אינו קייים במערכת או שהועבר לכתובת אחרת.
        </p>
        <button className="back-home-btn" onClick={() => navigate('/')}>
          חזרה למסלול הראשי
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;