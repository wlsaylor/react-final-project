import React from 'react';
import { Button } from 'react-bootstrap';

const Movie = ({movie, onDelete, onEdit}) => {
    return (
        <div>
            <p>{movie.title}</p>
            <p>{movie.link}</p>
            <p>{movie.rating}</p>
            <p>{movie.description}</p>
            <Button variant="danger" className="m-1" type="button" onClick={() => onDelete(movie._id)}>Delete</Button>
            <Button variant="warning" className="m-1" type="button" onClick={() => onEdit(movie._id)}>Edit</Button>
        </div>
    )
};

export default Movie;
