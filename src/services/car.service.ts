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

    async getCars(categoryId?: number): Promise<Car[] | null> {
        try {
            const url = categoryId
                ? `${this.BASE_URL}/cars?categoryId=${categoryId}`
                : `${this.BASE_URL}/cars`;
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

    async getReviewsByCarId(carId: number): Promise<Review[] | null> {
        try {
            return (await axios.get<Review[]>(`${this.BASE_URL}/reviews?carId=${carId}`)).data;
        } catch (error) {
            return null;
        }
    }
}