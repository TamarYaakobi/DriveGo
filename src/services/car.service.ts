import axios from "axios"
import type { Category } from "../models/category.model"
import type { Car } from "../models/car.model";
import type { Company } from "../models/company.model";
import type { Review } from "../models/review.model";

export default new class CarService {
    private readonly BASE_URL = import.meta.env.VITE_API_URL;

    async getCategories(): Promise<Category[] | null> {
        try {
            return (await axios.get<Category[]>(`${this.BASE_URL}/categories`)).data;
        } catch (error) {
            return null;
        }
    }

    async getCars(categoryId?: string, page: number = 1, limit: number = 20): Promise<Car[] | null> {
        try {
            let url = `${this.BASE_URL}/cars?_page=${page}&_limit=${limit}`
            if (categoryId) url += `&categoryId=${categoryId}`
            return (await axios.get<Car[]>(url)).data;
        } catch (error) {
            return null;
        }
    }

    async getCompanies(): Promise<Company[] | null> {
        try {
            return (await axios.get<Company[]>(`${this.BASE_URL}/companies`)).data;
        } catch (error) {
            return null;
        }
    }

    async getReviewsByCarId(carId: string): Promise<Review[] | null> {
        try {
            return (await axios.get<Review[]>(`${this.BASE_URL}/reviews?carId=${carId}`)).data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async addCar(car: Car): Promise<Car | null> {
        try {
            return (await axios.post<Car>(`${this.BASE_URL}/cars`, car)).data;
        } catch (error) {
            return null;
        }
    }

    async deleteCar(carId: string): Promise<boolean> {
        try {
            await axios.delete(`${this.BASE_URL}/cars/${carId}`);
            return true
        } catch (error) {
            return false;
        }
    }

    async addReview(review: Review): Promise<Review | null> {
        try {
            return (await axios.post<Review>(`${this.BASE_URL}/reviews`, review)).data;
        } catch (error) {
            return null;
        }
    }

    async deleteReview(reviewId: string): Promise<boolean> {
        try {
            await axios.delete(`${this.BASE_URL}/reviews/${reviewId}`);
            return true
        } catch (error) {
            return false;
        }
    }

    async getYearRange(categoryId?: string): Promise<{ min: number, max: number } | null> {
        try {
            let base = `${this.BASE_URL}/cars`
            if (categoryId) base += `?categoryId=${categoryId}`
            const sep = categoryId ? '&' : '?'

            const [minRes, maxRes] = await Promise.all([
                axios.get<Car[]>(`${base}${sep}_sort=year&_order=asc&_limit=1`),
                axios.get<Car[]>(`${base}${sep}_sort=year&_order=desc&_limit=1`)
            ])

            return {
                min: minRes.data[0]?.year,
                max: maxRes.data[0]?.year
            }
        } catch (error) {
            return null
        }
    }

    async getSeatsRange(categoryId?: string): Promise<{ min: number, max: number } | null> {
        try {
            let base = `${this.BASE_URL}/cars`
            if (categoryId) base += `?categoryId=${categoryId}`
            const sep = categoryId ? '&' : '?'

            const [minRes, maxRes] = await Promise.all([
                axios.get<Car[]>(`${base}${sep}_sort=seats&_order=asc&_limit=1`),
                axios.get<Car[]>(`${base}${sep}_sort=seats&_order=desc&_limit=1`)
            ])

            return {
                min: minRes.data[0]?.seats,
                max: maxRes.data[0]?.seats
            }
        } catch (error) {
            return null
        }
    }

    async getFilteredCars(categoryId?: string, year?: number, seats?: number): Promise<Car[] | null> {
        try {
            let url = `${this.BASE_URL}/cars?`
            const params: string[] = []

            if (categoryId) params.push(`categoryId=${categoryId}`)
            if (year) params.push(`year_gte=${year}`)
            if (seats) params.push(`seats_gte=${seats}`)

            url += params.join('&')
            return (await axios.get<Car[]>(url)).data;
        } catch (error) {
            return null;
        }
    }

}