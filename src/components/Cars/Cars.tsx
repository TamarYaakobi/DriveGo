import { useEffect, useState, type FC } from 'react';
import './Cars.scss';
import { useParams } from 'react-router-dom';
import { Car } from '../../models/car.model';
import carService from '../../services/car.service';

interface CarsProps { }

const Cars: FC<CarsProps> = () => {

  const [cars, setCars] = useState<Car[]>([])
  const urlParams = useParams()
  useEffect(() => {
    const fetchData = async () => {
      if (urlParams.category) {
        const categories = await carService.getCategories();
        const categoryId = categories?.find(cat => cat.name === urlParams.category)?.id;
        let response = await carService.getCars(Number(categoryId))
        setCars(response || [])
      }
      else {
        let response = await carService.getCars()
        setCars(response || [])
      }
    }
    fetchData();
  }, [urlParams.category])

  return <div className="Cars">
    Cars Component
  </div>
};

export default Cars;
