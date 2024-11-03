import { createBrowserRouter, Navigate } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home/Home";
import ResumesUploadHOC from "./components/ResumesUploadHOC";
import JDuploadHoc from "./components/JDUploadHoc";
import QueryBoard from "./components/QueryBoard/QueryBoard";
import Login from "./components/Login/Login";
import DownloadCsv from "./components/Reports/DownloadCsv";
import RazorpayButton from "./components/Payment/RazorpayButton";
import AboutUs from "./components/About/About";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import LandingHeader from "./components/LandingHeader/LandingHeader";
import ErrorPage from "./components/ErrorPage/ErrorPage";

const route = createBrowserRouter([
    {
        path: '/',
        element: <Landing />
    },
    {
        path: '/app',
        element: <Home />,
        children: [
            {
                path: 'jd-upload',
                element: <JDuploadHoc />
            },
            {
                path: 'resume-upload',
                element: <ResumesUploadHOC />
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
                path: '',
                element: <JDuploadHoc />
            },
            {
                path: 'reports',
                element: <DownloadCsv />
            }
        ]
    },
    // {
    //     path: '/payment',
    //     element: <RazorpayButton />
    // },
    // {
    //     path: '/pricing',
    //     element: <PricingPlan /> // Uncomment this route when ready to use the Pricing page
    // },
    {
        path: '/about-us',
        element: <><LandingHeader /><AboutUs /></> 
    },
    {
        path: '/privacy-policy',
        element: <><LandingHeader /><PrivacyPolicy /></>
    },
    {
        path: '/welcome',
        element: <Navigate to="/" replace />
    },
    {
        path: '*',  // This wildcard route should be the last entry
        element: <ErrorPage/>  // Your custom error component
    }

]);

export default route;