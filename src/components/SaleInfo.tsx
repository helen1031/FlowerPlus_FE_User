import styled from "styled-components";

interface SaleInfoProps {
  forSale: boolean;
}

const SaleInfoContainer = styled.div`
  background-color: red;
  color: white;
  padding: 10px;
  width: 80px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function SaleInfo({ forSale }: SaleInfoProps) {
  const saleText = forSale ? "거래가능" : "";

  return <>{saleText && <SaleInfoContainer>{saleText}</SaleInfoContainer>}</>;
}

export default SaleInfo;
