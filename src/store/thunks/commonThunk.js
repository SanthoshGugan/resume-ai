import { dispatch } from "d3";
import { jdReset } from "../jobDescriptionSlice";
import { qResultReset } from "../queryResultsSlice";
import { resumeReset } from "../resumeSlice";
import { timelineReset } from "../timelineSlice";
import { userReset } from "../userSlice";
import { widgetReset } from "../widgetSlice";

export const resetStore = () => async (dispatch, getState) => {
    dispatch(jdReset());
    dispatch(resumeReset());
    dispatch(qResultReset());
    dispatch(timelineReset());
    dispatch(userReset());
    dispatch(widgetReset());
}

export const startOver = () => async (dispatch, getState) => {
    dispatch(jdReset());
    dispatch(resumeReset());
    dispatch(qResultReset());
    dispatch(timelineReset());
    dispatch(widgetReset());
};