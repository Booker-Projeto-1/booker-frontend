export interface Book {
    id: string,
    title: string,
    authors: Array<string>,
    description: string,
    publisher: string,
    imageLink?: string
}

export interface Books extends Array<Book> {}
