import styled from "styled-components";

interface ExchangeInfoProps {
  forExchange: boolean;
}

const ExchangeInfoContainer = styled.div`
  background-color: blue;
  color: white;
  padding: 10px;
  width: 80px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ExchangeInfo({ forExchange }: ExchangeInfoProps) {
  const saleText = forExchange ? "교환가능" : "";

  return (
    <>{saleText && <ExchangeInfoContainer>{saleText}</ExchangeInfoContainer>}</>
  );
}

export default ExchangeInfo;
