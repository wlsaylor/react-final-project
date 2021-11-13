import React from 'react';
import Movie from './Movie';
import { Button } from 'react-bootstrap';

const MovieList = ({onNew, movieList, onDelete, onEdit}) => {
    return (
        <div>
            <h1>Movie List</h1>
            <Button variant="primary" className="m-1" type="button" onClick={() => onNew()}>Add New Movie</Button>
            {movieList.length > 0 
                ? movieList.map((movie, id) => (<Movie key={id} movie={movie} onDelete={onDelete} onEdit={onEdit} />))
                : <h2>No Movies to Show</h2>
            }
        </div>
    )
}

export default MovieList
