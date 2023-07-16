// src/routes/MyPost.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PostDTO, getMyPosts } from "../service/PostService";
import Container from "../components/Container";
import Header from "../components/Header";
import Title from "../components/Title";
import ImageCellContainer from "../components/PostPage/ImageCellContainer";
import ImageCell from "../components/PostPage/ImageCell";

const MyPost = () => {
  const [posts, setPosts] = useState<PostDTO[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyPosts()
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
        <Title>내 게시물 보기</Title>
      </Header>
      <ImageCellContainer>
        {posts
          .filter((post) => post.postId !== undefined)
          .map((post, index) =>
            post.images && post.images.length > 0 ? (
              <ImageCell
                key={(post.postId ? post.postId : "undefined") + "-" + index}
                onClick={() => navigate(`/${post.postId}`)}
              >
                <img
                  src={post.images[0].imageUrl || ""}
                  alt={post.flowerName || ""}
                />
              </ImageCell>
            ) : null
          )}
      </ImageCellContainer>
    </Container>
  );
};

export default MyPost;
