import React from 'react';
import Comment from './Comment';

const CommentList = ({comments, onEdit, onDelete}) => {
    return (
        <div>
            {comments
            ? <>{comments.map((comment, id) => (<Comment key={id} comment={comment} onDelete={onDelete} onEdit={onEdit}/>))}</>
            : <h4>No Comments Yet</h4>
            }
        </div>
    )
};

export default CommentList;
