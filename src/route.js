import { createBrowserRouter, Navigate } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home/Home";
import ResumesUploadHOC from "./components/ResumesUploadHOC"
import JDuploadHoc from "./components/JDUploadHoc"
import QueryBoard from "./components/QueryBoard/QueryBoard";
import Login from "./components/Login/Login";
import DownloadCsv from "./components/Reports/DownloadCsv";
import PricingPlan from "./components/Pricing/Pricing";
import RazorpayButton from "./components/Payment/RazorpayButton";

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
              path: "",
              element: <JDuploadHoc/>
            },
            {
                path: "reports",
                element: <DownloadCsv/>
            },
            
        ]
    },
    // {
    //     path: '/pricing',
    //     element: <PricingPlan />
    // },
    {
        path: '/payment',
        element: <RazorpayButton />
    }
]);

export default route;