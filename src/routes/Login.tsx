import Title from "../components/Title";
import { signin } from "../service/UserService";

const Login = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    signin({ email, password });
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
