import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import Motw from './Motw';

const MotwContainer = ({ movieList, updateMotw, onAdd, onEdit, onDelete, commentEditStatus, commentToEdit, onUpdate }) => {

    // Define Movie of the Week variables without using state
    const motw = movieList ? movieList.filter(movie => movie.isMotw)[0] : {};
    const motwComments = motw ? motw.comments : [] ;

    return (
        <>
        <div className="row d-flex justify-content-between">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h1>Movie of the Week</h1>
                <DropdownButton id="dropdown-title" title="Change Movie" className="mx-3 col-5 text-end">
                    {
                    movieList
                    ? (movieList
                        .sort((a, b) => a.title.localeCompare(b.title))
                        .map((movie, _id) => 
                        (<Dropdown.Item 
                            key={_id} 
                            movie={movie} 
                            onClick = {() => updateMotw(movie._id)}>
                            {movie.title}
                        </Dropdown.Item>)))
                    : (<Dropdown.Item>No Movies</Dropdown.Item>)
                    }
                </DropdownButton>
            </div>
            {motw
            ? <div>
                <Motw 
                    motw={motw}/> 
                <CommentList 
                    motwComments={motwComments} 
                    onEdit={onEdit} 
                    onDelete= {onDelete}/>
                <CommentForm 
                    onAdd={onAdd} 
                    commentEditStatus={commentEditStatus} 
                    commentToEdit={commentToEdit} 
                    onUpdate={onUpdate}/>
            </div>
            : <p>No Movie Selected.</p>}
        </div>
        </>
    )
};

export default MotwContainer;
