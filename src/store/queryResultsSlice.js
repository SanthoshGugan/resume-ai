import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  byId: {},                // Widgets data keyed by widgetId
  allIds: [],              // List of all widget IDs
};

const widgetSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const widget = action.payload;
      state.byId[widget.id] = widget;
      state.allIds.push(widget.id);
    },
    updateWidgetStatus: (state, action) => {
      const { widgetId, status } = action.payload;
      state.byId[widgetId].status = status;
    },
  },
});

export const { addWidget, updateWidgetStatus } = widgetSlice.actions;

export default widgetSlice.reducer;