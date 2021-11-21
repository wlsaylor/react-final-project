import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getMovieTitle } from '../services/Apis';

const ModalForm = ({ show, editStatus, movieToEdit, handleClose, onUpdate, onAdd }) => {
    // Initialize state on form
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [_id, set_id] = useState('');

    // Update form values when the movieToEdit state is updated
    useEffect(
        () => {
            if (show && editStatus) {fillForm(movieToEdit[0]);}
            if (show && !editStatus) {blankForm();}
        },
        [movieToEdit, show, editStatus]
    );

    // Populates values in form for editing
    const fillForm = (movieToEdit) => {
        setTitle(movieToEdit.title);
        setLink(movieToEdit.link);
        setDescription(movieToEdit.description);
        set_id(movieToEdit._id);
    };

    // Handle form submission. Adds to state and server. Resets form.
    const onSubmit = (e) => {
        e.preventDefault();

        if(editStatus) {
            onUpdate({_id, title, link, description});
        } else {
            onAdd({title, link, description});
        }
        blankForm();
    };

    const blankForm = () => {
        setTitle('');
        setLink('');
        setDescription('');
    }

    const  onBlur = async () => {
        const omdbMovie = await getMovieTitle(title);
        setDescription(omdbMovie.Plot);
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
                    <Form.Control type="input" value={title} onBlur={onBlur} onChange={(e) => setTitle(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" id="movieForm.link">
                    <Form.Label>Link</Form.Label>
                    <Form.Control type="input" value={link} onChange={(e) => setLink(e.target.value)} />
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
