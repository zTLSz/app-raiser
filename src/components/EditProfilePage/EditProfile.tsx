import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import { Layout, Row, Col, Typography, Button, Input } from 'antd';
import { AuthTypes } from '../../reducers/authreducer';
import { UserEditTypes } from '../../reducers/editprofilereducer';
import TopMenu from '../TopMenu/TopmenuWrap'
import { requestEditProfile } from '../../actions/editProfile'
import EditUserPic from './EditPic'



const { Title, Text } = Typography;
const { Content  } = Layout;

const TitleWrap = styled.div`
    margin-bottom: 40px;
`

const EditItem = styled.div`
    margin-bottom: 40px;

    img {
        max-width: 100%;
    }
`

const LabelText = styled.div`
    margin-bottom: 10px;
`

const EditStatus = styled.div`
    margin-top: 10px;
`

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
`

const AvLoadButton = styled.div`
    margin-top: 20px;
`;


interface EditProfilePageTypes {

}

interface AuthState {
    auth: AuthTypes,
    editprofile: UserEditTypes
}



const EditProfilePage: React.FC<EditProfilePageTypes> = () => {

    const dispatch = useDispatch();
    const userinfo = useSelector((state: AuthState) => state.auth.info)
    const usercounter = useSelector((state: AuthState) => state.auth.counter)
    const editstatus = useSelector((state: AuthState) => state.editprofile)

    const [name, setName] = useState(userinfo.about);
    const [load, setLoad] = useState(false);
    const [url, setUrl] = useState('');

    const editName = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value)
    }

    


    


    return (
        <div>
            <TopMenu activeEl={'editprofile'}/>
            <Layout className={'layout'}>
                <Content>
                    <Row>
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
                                            Введите немного информации о себе
                                        </LabelText>
                                        <Input placeholder="Информация о себе" 
                                            value={name}
                                            onChange={(e) => editName(e)}
                                            maxLength={120}
                                        />
                                    </label> 
                                </EditItem>
                                <EditItem>
                                    <Button loading={editstatus.isLoading} 
                                            type="primary" 
                                            size="large"
                                            onClick={() => dispatch(requestEditProfile(name, usercounter))}
                                            disabled={false}
                                        > 
                                        Сохранить
                                    </Button>
                                </EditItem>
                                <EditStatus>
                                    {editstatus.isEdit ? <Text type="success">Успешное изменение профиля!</Text> : ''}
                                    {editstatus.isEditError ? <Text type="danger">Произошла ошибка! Проверь правильность данных</Text> : ''}
                                </EditStatus>
                        </Col>
                        <EditUserPic 
                            usercounter={usercounter}
                            userinfo={userinfo}
                        />
                    </Row>
                </Content>
            </Layout>
        </div>
    )
}


export default EditProfilePage