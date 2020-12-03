import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import TopMenu from './TopMenu/TopmenuWrap'
import { AuthTypes } from '../reducers/authreducer'
import { Layout, Row, Col, Typography, Button, Input } from 'antd';

const { Title, Text } = Typography;
const { Content } = Layout;



const TitleWrap = styled.div`
    margin-bottom: 40px;
`



interface MainPageTypes {

}

interface AuthState {
    auth: AuthTypes
}

const MainPage: React.FC<MainPageTypes> = () => {

    const dispatch = useDispatch();
    const userinfo = useSelector((state: AuthState) => state.auth.info)


    return (
        <div>
            <TopMenu activeEl={'main'}/>
            <Layout className={'layout'}>
                <Content>
                    <Row>
                        <Col xs={{offset: 1, span: 23}} 
                            xl={{offset: 3, span: 18}} 
                            xxl={{offset: 3, span: 18}}>
                                <TitleWrap>
                                    <Title>
                                        Привет, {userinfo.nickname}
                                    </Title>
                                </TitleWrap>
                        </Col>
                        <Col xs={{offset: 1, span: 23}} 
                            xl={{offset: 3, span: 18}} 
                            xxl={{offset: 3, span: 18}}>
                            <Title level={3}>Ваши подписчики {userinfo.followers}</Title>
                            <Title level={3}>Вы подписаны {userinfo.following}</Title>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </div>
    )
}


export default MainPage