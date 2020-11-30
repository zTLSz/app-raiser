import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import { Layout, Row, Col, Typography, Button, Input } from 'antd';
import { AuthTypes } from '../reducers/authreducer';
import { UserEditTypes } from '../reducers/editprofilereducer';
import TopMenu from './TopMenu/TopmenuWrap'
import { requestEditProfile } from '../actions/editProfile'



const { Title, Text } = Typography;
const { Content  } = Layout;

const TitleWrap = styled.div`
    margin-bottom: 40px;
`

const EditItem = styled.div`
    margin-bottom: 40px;
`

const LabelText = styled.div`
    margin-bottom: 10px;
`

const EditStatus = styled.div`
    margin-top: 10px;
`

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

    const [name, setName] = useState(userinfo.nickname)
    const [isDisabled, setDisabled] = useState(false)

    const editName = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value)

        if (name.length < 2) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }


    return (
        <div>
            <TopMenu activeEl={'editprofile'}/>
            <Layout style={{ background: 'white', marginTop: '40px' }}>
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
                                            Введите имя
                                        </LabelText>
                                        <Input placeholder="Введите имя" 
                                            value={name}
                                            onChange={(e) => editName(e)}
                                            maxLength={25}
                                        />
                                    </label> 
                                </EditItem>
                                <Button loading={editstatus.isLoading} 
                                        type="primary" 
                                        size="large"
                                        onClick={() => dispatch(requestEditProfile(name, usercounter))}
                                        disabled={false}
                                    > 
                                    Сохранить
                                </Button>
                                <EditStatus>
                                    {editstatus.isEdit ? <Text type="success">Успешное изменение профиля!</Text> : ''}
                                    {editstatus.isEditError ? <Text type="danger">Произошла ошибка! Проверь правильность данных</Text> : ''}
                                </EditStatus>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </div>
    )
}


export default EditProfilePage