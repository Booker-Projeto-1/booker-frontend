import { api } from "./api";

type newLoanRequestData = {
  borrowerUsername: string;
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

export async function getUserLoans() {
    try {
        const response = await api.get("/loan/list");
        return Promise.resolve(response.data);
    } catch (res: any) {
        return Promise.reject(res.data);
    }
}