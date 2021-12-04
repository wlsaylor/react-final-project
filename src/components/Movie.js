import React from 'react';
import { Accordion, Button, ButtonGroup, Card } from 'react-bootstrap';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';

const Movie = ({movie, onDelete, onEdit}) => {
    return (
        <Accordion.Item eventKey={movie._id}>
            <Accordion.Header >
                <div className="d-flex align-items-center">
                    <h5>{movie.title}</h5>
                    {movie.year ? (<small>&ensp;({movie.year})</small>) : ''}
                </div>
            </Accordion.Header>
            <AccordionBody>
                <div className="d-flex justify-content-between align-items-start">
                    <div className="p-1 row">
                        <div className="col-lg-4 m-1">
                            <img src={movie.poster} alt="Movie Poster" width="200px" />
                        </div>
                        <Card className="col-lg-6 m-1 border border-2 border-primary">
                            <Card.Body className="d-flex align-items-center">
                                <p>{movie.description}</p>
                            </Card.Body>
                        </Card>
                    </div>
                    <ButtonGroup className="p-1 d-flex flex-column">
                        <Button 
                            variant="warning" 
                            className="m-1" 
                            type="button" 
                            onClick={() => onEdit(movie._id)}>
                            Edit
                        </Button>
                        <Button 
                            variant="danger" 
                            className="m-1" 
                            type="button" 
                            onClick={() => onDelete(movie._id)}>
                            Delete
                        </Button>
                    </ButtonGroup>
                </div>

            </AccordionBody>
        </Accordion.Item>
    )
};

export default Movie;

