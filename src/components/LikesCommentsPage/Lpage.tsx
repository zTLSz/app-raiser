import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import TopMenu from '../TopMenu/TopmenuWrap';
import { AuthTypes } from '../../reducers/authreducer';
import { Layout, Row, Col, Typography, Button, Input, Avatar } from 'antd';
import { requestGetPostLike } from '../../actions/postlikes/getPostLike';
import { GetPostLikeTypes } from '../../reducers/getpostlikereducer';
import { useParams } from 'react-router-dom'
  



const { Title, Text } = Typography;
const { Content } = Layout;



const TitleWrap = styled.div`
    margin-bottom: 40px;
    text-align: center;
`




interface LCPageTypes {

}


interface LikeState {
    auth: AuthTypes,
    likeslist: GetPostLikeTypes
}


const LcPage: React.FC<LCPageTypes> = () => {

    const dispatch = useDispatch();
    const params: any = useParams();
    const likeslist = useSelector((state: LikeState) => state.likeslist)
    const userCounter = useSelector((state: LikeState) => state.auth.counter)
    let likes ='', dislikes = ''


    
    useEffect(() => {
        dispatch(requestGetPostLike(params.id, userCounter))
    }, [])
    

    if (likeslist.data.length > 0) {
        likes = likeslist.data
                .filter((item: any) => item.type === 'LIKE')
                .map((item: any, i: number) => <div key={i}>{item.name}</div>)
        dislikes = likeslist.data
            .filter((item: any) => item.type === 'DISLIKE')
            .map((item: any, i: number) => <div key={i}>{item.name}</div>)
    }

    return (
        <div>
            <TopMenu activeEl={''} />
            <Layout className={'layout'}>
                <Content>
                    <Row>
                        <Col xs={{offset: 1, span: 23}} 
                            xl={{offset: 3, span: 6}} 
                            xxl={{offset: 3, span: 6}}>
                                <TitleWrap>
                                    <Title>
                                        Likes
                                    </Title>
                                    {likes}
                                </TitleWrap>
                        </Col>
                        <Col xs={{offset: 1, span: 23}} 
                            xl={{offset: 6, span: 6}} 
                            xxl={{offset: 6, span: 6}}>
                               <TitleWrap>
                                    <Title>
                                        Dislikes
                                    </Title>
                                    {dislikes}
                                </TitleWrap>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </div>
    )
}


export default LcPage