import { useNavigate, useLocation } from "react-router-dom";
import Title from "../components/Title";
import { signin } from "../service/UserService";
import { UserDTO } from "../service/UserService";
import { useSetRecoilState } from "recoil";
import { loggedInUserAtom } from "../atoms";

const Login = () => {
  const navigate = useNavigate();
  const setLoggedInUser = useSetRecoilState(loggedInUserAtom);
  const location = useLocation();
  const redirectUrl = new URLSearchParams(location.search).get("redirectUrl");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    signin({ email, password }).then((user: UserDTO | undefined) => {
      if (user) {
        setLoggedInUser(user);
        if (redirectUrl) {
          navigate(redirectUrl);
        } else {
          navigate("/");
        }
      }
    });
  };

  return (
    <>
      <Title>로그인 페이지</Title>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일:</label>
          <input type="text" id="email" placeholder="이메일" />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input type="password" id="password" placeholder="비밀번호" />
        </div>
        <button type="submit">로그인</button>
      </form>
    </>
  );
};

export default Login;
