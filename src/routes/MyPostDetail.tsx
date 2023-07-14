import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostDTO, getMyPostById } from "../service/PostService";

interface RouteParams extends Record<string, string | undefined> {
  id: string;
}

function MyPostDetail() {
  const { id } = useParams<RouteParams>();
  const [post, setPost] = useState<PostDTO | null>(null);

  useEffect(() => {
    if (id) {
      getMyPostById(id)
        .then((data: PostDTO) => setPost(data))
        .catch((error: Error) => console.error(error));
    }
  }, [id]);

  if (!post) return <p>Loading...</p>; // Add a loading state

  return (
    <div>
      <img
        src={post.images && post.images[0]?.imageUrl}
        alt={post.flowerName}
      />
      <p>{post.flowerName}</p>
      <p>{post.content}</p>
    </div>
  );
}

export default MyPostDetail;
