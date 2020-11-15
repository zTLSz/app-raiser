import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import TopMenu from './TopMenu/TopmenuWrap'
import { AuthTypes } from '../reducers/authreducer'


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
            {console.log(userinfo)}
            Главная страница!
            Привет, {userinfo.nickname}
            <br />
            Ваши подписчики {userinfo.followers}
            <br />
            Вы подписаны {userinfo.following}
        </div>
    )
}


export default MainPage