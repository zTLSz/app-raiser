import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import TopMenu from "../TopMenu/TopmenuWrap";
import { AuthTypes } from "../../reducers/authreducer";
import { Layout, Row, Col, Typography, Skeleton } from "antd";
import { requestGetPostLike } from "../../actions/postlikes/getPostLike";
import { GetPostLikeTypes } from "../../reducers/getpostlikereducer";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;
const { Content } = Layout;

const TitleWrap = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const ProfileItem = styled.div`
  font-size: 16px;
  margin-bottom: 10px;

  a {
    color: rgba(0, 0, 0, 0.45);
  }
`;

interface LCPageTypes {}

interface LikeState {
  auth: AuthTypes;
  likeslist: GetPostLikeTypes;
}

function ProfileLink(props: { item: any }) {
  const { item } = props;

  return (
    <ProfileItem>
      <Link to={`/profile/${item.id}`}>{item.name}</Link>
    </ProfileItem>
  );
}

const LcPage: React.FC<LCPageTypes> = () => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const likeslist = useSelector((state: LikeState) => state.likeslist);
  const userCounter = useSelector((state: LikeState) => state.auth.counter);
  let likes = "",
    dislikes = "";

  useEffect(() => {
    dispatch(requestGetPostLike(params.id, params.u));
  }, []);

  if (likeslist.data.length > 0) {
    likes = likeslist.data
      .filter((item: any) => item.type === "LIKE")
      .map((item: any, i: number) => <ProfileLink key={i} item={item} />);
    dislikes = likeslist.data
      .filter((item: any) => item.type === "DISLIKE")
      .map((item: any, i: number) => <ProfileLink key={i} item={item} />);
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
              <TitleWrap>
                <Title>Likes</Title>
                {likeslist.isLoading ? <Skeleton active /> : likes}
              </TitleWrap>
            </Col>
            <Col
              xs={{ offset: 1, span: 23 }}
              xl={{ offset: 6, span: 6 }}
              xxl={{ offset: 6, span: 6 }}
            >
              <TitleWrap>
                <Title>Dislikes</Title>
                {likeslist.isLoading ? <Skeleton active /> : dislikes}
              </TitleWrap>
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
};

export default LcPage;
