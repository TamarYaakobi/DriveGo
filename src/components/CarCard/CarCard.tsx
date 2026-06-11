import { type FC } from 'react';
import './CarCard.scss';
import type { Car } from '../../models/car.model';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import type { User } from '../../models/user.model';
import carService from '../../services/car.service';
import { setMessage } from '../../redux/slices/massage.slice';

interface CarCardProps {
  car: Car,
  company?: string,
  category?: string,
  onDelete?: () => void
}

const CarCard: FC<CarCardProps> = ({ car, company, category,onDelete }: CarCardProps) => {
  const user = useSelector((state: User) => state.user.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const deleteCar = async () => {
    const response = await carService.deleteCar(car.id!);
    if (!response) {
      dispatch(setMessage({
        massage: 'המחיקה נכשלה',
        type: 'error'
      }))
    }
    else {
      onDelete?.()
    }
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
</div>
};

export default CarCard;
