import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import CommentList from './CommentList';
import Motw from './Motw';

const MotwContainer = ({movieList, updateMotw }) => {
    console.log(movieList);
    const motw = movieList ? movieList.filter(movie => movie.isMotw)[0] : {};
    console.log(motw);

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
        <CommentList />
        </>
    )
};

export default MotwContainer;
