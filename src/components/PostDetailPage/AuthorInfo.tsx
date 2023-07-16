import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const AuthorAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const AuthorUsername = styled(Link)`
  font-weight: bold;
  color: blue;
  text-decoration: underline;

  &:hover {
    color: darkblue;
  }
`;

interface AuthorDetailProps {
  userId?: number;
  nickname?: string;
  avatarUrl?: string;
}

function AuthorDetail({ userId, avatarUrl }: AuthorDetailProps) {
  return (
    <AuthorContainer>
      <AuthorAvatar src={avatarUrl} alt="Author Avatar" />
      <AuthorUsername to={`/others-posts/${userId}`}>{userId}</AuthorUsername>
    </AuthorContainer>
  );
}

export default AuthorDetail;
