import axios from "axios";

const googleBooksApi = axios.create({
    baseURL: "https://www.googleapis.com/books/v1",
});

type Params = {
    q: string,
    orderBy: string,
    key: string
};

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

        // const queryParams = new URLSearchParams(params).toString()
    }
};

export default googleBooksService;