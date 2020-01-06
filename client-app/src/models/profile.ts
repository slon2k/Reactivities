import { IPhoto } from "./photo"

export interface IProfile {
  userName: string,
  displayName: string,
  bio: string,
  image: string,
  photos: IPhoto[]
}