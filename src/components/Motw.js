import React from 'react'

const Motw = ({motw}) => {

    return (
        <div>
            <h2>{motw.title}</h2>
            <div className="d-flex justify-content-between align-items-start">
                <div className="p-1 row">
                    <div className="col-lg-3 m-1">
                        <img src={motw.poster} alt="Movie Poster" width="200px" />
                    </div>
                    <div className="col-lg-5 m-1">
                        <p>{motw.description}</p>
                        <p>{motw.rating}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Motw;
