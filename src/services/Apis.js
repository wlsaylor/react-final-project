
const CRUDCRUD = "ecd299cfe39f458e995be1628b2d6955";
const MOVIE_ENDPOINT = `https://crudcrud.com/api/${CRUDCRUD}/movies`;

const getFetchOptions = (method, data) => ({ 
    method: method, 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
});

/** 
 * GETS movielist from server
 * @returns object
 */
export const getMovieList = async () => {
    try {
        const resp = await fetch(MOVIE_ENDPOINT);
        return await resp.json();
    } 
    catch(e) {
        console.log('There was an error retrieving the movielist', e);
        return null;
    }
}

/**
 * POSTS movie to server
 * @param {object} movie
 * @returns object
 */
export const createMovie = async (movie) => {
    try {
        const resp = await fetch(MOVIE_ENDPOINT, getFetchOptions("POST", movie))
        return await resp.json();
    }
    catch(e) {
        console.log('There was an error adding the movie', e);
        return null;
    }
}

/**
 * UPDATES movie in server
 * @param {string} _id Movie ID
 * @param {object} movieWithoutId 
 * @returns resp
 */
export const updateMovie = async (_id, movieWithoutId) => {
    try {
        const resp = await fetch(`${MOVIE_ENDPOINT}/${_id}`, getFetchOptions("PUT", movieWithoutId));
        return resp;
    }
    catch(e) {
        console.log('There was an error updating the movie', e);
        return null;
    }
}

/**
 * DELETES movie from server
 * @param {string} _id movie ID
 * @returns resp
 */
export const deleteMovie = async (_id) => {
    try {
        const resp = await fetch(`${MOVIE_ENDPOINT}/${_id}`, { method: "DELETE" })
        return resp;
    }
    catch(e) {
        console.log('There was an error deleting the movie', e);
        return null;
    }
}