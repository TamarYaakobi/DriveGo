// import { useEffect, useState, type FC } from 'react';
// import './Cars.scss';
// import { Outlet, useParams } from 'react-router-dom';
// import { Car } from '../../models/car.model';
// import carService from '../../services/car.service';
// import CarCard from '../CarCard/CarCard';
// import type { Company } from '../../models/company.model';
// import type { Category } from '../../models/category.model';

// interface CarsProps { }

// const Cars: FC<CarsProps> = () => {

//   const [cars, setCars] = useState<Car[]>([])
//   const [companies, setCompanies] = useState<Company[]>([])
//   const [categories, setCategories] = useState<Category[]>([])

//   const refreshCars = async () => {
//     const response = await carService.getCars()
//     setCars(response || [])
//   }

//   const urlParams = useParams()
//   useEffect(() => {
//     const fetchData = async () => {

//       const responseCompanies = await carService.getCompanies()
//       setCompanies(responseCompanies || [])

//       const responseCategories = await carService.getCategories();
//       setCategories(responseCategories || [])

//       if (urlParams.category) {
//         const categoryId = responseCategories?.find(cat => cat.name === urlParams.category)?.id;
//         let response = await carService.getCars(categoryId)
//         setCars(response || [])
//       }
//       else {
//         let response = await carService.getCars()
//         setCars(response || [])
//       }
//     }
//     fetchData();
//   }, [urlParams.category])

//   return <div className="Cars-page">
//   <div className="Cars">
//     {cars.map((i) =>
//       <CarCard
//         car={i}
//         company={companies?.find(com => com.id === String(i.companyId))?.name}
//         category={categories?.find(cat => cat.id === String(i.categoryId))?.name}
//         onDelete={refreshCars}>
//       </CarCard>
//     )}
//     </div> 
//     <Outlet />
//   </div>
// };

// export default Cars;
import { useEffect, useRef, useState, type FC } from 'react';
import './Cars.scss';
import { Outlet, useParams } from 'react-router-dom';
import { Car } from '../../models/car.model';
import carService from '../../services/car.service';
import CarCard from '../CarCard/CarCard';
import type { Company } from '../../models/company.model';
import type { Category } from '../../models/category.model';

const Cars: FC = () => {
  const [cars, setCars] = useState<Car[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const loaderRef = useRef<HTMLDivElement>(null)
  const urlParams = useParams()

  // איפוס כשמשתנה קטגוריה
  useEffect(() => {
    setCars([])
    setPage(1)
    setHasMore(true)
  }, [urlParams.category])

  // טעינת נתונים
  useEffect(() => {
    const fetchData = async () => {
      const responseCompanies = await carService.getCompanies()
      setCompanies(responseCompanies || [])

      const responseCategories = await carService.getCategories()
      setCategories(responseCategories || [])

      const categoryId = urlParams.category
        ? responseCategories?.find(cat => cat.name === urlParams.category)?.id
        : undefined

      const response = await carService.getCars(categoryId, page, 20)
      if (!response || response.length < 20) setHasMore(false)
      setCars(prev => page === 1 ? (response || []) : [...prev, ...(response || [])])
    }
    fetchData()
  }, [page, urlParams.category])

  // IntersectionObserver
  useEffect(() => {
    if (!loaderRef.current) return
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1)
      }
    })
    observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [hasMore])

  const refreshCars = async () => {
    const categoryId = urlParams.category
      ? categories?.find(cat => cat.name === urlParams.category)?.id
      : undefined
    const response = await carService.getCars(categoryId, 1, page * 20)
    setCars(response || [])
  }

  return (
    <div className="Cars-page">
      <div className="Cars">
        {cars.map((i) =>
          <CarCard
            key={i.id}
            car={i}
            company={companies?.find(com => com.id === String(i.companyId))?.name}
            category={categories?.find(cat => cat.id === String(i.categoryId))?.name}
            onDelete={refreshCars}
          />
        )}
      </div>
      {hasMore && <div ref={loaderRef} style={{ height: '40px' }} />}
      <Outlet />
    </div>
  )
}

export default Cars;