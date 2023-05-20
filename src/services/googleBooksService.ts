import axios from "axios";

const googleBooksApi = axios.create({
    baseURL: "https://www.googleapis.com/books/v1",
});

const googleBooksService = {
    searchBooks: async (query: string) => {
        const queryParams = new URLSearchParams({ 'q': query });
        queryParams.set("orderBy", "relevance");
        queryParams.set("key", String(process.env.NEXT_PUBLIC_API_KEY));
        queryParams.set("maxResults", "40");

        try {
            const response = await googleBooksApi.get(`/volumes?${queryParams.toString()}`);
            return Promise.resolve(response.data);
        } catch (res: any) {
            return Promise.reject(res.data);
        }
    },

    getBookById: async (id: string) => {
        try {
            const response = await googleBooksApi.get(`/volumes/${id}`);
            return Promise.resolve(response.data);
        } catch (res: any) {
            return Promise.reject(res.data);
        }
    }
};

export default googleBooksService;