import { dispatch } from "d3";
import { jdReset } from "../jobDescriptionSlice";
import { qResultReset } from "../queryResultsSlice";
import { resumeReset } from "../resumeSlice";
import { timelineReset } from "../timelineSlice";
import { userReset } from "../userSlice";

export const resetStore = () => async (dispatch, getState) => {
    dispatch(jdReset());
    dispatch(resumeReset());
    dispatch(qResultReset());
    dispatch(timelineReset());
    dispatch(userReset());
}

export const startOver = () => async (dispatch, getState) => {
    dispatch(jdReset());
    dispatch(resumeReset());
    dispatch(qResultReset());
    dispatch(timelineReset());
};