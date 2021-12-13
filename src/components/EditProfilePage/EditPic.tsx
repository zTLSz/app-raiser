import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Col, Typography, Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { AuthTypes } from "../../reducers/authreducer";
import { PicEditTypes } from "../../reducers/editprofilepicreducer";
import { requestEditPicProfile } from "../../actions/editUserPic";
import { storageRef } from "../../firebase/firebase";

const { Title, Text } = Typography;

const TitleWrap = styled.div`
  margin-bottom: 40px;
`;

const EditItem = styled.div`
  margin-bottom: 40px;

  img {
    max-width: 100%;
  }
`;

const AvatarWrap = styled.div`
  margin-bottom: 40px;
  img {
    max-width: 100%;
  }

  input[type="file"] {
    opacity: 0;
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    left: 0;
  }

  label {
    position: relative;
    display: inline-block;
  }
`;

const AvLoadButton = styled.div`
  margin-top: 20px;
`;

interface EditUserPicTypes {
  userinfo: any;
  usercounter: number;
}

interface AuthState {
  editprofilepic: PicEditTypes;
}

const EditUserPic: React.FC<EditUserPicTypes> = ({ userinfo, usercounter }) => {
  const dispatch = useDispatch();
  const editstatus = useSelector((state: AuthState) => state.editprofilepic);

  //const [name, setName] = useState(userinfo.nickname);
  //const [load, setLoad] = useState(false);
  const [url, setUrl] = useState("");

  const avRef = storageRef.child(`avatars/${usercounter}`);

  const handleChangeAvatar = (e: any) => {
    let files = Array.from(e.target.files);

    files.forEach((file: any) => {
      avRef.put(file).then((s) => {
        avRef.getDownloadURL().then((res) => {
          dispatch(requestEditPicProfile(res, usercounter));
          setUrl(res);
        });
      });
    });
  };

  return (
    <>
      <Col
        xs={{ offset: 1, span: 23 }}
        xl={{ offset: 3, span: 18 }}
        xxl={{ offset: 3, span: 18 }}
      >
        <TitleWrap>
          <Title>Сменить фотографию пользователя</Title>
        </TitleWrap>
      </Col>
      <Col
        xs={{ offset: 1, span: 23 }}
        xl={{ offset: 3, span: 6 }}
        xxl={{ offset: 3, span: 6 }}
      >
        <EditItem>
          {userinfo.avatar === null ? (
            <Avatar size={256} shape="square" icon={<UserOutlined />} />
          ) : (
            <img src={userinfo.avatar} alt="av" />
          )}
          <AvatarWrap>
            <AvLoadButton>
              <label>
                <Button
                  loading={editstatus.isLoading}
                  type="primary"
                  size="large"
                  disabled={false}
                >
                  Загрузить
                </Button>
                <input
                  className="avatar-uploader"
                  type="file"
                  onChange={(e) => handleChangeAvatar(e)}
                />
              </label>
            </AvLoadButton>
          </AvatarWrap>
        </EditItem>
      </Col>
    </>
  );
};

export default EditUserPic;
