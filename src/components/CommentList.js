import React from 'react';
import Comment from './Comment';

const CommentList = ({motwComments, onEdit, onDelete}) => {
    return (
        <div>
            {motwComments
            ? <>{motwComments.map((comment, id) => 
                (<Comment 
                    key={id} 
                    comment={comment} 
                    onDelete={onDelete} 
                    onEdit={onEdit}/>))}</>
            : <h4>No Comments Yet</h4>
            }
        </div>
    )
};

export default CommentList;
