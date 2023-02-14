import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "pages";
import { StatusOverlay } from "components";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
    ]);

    return (
        <>
            <StatusOverlay />
            <RouterProvider router={router} />
        </>
    );
}

export default App;
