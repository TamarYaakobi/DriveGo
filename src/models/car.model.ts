export class Car {
    public id: string;
    public categoryId: number;
    public companyId: number;
    public seats: number;
    public description: string;
    public year: number;
    public imageUrl: string;

    constructor(
        id: string,
        categoryId: number,
        companyId: number,
        seats: number,
        description: string,
        year: number,
        imageUrl: string
    ) {
        this.id = id;
        this.categoryId = categoryId;
        this.companyId = companyId;
        this.seats = seats;
        this.description = description;
        this.year = year;
        this.imageUrl = imageUrl;
    }
}