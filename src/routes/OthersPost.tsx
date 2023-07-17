// src/routes/MyPost.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PostDTO, getOthersPostsbyUserId } from "../service/PostService";
import Container from "../components/Container";
import Header from "../components/Header";
import Title from "../components/Title";
import AuthorHeader from "../components/PostPage/AuthorHeader";
import ImageCellContainer from "../components/PostPage/ImageCellContainer";
import ImageCell from "../components/PostPage/ImageCell";

interface RouteParams extends Record<string, string | undefined> {
  userId: string;
}

const OthersPost = () => {
  const { userId } = useParams<RouteParams>();
  const [posts, setPosts] = useState<PostDTO[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      getOthersPostsbyUserId(userId)
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
    }
  }, [userId]);

  return (
    <Container>
      <Header>
        <Title>{`${userId}의 게시물 보기`}</Title>
      </Header>
      <AuthorHeader userId={parseInt(userId || "")} />
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
                  src={post.images[0]?.imageUrl || ""}
                  alt={post.flowerName || ""}
                />
              </ImageCell>
            ) : null
          )}
      </ImageCellContainer>
    </Container>
  );
};

export default OthersPost;
