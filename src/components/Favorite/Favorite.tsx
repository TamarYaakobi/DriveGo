import type { FC } from 'react';
import './Favorite.scss';
import { useSelector } from 'react-redux';
import type { Car } from '../../models/car.model';
import CarCard from '../CarCard/CarCard';

const Favorite: FC = () => {
  const favoriteCar = useSelector((state: any) => state.favorite.favoriteCar)

  return (
    <div className="Favorite" dir="rtl">
      {favoriteCar.length === 0
        ? (
          <div className="empty-favorites">
            <div className="heart-icon">❤️</div>
            <h3>המוסך המועדף שלך ריק</h3>
            <p>עדיין לא סימנת אף רכב. לחץ על סימן הלב ברכבים שאהבת כדי לשמור אותם כאן לגישה מהירה.</p>
          </div>
        )
        : (
          <div className="favorites-container">
            <div className="favorites-header-section">
              <h2 className="favorites-main-title">המועדפים שלי</h2>
              <div className="gold-separator"></div>
            </div>

            <div className="Cars">
              {favoriteCar.map((car: Car) =>
                <CarCard
                  key={car.id}
                  car={car}
                  onDelete={() => { }}
                  initialLike={true}
                />
              )}
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Favorite;