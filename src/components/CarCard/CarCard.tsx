import { useState, type FC } from 'react';
import './CarCard.scss';
import type { Car } from '../../models/car.model';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import type { User } from '../../models/user.model';
import carService from '../../services/car.service';
import { setMessage } from '../../redux/slices/message.slice';
import { useFavorite } from '../../hooks/useFavorite/useFavorite';
import type { Category } from '../../models/category.model';

interface CarCardProps {
  car: Car,
  company?: string,
  category?: Category,
  onDelete?: () => void,
  initialLike?: boolean
}

const CarCard: FC<CarCardProps> = ({ car, company, category, onDelete, initialLike }: CarCardProps) => {
  const user = useSelector((state: User) => state.user.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { like, toggleLike } = useFavorite(car, initialLike);

  const deleteCar = async () => {
    const response = await carService.deleteCar(car.id!);
    if (!response) {
      dispatch(setMessage({
        message: 'המחיקה נכשלה',
        type: 'error'
      }))
    }
    else {
      onDelete?.()
    }
  }
const categoryUrlSegment = category?.nameInEnglish || "all";
  // const safeCategory = (category && category.nameInEnglish !== 'undefined') ? category.nameInEnglish : "all";
  const safeCompany = (company && company !== 'undefined') ? company : "general";

  return <div className="CarCard">
    <img src={car.imageUrl}></img>
    <br></br>
    <small>מס מקומות: {car.seats}</small>
    <br></br>
    <small>שנת יצור: {car.year}</small>
    <br></br>
    <small> {company} :חברה</small>
    <br></br>
    <small>קטגוריה: {category?.name} </small>
    <button onClick={() => navigate(`/Cars/${categoryUrlSegment}/${car.id}`, {
  state: { car, company: safeCompany, category }
    })}>מעבר לפרטים</button>
    {user?.isAdmin && (
      <button className="admin-delete-btn" onClick={deleteCar}>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
        </svg>
      </button>
    )}
    <button className={`like-btn ${like ? 'is-liked' : ''}`} onClick={toggleLike}>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.5 3 21 5.42 21 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>
  </div>
};

export default CarCard;