import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import WallPost from './Post'
import AddPost from './AddPost'
import { GetWallTypes } from '../../../reducers/getwallposts'
import { AddWallTypes } from '../../../reducers/addwallpost'
import { Layout, Typography, Skeleton } from 'antd';
import { requestGetWallPosts } from '../../../actions/getWallPosts'

const { Title, Text } = Typography;



const TitleWrap = styled.div`
    margin-bottom: 40px;
    text-align: center;
`

const AddWallPost = styled.div`
    textarea {
        resize: none;
    }
`



interface WallTypes {
    user: number,
    author: number,
    name: string
}

interface PostsStateTypes {
    wallposts: GetWallTypes,
    addwallpost: AddWallTypes
}



const Wall: React.FC<WallTypes> = (props) => {


    const { user, author, name } = props;
    const dispatch = useDispatch();
    const walldata = useSelector((state: PostsStateTypes) => state.wallposts)
    
    const posts = walldata.postsdata;
    let postItems;

    if (posts.length > 0) {
        postItems = posts.map((post, i) => <WallPost key={i} 
                                                     post={post} 
                                                     user={user} 
                                                     author={author} 
                                                     name={name}
                                            />)
    }

    useEffect(() => {
        dispatch(requestGetWallPosts(user, author))
    }, [])






    return (
        <>
            <TitleWrap>
                <Title>
                    Стена
                </Title>
            </TitleWrap>
            <AddWallPost>
                <AddPost user={user} author={author} name={name}/>
                {walldata.isLoading ?
                    <Skeleton active /> :
                    postItems
                }
                {
                    walldata.isError ?
                    'Что-то пошло не так!' : ''
                }
            </AddWallPost>
        </>
    )
}




export default Wall