import { addRemainingQuery, enableDomainQuery } from "../queryResultsSlice";
import { triggerQueries } from "./queryThunks";

export const onQuerySelectThunk = ({id, domain}) => async (dispatch, getState) => {
    console.log(`on query think select`, id);
    const { queryResults } = getState();
    const { byQueryId } = queryResults;
    if (byQueryId[id]){ 
        dispatch(enableDomainQuery({ domain }));
        return;
    }
    dispatch(triggerQueries([id]));
    dispatch(addRemainingQuery(id));
};