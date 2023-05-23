import { api } from "./api";

type newAdRequestData = {
  bookId: string;
  description: string;
};

export async function newAdRequest(data: newAdRequestData) {
  try {
    const response = await api.post("/advertisement", data);
    return Promise.resolve(response.data);
  } catch (res: any) {
    return Promise.reject(res.data);
  }
}

export async function getAds() {
  try {
    const response = await api.get("/advertisement/list");
    return Promise.resolve(response.data);
  } catch (res: any) {
    return Promise.reject(res.data);
  }
}

export async function getUserAds() {
  try {
    const response = await api.get("/user/myAdvertisements");
    return Promise.resolve(response.data);
  } catch (res: any) {
    return Promise.reject(res.data);
  }
}
