import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { ProfileDataTypes } from "../../reducers/getprofilereducer";
import { SubscribeUserTypes } from "../../reducers/subscribeuserreducer";
import { AuthTypes } from "../../reducers/authreducer";
import { requestGetProfile } from "../../actions/getProfile";
import { requestSubscribeUser } from "../../actions/subscribe/subscribeUser";
import { requestCheckSubscribeUser } from "../../actions/subscribe/chechSubscribeUser";
import { requestUnsubscribeUser } from "../../actions/subscribe/unsubscribeUser";
import { Typography, Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const TitleWrap = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const AvatarWrap = styled.div`
  margin-bottom: 40px;
  text-align: center;
  img {
    max-width: 100%;
  }
`;

const SubscribeWrap = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
`;

const SubscribeItem = styled.div``;

const SubscribeButton = styled.div`
  margin-top: 10px;
`;

interface PageTypes {
  match: {
    params: {
      id: number;
    };
  };
}

interface ProfilesState {
  currprofile: ProfileDataTypes;
  subscribeuser: SubscribeUserTypes;
}

interface AuthState {
  auth: AuthTypes;
}

const ProfilesPageInfo: React.FC<PageTypes> = (props) => {
  const dispatch = useDispatch();
  const profileinfo = useSelector((state: ProfilesState) => state.currprofile);
  const subscribeinfo = useSelector(
    (state: ProfilesState) => state.subscribeuser
  );
  const userCounter = useSelector((state: AuthState) => state.auth.counter);
  const userName = useSelector((state: AuthState) => state.auth.info.nickname);
  const { match } = props;

  useEffect(() => {
    // dispatch(requestGetProfile(match.params.id))
    // dispatch(requestCheckSubscribeUser(userCounter, match.params.id))
  }, [match.params.id]);

  return (
    <>
      <AvatarWrap>
        {profileinfo.info.avatar === null ? (
          <Avatar size={256} shape="square" icon={<UserOutlined />} />
        ) : (
          <img src={profileinfo.info.avatar} alt="avatar" />
        )}
      </AvatarWrap>
      <TitleWrap>
        <Title>{profileinfo.info.nickname}</Title>
      </TitleWrap>
      <SubscribeWrap>
        <SubscribeItem>
          <Title level={4}>{profileinfo.info.followers}</Title>
          <Title level={5}>Подписчики</Title>
        </SubscribeItem>
        <SubscribeItem>
          <Title level={4}>{profileinfo.info.following}</Title>
          <Title level={5}>Подписки</Title>
        </SubscribeItem>
      </SubscribeWrap>
      <SubscribeButton>
        {subscribeinfo.isSubscribe ? (
          <Button
            type="primary"
            block
            onClick={() =>
              dispatch(
                requestUnsubscribeUser(
                  userCounter,
                  userName,
                  match.params.id,
                  profileinfo.info.nickname
                )
              )
            }
          >
            Отписаться
          </Button>
        ) : (
          <Button
            type="primary"
            block
            onClick={() =>
              dispatch(
                requestSubscribeUser(
                  userCounter,
                  userName,
                  match.params.id,
                  profileinfo.info.nickname
                )
              )
            }
          >
            Подписаться
          </Button>
        )}
      </SubscribeButton>
    </>
  );
};

export default ProfilesPageInfo;
