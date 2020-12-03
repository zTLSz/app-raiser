import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import TopMenu from '../TopMenu/TopmenuWrap'
import { ProfileDataTypes } from '../../reducers/getprofilereducer'
import Loader from '../Preloader'
import { requestGetProfile } from '../../actions/getProfile' 
import { Layout, Row, Col, Typography, Button, Input } from 'antd';

const { Title, Text } = Typography;
const { Content } = Layout;



const TitleWrap = styled.div`
    margin-bottom: 40px;
`



interface PageTypes {
    match: {
        params: {
            id: string
        }
    }
}

interface ProfilesState {
    currprofile: ProfileDataTypes
}

const ProfilesPage: React.FC<PageTypes> = (props) => {

    const dispatch = useDispatch();
    const profileinfo = useSelector((state: ProfilesState) => state.currprofile)
    const { match } = props;

    useEffect(() => {
        dispatch(requestGetProfile(match.params.id))
    }, [])

    if (profileinfo.isLoading) {
        return <Loader />
    }

    
    if (profileinfo.isError) {
        return  <div>
                    <TopMenu activeEl={'main'}/>
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
            <TopMenu activeEl={'main'}/>
            <Layout className={'layout'}>
                <Content>
                    <Row>
                        <Col xs={{offset: 1, span: 23}} 
                            xl={{offset: 3, span: 18}} 
                            xxl={{offset: 3, span: 18}}>
                                <TitleWrap>
                                    <Title>
                                        {profileinfo.info.nickname}
                                        {match.params.id}
                                    </Title>
                                </TitleWrap>
                        </Col>
                        <Col xs={{offset: 1, span: 23}} 
                            xl={{offset: 3, span: 18}} 
                            xxl={{offset: 3, span: 18}}>
                            <Title level={3}>Подписчики {profileinfo.info.followers}</Title>
                            <Title level={3}>Подписки {profileinfo.info.following}</Title>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </div>
    )
}


export default ProfilesPage