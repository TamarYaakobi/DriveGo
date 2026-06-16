import { useState, type FC } from 'react';
import './CarCard.scss';
import type { Car } from '../../models/car.model';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import type { User } from '../../models/user.model';
import carService from '../../services/car.service';
import { setMessage } from '../../redux/slices/message.slice';
import { deleteFavoriteCar, setFavoriteCar } from '../../redux/slices/favorite.slice';

interface CarCardProps {
  car: Car,
  company?: string,
  category?: string,
  onDelete?: () => void,
  initialLike?: boolean
}

const CarCard: FC<CarCardProps> = ({ car, company, category, onDelete, initialLike }: CarCardProps) => {
  const user = useSelector((state: User) => state.user.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [like, setLike] = useState(initialLike)


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

  const LikeIt = () => {
    if (!like) {
      dispatch(setFavoriteCar(car))
      dispatch(setMessage(
        {
          message: 'הרכב נוסף למועדפים',
          type: 'sucsses'
        }
      ))
    }
    else {
      dispatch(deleteFavoriteCar(car.id))
      dispatch(setMessage(
        {
          message: 'הרכב הוסר מהמועדפים',
          type: 'sucsses'
        }
      ))
    }
    setLike(!like)
  }

  return <div className="CarCard">
    <img src={car.imageUrl}></img>
    <br></br>
    <small>מס מקומות: {car.seats}</small>
    <br></br>
    <small>שנת יצור: {car.year}</small>
    <br></br>
    <small> {company} :חברה</small>
    <br></br>
    <small>קטגוריה: {category} </small>
    <button onClick={() => navigate(`/Cars/${category}/${car.id}`, {
      state: { car, company, category }
    })}>מעבר לפרטים</button>
    {user?.isAdmin && (
      <button onClick={deleteCar}>🗑️</button>
    )}
    <button onClick={LikeIt}>{!like ? '❤️' : '💖'}</button>
  </div>
};

export default CarCard;