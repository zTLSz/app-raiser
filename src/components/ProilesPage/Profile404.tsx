import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TopMenu from '../TopMenu/TopmenuWrap'
import { Layout, Row, Col, Typography } from 'antd';

const { Title, Text } = Typography;
const { Content } = Layout;



const TitleWrap = styled.div`
    margin-bottom: 40px;
    text-align: center;
`





interface PageTypes {
}


const ProfilesPage404: React.FC<PageTypes> = (props) => {

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


export default ProfilesPage404