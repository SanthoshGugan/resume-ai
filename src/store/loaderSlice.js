import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isLoading: false,
    progress: 0,
    statusMessage: '',
    imagePath: null
};

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        resetLoader: (state, action) => {
            state.isLoading = false;
            state.progress = 0;
            state.statusMessage = ""
            state.imagePath = ""
        },
        setLoaderVisibility: (state, action) => {
            const isLoading = action.payload;
            state.isLoading = isLoading;
        },
        setLoaderProgress: (state, action) => {
            const progress = action.payload;
            state.progress = progress;
        },
        setLoaderStatusMessage: (state, action) => {
            const message = action.payload;
            state.statusMessage = message;
        },
        setLoaderStatusImage: (state, action) => {
            const imagePath = action.payload;
            state.imagePath = imagePath;
        }
    }
});

export const {
    resetLoader,
    setLoaderVisibility,
    setLoaderProgress,
    setLoaderStatusMessage,
    setLoaderStatusImage

} = loaderSlice.actions;

export default loaderSlice.reducer;