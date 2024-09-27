import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ResumeAi from "./components/ResumeAi";
import Landing from "./components/Landing";
import ResumeManagerContainer from "./components/ResumeManager/ResumeManagerContainer";
import Home from "./components/Home/Home";
import ResumesUploadHOC from "./components/ResumesUploadHOC"
import JDuploadHoc from "./components/JDUploadHoc"
import QueryBoard from "./components/QueryBoard/QueryBoard";

const route = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/chatresume',
        element: <ResumeAi />
    },
    {
        path: '/landing',
        element: <Landing />
    },
    {
        path: '/upload-resume',
        element: <ResumeManagerContainer />
    },
    {
        path: '/home',
        element: <Home />,
        children: [
            {
                path: 'jd-upload',
                element: <JDuploadHoc/>
            },
            {
                path: 'resume-upload',
                element: <ResumesUploadHOC/>
            },
            {
                path: 'queries',
                element: <QueryBoard />
               
            }
        ]
    }
]);

export default route;