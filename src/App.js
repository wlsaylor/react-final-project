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
    const initialFormState = {_id: null, title: '', poster:'', description:'', rating:'', year: ''};
    const initialCommentFormState = {_id: null, content: '', user: ''};

    // State for app
    const [ movieList, setMovielist ] = useState([]);
    const [ editStatus, setEditStatus ] = useState(false);
    const [ movieToEdit, setMovieToEdit ] = useState(initialFormState);
    const [ movieToDelete, setMovieToDelete ] = useState([]);
    const [ show, setShow] = useState(false);
    const [ confirmShow, setConfirmShow ] = useState(false);
    const [ motw, setMotw ] = useState([]);
    const [ motwComments, setMotwComments ] = useState([]);
    const [ commentEditStatus, setCommentEditStatus ] = useState(false);
    const [ commentToEdit, setCommentToEdit ] = useState(initialCommentFormState);

    // Iniitialize client state from server payload
    useEffect(() => {
        fetchMovies();
    }, []);

    // GET movies from server
    const fetchMovies = async () => {
        const moviesFromServer = await getMovieList() ?? [];
        setMovielist(moviesFromServer);
        setMotw(moviesFromServer.filter((movie) => movie.isMotw === true));
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
        setMovieToEdit(movieList.filter(movie => movie._id === _id));
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
        setMotw(newMotw);
        await onUpdate(newMotw);
    };

    // Loads comment to edit into comment form
    const editComment = (comment) => {
        const movieToEditCommentFrom = motw[0];
        const commentIndexToEdit = movieToEditCommentFrom.comments.findIndex(e => e.id === comment.id);
        setCommentToEdit(movieToEditCommentFrom.comments[commentIndexToEdit]);
        setCommentEditStatus(true);
    };

    // Handles comment state and API upon comment form submit
    const updateComment = async (comment) => {
        const movieToUpdate = motw[0];
        const commentIndexToUpdate = movieToUpdate.comments.findIndex(e => e.id === comment.id);
        movieToUpdate.comments.splice(commentIndexToUpdate, 1, comment);
        const { _id, ...movieWithoutId} = movieToUpdate;
        await updateMovie(_id, movieWithoutId);
        await fetchMovies();
        setCommentEditStatus(false);
    };

    // Handles commend deletion
    const deleteComment = async (comment) => {
        const movieToDeleteFrom = motw[0];
        const commentIndexToDelete = movieToDeleteFrom.comments.findIndex(e => e.id === comment.id);
        movieToDeleteFrom.comments.splice(commentIndexToDelete, 1);
        await onUpdate(movieToDeleteFrom);
    };

    // Creates a new comment in comment array
    const addComment = async (comment) => {
        comment.id = Math.random();
        const commentedMovie = motw[0];
        commentedMovie.comments.push(comment);
        const { _id, ...movieWithoutId} = commentedMovie;
        await updateMovie(_id, movieWithoutId);
        setMotwComments(commentedMovie.comments);
    };

    return (
        <div>
            <NavBar/>
            <div className="container mb-2 min-vh-100">
                <Routes>
                    <Route 
                        path="/" 
                        element={<MotwContainer 
                        movieList={movieList} 
                        updateMotw = {updateMotw} />} />
                    <Route 
                        path="/list" 
                        element={<MovieList 
                            movieList={movieList} 
                            onNew={newMovie} 
                            onEdit={editMovie} 
                            onDelete={confirmDelete}/>} />
                    <Route 
                        path="/motw" 
                        element={<MotwContainer 
                            movieList={movieList} 
                            updateMotw ={updateMotw} 
                            onAdd={addComment} 
                            onEdit={editComment} 
                            onDelete={deleteComment} 
                            commentToEdit={commentToEdit} 
                            commentEditStatus={commentEditStatus} 
                            motwComments={motwComments} 
                            onUpdate={updateComment}/>} />
                    <Route 
                        path="*" 
                        element={<NotFound />} />
                </Routes>
            </div>
            <ModalForm 
                show={show} 
                editStatus={editStatus} 
                movieToEdit={movieToEdit} 
                handleClose={handleClose} 
                onUpdate={onUpdate} 
                onAdd={addMovie} />
            <ConfirmModal 
                confirmShow = {confirmShow} 
                onDelete={removeMovie} 
                handleConfirmClose={handleConfirmClose} 
                movieToDelete={movieToDelete}/>
        </div>
    )
};

export default App;
