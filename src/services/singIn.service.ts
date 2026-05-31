import axios from "axios"
import type { User } from "../models/user.model"

export default new class UserService {
    async getUserByEmail(email: string): Promise<User | null> {
        try {
            const response = await axios.get<User[]>(`http://localhost:3000/users?email=${email}`)
            return response.data[0] || null
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
            const response = await axios.post<User>(`http://localhost:3000/users`, user)
            return response.data
        } catch (error) {
            return null
        }
    }

}