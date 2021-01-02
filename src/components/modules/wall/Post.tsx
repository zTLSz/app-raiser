import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import { Layout, Typography, Button, Input } from 'antd';
import { Comment } from 'antd';
import { Tooltip, Avatar } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { requestSetPostLike } from '../../../actions/postlikes/setPostLike' 



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



interface WallTypes {
    post: any,
    author: any, 
    name: any,
    user: any
}



const WallPost: React.FC<WallTypes> = (props) => {


    const { post, author, name, user } = props;
    const dispatch = useDispatch();
    const [likes, setLikes] = useState(post.likes);
    const [dislikes, setDislikes] = useState(post.dislikes);
    const [action, setAction] = useState(post.isLikedByCurrentUser ? 'liked' : '' );
    const postdate = new Date(post.date)

    const like = () => {
        dispatch(requestSetPostLike(post.postId, author, name, user, post.likes))
        setLikes(post.likes + 1);
        setDislikes(post.dislikes);
        setAction('liked');
    };

    const dislike = () => {
        setLikes(post.likes);
        setDislikes(post.dislikes + 1);
        setAction('disliked');
    };

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
          <span onClick={like}>
            {React.createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
            <span className="comment-action">{likes}</span>
          </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
          <span onClick={dislike}>
            {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
            <span className="comment-action">{dislikes}</span>
          </span>
        </Tooltip>,
    ];
    



    return (
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
    )
}


export default WallPost

/*

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
*/