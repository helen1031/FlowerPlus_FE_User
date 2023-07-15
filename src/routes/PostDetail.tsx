import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostDTO, getMyPostById } from "../service/PostService";

import Container from "../components/Container";
import Header from "../components/Header";
import Title from "../components/Title";

import AuthorInfo from "../components/PostDetailPage/AuthorInfo";
import ImageDetail from "../components/PostDetailPage/ImageDetail";
import ExchangeSaleInfoContainer from "../components/ExchangeSaleInfoContainer";
import ExchangeInfo from "../components/ExchangeInfo";
import SaleInfo from "../components/SaleInfo";

interface RouteParams extends Record<string, string | undefined> {
  id: string;
}

function PostDetail() {
  const { id } = useParams<RouteParams>();
  const [post, setPost] = useState<PostDTO | null>(null);

  useEffect(() => {
    if (id) {
      getMyPostById(id)
        .then((data: PostDTO) => {
          const filteredImages = data.images
            ? data.images.filter((image) => image.imageUrl !== null)
            : [];
          const filteredPost = {
            ...data,
            images: filteredImages,
          };
          setPost(filteredPost);
        })
        .catch((error: Error) => console.error(error));
    }
  }, [id]);

  if (!post) return <p>Loading...</p>;

  const forExchange = post.forExchange ?? false;
  const forSale = post.forSale ?? false;

  return (
    <Container>
      <Header>
        <Title>게시물 상세 보기</Title>
      </Header>

      <ImageDetail
        images={
          post?.images
            ?.map((image) => image.imageUrl)
            .filter((url): url is string => url !== undefined) ?? []
        }
      />
      <AuthorInfo userId={post.userId} avatarUrl={""} />
      <ExchangeSaleInfoContainer>
        {" "}
        <ExchangeInfo forExchange={forExchange} />
        <SaleInfo forSale={forSale} />
      </ExchangeSaleInfoContainer>

      <p>꽃 이름: {post.flowerName}</p>
      <p>종: {post.flowerType}</p>

      <p>수량: {post.postDetail?.quantity ?? ""}</p>
      <p>키: {post.postDetail?.height}</p>
      <p>특징: {post.postDetail?.feature}</p>

      <p>{post.content}</p>
    </Container>
  );
}

export default PostDetail;
