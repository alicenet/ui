import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { SwapActions, StakeActions, Footer, Header } from "components";
import { DarkThemeProvider, TabPanesProvider } from "contexts";
import { ToastContainer } from 'react-toastify';

function App() {

    const state = useSelector(state => state);
    React.useEffect(() => {

        const debugPrint = (ev) => {
            if (ev.keyCode === 68) {
                console.log("Debug Printout:", state);
                return;
            }
        }

        document.addEventListener("keydown", debugPrint);

        return () => {
            document.removeEventListener("keydown", debugPrint);
        }

    })


    const DefaultRoutes = () => {
        return (
            <>
                <Route exact path="/" element={<SwapActions />} />
                <Route exact path="/swap" element={<SwapActions />} />
                <Route exact path="/stake" element={<StakeActions />} />
            </>
        )
    };

    // Catch production render
    if (process.env.REACT_APP__ENV === "PRODUCTION" && process.env.REACT_APP__ISPRODLIVE === "FALSE") {
        return (
            <Container fluid className="flex justify-center items-center mt-10 text-xl">
                <a href="https://alice.net" rel="no-opener no-referrer">https://alice.net</a>
            </Container>
        )
    }

    return (

        <Container fluid className="">
            <BrowserRouter>
                <DarkThemeProvider>
                    <Header />
                    <div className="overflow-auto pb-[112px] ">
                        <TabPanesProvider>
                            <Routes>
                                {DefaultRoutes()}
                            </Routes>
                        </TabPanesProvider>
                        <ToastContainer />
                    </div>
                    <Footer />
                </DarkThemeProvider>
            </BrowserRouter>
        </Container>

    );
}

export default App;
