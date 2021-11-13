import React from 'react'
import { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router';
import Motw from './components/Motw';
import MovieList from './components/MovieList';
import ModalForm from './components/ModalForm';
import { getMovieList, createMovie, deleteMovie, updateMovie } from './services/Apis';

const App = () => {

    // Give Edit Form initial state to keep it controlled
    const initialFormState = {_id: null, title: '', link:'', description:'', rating:''};

    // Add state
    const [ movieList, setMovielist ] = useState([]);
    const [ editStatus, setEditStatus ] = useState(false);
    const [ movieToEdit, setMovieToEdit ] = useState(initialFormState);
    const [ show, setShow] = useState(false);

    // Iniitialize client state from server payload
    useEffect(() => {
        fetchMovies();
    }, []);

    // GET movies from server
    const fetchMovies = async () => {
        const moviesFromServer = await getMovieList();
        setMovielist(moviesFromServer);
    };

    // ADD movie to state and server
    const addMovie = async (movie) => {
        await createMovie(movie);
        await fetchMovies();
    };

    // DELETE target movie from state and server
    const removeMovie = async (_id) => {
        await deleteMovie(_id);
        setMovielist(movieList.filter((movie) => movie._id !== _id));
    };
        
    // UPDATE movie and refresh list
    const onUpdate = async (editedMovie) => {
        const { _id, ...movieWithoutId} = editedMovie;
        await updateMovie(_id, movieWithoutId);
        await fetchMovies();
    }

    // Modal helper functions
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Display edit movie modal with populated values
    const editMovie = (_id) => {
        setMovieToEdit(movieList.filter((movie) => movie._id === _id));
        setEditStatus(true);
        handleShow();
    };

    // Display new movie modal
    const newMovie = () => {
        setEditStatus(false);
        handleShow();
    };

    return (
        <Container fluid>
            <NavBar />
            <Routes>
                <Route path="/" element={<Motw />} />
                <Route path="/list" element={<MovieList movieList={movieList} onNew={newMovie} onEdit={editMovie} onDelete={removeMovie}/>} />
                <Route path="/motw" element={<Motw />} />
            </Routes>
            <ModalForm show={show} editStatus={editStatus} movieToEdit={movieToEdit} handleClose={handleClose} onUpdate={onUpdate} onAdd={addMovie} />
        </Container>
    )
}

export default App
