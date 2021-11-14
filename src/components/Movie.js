import React from 'react';
import { Accordion, Button, ButtonGroup } from 'react-bootstrap';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';

const Movie = ({movie, onDelete, onEdit}) => {
    return (
        <Accordion.Item eventKey={movie._id}>
            <Accordion.Header className="d-flex justify-content-between align-items-start">
                <h5>{movie.title}</h5>
            </Accordion.Header>
            <AccordionBody>
                <div className="d-flex justify-content-between align-items-start">
                    <div className="p-1">
                        <p>{movie.description}</p>
                        <p><a href={movie.link} target="_blank" rel="noreferrer noopener">{movie.link}</a></p>
                        <p>{movie.rating}</p>
                    </div>
                    <ButtonGroup className="p-1">
                        <Button variant="danger" className="m-1" type="button" onClick={() => onDelete(movie._id)}>Delete</Button>
                        <Button variant="warning" className="m-1" type="button" onClick={() => onEdit(movie._id)}>Edit</Button>
                    </ButtonGroup>
                </div>

            </AccordionBody>
        </Accordion.Item>
    )
};

export default Movie;
