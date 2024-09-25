import { addRemainingQuery } from "../queryResultsSlice";
import { triggerQueries } from "./queryThunks";

export const onQuerySelectThunk = (query) => async (dispatch, getState) => {
    console.log(`on query think select`, query);
    dispatch(triggerQueries([query]));
    dispatch(addRemainingQuery(query));
};