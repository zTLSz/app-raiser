import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import { Layout, Typography, Button, Input } from 'antd';
import { Comment } from 'antd';
import { Tooltip, Avatar } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { requestSetPostLike } from '../../../actions/postlikes/setPostLike' 
import { requestDeletePostLike } from '../../../actions/postlikes/deletePostLike'
import { Route, Switch, useHistory } from "react-router-dom";



const { Title, Text } = Typography;
const { TextArea } = Input;



const CommentWrap = styled.div`
    .comment-action {
        padding-left: 8px;
        cursor: 'auto';
    }

    [class*='-col-rtl'] .comment-action {
        padding-right: 8px;
        padding-left: 0;
    }

    .ant-comment-content-author > a, .ant-comment-content-author > span {
        font-size: 14px;
    }

    .ant-comment-content {
        font-size: 16px;
        padding: 30px;
        background: ghostwhite;
    }
`

const ListLikesLink = styled.div`
    font-size: 12px;
    cursor: pointer;
    a {
        color: rgba(0, 0, 0, 0.45);
    }
`



interface WallTypes {
    post: any,
    author: any, 
    name: any,
    user: any,
}


/* <ListLikesLink onClick={() => history.push('as/test')}>Список</ListLikesLink> */


const WallPost: React.FC<WallTypes> = (props) => {

    const { post, author, name, user } = props;
    const dispatch = useDispatch();
    const history = useHistory();
    const [likes, setLikes] = useState(post.likes);
    const [dislikes, setDislikes] = useState(post.dislikes);
    const [action, setAction] = useState(post.isLikedByCurrentUser);
    const [postdate, setPostDate] = useState(new Date(post.date))



    useEffect(() => {     
        setLikes(post.likes)
        setDislikes(post.dislikes)
        setAction(post.isLikedByCurrentUser)
        setPostDate(new Date(post.date))
    }, [post])
    

    const like = () => {
        dispatch(requestDeletePostLike(post.postId, author, user, likes, dislikes, action))
        dispatch(requestSetPostLike(post.postId, author, name, user, likes, dislikes, 'LIKE'))
        if (action === '') {
            setLikes(likes + 1)
        } else {
            setLikes(likes + 1);
            setDislikes(dislikes - 1);
        }
        setAction('LIKE');
    };

    const dislike = () => {
        dispatch(requestDeletePostLike(post.postId, author, user, likes, dislikes, action))
        dispatch(requestSetPostLike(post.postId, author, name, user, likes, dislikes, 'DISLIKE'))
        if (action === '') {
            setDislikes(dislikes + 1)
        } else {
            setLikes(likes - 1);
            setDislikes(dislikes + 1);
        }
        setAction('DISLIKE');
    };


    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
        {action === 'LIKE' ?
            <span>
                {React.createElement(LikeFilled)}
                <span className="comment-action">{likes}</span>
            </span>
            :
            <span onClick={like}>
                {React.createElement(LikeOutlined)}
                <span className="comment-action">{likes}</span>
            </span>
        }
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
            {action === 'DISLIKE' ?
                <span>
                    {React.createElement(DislikeFilled)}
                    <span className="comment-action">{dislikes}</span>
                </span>
                :
                <span onClick={dislike}>
                    {React.createElement(DislikeOutlined)}
                    <span className="comment-action">{dislikes}</span>
                </span>
            }
        </Tooltip>,
        <ListLikesLink>
            <Link to={`/comment/${post.postId}`}>Список</Link>
        </ListLikesLink>
    ];
    



    return (
        <>
        <CommentWrap>
            <Comment
                actions={actions}
                author={<Link to={`/profile/${post.author}`}>{post.authorName}</Link>}
                content={
                    <p>
                        {post.text}
                    </p>
                }
                datetime={
                    <Tooltip title={postdate.toString()}>
                        <span>{postdate.toString()}</span>
                    </Tooltip>
                }
                />

        </CommentWrap>
        </>
    )
}


const Test22: React.FC<WallTypes> = (props) => { 
    return(
        <div>123213</div>
    )
}


export default WallPost
