import styled from "styled-components";

const Header = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.headerColor};
`;

export default Header;
