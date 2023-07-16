import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Container from "../components/Container";
import Header from "../components/Header";
import Title from "../components/Title";
import { PostDTO, getPostById, updatePost } from "../service/PostService";

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

interface RouteParams extends Record<string, string | undefined> {
  id: string;
}

function ModifyPost() {
  const { id } = useParams<RouteParams>();
  const [loading, setLoading] = useState<boolean>(true);
  const [imageFiles, setImageFiles] = useState<string[]>([]);
  const [flowerName, setFlowerName] = useState<string>("");
  const [flowerType, setFlowerType] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [height, setHeight] = useState<string>("");
  const [feature, setFeature] = useState<string>("");
  const [postRange, setPostRange] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [forExchange, setForExchange] = useState<boolean>(false);
  const [forSale, setForSale] = useState<boolean>(false);

  const navigate = useNavigate();

  const maxImages = 5;

  useEffect(() => {
    console.log(id);
    if (id) {
      getPostById(id)
        .then(async (data: PostDTO) => {
          const filteredImages = data.images
            ? data.images
                .filter((image) => image.imageUrl !== null)
                .map((image) => image.image || "")
            : [];
          setFlowerName(data.flowerName || "");
          setFlowerType(data.flowerType || "");
          setQuantity(data.postDetail?.quantity || 0);
          setHeight(data.postDetail?.height || "");
          setFeature(data.postDetail?.feature || "");
          setPostRange(data.postRange || "");
          setContent(data.content || "");
          setForExchange(data.forExchange || false);
          setForSale(data.forSale || false);
          setLoading(false);
        })
        .catch((error: Error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const selectedFiles = Array.from(files).slice(0, maxImages);
      Promise.all(
        selectedFiles.map((file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        })
      )
        .then((images) => setImageFiles(images as string[]))
        .catch((e) => console.error(e));
    }
  };

  const onChangeFlowerName = (event: ChangeEvent<HTMLInputElement>) => {
    setFlowerName(event.target.value);
  };

  const onChangeFlowerType = (event: ChangeEvent<HTMLSelectElement>) => {
    let newValue: string;
    switch (event.target.value) {
      case "장미":
        newValue = "ROSES";
        break;
      case "다알리아":
        newValue = "DAHLIAS";
        break;
      default:
        newValue = "ROSES";
        break;
    }
    setFlowerType(newValue);
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
    let newValue: string;
    switch (event.target.value) {
      case "전체공개":
        newValue = "PUBLIC";
        break;
      case "구독자공개":
        newValue = "SUBSCRIBERS";
        break;
      case "나만보기":
        newValue = "PRIVATE";
        break;
      default:
        newValue = "PUBLIC"; //default value
        break;
    }
    setPostRange(newValue);
    setForExchange(false);
    setForSale(false);
  };

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const onChangeForExchange = (event: ChangeEvent<HTMLInputElement>) => {
    setForExchange(event.target.checked);
  };

  const onChangeForSale = (event: ChangeEvent<HTMLInputElement>) => {
    setForSale(event.target.checked);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const postDTO: PostDTO = {
      postId: parseInt(id!),
      postRange: postRange,
      forExchange: forExchange,
      forSale: forSale,
      flowerName: flowerName,
      content: content,
      flowerType: flowerType,
      postDetail: {
        postId: parseInt(id!),
        height: height,
        feature: feature,
        quantity: quantity,
      },
      images: imageFiles.map((image) => ({ image: image })),
    };
    if (id) {
      console.log("postDTO:", postDTO);
      updatePost(id, postDTO)
        .then(() => {
          navigate("/my-posts");
        })
        .catch((error) => {
          console.error("Error updating post:", error);
        });
    }
  };

  return (
    <Container>
      <Header>
        <Title>게시물 수정하기</Title>
      </Header>
      {loading ? (
        <p>Loading...</p> // This can be replaced with a loading spinner or similar component
      ) : (
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
                  <li key={index}>Image {index + 1}</li>
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
              value={
                flowerType === "ROSES"
                  ? "장미"
                  : flowerType === "DAHLIAS"
                  ? "다알리아"
                  : ""
              }
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
                  checked={postRange === "PUBLIC"}
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
                  checked={postRange === "SUBSCRIBERS"}
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
                  checked={postRange === "PRIVATE"}
                  onChange={onChangePostRange}
                />
                나만보기
              </Label>
            </div>
          </div>
          {postRange !== "PRIVATE" && (
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
          {postRange !== "PRIVATE" && (
            <div>
              <Label htmlFor="forExchange">교환희망여부:</Label>
              <Input
                id="forExchange"
                type="checkbox"
                checked={forExchange}
                onChange={onChangeForExchange}
              />
            </div>
          )}
          {postRange !== "PRIVATE" && (
            <div>
              <Label htmlFor="forSale">거래희망여부:</Label>
              <Input
                id="forSale"
                type="checkbox"
                checked={forSale}
                onChange={onChangeForSale}
              />
            </div>
          )}
          <Button type="submit">수정하기</Button>
        </Form>
      )}
    </Container>
  );
}

export default ModifyPost;
