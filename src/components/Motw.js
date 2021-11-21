import React from 'react'

const Motw = ({motw}) => {
    const featureMovie = motw[0];

    return (
        <div>
            <h2>{featureMovie.title}</h2>
            <div className="d-flex justify-content-between align-items-start">
                <div className="p-1 row">
                    <div className="col-lg-3 m-1">
                        <img src={featureMovie.poster} alt="Movie Poster" width="200px" />
                    </div>
                    <div className="col-lg-5 m-1">
                        <p>{featureMovie.description}</p>
                        <p>{featureMovie.rating}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Motw;
