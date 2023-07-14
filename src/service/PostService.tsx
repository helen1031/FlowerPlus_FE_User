import { call } from "./ApiService";

export interface PostDTO {
  postId?: number;
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
      alert("게시물 등록 성공!");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("게시물 등록 실패!");
    });
}

export function getMyPosts(): Promise<PostDTO[]> {
  return call("/posts/my-posts", "GET", null);
}

export function getMyPostById(id: string): Promise<PostDTO> {
  return call(`/posts/${id}`, "GET", null);
}

export function getAllPosts(): Promise<PostDTO[]> {
  return call("/posts/public-posts", "GET", null);
}
