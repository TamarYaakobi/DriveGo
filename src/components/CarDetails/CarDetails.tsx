import { useEffect, useMemo, useState, useRef, type FC } from 'react';
import './CarDetails.scss';
import type { Car } from '../../models/car.model';
import type { Review } from '../../models/review.model';
import carService from '../../services/car.service';
import type { User } from '../../models/user.model';
import userService from '../../services/user.service';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { setMessage } from '../../redux/slices/message.slice';

interface StarRatingProps {
  rating: number;
}

const StarRating: FC<StarRatingProps> = ({ rating }) => {
  return (
    <div className="star-rating-container">
      {[1, 2, 3, 4, 5].map((starIndex) => {
        let fillPercentage = 0;
        if (rating >= starIndex) {
          fillPercentage = 100;
        } else if (rating > starIndex - 1) {
          fillPercentage = (rating - (starIndex - 1)) * 100;
        }

        return (
          <div key={starIndex} className="star-wrapper">
            <svg className="star-empty" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>

            <svg
              className="star-filled"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={{ clipPath: `inset(0 0 0 ${100 - fillPercentage}%)` }}
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

interface CarDetailsProps { }

const CarDetails: FC<CarDetailsProps> = () => {
  const user = useSelector((state: User) => state.user.user)
  const location = useLocation();
  const dispatch = useDispatch()
  const { car, company, category } = location.state;
  const [reviews, setReviews] = useState<Review[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [isAdd, setIsAdd] = useState(false)

  const formRef = useRef<HTMLDivElement>(null);

  const myForm = useFormik({
    initialValues: {
      description: '',
      rating: ''
    },
    onSubmit: async (value: any) => {
      const review: Review = {
        carId: car.id,
        userId: user.id,
        description: value.description,
        rating: Number(value.rating) 
      }

      let isReview = reviews?.find(r => r.userId === review.userId && r.carId === review.carId);
      if (!isReview) {
        await carService.addReview(review)
        const updatedReviews = await carService.getReviewsByCarId(car.id)
        setReviews(updatedReviews || [])
        setIsAdd(false)
        myForm.resetForm();
      }
      else {
        dispatch(setMessage({
          message: 'אינך יכול להוסיף חוות דעת נוספת ',
          type: 'error'
        }))
      }
    },
    validationSchema: yup.object().shape({
      description: yup.string().required('שדה חובה'),
      rating: yup.number()
        .min(1, 'מינימום 1')
        .max(5, 'מקסימום 5')
        .required('שדה חובה')
    })
  })

  useEffect(() => {
    const fetchData = async () => {
      const responseReviews = await carService.getReviewsByCarId(car.id)
      setReviews(responseReviews || [])

      const responseUsers = await userService.getUsers()
      setUsers(responseUsers || [])
    }
    fetchData()
  }, [car.id])

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / reviews.length;
  }, [reviews])

  const deleteReview = async (reviewId: string) => {
    const responseReviews = await carService.deleteReview(reviewId)
    if (!responseReviews) {
      dispatch(setMessage({
        message: ' חוות הדעת לא נמחקה ',
        type: 'error'
      }))
    }
    else {
      const updatedReviews = await carService.getReviewsByCarId(car.id)
      setReviews(updatedReviews || [])
    }
  }

  const handleOpenForm = () => {
    setIsAdd(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  return <div className="CarDetails">
    <img src={car.imageUrl} alt="Car"></img>
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

    {user && !user.isAdmin && (
      <button className="add-review-btn-elegant" onClick={handleOpenForm}>
        <span>＋</span> הוספת חוות דעת
      </button>
    )}

    <div className="average-rating">
      <span>דירוג ממוצע: </span>
      <StarRating rating={averageRating} />
      <span>({averageRating.toFixed(1)})</span>
    </div>

    {reviews.map((i) =>
      <div key={i.id}>
        <br></br>
        <small></small>
        <div className="rating">
          <span className="rating__stars"></span>
          <div className="rating__number">
            <div className="user-stars-wrapper">
              <StarRating rating={i.rating} />
            </div>
            <span className="rating__reviews">{users?.find(user => (user.id) === i.userId)?.firstName}</span>
            <span className="rating__score">{i.description}</span>
          </div>
          {user && user.id === i.userId && <button onClick={() => deleteReview(i.id!)}>🗑️</button>}
        </div>
      </div>
    )}

    <div ref={formRef}>
      {isAdd && <>
        <form onSubmit={myForm.handleSubmit}>
          <div className="form-group">
            <label htmlFor="description">הכנס חוות דעת</label>
            <input onChange={myForm.handleChange} value={myForm.values.description} type="text" className="form-control" name="description" id="description" />
            {myForm.errors.description && <p>{myForm.errors.description as string}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="rating">נקד אותנו</label>
            <input
              onChange={myForm.handleChange}
              value={myForm.values.rating}
              type="number"
              className="form-control"
              name="rating"
              id="rating"
              min={1}
              max={5}
              step="0.1"
            />
            {myForm.errors.rating && <p>{myForm.errors.rating as string}</p>}
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </>}
    </div>
  </div>
};

export default CarDetails;