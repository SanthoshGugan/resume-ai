import { signOut } from 'aws-amplify/auth';
import { resetStore } from './commonThunk';
import { setuserId } from '../userSlice';

export const userLogout = (navigate) => async  (dispatch, getState) => {
    signOut();
    dispatch(resetStore());
    dispatch(setuserId(null));
    navigate('/login'); 
};