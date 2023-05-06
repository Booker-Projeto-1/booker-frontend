import { api } from "./api";

type newAdRequestData = {
  bookId: string,
  description: string
};

// TODO: adicionar token como variável
export async function newAdRequest(data: newAdRequestData) {
    try {
        const response = await api.post("/advertisement", data, {
          headers: {
              Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJCb29rZXIiLCJzdWIiOiJlc3RldmFvLmZlcnJlaXJhQGdtYWlsLmNvbSIsImlhdCI6MTY4MzQxNTkwOCwiZXhwIjoxNjgzNDQ0NzA4fQ.9YAYq4hEWe_mYcklxy7lVTc42JnYG7P5NewRJ5sfoYM'
          }
        });
        return Promise.resolve(response.data);
    } catch (res: any) {
        return Promise.reject(res.data);
    }
}