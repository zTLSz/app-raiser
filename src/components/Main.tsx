import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux'
import { requestLogout } from '../actions/auth'
import TopMenu from './TopMenu/TopmenuWrap'

interface MainPageTypes {

}

const MainPage: React.FC<MainPageTypes> = () => {

    const dispatch = useDispatch();


    return (
        <div>
            <TopMenu activeEl={'main'}/>
            Главная страница!
        </div>
    )
}


export default MainPage