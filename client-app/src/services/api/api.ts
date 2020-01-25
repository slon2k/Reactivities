import axios, { AxiosResponse } from "axios";
import { IActivity, IActivitiesEnvelope } from "../../models/activity";
import { IUser, IUserForm } from "../../models/user";
import { history } from "../..";
import { toast } from "react-toastify";
import { IProfile } from "../../models/profile";
import { IUpdateProfileForm } from "../../models/updateProfileForm";
import { IPhoto } from "../../models/photo";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, error => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error, check your connection");
  }
  const { status, data, config } = error.response;
  if (status === 404) {
    history.push("/notfound");
  }
  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }
  if (status === 500) {
    toast.error("Server error - try again later");
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (delay: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>(resolve =>
    setTimeout(() => resolve(response), delay)
  );

const request = {
  get: (url: string) =>
    axios
      .get(url)
      .then(sleep(750))
      .then(responseBody),
  post: (url: string, body: {}) =>
    axios
      .post(url, body)
      .then(sleep(750))
      .then(responseBody),
  put: (url: string, body: {}) =>
    axios
      .put(url, body)
      .then(sleep(750))
      .then(responseBody),
  delete: (url: string) =>
    axios
      .delete(url)
      .then(sleep(750))
      .then(responseBody),
  postForm: (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios
      .post(url, formData, {
        headers: { "Content-type": "multipart/form-data" }
      })
      .then(sleep(750))
      .then(responseBody);
  }
};

export const Activities = {
  list: (params: URLSearchParams): Promise<IActivitiesEnvelope> =>
    axios.get("/activities", { params: params }).then(sleep(750)).then(responseBody),
  details: (id: string): Promise<IActivity> => request.get(`/activities/${id}`),
  create: (activity: IActivity) => request.post(`/activities`, activity),
  update: (activity: IActivity) =>
    request.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => request.get(`/activities/${id}`),
  attend: (id: string) => request.post(`/activities/${id}/attend`, {}),
  unattend: (id: string) => request.delete(`/activities/${id}/attend`)
};

export const User = {
  login: (user: IUserForm): Promise<IUser> => request.post("user/login", user),
  register: (user: IUserForm): Promise<IUser> =>
    request.post("user/register", user),
  current: (): Promise<IUser> => request.get("/user")
};

export const Profile = {
  get: (username: string): Promise<IProfile> =>
    request.get(`/profiles/${username}`),
  uploadPhoto: (photo: Blob): Promise<IPhoto> =>
    request.postForm(`/photos`, photo),
  updateProfile: (updateProfileForm: IUpdateProfileForm) =>
    request.put(`/profiles`, updateProfileForm),
  setMainPhoto: (id: string) => request.post(`/photos/${id}/setmain`, {}),
  deletePhoto: (id: string) => request.delete(`/photos/${id}`),
  follow: (username: string) =>
    request.post(`/profiles/${username}/follow`, {}),
  unfollow: (username: string) =>
    request.delete(`/profiles/${username}/follow`),
  listFollowings: (username: string, predicate: string) =>
    request.get(`/profiles/${username}/follow?predicate=${predicate}`)
};
