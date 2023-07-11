import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Container from "../components/Container";
import Header from "../components/Header";
import Title from "../components/Title";

const Btn = styled.button`
  background-color: ${(props) => props.theme.btnColor};
  border-radius: 10px;
  color: ${(props) => props.theme.textColor};
  padding: 10px 20px;
  border-style: none;
  margin: 5px;
`;

function Home() {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <Title>메인 화면</Title>
      </Header>
      <Btn onClick={() => navigate("/create-post")}>게시물 등록하기</Btn>
      <Btn onClick={() => navigate("/my-posts")}>내 게시물 조회하기</Btn>
      <Btn onClick={() => navigate("/neighbor-posts")}>
        이웃 게시물 조회하기
      </Btn>
      <Btn onClick={() => navigate("/all-posts")}>전체 게시물 조회하기</Btn>
    </Container>
  );
}

export default Home;
