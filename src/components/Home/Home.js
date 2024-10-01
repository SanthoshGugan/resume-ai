import { Button, Container } from "react-bootstrap";
import Header from "../Header/Header";
import Board from "../Board/Board";
import Actions from "../Actions/Actions";
import { withAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';

import {Amplify} from 'aws-amplify';
import awsconfig from '../../aws-exports';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetStore } from "../../store/thunks/commonThunk";
import { setuserId } from "../../store/userSlice";

Amplify.configure(awsconfig);

const Home = ({isPassedToWithAuthenticator, signOut, user }) => {
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

    console.log(`User details: `, user);
    return (<Container>
        <Header signOut={signOut} user={user} />
        <Board />
        <Actions />
    </Container>);
};

  

export default withAuthenticator(Home);