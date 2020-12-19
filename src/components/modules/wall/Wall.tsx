import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import { GetWallTypes } from '../../../reducers/getwallposts'
import { AddWallTypes } from '../../../reducers/addwallpost'
import { Layout, Typography, Button, Input } from 'antd';
import { Comment } from 'antd';
import { requestAddWallPost } from '../../../actions/addwallpost'
import { requestGetWallPosts } from '../../../actions/getWallPosts'

const { Title, Text } = Typography;
const { TextArea } = Input;



const TitleWrap = styled.div`
    margin-bottom: 40px;
    text-align: center;
`

const AddWallPost = styled.div`
    textarea {
        resize: none;
    }
`

const AddWallPostArea = styled.div`
    margin-bottom: 20px;
`

const AddWallPostButton = styled.div`

`

const Error = styled.div`
    margin-top: 10px;
`


interface WallTypes {
    user: number,
    author: number
}

interface PostsStateTypes {
    wallposts: GetWallTypes,
    addwallpost: AddWallTypes
}



const Wall: React.FC<WallTypes> = (props) => {


    const { user, author } = props;
    const dispatch = useDispatch();
    const [post, setPost] = useState('')
    const walldata = useSelector((state: PostsStateTypes) => state.wallposts)
    const addpoststatus = useSelector((state: PostsStateTypes) => state.addwallpost)
    
    const posts = walldata.postsdata.posts;
    let postItems;

    if (posts.length > 0) {
        postItems = posts.map((post, i) => <Comment key={i} author={post.author} content={post.text}></Comment>)
    }

    useEffect(() => {
        dispatch(requestGetWallPosts(user))
    }, [])


    return (
        <>
            <TitleWrap>
                <Title>
                    Стена
                </Title>
            </TitleWrap>
            <AddWallPost>
                <AddWallPostArea>
                    <TextArea
                        placeholder="Введите Текст"
                        autoSize={{ minRows: 1, maxRows: 6 }}
                        maxLength={500}
                        value={post}
                        onChange={(e) => setPost(e.target.value)}
                    />
                </AddWallPostArea>
                <AddWallPostButton>
                    <Button 
                        loading={addpoststatus.isLoading} 
                        type="primary" 
                        size="large"
                        disabled={false}
                        onClick={() => dispatch(requestAddWallPost(post, Date.now(), user, author))}
                    > 
                        Отправить
                    </Button>
                    {addpoststatus.isError ? 
                        <Error>
                            <Text type="danger">Произошла ошибка! Проверь правильность данных</Text> 
                        </Error>
                        : 
                    ''}
                </AddWallPostButton>
                {postItems}
            </AddWallPost>
        </>
    )
}


export default Wall