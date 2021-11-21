import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Motw from './Motw';

const MotwContainer = ({movieList, updateMotw, motw}) => {    
    return (
        <div className="row d-flex justify-content-between">
            <div className="col-6">
                <h1>Movie of the Week</h1>
            </div>
            <div className="col-5 p-2 m-2 text-end align-items-center">
                <DropdownButton id="dropdown-title" title="Change Movie">
                    {movieList
                    .sort((a, b) => a.title.localeCompare(b.title))
                    .map((movie, _id) => (<Dropdown.Item key={_id} movie={movie} onClick = {() => updateMotw(movie._id)}>{movie.title}</Dropdown.Item>))}
                </DropdownButton>
            </div>
            {motw[0] ? <Motw motw={motw}/> : <p>No Movie Selected.</p>}
        </div>
    )
};

export default MotwContainer;
