export class Car {
    public id?: string;
    public categoryId: string;
    public companyId: string;
    public seats: number;
    public description: string;
    public year: number;
    public imageUrl: string;

    constructor(
        categoryId: string,
        companyId: string,
        seats: number,
        description: string,
        year: number,
        imageUrl: string
    ) {
        this.categoryId = categoryId;
        this.companyId = companyId;
        this.seats = seats;
        this.description = description;
        this.year = year;
        this.imageUrl = imageUrl;
    }
}