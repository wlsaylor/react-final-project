import React from 'react'
import { Card } from 'react-bootstrap';

const Motw = ({motw}) => {

    return (
        <div className="mx-4 mb-2">
            <div className="mb-2 row d-flex align-items-center justify-content-between">
                <h2 className="col-3">{motw.title}</h2>
                <p className="col-3 text-end">{motw.year}</p>
            </div>
            <div className="m-2 p-2">
                <div className="p-1 row d-flex m-1 justify-content-between">
                    <div className="col-lg-5 m-1">
                        <img src={motw.poster} alt="Movie Poster" width="300px" />
                    </div>
                    <Card className="col-lg-6 m-1 border border-2 border-primary">
                        <Card.Body className="d-flex justify-content-center flex-column">
                            <p>{motw.description}</p>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
};

export default Motw;
