import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import Motw from './Motw';

const MotwContainer = ({movieList, updateMotw, onAdd, onEdit, onDelete, commentEditStatus, commentToEdit, onUpdate }) => {

    let motw = movieList ? movieList.filter(movie => movie.isMotw)[0] : {};
    let motwComments = motw ? motw.comments : [] ;

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
            {motw
            ? <div>
                <Motw motw={motw}/> 
                <CommentList motwComments={motwComments} onEdit={onEdit} onDelete= {onDelete}/>
                <CommentForm onAdd={onAdd} commentEditStatus={commentEditStatus} commentToEdit={commentToEdit} onUpdate={onUpdate}/>
            </div>
            : <p>No Movie Selected.</p>}
        </div>
        </>
    )
};

export default MotwContainer;
