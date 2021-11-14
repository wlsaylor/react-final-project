import React from 'react';
import Movie from './Movie';
import { Button, Accordion } from 'react-bootstrap';

const MovieList = ({onNew, movieList, onDelete, onEdit}) => {

    return (
        <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="mx-3">Watch List</h1>
                <Button variant="primary" className="mx-3" type="button" onClick={() => onNew()}>Add New Movie</Button>
            </div>
            {movieList.length > 0
                ? <Accordion>{movieList.sort((a, b) => a.title.localeCompare(b.title))
                        .map((movie, id) => (<Movie key={id} movie={movie} onDelete={onDelete} onEdit={onEdit} />))}</Accordion> 
                : <h2>No Movies to Show</h2>
            }
        </div>
    )
};

export default MovieList;
