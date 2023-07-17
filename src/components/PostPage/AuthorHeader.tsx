import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import {
  createSubscriber,
  deleteSubscriber,
  checkSubscriptionStatus,
} from "../../service/SubscribeService";
import { loggedInUserAtom } from "../../atoms";
import { UserDTO } from "../../service/UserService";

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

const SubscribeButton = styled.button`
  margin-left: auto;
  padding: 5px 15px;
  background: blue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: darkblue;
  }
`;

interface AuthorHeaderProps {
  userId?: number | undefined;
  nickname?: string;
  avatarUrl?: string;
}

function AuthorHeader({ userId, avatarUrl }: AuthorHeaderProps) {
  const loggedInUser = useRecoilValue<UserDTO | null>(loggedInUserAtom);
  const [isSubscribed, setIsSubscribed] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    if (loggedInUser && loggedInUser.userId && userId) {
      checkSubscriptionStatus(loggedInUser.userId, userId).then((response) => {
        setIsSubscribed(response);
      });
    }
  }, [loggedInUser, userId]);

  const handleClick = async () => {
    if (userId) {
      if (isSubscribed) {
        await deleteSubscriber(userId);
        setIsSubscribed(false);
        window.alert("구독 취소 되었습니다");
      } else {
        await createSubscriber({
          userId: loggedInUser?.userId || 0,
          subscriberId: userId,
        });
        setIsSubscribed(true);
        window.alert("구독 되었습니다");
      }
    }
  };

  if (isSubscribed === undefined) {
    return null; // Return null or a loading indicator while fetching the subscription status
  }

  return (
    <AuthorContainer>
      <AuthorAvatar src={avatarUrl} alt="Author Avatar" />
      <AuthorUsername to={`/others-posts/${userId}`}>{userId}</AuthorUsername>
      <SubscribeButton onClick={handleClick}>
        {isSubscribed ? "구독취소" : "구독하기"}
      </SubscribeButton>
    </AuthorContainer>
  );
}

export default AuthorHeader;
