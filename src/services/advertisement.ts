import { api } from "./api";

type newAdRequestData = {
  bookId: string;
  description: string;
};

export type updateAdRequestData = {
  id: number;
  description: string;
  active: boolean;
  borrowed: boolean;
}

export async function newAdRequest(data: newAdRequestData) {
  try {
    const response = await api.post("/advertisement", data);
    return Promise.resolve(response.data);
  } catch (res: any) {
    return Promise.reject(res.data);
  }
}

export async function getAds(bookIds: string[] | undefined) {
  try {
      const response = await api.get("/advertisement/list" + (bookIds ? "?bookIds=" + bookIds.join(",") : ""));
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


export async function updateAdRequest(data: updateAdRequestData) {
  try {
    const response = await api.put("/advertisement/update", data);
    return Promise.resolve(response.data);
  } catch (res: any) {
    return Promise.reject(res.data);
  }
}