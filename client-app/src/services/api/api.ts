import axios, { AxiosResponse } from "axios";
import { IActivity } from "../../models/activity";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (delay: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), delay)); 

const request = {
  get: (url: string) => axios.get(url).then(sleep(1500)).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(sleep(1500)).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(sleep(1500)).then(responseBody),
  delete: (url: string) => axios.get(url).then(sleep(1500)).then(responseBody)
};

export const Activities = {
  list: (): Promise<IActivity[]> => request.get("/activities"),
  details: (id: string): Promise<IActivity> => request.get(`/activities/${id}`),
  create: (activity: IActivity) => request.post(`/activities`, activity),
  update: (activity: IActivity) =>
    request.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => request.get(`/activities/${id}`)
};
