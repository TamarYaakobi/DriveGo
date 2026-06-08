import { useEffect, useState, type FC } from 'react';
import './Cars.scss';
import { Outlet, useParams } from 'react-router-dom';
import { Car } from '../../models/car.model';
import carService from '../../services/car.service';
import CarCard from '../CarCard/CarCard';
import type { Company } from '../../models/company.model';
import type { Category } from '../../models/category.model';

interface CarsProps { }

const Cars: FC<CarsProps> = () => {

  const [cars, setCars] = useState<Car[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  const urlParams = useParams()
  useEffect(() => {
    const fetchData = async () => {

      const responceCompanies = await carService.getCompanies()
      setCompanies(responceCompanies || [])

      const responceCategories = await carService.getCategories();
      setCategories(responceCategories || [])

      if (urlParams.category) {
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
    {cars.map((i) =>
      <CarCard
        car={i}
        company={companies?.find(com => Number(com.id) === i.companyId)?.name}
        category={categories?.find(cat => Number(cat.id) === i.categoryId)?.name}>
      </CarCard>
    )}
    <Outlet />
  </div>
};

export default Cars;
