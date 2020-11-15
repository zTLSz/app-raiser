import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import { requestLogout } from '../actions/auth'
import TopMenu from './TopMenu/TopmenuWrap'
import { Typography } from 'antd';
import { Layout, Row, Col } from 'antd';
import { Input } from 'antd';
import { AuthTypes } from '../reducers/authreducer';



const { Title } = Typography;
const { Content  } = Layout;

const TitleWrap = styled.div`
    margin-bottom: 40px;
`

const EditItem = styled.div`

`

const LabelText = styled.div`
    margin-bottom: 10px;
`

interface EditProfilePageTypes {

}

interface AuthState {
    auth: AuthTypes
}

const EditProfilePage: React.FC<EditProfilePageTypes> = () => {

    // const dispatch = useDispatch();
    const userinfo = useSelector((state: AuthState) => state.auth.info)
    const [name, setName] = useState(userinfo.nickname)


    return (
        <div>
            <TopMenu activeEl={'editprofile'}/>
            <Layout style={{ background: 'white', marginTop: '40px' }}>
                <Content>
                    <Row>
                        {console.log(name)}
                        <Col xs={{offset: 1, span: 23}} 
                            xl={{offset: 3, span: 18}} 
                            xxl={{offset: 3, span: 18}}>
                                <TitleWrap>
                                    <Title>
                                        Редактирование профиля
                                    </Title>
                                </TitleWrap>
                        </Col>
                        <Col xs={{offset: 1, span: 23}} 
                            xl={{offset: 3, span: 8}} 
                            xxl={{offset: 3, span: 8}}>
                                <EditItem>
                                    <label>
                                        <LabelText>
                                            Введите имя
                                        </LabelText>
                                        <Input placeholder="Введите имя" 
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}/>
                                    </label> 
                                </EditItem>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </div>
    )
}


export default EditProfilePage