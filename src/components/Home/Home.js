import { Button, Container } from "react-bootstrap";
import Header from "../Header/Header";
import Board from "../Board/Board";
import Actions from "../Actions/Actions";

import { Amplify } from 'aws-amplify';
import awsconfig from '../../aws-exports';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, } from 'aws-amplify/auth';
import { userIdSelector, userSignOutSelector } from "../../store/selectors/userSelector";
import { setFlags, setUserGuest, setuserId } from "../../store/userSlice";
import Loader from "../Loader/Loader";
import { userSync } from "../../store/thunks/userThunk";
import { fetchAllPlans } from "../../api/planApi";

Amplify.configure(awsconfig);

const Home = () => {
    const signOut = useSelector(state => userSignOutSelector(state));
    const userId = useSelector(state => userIdSelector(state));
    const dispatch = useDispatch();
    

    const setGuestFlags = async () => {
        const { data } = await fetchAllPlans();
        const { plans } = data;
        const guestPlan = plans.find(plan => plan.id === "guest");
        dispatch(setFlags(guestPlan?.flags));
    }

    useEffect(() => {
        const initUser = async () => {
            try {
                const { username, userId, signInDetails } = await getCurrentUser();
                console.log(`userId on changes `, userId);
                dispatch(userSync(userId));
            } catch (err) {
                console.log(`user not logged in`);
                dispatch(setUserGuest());
                await setGuestFlags();
            }
        };
        initUser();
    }, [userId]);
    useEffect(() => {
        const initUser = async () => {
            try {
                const { username, userId, signInDetails } = await getCurrentUser();
                console.log(`iserId on init `, userId);
                dispatch(userSync(userId));
            } catch (err) {
                console.log(`user not logged in`);
                dispatch(setUserGuest());
                await setGuestFlags();
            }
        };
        initUser();
    }, []);
    return (
        <>
            <Loader />
            <Header signOut={signOut} userId={userId} />
            <Board />
            <Actions />
        </>
    );
};



export default Home;