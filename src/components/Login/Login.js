import { withAuthenticator } from '@aws-amplify/ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginUser, setSignOut, setuserId } from '../../store/userSlice';
import { useEffect } from 'react';
import { resetStore } from '../../store/thunks/commonThunk';
import { previousPageSelector } from '../../store/selectors/uiSelector';
import { setPaymentTriggered, setPreviousPage } from '../../store/uiSlice';
import { URLs } from '../../utils/urls';

const Login = ({isPassedToWithAuthenticator, signOut, user }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const previousPage = useSelector(state => previousPageSelector(state));
    const location = useLocation();
    
    const redirectToPreviousPage = () => {
        const from = location.state?.from?.pathname || '/';
        navigate(from);
    };

    useEffect(() => {
        if (user) {
            // Redirect to home page once signed in successfully
            // dispatch(resetStore());
            console.log(user);
            const payload = {
                userId: user?.userId,
                userEmail: user?.signInDetails?.loginId,
                userPlan: 'free'
            }
            // dispatch(setuserId(user?.userId));
            dispatch(loginUser({ payload }));
            const from = location.state?.from?.pathname || '/';

            if(from == '/pricing'){
                dispatch(setPaymentTriggered(true));
            }
            redirectToPreviousPage();
        }
    }, [user, navigate]);
    return (
        <></>
    );
};

export default withAuthenticator(Login);