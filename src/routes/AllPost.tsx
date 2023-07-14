// src/routes/MyPost.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PostDTO, getAllPosts } from "../service/PostService";
import Container from "../components/Container";
import Header from "../components/Header";
import Title from "../components/Title";
import ImageCell from "../components/ImageCell";

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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
        }}
      >
        {posts
          .filter((post) => post.postId !== undefined)
          .map((post) =>
            post.images?.map((image, index) => (
              <ImageCell
                key={(post.postId ? post.postId : "undefined") + "-" + index}
                onClick={() => navigate(`/all-post/${post.postId}`)}
              >
                <img src={image.imageUrl || ""} alt={post.flowerName || ""} />
              </ImageCell>
            ))
          )}
      </div>
    </Container>
  );
};

export default AllPost;
