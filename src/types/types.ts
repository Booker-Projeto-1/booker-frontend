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
    userFullName: string;
    phoneNumber: string;
    bookId: string;
    description: string;
    active: boolean;
    borrowed: boolean;
    book: Book;
    loans: Array<any>;
}

export interface Loan {
    id: number;
    lender: string;
    borrower: string;
    bookId: string;
    book: Book;
    begin: string;
    end: string;
}

export interface Books extends Array<Book> {}

export interface Ads extends Array<Ad> {}

export interface Loans extends Array<Loan> {}
