import axios from "axios"
import type { Category } from "../models/category.model"
import type { Car } from "../models/car.model";

export default new class CarService {
    private readonly BASE_URL = import.meta.env.VITE_API_URL;
    
    async getCategories(): Promise<Category[] | null> {
        try {
            return (await axios.get<Category[]>(`${this.BASE_URL}`)).data;
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
}