import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import TopMenu from '../TopMenu/TopmenuWrap'
import { AuthTypes } from '../../reducers/authreducer'
import { Layout, Row, Col, Typography, Button, Input, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { db } from "../../firebase/firebase";

const { Title, Text } = Typography;
const { Content } = Layout;
const { TextArea } = Input;



const TitleWrap = styled.div`
    margin-bottom: 40px;
    text-align: center;
`

const AvatarWrap = styled.div`
    margin-bottom: 40px;
    text-align: center;
    img {
        max-width: 100%;
    }
`

const SubscribeWrap = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
`

const SubscribeItem = styled.div`

`

const SubscribeItemNum = styled.div`

`

const AddWallPost = styled.div`
    textarea {
        resize: none;
    }
`

const AddWallPostArea = styled.div`
    margin-bottom: 20px;
`

const AddWallPostButton = styled.div`

`


interface MainPageTypes {

}

interface AuthState {
    auth: AuthTypes
}

const MainPage: React.FC<MainPageTypes> = () => {

    const dispatch = useDispatch();
    const userinfo = useSelector((state: AuthState) => state.auth.info)

    useEffect(() => {

    })


    return (
        <div>
            <TopMenu activeEl={'main'}/>
            <Layout className={'layout'}>
                <Content>
                    <Row>
                        <Col xs={{offset: 1, span: 23}} 
                            xl={{offset: 3, span: 6}} 
                            xxl={{offset: 3, span: 6}}>
                                <AvatarWrap>
                                    {
                                        userinfo.avatar === null ?
                                        <Avatar size={256} shape="square" icon={<UserOutlined />} /> :
                                        <img src={userinfo.avatar} alt="av" />
                                    }
                                </AvatarWrap>
                                <TitleWrap>
                                    <Title>
                                        Привет, {userinfo.nickname}
                                    </Title>
                                </TitleWrap>
                                <SubscribeWrap>
                                    <SubscribeItem>
                                        <Title level={4}>{userinfo.followers}</Title>
                                        <Title level={5}>Подписчики</Title>
                                    </SubscribeItem>
                                    <SubscribeItem>
                                        <Title level={4}>{userinfo.following}</Title>
                                        <Title level={5}>Подписки</Title>
                                    </SubscribeItem>
                                </SubscribeWrap>
                        </Col>
                        <Col xs={{offset: 1, span: 23}} 
                            xl={{offset: 1, span: 11}} 
                            xxl={{offset: 1, span: 11}}>
                                <TitleWrap>
                                    <Title>
                                        Стена
                                    </Title>
                                </TitleWrap>
                                <AddWallPost>
                                    <AddWallPostArea>
                                        <TextArea
                                            placeholder="Введите Текст"
                                            autoSize={{ minRows: 1, maxRows: 6 }}
                                            maxLength={500}
                                        />
                                    </AddWallPostArea>
                                    <AddWallPostButton>
                                        <Button 
                                            type="primary" 
                                            size="large"
                                            disabled={false}
                                        > 
                                            Отправить
                                        </Button>
                                    </AddWallPostButton>
                                </AddWallPost>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </div>
    )
}


export default MainPage