import { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import Container from "../components/Container";
import Header from "../components/Header";
import Title from "../components/Title";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.btnColor};
  border-radius: 10px;
  color: ${(props) => props.theme.textColor};
  padding: 10px 20px;
  border-style: none;
  margin: 5px;
`;

function CreatePost() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [flowerName, setFlowerName] = useState<string>("");
  const [flowerType, setFlowerType] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [height, setHeight] = useState<string>("");
  const [feature, setFeature] = useState<string>("");
  const [postRange, setPostRange] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isForExchange, setIsForExchange] = useState<boolean>(false);
  const [isForSale, setIsForSale] = useState<boolean>(false);

  const maxImages = 5;

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const selectedFiles = Array.from(files).slice(0, maxImages);
      setImageFiles(selectedFiles);
    }
  };

  const onChangeFlowerName = (event: ChangeEvent<HTMLInputElement>) => {
    setFlowerName(event.target.value);
  };

  const onChangeFlowerType = (event: ChangeEvent<HTMLSelectElement>) => {
    setFlowerType(event.target.value);
  };

  const onChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  const onChangeHeight = (event: ChangeEvent<HTMLSelectElement>) => {
    setHeight(event.target.value);
  };

  const onChangeFeature = (event: ChangeEvent<HTMLInputElement>) => {
    setFeature(event.target.value);
  };

  const onChangePostRange = (event: ChangeEvent<HTMLInputElement>) => {
    setPostRange(event.target.value);
    setIsForExchange(false);
    setIsForSale(false);
  };

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const onChangeIsForExchange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsForExchange(event.target.checked);
  };

  const onChangeIsForSale = (event: ChangeEvent<HTMLInputElement>) => {
    setIsForSale(event.target.checked);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const postData = {
      flowerName,
      flowerType,
      quantity,
      height,
      feature,
      postRange,
      content,
      isForExchange,
      isForSale,
    };
    console.log(postData);
    // You can then post this data to your backend
  };

  return (
    <Container>
      <Header>
        <Title>게시물 등록하기</Title>
      </Header>
      <Form onSubmit={onSubmit}>
        <div>
          <Label htmlFor="imageUpload">이미지 업로드:</Label>
          <Input
            id="imageUpload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
        </div>
        <div>
          <Label>선택한 이미지 파일:</Label>
          {imageFiles.length > 0 ? (
            <ul>
              {imageFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          ) : (
            <p>이미지 파일을 선택하지 않았습니다.</p>
          )}
        </div>
        <div>
          <Label htmlFor="flowerName">꽃 이름:</Label>
          <Input
            id="flowerName"
            value={flowerName}
            onChange={onChangeFlowerName}
            type="text"
            placeholder="꽃 이름"
          />
        </div>
        <div>
          <Label htmlFor="flowerType">종:</Label>
          <Select
            id="flowerType"
            value={flowerType}
            onChange={onChangeFlowerType}
          >
            <option value="">Select 종</option>
            <option value="장미">장미</option>
            <option value="다알리아">다알리아</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="quantity">수량:</Label>
          <Input
            id="quantity"
            value={quantity}
            onChange={onChangeQuantity}
            type="number"
            placeholder="수량"
          />
        </div>
        <div>
          <Label htmlFor="height">키:</Label>
          <Select id="height" value={height} onChange={onChangeHeight}>
            <option value="">Select 키</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="tall">Tall</option>
            <option value="extra-tall">Extra Tall</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="feature">특징:</Label>
          <Input
            id="feature"
            value={feature}
            onChange={onChangeFeature}
            type="text"
            placeholder="특징"
          />
        </div>
        <div>
          <Label>공개범위:</Label>
          <div>
            <Label>
              <Input
                type="radio"
                value="전체공개"
                checked={postRange === "전체공개"}
                onChange={onChangePostRange}
              />
              전체공개
            </Label>
          </div>
          <div>
            <Label>
              <Input
                type="radio"
                value="구독자공개"
                checked={postRange === "구독자공개"}
                onChange={onChangePostRange}
              />
              구독자공개
            </Label>
          </div>
          <div>
            <Label>
              <Input
                type="radio"
                value="나만보기"
                checked={postRange === "나만보기"}
                onChange={onChangePostRange}
              />
              나만보기
            </Label>
          </div>
        </div>
        {postRange !== "나만보기" && (
          <div>
            <Label htmlFor="content">내용:</Label>
            <TextArea
              id="content"
              value={content}
              onChange={onChangeContent}
              placeholder="내용"
            />
          </div>
        )}
        {postRange !== "나만보기" && (
          <div>
            <Label htmlFor="isForExchange">교환희망여부:</Label>
            <Input
              id="isForExchange"
              type="checkbox"
              checked={isForExchange}
              onChange={onChangeIsForExchange}
            />
          </div>
        )}
        {postRange !== "나만보기" && (
          <div>
            <Label htmlFor="isForSale">거래희망여부:</Label>
            <Input
              id="isForSale"
              type="checkbox"
              checked={isForSale}
              onChange={onChangeIsForSale}
            />
          </div>
        )}
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}

export default CreatePost;
