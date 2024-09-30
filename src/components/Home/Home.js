import { Button, Container } from "react-bootstrap";
import Header from "../Header/Header";
import Board from "../Board/Board";
import Actions from "../Actions/Actions";
import { withAuthenticator } from '@aws-amplify/ui-react';

import {Amplify} from 'aws-amplify';
import awsconfig from '../../aws-exports';

Amplify.configure(awsconfig);

const Home = ({isPassedToWithAuthenticator, signOut, user }) => {
    console.log(`user details : `, user);
    return (<Container>
        <Header signOut={signOut} user={user} />
        <Board />
        <Actions />
    </Container>);
};

export default withAuthenticator(Home);