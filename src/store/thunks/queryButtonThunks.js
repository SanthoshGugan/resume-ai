import { addRemainingQuery, enableDomainQuery } from "../queryResultsSlice";
import { setQueryStatus } from "./loaderThunk";
import { triggerQueries } from "./queryThunks";

export const onQuerySelectThunk = ({ids = []}) => async (dispatch, getState) => {
    console.log(`on query think select`, ids);
    dispatch(triggerQueries(ids));
    for(const id of ids){
        dispatch(addRemainingQuery(id));
    }
};

export const onQuerySelect = ({id, domain}) => async (dispatch, getState) => {
    console.log(`on query think select`, id, domain);
    const { queryResults } = getState();
    const { byQueryId } = queryResults;
    if (byQueryId[id]){ 
        dispatch(enableDomainQuery({ domain }));
        return;
    }
    dispatch(setQueryStatus({status: domain ? domain: id}))
    dispatch(triggerQueries([id]));
    dispatch(addRemainingQuery(id));
};