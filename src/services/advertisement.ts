import { api } from "./api";

type newAdRequestData = {
  bookId: string,
  description: string
};

export async function newAdRequest(data: newAdRequestData) {
    try {
        const response = await api.post("/advertisement", data);
        return Promise.resolve(response.data);
    } catch (res: any) {
        return Promise.reject(res.data);
    }
}