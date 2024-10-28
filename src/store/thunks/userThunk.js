import { signOut } from 'aws-amplify/auth';
import { resetStore } from './commonThunk';
import { logoutUser, setFlags, setLoadingFlags, setuserId, setUserPlan } from '../userSlice';
import { fetchUserFeature, updateUserFeature } from '../../api/userApi';
import { API_ERROR } from '../../utils/constants';

export const userLogout = (navigate) => async  (dispatch, getState) => {
    signOut();
    dispatch(resetStore());
    dispatch(logoutUser());
};

export const userSync = (id) => async (dispatch, getState) => {
    if (!id) return;
    console.log(`id fafa::: ${id}`);

    const { user } = getState();
    const{ flags = {}, loadingFlags, userPlan } = user;
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
        console.log(`error while fetching user features`, err);
        const errorStatus = err?.response?.status;
        const errorCode = err?.response?.data?.errorCode;

        if(errorStatus == API_ERROR.USER_NOT_FOUND.statusCode && errorCode == API_ERROR.USER_NOT_FOUND.errorCode) {
            // user not found, so insert it.
            const updateUserResponse = await updateUserFeature({
                user: {
                    id,
                    plan_id: userPlan || 'guest'
                }
            });
            console.log(`updateUserResponse:: ${JSON.stringify(updateUserResponse)}`);
            dispatch(userSync(id));
            return;
        }
        dispatch(setFlags({}));
    } finally {
        dispatch(setuserId(id));
        dispatch(setLoadingFlags(false));
    }
}