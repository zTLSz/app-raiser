import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux'
import { requestLogout } from '../../actions/auth'
import TopMenu from '../TopMenu/TopmenuWrap'

interface FriendsPageTypes {

}

const FriendsPage: React.FC<FriendsPageTypes> = () => {

    const dispatch = useDispatch();


    return (
        <div>
            <TopMenu activeEl={'friends'}/>

                <br /><br />
                Страница подписчиков и подписок
        </div>
    )
}


export default FriendsPage