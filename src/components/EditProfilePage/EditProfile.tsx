import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import { Layout, Row, Col, Typography, Button, Input, Upload, message } from 'antd';
import { AuthTypes } from '../../reducers/authreducer';
import { UserEditTypes } from '../../reducers/editprofilereducer';
import TopMenu from '../TopMenu/TopmenuWrap'
import { requestEditProfile } from '../../actions/editProfile'
import { requestEditPicProfile } from '../../actions/editUserPic'
import { storageRef } from '../../firebase/firebase'



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

function getBase64(img: any, callback: any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }


  
function beforeUpload(file: any) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}




const EditProfilePage: React.FC<EditProfilePageTypes> = () => {

    const dispatch = useDispatch();
    const userinfo = useSelector((state: AuthState) => state.auth.info)
    const usercounter = useSelector((state: AuthState) => state.auth.counter)
    const editstatus = useSelector((state: AuthState) => state.editprofile)

    const [name, setName] = useState(userinfo.nickname);
    const [load, setLoad] = useState(false);
    const [url, setUrl] = useState('');

    const editName = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value)
    }

    
    const avRef = storageRef.child(`avatars/${usercounter}`);

    
    const handleChangeAvatar = (e: any) => {
        let files = Array.from(e.target.files);

        files.forEach((file: any) => {
            avRef.put(file).then(s => {
                avRef.getDownloadURL().then(res => {
                    dispatch(requestEditPicProfile(res, usercounter))
                    setUrl(res)
                })
            })
        })
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
                                    <input className="avatar-uploader" type="file" onChange={(e) => handleChangeAvatar(e)}/>
                                    <img src={url} alt="avatar" style={{ width: '100%' }} /> 
                                </EditItem>
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