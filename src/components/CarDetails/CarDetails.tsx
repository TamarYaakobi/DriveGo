import { useEffect, useState, type FC } from 'react';
import './CarDetails.scss';
import type { Car } from '../../models/car.model';
import type { Review } from '../../models/review.model';
import carService from '../../services/car.service';
import type { User } from '../../models/user.model';
import userService from '../../services/user.service';
import { useLocation } from 'react-router-dom';

interface CarDetailsProps {
}

const CarDetails: FC<CarDetailsProps> = () => {

  const location = useLocation();
  const { car, company, category } = location.state;
  const [reviews, setReviews] = useState<Review[]>([])
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const responceReviews = await carService.getReviewsByCarId(Number(car.id))
      setReviews(responceReviews || [])

      const responceUsers = await userService.getUsers()
      setUsers(responceUsers || [])
    }
    fetchData()
  }, [])

  return <div className="CarDetails">
    <img src={car.imageUrl}></img>
    <br></br>
    <small>מס מקומות: {car.seats}</small>
    <br></br>
    <small>שנת יצור: {car.year}</small>
    <br></br>
    <small> {company} :חברה</small>
    <br></br>
    <small>קטגוריה: {category} </small>
    <br></br>
    <small> {car.description}</small>
    <br></br>
    <br></br>

    {reviews.map((i) =>
      <>
        <small>{users?.find(user => Number(user.id) === i.userId)?.name}</small>
        <br></br>

        <small>{i.description}</small>
        <br></br>
        <div className="rating">
          <span className="rating__stars"></span>
          <div className="rating__number">
            <span className="rating__score" >{i.rating}</span>
            <span className="rating__reviews">(1346)</span>
          </div>
        </div>
      </>
    )}
  </div>
};

export default CarDetails;
