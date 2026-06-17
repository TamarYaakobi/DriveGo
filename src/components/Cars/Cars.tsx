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
  const [yearRange, setYearRange] = useState<{ min: number, max: number } | null>(null)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [seatsRange, setSeatsRange] = useState<{ min: number, max: number } | null>(null)
  const [selectedSeats, setSelectedSeats] = useState<number | null>(null)


  useEffect(() => {
    const fetchRanges = async () => {
      const categoryId = urlParams.category
        ? categories?.find(cat => cat.nameInEnglish === urlParams.category)?.id
        : undefined

      const [yearR, seatsR] = await Promise.all([
        carService.getYearRange(categoryId),
        carService.getSeatsRange(categoryId)
      ])
      setYearRange(yearR)
      setSeatsRange(seatsR)
    }
    if (categories.length) fetchRanges()
  }, [urlParams.category, categories])

  useEffect(() => {
    setCars([])
    setPage(1)
    setHasMore(true)
  }, [urlParams.category])

  useEffect(() => {
    const fetchData = async () => {
      const responseCompanies = await carService.getCompanies()
      setCompanies(responseCompanies || [])

      const responseCategories = await carService.getCategories()
      setCategories(responseCategories || [])

      const categoryId = urlParams.category
        ? responseCategories?.find(cat => cat.nameInEnglish === urlParams.category)?.id
        : undefined

      const response = await carService.getCars(categoryId, page, 20)
      if (!response || response.length < 20) setHasMore(false)
      setCars(prev => page === 1 ? (response || []) : [...prev, ...(response || [])])
    }
    fetchData()
  }, [page, urlParams.category])

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
      ? categories?.find(cat => cat.nameInEnglish === urlParams.category)?.id
      : undefined
    const response = await carService.getCars(categoryId, 1, page * 20)
    setCars(response || [])
  }

  const handleFilterChange = async (newYear: number | null, newSeats: number | null) => {
    setSelectedYear(newYear)
    setSelectedSeats(newSeats)

    const categoryId = urlParams.category
      ? categories?.find(cat => cat.nameInEnglish === urlParams.category)?.id
      : undefined

    const filteredCars = await carService.getFilteredCars(
      categoryId,
      newYear ?? undefined,
      newSeats ?? undefined
    )
    setCars(filteredCars || [])
    setHasMore(false)
  }

  const getSliderBackground = (range: { min: number, max: number } | null, value: number | null) => {
    if (!range) return undefined;
    const current = value ?? range.min;
    const total = range.max - range.min;

    const percentage = total > 0 ? ((current - range.min) / total) * 100 : 0;

    return `linear-gradient(to right, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.1) ${percentage}%, #d4af37 ${percentage}%, #d4af37 100%)`;
  };
  return (
    <div className="Cars-page">
      <div className="filter-sidebar">
        {yearRange && (
          <div className="year-filter">
            <input
              type='range'
              min={yearRange.min}
              max={yearRange.max}
              value={selectedYear ?? yearRange.min}
              onChange={(e) => handleFilterChange(Number(e.target.value), selectedSeats)}
              className="year-filter__slider"
              style={{ background: getSliderBackground(yearRange, selectedYear) }}
            />
          </div>
        )}

        {seatsRange && (
          <div className="seats-filter">
            <input
              type='range'
              min={seatsRange.min}
              max={seatsRange.max}
              value={selectedSeats ?? seatsRange.min}
              onChange={(e) => handleFilterChange(selectedYear, Number(e.target.value))}
              className="seats-filter__slider"
              style={{ background: getSliderBackground(seatsRange, selectedSeats) }}
            />
          </div>
        )}

        {(selectedYear || selectedSeats) && (
          <p className="year-filter__current">
            {selectedYear && `משנת ${selectedYear} ומעלה`}
            {selectedYear && selectedSeats && ' · '}
            {selectedSeats && `${selectedSeats} מושבים ומעלה`}
          </p>
        )}
        {/* כאן בעתיד תוכלי להוסיף את הקומפוננטה של סינון המושבים והם ישבו מושלם אחד תחת השני */}
      </div>

      <div className="Cars">
        {cars.map((i) =>
          <CarCard
            key={i.id}
            car={i}
            company={companies?.find(com => com.id === String(i.companyId))?.name}
            category={categories?.find(cat => cat.id === String(i.categoryId))}
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