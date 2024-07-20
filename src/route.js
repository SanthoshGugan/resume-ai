import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ResumeAi from "./components/ResumeAi";

const route = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/chatresume',
        element: <ResumeAi />
    }
]);;

export default route;