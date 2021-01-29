import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import WallPost from './Post'
import AddPost from './AddPost'
import { GetWallTypes } from '../../../reducers/getwallposts'
import { AddWallTypes } from '../../../reducers/addwallpost'
import { Layout, Typography, Skeleton, Button } from 'antd';
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
    let postItems: any[] = [];

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
                    <>
                        {postItems}
                        <Skeleton active /> 
                    </>
                    :
                    postItems
                }
                {
                    walldata.isError ?
                    'Что-то пошло не так!' : ''
                }
                {
                    !walldata.isLoading &&
                    !walldata.isError ?
                    <Button type="dashed" block
                        onClick={() => dispatch(requestGetWallPosts(user, author, posts[posts.length - 1].date))}
                    >
                        Еще
                    </Button> : ''
                }
            </AddWallPost>
        </>
    )
}




export default Wall