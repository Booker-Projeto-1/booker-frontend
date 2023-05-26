export interface Book {
    id: string,
    title: string,
    authors: Array<string>,
    description: string,
    publisher: string,
    imageLink?: string
}

export interface Ad {
    id: number;
    userEmail: string;
    phoneNumber: string;
    bookId: string;
    description: string;
    active: boolean;
    borrowed: boolean;
    book: Book;
}

export interface Loan {
    id: number;
    lender: string;
    borrower: string;
    bookId: string;
    description: string;
    active: boolean;
    borrowed: boolean;
    book: Book;
}

export interface Books extends Array<Book> {}

export interface Ads extends Array<Ad> {}
