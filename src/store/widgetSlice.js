import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  byId: {},                // Widgets data keyed by widgetId
  allIds: [],              // List of all widget IDs
  flags: {
    showSkillPercents: false,
    showLabelBadge: false,
    showSimilarity: false,
    showCompanies: false
  }
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
    queryComplete: (state, action) => {
      const { queryId } = action.payload;
      console.log(`queryId :::: ${queryId}`);
      switch(queryId) {
        case "jd_resume_similarity":
          state.flags.showSimilarity = true;
          break;
        case "label":
          state.flags.showSkillPercents = true;
          state.flags.showLabelBadge = true;
          break;
        case "companies":
          state.flags.showCompanies = true;
        default: 
          break;
      }
    },
    widgetReset: state => initialState,
  },
});

export const { addWidget, updateWidgetStatus, queryComplete, widgetReset } = widgetSlice.actions;

export default widgetSlice.reducer;