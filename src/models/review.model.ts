export class Review {
    public id?: string;
    public carId: string;
    public userId: string;
    public description: string;
    public rating: number;

    constructor(
        carId: string,
        userId: string,
        description: string,
        rating: number
    ) {
        this.carId = carId;
        this.userId = userId;
        this.description = description;
        this.rating = rating;
    }
}