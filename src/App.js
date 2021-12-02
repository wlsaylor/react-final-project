import React from 'react'
import { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router';
import MotwContainer from './components/MotwContainer';
import MovieList from './components/MovieList';
import ModalForm from './components/ModalForm';
import NotFound from './components/NotFound';
import { getMovieList, createMovie, deleteMovie, updateMovie } from './services/Apis';
import ConfirmModal from './components/ConfirmModal';

const App = () => {

    // Give Edit Form initial state to keep it controlled
    const initialFormState = {_id: null, title: '', poster:'', description:'', rating:''};

    // Add state
    const [ movieList, setMovielist ] = useState([]);
    const [ editStatus, setEditStatus ] = useState(false);
    const [ movieToEdit, setMovieToEdit ] = useState(initialFormState);
    const [ movieToDelete, setMovieToDelete ] = useState([]);
    const [ show, setShow] = useState(false);
    const [ confirmShow, setConfirmShow ] = useState(false);

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

    // DELETE movieToDelete from state and server
    const removeMovie = async () => {
        await deleteMovie(movieToDelete[0]._id);
        handleConfirmClose();
        setMovielist(movieList.filter((movie) => movie._id !== movieToDelete[0]._id));
        setMovieToDelete([]);
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
    const handleConfirmClose = () => setConfirmShow(false);
    const handleConfirmShow = () => setConfirmShow(true);

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

    // Display confirm delete modal
    const confirmDelete = (_id) => {
        setMovieToDelete(movieList.filter((movie) => movie._id === _id));
        handleConfirmShow();
    }

    // Update isMotw property on outgoing and incoming Motw movie objects
    const updateMotw = async (_id) => {
        const oldMotw = (movieList.filter((movie) => movie.isMotw === true))[0];
        if (oldMotw) {
            oldMotw.isMotw = false;
            await onUpdate(oldMotw);
        }

        const newMotw = (movieList.filter((movie) => movie._id === _id))[0];
        newMotw.isMotw = true;
        await onUpdate(newMotw);
        console.log(movieList);
    }

    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/" element={<MotwContainer movieList={movieList} updateMotw = {updateMotw} />} />
                <Route path="/list" element={<MovieList movieList={movieList} onNew={newMovie} onEdit={editMovie} onDelete={confirmDelete}/>} />
                <Route path="/motw" element={<MotwContainer movieList={movieList} updateMotw ={updateMotw} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <ModalForm show={show} editStatus={editStatus} movieToEdit={movieToEdit} handleClose={handleClose} onUpdate={onUpdate} onAdd={addMovie} />
            <ConfirmModal confirmShow = {confirmShow} onDelete={removeMovie} handleConfirmClose={handleConfirmClose} movieToDelete={movieToDelete}/>
        </div>
    )
}

export default App

/** TODOS
 * Build Comment Section
 * Add confirm modal for changing Motw
 * Add watch date for Motw
 * Incorporate more movie data into Motw and Movie components
 * Add watch date check to change style on WatchList Accordion
 * 
 * Styling
 *  
 * Stretch Goal: Add loading spinners
 * Stretch Goal: Add Settings for different movie data
 */
