import { atom } from "recoil";
import { UserDTO } from "./service/UserService";

export const loggedInUserAtom = atom<UserDTO | null>({
  key: "loggedInUser",
  default: null,
});
