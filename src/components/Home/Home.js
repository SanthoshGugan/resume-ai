import { Container } from "react-bootstrap";
import Header from "../Header/Header";
import Board from "../Board/Board";
import Actions from "../Actions/Actions";


const Home = () => {
    return (<Container>
        <Header />
        <Board />
        <Actions />
    </Container>);
};

export default Home;