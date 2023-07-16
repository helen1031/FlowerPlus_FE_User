import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PostDTO, getAllPosts } from "../service/PostService";
import Container from "../components/Container";
import Header from "../components/Header";
import Title from "../components/Title";
import styled from "styled-components";
import ExchangeSaleInfoContainer from "../components/ExchangeSaleInfoContainer";
import ExchangeInfo from "../components/ExchangeInfo";
import SaleInfo from "../components/SaleInfo";

const PostList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PostItem = styled.li`
  display: flex;
  margin: 1em 0;
  cursor: pointer;
`;

const PostImage = styled.img`
  width: 20%;
  object-fit: cover;
  aspect-ratio: 1/1;
`;

const PostContent = styled.div`
  width: 80%;
  padding-left: 1em;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const AllPost = () => {
  const [posts, setPosts] = useState<PostDTO[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllPosts()
      .then((posts: PostDTO[]) => {
        const filteredPosts = posts.map((post) => ({
          ...post,
          images: post.images
            ? post.images.filter((image) => image.imageUrl !== null)
            : [],
        }));
        setPosts(filteredPosts);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container>
      <Header>
        <Title>전체 게시물 보기</Title>
      </Header>
      <PostList>
        {posts.map((post, index) => (
          <PostItem key={index} onClick={() => navigate(`/${post.postId}`)}>
            {post.images && post.images[0] && (
              <PostImage src={post.images[0].imageUrl} alt="post image" />
            )}
            <PostContent>
              <FlexContainer>
                <h2>{post.flowerName}</h2>
                <ExchangeSaleInfoContainer>
                  <ExchangeInfo forExchange={post.forExchange || false} />
                  <SaleInfo forSale={post.forSale || false} />
                </ExchangeSaleInfoContainer>
              </FlexContainer>
              <p>내용: {post.content}</p>
              <p>계정: {post.userId}</p>
            </PostContent>
          </PostItem>
        ))}
      </PostList>
    </Container>
  );
};

export default AllPost;
