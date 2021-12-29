import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { GetWallTypes } from "../../../reducers/getwallposts";
import { AddWallTypes } from "../../../reducers/addwallpost";
import { Layout, Typography, Button, Input } from "antd";
import { requestAddWallPost } from "../../../actions/wall/addwallpost";

const { Title, Text } = Typography;
const { TextArea } = Input;

const AddWallPostArea = styled.div`
  margin-bottom: 20px;
`;

const AddWallPostButton = styled.div``;

const Error = styled.div`
  margin-top: 10px;
`;

interface WallTypes {
  user: number;
  author: number;
  name: string;
}

interface PostsStateTypes {
  wallposts: GetWallTypes;
  addwallpost: AddWallTypes;
}

const AddPost: React.FC<WallTypes> = (props) => {
  const { user, author, name } = props;
  const dispatch = useDispatch();
  const [post, setPost] = useState("");
  const addpoststatus = useSelector(
    (state: PostsStateTypes) => state.addwallpost
  );

  return (
    <>
      <AddWallPostArea>
        <TextArea
          placeholder="Введите Текст"
          autoSize={{ minRows: 1, maxRows: 6 }}
          maxLength={500}
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
      </AddWallPostArea>
      <AddWallPostButton>
        <Button
          loading={addpoststatus.isLoading}
          type="primary"
          size="large"
          disabled={false}
          onClick={() =>
            dispatch(requestAddWallPost(post, Date.now(), user, author, name))
          }
        >
          Отправить
        </Button>
        {addpoststatus.isError ? (
          <Error>
            <Text type="danger">
              Произошла ошибка! Проверь правильность данных
            </Text>
          </Error>
        ) : (
          ""
        )}
      </AddWallPostButton>
    </>
  );
};

export default AddPost;
