import { call } from "./ApiService";

interface SignInResponse {
  token: string;
}

interface UserDTO {
  email: string;
  password: string;
}

export function signin(userDTO: UserDTO) {
  return call<SignInResponse>("/auth/signin", "POST", userDTO).then(
    (response) => {
      if (response.token) {
        localStorage.setItem("ACCESS_TOKEN", response.token);
        window.location.href = "/";
      }
    }
  );
}

export function signout() {
  localStorage.removeItem("ACCESS_TOKEN");
  window.location.href = "/login";
}
