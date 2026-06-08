export class Review {
    public id: string;
    public carId: number;
    public userId: number;
    public description: string;
    public rating: number;

    constructor(
        id: string,
        carId: number,
        userId: number,
        description: string,
        rating: number
    ) {
        this.id = id;
        this.carId = carId;
        this.userId = userId;
        this.description = description;
        this.rating = rating;
    }
}