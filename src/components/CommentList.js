import React from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';

const CommentList = () => {
    return (
        <div>
            <CommentForm />
            <h1>Comment List</h1>
            <Comment />
        </div>
    )
};

export default CommentList;
