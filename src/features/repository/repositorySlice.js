import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    repositories: [],
    loading: false,
    error: false,
}

export const repositorySlice = createSlice({
    name: 'repository',
    initialState,
    reducers: {
        getRepositories: (state, action) => {
            state.loading = true;
            state.error = false;
            state.repositories = [];
        },
        getRepositoriesSuccess: (state, action) => {
            state.repositories = action.payload;
            state.loading = false;
        },
        getRepositoriesFailure: (state, action) => {
            state.error = action.payload.error;
            state.loading = false;
        }
    }
})

const { getRepositories, getRepositoriesSuccess, getRepositoriesFailure } = repositorySlice.actions;

export const fetchData = (search) => async dispatch => {
    dispatch(getRepositories());

    try {
        const { data } = await axios.get('https://api.github.com/search/repositories', {
            params: {
                q: search,
                per_page: 20,
            },
            headers: {
                'Accept': 'application/vnd.github.v3+json',
            },
        });

        dispatch(getRepositoriesSuccess(data.items));
    } catch (err) {
        dispatch(getRepositoriesFailure(err.toString()))
    }
}


export default repositorySlice.reducer;