import axios from "axios"
import type { Category } from "../models/category.model"
import type { Car } from "../models/car.model";

export default new class CarService {
    async getCategories(): Promise<Category[] | null> {
        try {
            return (await axios.get<Category[]>(`http://localhost:3000/categories`)).data;
        } catch (error) {
            return null;
        }
    }

    async getCars(categoryId?: number): Promise<Car[] | null> {
        try {
            const url = categoryId
                ? `http://localhost:3000/cars?categoryId=${categoryId}`
                : `http://localhost:3000/cars`;
            return (await axios.get<Car[]>(url)).data;
        } catch (error) {
            return null;
        }
    }
}