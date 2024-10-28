import { fetchAllPlans } from "../../api/planApi"
import { setPlans } from "../planSlice";

export const fetchPlans = () => async (dispatch, getState) => {
    const plans = await fetchAllPlans();
    const { data } = plans;
    dispatch(setPlans(data?.plans));
}