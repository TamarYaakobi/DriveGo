export class User {
    id?: string;
    firstName: string;
    lastName: string;
    idNumber: string;
    email: string;
    password: string;
    isAdmin: boolean;

    constructor(
        firstName: string,
        lastName: string,
        idNumber: string,
        email: string,
        password: string,
        isAdmin: boolean = false
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.idNumber = idNumber;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }
}