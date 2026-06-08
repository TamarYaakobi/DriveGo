import { type FC } from 'react';
import './CarCard.scss';
import type { Car } from '../../models/car.model';
import { useNavigate } from 'react-router';

interface CarCardProps {
  car: Car,
  company?: string,
  category?: string
}

const CarCard: FC<CarCardProps> = ({ car, company, category }: CarCardProps) => {
  const navigate = useNavigate()
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
  </div>
};

export default CarCard;
