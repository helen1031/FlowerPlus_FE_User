import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostDTO, getPostById } from "../service/PostService";
import { useRecoilValue } from "recoil";
import { loggedInUserAtom } from "../atoms";
import { UserDTO } from "../service/UserService";
import { deletePost } from "../service/PostService";

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
  const loggedInUser = useRecoilValue<UserDTO | null>(loggedInUserAtom);

  const navigate = useNavigate();
  const token = localStorage.getItem("ACCESS_TOKEN") || "";

  useEffect(() => {
    if (id) {
      getPostById(id)
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

  console.log("loggedInUser:", loggedInUser);

  const handleEdit = () => {
    navigate(`/modify-post/${post.postId}`);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "정말로 삭제하시겠습니까? 삭제하면 관련 모든 채팅 데이터도 삭제되게 됩니다."
    );

    if (confirmDelete && id) {
      deletePost(id)
        .then(() => {
          alert("삭제되었습니다");
          navigate("/my-posts");
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
        });
    }
  };

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

      {loggedInUser?.userId !== post.userId && (
        <AuthorInfo userId={post.userId} avatarUrl={""} />
      )}
      <ExchangeSaleInfoContainer>
        {" "}
        <ExchangeInfo forExchange={forExchange} />
        <SaleInfo forSale={forSale} />
      </ExchangeSaleInfoContainer>
      <p>꽃 이름: {post.flowerName}</p>
      <p>종: {post.flowerType}</p>
      {loggedInUser?.userId === post.userId && (
        <>
          <p>수량: {post.postDetail?.quantity ?? ""}</p>
          <p>키: {post.postDetail?.height}</p>
          <p>특징: {post.postDetail?.feature}</p>
        </>
      )}
      <p>{post.content}</p>
      {loggedInUser?.userId === post.userId && (
        <>
          <button onClick={handleEdit}>수정하기</button>
          <button onClick={handleDelete}>삭제하기</button>
        </>
      )}
    </Container>
  );
}

export default PostDetail;
