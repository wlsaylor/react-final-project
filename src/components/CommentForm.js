import React from 'react'
import {Button, Form} from 'react-bootstrap';
import {useState, useEffect} from 'react';

const CommentForm = ({editStatus, onAdd}) => {
    // Initialize state on form
    const [content, setContent] = useState('');
    const [user, setUser] = useState('');
    const [_id, set_id] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        onAdd({user, content})
        blankForm();
    }

    const blankForm = () => {
        setContent('');
        setUser('');
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" id="comment.user">
                <Form.Label>User</Form.Label>
                <Form.Control type="input" value={user} onChange={(e) => setUser(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3" id="comment.content">
                <Form.Label>Comment</Form.Label>
                <Form.Control type="input" value={content} onChange={(e) => setContent(e.target.value)} required />
            </Form.Group>
            <Form.Group>
            {editStatus 
                    ? <Button variant="warning" type="submit">Update Comment</Button>
                    : <Button variant="primary" type="submit">Add Comment</Button>
                }
            </Form.Group>
        </Form>
    )
}

export default CommentForm
