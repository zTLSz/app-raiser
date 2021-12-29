import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import TopMenu from "../TopMenu/TopmenuWrap";
import { ProfileDataTypes } from "../../reducers/getprofilereducer";
import { SubscribeUserTypes } from "../../reducers/subscribeuserreducer";
import { AuthTypes } from "../../reducers/authreducer";
import Loader from "../Preloader";
import { requestGetProfile } from "../../actions/profile/getProfile";
import { requestSubscribeUser } from "../../actions/subscribe/subscribeUser";
import { requestCheckSubscribeUser } from "../../actions/subscribe/chechSubscribeUser";
import { requestUnsubscribeUser } from "../../actions/subscribe/unsubscribeUser";
import Wall from "../modules/wall/Wall";
import ProfilesPage404 from "./Profile404";
import ProfilesPageInfo from "./ProfileInfo";
import { Layout, Row, Col, Typography, Avatar, Button } from "antd";
import { Redirect } from "react-router";

// const { Title, Text } = Typography;
const { Content } = Layout;

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

const ProfilesPage: React.FC<PageTypes> = (props) => {
  const dispatch = useDispatch();
  const profileinfo = useSelector((state: ProfilesState) => state.currprofile);
  // const subscribeinfo = useSelector((state: ProfilesState) => state.subscribeuser)
  const userCounter = useSelector((state: AuthState) => state.auth.counter);
  const userName = useSelector((state: AuthState) => state.auth.info.nickname);
  const { match } = props;

  useEffect(() => {
    dispatch(requestGetProfile(match.params.id));
    dispatch(requestCheckSubscribeUser(userCounter, match.params.id));
  }, [match.params.id]);

  if (match.params.id == userCounter) {
    return <Redirect to="/" />;
  }

  if (profileinfo.isError) {
    return (
      <>
        <ProfilesPage404 />
      </>
    );
  }

  return (
    <div>
      <TopMenu activeEl={""} />
      <Layout className={"layout"}>
        <Content>
          <Row>
            <Col
              xs={{ offset: 1, span: 23 }}
              xl={{ offset: 3, span: 6 }}
              xxl={{ offset: 3, span: 6 }}
            >
              {profileinfo.isLoading ? (
                <Loader />
              ) : (
                <ProfilesPageInfo match={match} />
              )}
            </Col>
            <Col
              xs={{ offset: 1, span: 23 }}
              xl={{ offset: 1, span: 11 }}
              xxl={{ offset: 1, span: 11 }}
            >
              <Wall
                author={userCounter}
                user={match.params.id}
                name={userName}
              />
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
};

export default ProfilesPage;
