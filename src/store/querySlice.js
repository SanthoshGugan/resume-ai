import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  available: [],           // List of available queries
  selected: [],            // List of selected queries
  status: 'idle',          // 'idle' | 'running' | 'completed' | 'failed'
  byId: {},                // Query data keyed by queryId
  parallelAllowed: true,   // Flag for allowing parallel query execution
};

const querySlice = createSlice({
  name: 'queries',
  initialState,
  reducers: {
    selectQuery: (state, action) => {
      const query = action.payload;
      state.selected.push(query);
    },
    updateQueryStatus: (state, action) => {
      const { queryId, status } = action.payload;
      state.byId[queryId].status = status;
    },
    setParallelAllowed: (state, action) => {
      state.parallelAllowed = action.payload;
    },
  },
});

export const { selectQuery, updateQueryStatus, setParallelAllowed } = querySlice.actions;

export default querySlice.reducer;