import { call } from "./ApiService";

export interface PostDTO {
  postId?: number;
  userId?: number;
  postRange?: string;
  forExchange?: boolean;
  forSale?: boolean;
  flowerName?: string;
  content?: string;
  flowerType?: string;
  postDetail?: {
    postId?: number;
    height?: string;
    feature?: string;
    quantity?: number;
  };
  images?: {
    imageId?: number;
    postId?: number;
    imageUrl?: string;
    image?: string;
  }[];
}

export function createPost(postDTO: PostDTO) {
  return call("/posts", "POST", postDTO)
    .then((response) => {
      console.log("Response:", response);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("게시물 등록이 실패했습니다.");
    });
}

export function deletePost(id: string) {
  return call(`/posts/${id}`, "DELETE", null);
}

export function getMyPosts(): Promise<PostDTO[]> {
  return call("/posts/my-posts", "GET", null);
}

export function getPostById(id: string): Promise<PostDTO> {
  return call(`/posts/${id}`, "GET", null);
}

export function getAllPosts(): Promise<PostDTO[]> {
  return call("/posts/public-posts", "GET", null);
}
