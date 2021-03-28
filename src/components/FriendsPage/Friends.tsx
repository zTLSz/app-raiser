import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux'
import { Layout, Row, Col, Typography, Button, Input } from 'antd';
import { requestGetSubscribersList } from '../../actions/subscribe/getSubscribersList'
import TopMenu from '../TopMenu/TopmenuWrap'

const { Title, Text } = Typography;
const { Content  } = Layout;

interface FriendsPageTypes {

}

const FriendsPage: React.FC<FriendsPageTypes> = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestGetSubscribersList(10))
    }, []) 


    return (
        <div>
            <TopMenu activeEl={'friends'}/>
            <Layout className={'layout'}>
                <Content>
                    <Row>
                        <Col xs={{offset: 1, span: 23}} 
                            xl={{offset: 3, span: 6}} 
                            xxl={{offset: 3, span: 6}}>
                                <Title>Подписки</Title>
                        </Col>
                        <Col xs={{offset: 1, span: 23}} 
                            xl={{offset: 6, span: 6}} 
                            xxl={{offset: 6, span: 6}}>
                                <Title>Подписчики</Title>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </div>
    )
}


export default FriendsPage