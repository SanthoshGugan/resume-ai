import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import ResumeAi from "./components/ResumeAi";
import Landing from "./components/Landing";
import ResumeManagerContainer from "./components/ResumeManager/ResumeManagerContainer";
import Home from "./components/Home/Home";
import ResumesUploadHOC from "./components/ResumesUploadHOC"
import JDuploadHoc from "./components/JDUploadHoc"
import QueryBoard from "./components/QueryBoard/QueryBoard";
import UserProfile from "./components/UserProfile/UserProfile";
import Login from "./components/Login/Login";
import DownloadCsv from "./components/Reports/DownloadCsv";

const route = createBrowserRouter([
    {
        path: '/',
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
               
            },
            {
                path: 'login',
                element: <Login />
            },
            {
              path: "/",
              element: <JDuploadHoc/>
            },
            {
                path: "/reports",
                element: <DownloadCsv/>
            }
            
        ]
    },
    {
        path: '/welcome',
        element: <Landing />
    },
]);

export default route;