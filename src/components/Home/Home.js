import { Button, Container } from "react-bootstrap";
import Header from "../Header/Header";
import Board from "../Board/Board";
import Actions from "../Actions/Actions";
import { withAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';

import {Amplify} from 'aws-amplify';
import awsconfig from '../../aws-exports';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetStore } from "../../store/thunks/commonThunk";
import { setuserId } from "../../store/userSlice";
import { userIdSelector, userSignOutSelector } from "../../store/selectors/userSelector";

Amplify.configure(awsconfig);

const Home = () => {
    const signOut = useSelector(state => userSignOutSelector(state));
    const userId = useSelector(state => userIdSelector(state))
    return (<Container>
        <Header signOut={signOut} userId={userId} />
        <Board />
        <Actions />
    </Container>);
};

  

export default Home;