import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getMovieTitle } from '../services/Apis';

const ModalForm = ({ show, editStatus, movieToEdit, handleClose, onUpdate, onAdd }) => {
    // Initialize state on form
    const [title, setTitle] = useState('');
    const [poster, setPoster] = useState('');
    const [description, setDescription] = useState('');
    const [year, setYear] = useState('');
    // Initialized to preserve state on movie objects
    const [_id, set_id] = useState('');
    const [comments, setComments] = useState([]);

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
        setTitle(movieToEdit.title ?? '');
        setPoster(movieToEdit.poster ?? '');
        setDescription(movieToEdit.description ?? '');
        set_id(movieToEdit._id ?? '');
        setYear(movieToEdit.year ?? '');
        setComments(movieToEdit.comments ?? []);
    };

    // Handle form submission. Adds to state and server. Resets form.
    const onSubmit = (e) => {
        e.preventDefault();

        if(editStatus) {
            onUpdate({_id, title, poster, description, comments, year});
        } else {
            onAdd({title, poster, description, comments, year});
        }
        blankForm();
    };

    // Clears form and state upon submit
    const blankForm = () => {
        setTitle('');
        setPoster('');
        setDescription('');
        set_id('');
        setYear('');
        setComments([]);
    }

    // Checks OMDB API for movie title
    const handleBlur = async () => {
        const omdbMovie = await getMovieTitle(title);
        setDescription(omdbMovie.Plot);
        setPoster(omdbMovie.Poster);
        setTitle(omdbMovie.Title);
        setYear(omdbMovie.Year);
    }

    return (
        <>
        <Modal show={show} onHide={handleClose}>
        <Form onSubmit={onSubmit} className="bg-dark">
          <Modal.Header closeButton>
            {editStatus 
                ? <Modal.Title>Update Movie</Modal.Title>
                : <Modal.Title>Add Movie</Modal.Title>
            }
          </Modal.Header>
          <Modal.Body>
                <Form.Group className="mb-3" id="movieForm.title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        name="title" 
                        type="input" 
                        value={title} 
                        onBlur={handleBlur} 
                        onChange={(e) => setTitle(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" id="movieForm.poster">
                    <Form.Label>Poster URL</Form.Label>
                    <Form.Control 
                        name="poster" 
                        type="input" 
                        value={poster} 
                        onChange={(e) => setPoster(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" id="movieForm.poster">
                    <Form.Label>Year</Form.Label>
                    <Form.Control 
                        name="year" 
                        type="input" 
                        value={year} 
                        onChange={(e) => setYear(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" id="movieForm.description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        name="description" 
                        as="textarea" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" 
                onClick={handleClose}>Cancel</Button>
                {editStatus 
                    ? <Button 
                        variant="warning" 
                        type="submit" 
                        onClick={handleClose}>
                        Update Movie
                    </Button>
                    : <Button 
                        variant="primary" 
                        type="submit" 
                        onClick={handleClose}>
                        Add Movie
                    </Button>
                }
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    )
};

export default ModalForm;
