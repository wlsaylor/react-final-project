import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getMovieTitle } from '../services/Apis';

const ModalForm = ({ show, editStatus, movieToEdit, handleClose, onUpdate, onAdd }) => {
    // Initialize state on form
    const [title, setTitle] = useState('');
    const [poster, setPoster] = useState('');
    const [description, setDescription] = useState('');
    const [_id, set_id] = useState('');

    const comments = [];

    // Update form values when the movieToEdit state is updated
    useEffect(
        () => {
            if (show && editStatus) {fillForm(movieToEdit);}
            if (show && !editStatus) {blankForm();}
        },
        [movieToEdit, show, editStatus]
    );

    // Populates values in form for editing
    const fillForm = (movieToEdit) => {
        setTitle(movieToEdit.title);
        setPoster(movieToEdit.poster);
        setDescription(movieToEdit.description);
        set_id(movieToEdit._id);
    };

    // Handle form submission. Adds to state and server. Resets form.
    const onSubmit = (e) => {
        e.preventDefault();

        if(editStatus) {
            onUpdate({_id, title, poster, description});
        } else {
            onAdd({title, poster, description, comments});
        }
        blankForm();
    };

    const blankForm = () => {
        setTitle('');
        setPoster('');
        setDescription('');
    }

    const handleBlur = async () => {
        const omdbMovie = await getMovieTitle(title);
        console.log(omdbMovie);
        setDescription(omdbMovie.Plot);
        setPoster(omdbMovie.Poster);
        setTitle(omdbMovie.Title);
    }

    return (
        <>
        <Modal show={show} onHide={handleClose}>
        <Form onSubmit={onSubmit}>
          <Modal.Header closeButton>
            {editStatus 
                ? <Modal.Title>Update Movie</Modal.Title>
                : <Modal.Title>Add Movie</Modal.Title>
            }
          </Modal.Header>
          <Modal.Body>
                <Form.Group className="mb-3" id="movieForm.name">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="input" value={title} onBlur={handleBlur} onChange={(e) => setTitle(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" id="movieForm.poster">
                    <Form.Label>Poster</Form.Label>
                    <Form.Control type="input" value={poster} onChange={(e) => setPoster(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" id="movieForm.description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                {editStatus 
                    ? <Button variant="warning" type="submit" onClick={handleClose}>Update Movie</Button>
                    : <Button variant="primary" type="submit" onClick={handleClose}>Add Movie</Button>
                }
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    )
};

export default ModalForm;
