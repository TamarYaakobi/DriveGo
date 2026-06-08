import axios from "axios"
import type { User } from "../models/user.model"

export default new class UserService {
    private readonly BASE_URL = import.meta.env.VITE_API_URL;

    async getUserByEmail(email: string): Promise<User | null> {
        try {
            const response = await axios.get<User[]>(`${this.BASE_URL}/users?email=${email}`)
            return response.data[0] || null
        }
        catch (error) {
            return null
        }
    }

    async getUsers(): Promise<User[] | null> {
        try {
            return (await axios.get<User[]>(`${this.BASE_URL}/users`)).data
        }
        catch (error) {
            return null
        }
    }

    async addUser(user: User): Promise<User | null> {
        try {
            const existingUser = await this.getUserByEmail(user.email)
            if (existingUser != null) {
                return null
            }
            const response = await axios.post<User>(`${this.BASE_URL}/users`, user)
            return response.data
        } catch (error) {
            return null
        }
    }

}