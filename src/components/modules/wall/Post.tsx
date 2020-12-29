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


interface WallTypes {
    post: any
}



const WallPost: React.FC<WallTypes> = (props) => {


    const { post } = props;
    const dispatch = useDispatch();
    const postdate = new Date(post.date)
    



    return (
        <>
            <div style={{'marginTop': '20px'}}>
                <div>
                    {post.author}
                </div>
                <div>
                    {post.authorName}
                </div>
                <div>
                    {postdate.toString()}
                </div>
                <div>
                    Likes: {post.likes} <br />
                    Dislikes: {post.dislikes}
                </div>
                <div>
                    {post.text}
                </div>

            </div>
        </>
    )
}


export default WallPost