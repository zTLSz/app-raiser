import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { SubscribeUserTypes } from "../../reducers/getsubscribelistreducer";
import { Layout, Row, Col, Typography, Button, Input } from "antd";
import { requestGetSubscribersList } from "../../actions/subscribe/getSubscribersList";
import TopMenu from "../modules/topMenu/TopmenuWrap";

const { Title, Text } = Typography;
const { Content } = Layout;

interface FriendsPageTypes {}

interface IFrinedsStore {
  subscribers: SubscribeUserTypes;
}

const FriendsPage: React.FC<FriendsPageTypes> = () => {
  const dispatch = useDispatch();
  const friendsData = useSelector((store: IFrinedsStore) => store.subscribers);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    dispatch(requestGetSubscribersList(10));
  }, []);

  useEffect(() => {
    if (!friendsData.isLoading && friendsData.data) {
      if (friendsData.data.followers) {
        const flws = friendsData.data.followers.map((item: any) => (
          <div key={item.id}>{item.name}</div>
        ));

        setFollowers(flws);
      }

      if (friendsData.data.following) {
        const flwg = friendsData.data.following.map((item: any) => (
          <div key={item.id}>{item.name}</div>
        ));

        setFollowing(flwg);
      }
    }
  }, [friendsData]);

  return (
    <div>
      <TopMenu activeEl={"friends"} />
      <Layout className={"layout"}>
        <Content>
          <Row>
            <Col
              xs={{ offset: 1, span: 23 }}
              xl={{ offset: 3, span: 6 }}
              xxl={{ offset: 3, span: 6 }}
            >
              <Title>Подписки</Title>
              {following}
            </Col>
            <Col
              xs={{ offset: 1, span: 23 }}
              xl={{ offset: 6, span: 6 }}
              xxl={{ offset: 6, span: 6 }}
            >
              <Title>Подписчики</Title>
              {followers}
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
};

export default FriendsPage;
