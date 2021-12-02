import React, {useState} from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import Motw from './Motw';
import { updateMovie } from '../services/Apis';

const MotwContainer = ({movieList, updateMotw }) => {
    const motw = movieList ? movieList.filter(movie => movie.isMotw)[0] : {};
    const initialCommentFormState = {_id: null, content: '', user: ''};

    const [ comments, setComments ] = useState([]);
    const [ commentEditStatus, setCommentEditStatus ] = useState(false);
    const [ commentToEdit, setCommentToEdit ] = useState(initialCommentFormState);

    console.log(movieList);
    console.log(motw);

    const editComment = (comment) => {
        console.log(comment);
    };

    const deleteComment = (comment) => {
        console.log(comment);
    };

    const addComment = async (comment) => {
        comment.id = Math.random();
        setComments([...comments, comment]);
        motw.comments = comments;
        console.log(motw);
        const { _id, ...movieWithoutId} = motw;
        await updateMovie(_id, movieWithoutId);
    };

    return (
        <>
        <div className="row d-flex justify-content-between">
            <div className="col-6">
                <h1>Movie of the Week</h1>
            </div>
            <div className="col-5 p-2 m-2 text-end align-items-center">
                <DropdownButton id="dropdown-title" title="Change Movie">
                    {
                    movieList
                    ? (movieList.sort((a, b) => a.title.localeCompare(b.title))
                        .map((movie, _id) => (<Dropdown.Item key={_id} movie={movie} onClick = {() => updateMotw(movie._id)}>{movie.title}</Dropdown.Item>)))
                    : (<Dropdown.Item>No Movies</Dropdown.Item>)
                    }
                </DropdownButton>
            </div>
            {motw ? <Motw motw={motw}/> : <p>No Movie Selected.</p>}
        </div>
        <CommentList comments={motw ? motw.comments : []} onEdit={editComment} onDelete= {deleteComment}/>
        <CommentForm onAdd={addComment} editStatus={commentEditStatus} commentToEdit={commentToEdit}/>
        </>
    )
};

export default MotwContainer;
