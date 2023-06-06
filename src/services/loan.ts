import { api } from "./api";

type newLoanRequestData = {
  borrowerEmail: string;
  advertisementId: string;
};

export async function newLoanRequest(data: newLoanRequestData) {
  try {
    const response = await api.post("/loan", data);
    return Promise.resolve(response.data);
  } catch (res: any) {
    return Promise.reject(res.data);
  }
}
