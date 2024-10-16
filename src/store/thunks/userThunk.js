import { signOut } from 'aws-amplify/auth';
import { resetStore } from './commonThunk';
import { setFlags, setLoadingFlags, setuserId, setUserPlan } from '../userSlice';
import { fetchUserFeature } from '../../api/userApi';

export const userLogout = (navigate) => async  (dispatch, getState) => {
    signOut();
    dispatch(resetStore());
    dispatch(setuserId(null));
    navigate('/login'); 
};

export const userSync = (id) => async (dispatch, getState) => {
    if (!id) return;
    console.log(`id fafa::: ${id}`);

    const { user } = getState();
    const{ flags = {}, loadingFlags } = user;
    const isEmpty = Object.keys(flags).length === 0;
    try {
        // if (isEmpty || loadingFlags) return;
        dispatch(setLoadingFlags(true));
        const res = await fetchUserFeature({ Key: { id } });
        const {user: user_feature} = res?.data;
        const { plan = {}, plan_id } = user_feature || {};
        const { flags = {} } = plan;
        console.log(`fetch user :: ${flags}`);
        dispatch(setFlags(flags));
        dispatch(setUserPlan(plan_id));
    } catch (err) {
        console.error(`error while fetching user features`, err);
        dispatch(setFlags({}));
    } finally {
        dispatch(setuserId(id));
        dispatch(setLoadingFlags(false));
    }
}