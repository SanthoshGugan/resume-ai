import { withAuthenticator } from '@aws-amplify/ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, setSignOut, setuserId } from '../../store/userSlice';
import { useEffect } from 'react';
import { resetStore } from '../../store/thunks/commonThunk';
import { previousPageSelector } from '../../store/selectors/uiSelector';
import { setPaymentTriggered, setPreviousPage } from '../../store/uiSlice';

const Login = ({isPassedToWithAuthenticator, signOut, user }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const previousPage = useSelector(state => previousPageSelector(state));

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
            const prevPage = previousPage;
            dispatch(setPreviousPage(null));
            
            if(prevPage == '/pricing'){
                dispatch(setPaymentTriggered(true));
            }

            if(prevPage){
                navigate(prevPage);
            } else {
                navigate('/')
            }
        }
    }, [user, navigate]);
    return (
        <></>
    );
};

export default withAuthenticator(Login);