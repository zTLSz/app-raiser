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
            <button onClick={() => dispatch(requestLogout())}>
                Logout
            </button>
        </div>
    )
}


export default MainPage