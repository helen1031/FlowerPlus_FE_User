import { useState } from "react";
import Title from "../components/Title";
import { signup } from "../service/UserService";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signup({ username, nickname, email, password }).then((response) => {
      window.location.href = "/login";
    });
  };

  return (
    <>
      <Title>회원가입 페이지</Title>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">이름:</label>
          <input
            type="text"
            id="username"
            placeholder="이름"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="nickname">닉네임:</label>
          <input
            type="text"
            id="nickname"
            placeholder="닉네임"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">이메일:</label>
          <input
            type="text"
            id="email"
            placeholder="이메일"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">가입하기</button>
      </form>
    </>
  );
};

export default Signup;
