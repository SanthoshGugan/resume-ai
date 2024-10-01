import { withAuthenticator } from '@aws-amplify/ui-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSignOut, setuserId } from '../../store/userSlice';
import { useEffect } from 'react';
import { resetStore } from '../../store/thunks/commonThunk';

const Login = ({isPassedToWithAuthenticator, signOut, user }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            // Redirect to home page once signed in successfully
            dispatch(resetStore());
            dispatch(setuserId(user?.userId));
            navigate('/');
        }
    }, [user, navigate]);
    return (
        <></>
    );
};

export default withAuthenticator(Login);