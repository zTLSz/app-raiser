import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import TopMenu from '../TopMenu/TopmenuWrap'
import { ProfileDataTypes } from '../../reducers/getprofilereducer'
import { AuthTypes } from '../../reducers/authreducer'
import Loader from '../Preloader'
import { requestGetProfile } from '../../actions/getProfile' 
import { Layout, Row, Col, Typography, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router'

const { Title, Text } = Typography;
const { Content } = Layout;



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


interface PageTypes {
    match: {
        params: {
            id: string|number
        }
    }
}

interface ProfilesState {
    currprofile: ProfileDataTypes
}

interface AuthState {
    auth: AuthTypes
}


const ProfilesPage: React.FC<PageTypes> = (props) => {

    const dispatch = useDispatch();
    const profileinfo = useSelector((state: ProfilesState) => state.currprofile)
    const userCounter = useSelector((state: AuthState) => state.auth.counter)
    const { match } = props;

    useEffect(() => {
        dispatch(requestGetProfile(match.params.id))
    }, [])

    if (profileinfo.isLoading) {
        return <Loader />
    }

    if (match.params.id == userCounter) {
        return <Redirect to="/" />
    }

    
    if (profileinfo.isError) {
        return  <div>
                    <TopMenu activeEl={''}/>
                    <Layout className={'layout'}>
                        <Content>
                            <Row>
                                <Col xs={{offset: 1, span: 23}} 
                                    xl={{offset: 3, span: 18}} 
                                    xxl={{offset: 3, span: 18}}>
                                        <TitleWrap>
                                            <Title>
                                                Пользователь не найден!
                                            </Title>
                                        </TitleWrap>
                                </Col>
                            </Row>
                        </Content>
                    </Layout>
                </div>
    }

    return (
        <div>
            <TopMenu activeEl={''}/>
            <Layout className={'layout'}>
                <Content>
                    <Row>
                        <Col xs={{offset: 1, span: 23}} 
                            xl={{offset: 3, span: 6}} 
                            xxl={{offset: 3, span: 6}}>
                                <AvatarWrap>
                                    {profileinfo.info.avatar === null ? 
                                        <Avatar size={256} shape="square" icon={<UserOutlined />} /> :
                                        <img src={profileinfo.info.avatar} alt="avatar" />
                                    }
                                </AvatarWrap>
                                <TitleWrap>
                                    <Title>
                                    {profileinfo.info.nickname}
                                    </Title>
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
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </div>
    )
}


export default ProfilesPage