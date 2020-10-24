import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux'
import { requestLogout } from '../actions/auth'
import TopMenu from './TopMenu/TopmenuWrap'

interface EditProfilePageTypes {

}

const EditProfilePage: React.FC<EditProfilePageTypes> = () => {

    // const dispatch = useDispatch();


    return (
        <div>
            <TopMenu activeEl={'editprofile'}/>
            Страница редактирования профиля!
        </div>
    )
}


export default EditProfilePage