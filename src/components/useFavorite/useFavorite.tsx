import { useState, type FC } from 'react';
import './useFavorite.scss';
import { useDispatch } from 'react-redux';
import type { Car } from '../../models/car.model';
import { deleteFavoriteCar, setFavoriteCar } from '../../redux/slices/favorite.slice';
import { setMessage } from '../../redux/slices/message.slice';

interface useFavoriteProps { }

export const useFavorite = (car: Car, initialLike?: boolean) => {
  const dispatch = useDispatch();
  const [like, setLike] = useState(!!initialLike);

  const toggleLike = () => {
    if (!like) {
      dispatch(setFavoriteCar(car));
      dispatch(setMessage({ message: 'הרכב נוסף למועדפים', type: 'sucsses' }));
    } else {
      dispatch(deleteFavoriteCar(car.id));
      dispatch(setMessage({ message: 'הרכב הוסר מהמועדפים', type: 'sucsses' }));
    }
    setLike(!like);
  };

  return { like, toggleLike };
};