import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { StakeActions, Footer, Header } from "components";
import { ToastContainer } from 'react-toastify';
import ethAdapter from "eth/ethAdapter";

function App() {

    const state = useSelector(state => state);
    React.useEffect(() => {

        const debugPrint = (ev) => {
            if (ev.keyCode === 68) {
                console.log("Debug Printout:", state);
                return;
            }
        }

        const depositEth = async (ev) => {
            if (ev.keyCode === 69 && ev.shiftKey) {
                console.log("Depositing Eth");
                await ethAdapter.depositEth();

                console.log("Depositing ALCA");
                await ethAdapter.depositAlca();
                return;
            }
        }

        document.addEventListener("keydown", depositEth);
        document.addEventListener("keydown", debugPrint);

        return () => {
            document.removeEventListener("keydown", debugPrint);
            document.removeEventListener("keydown", depositEth);
        }

    })


    const DefaultRoutes = () => {
        return (
            <>
                <Route exact path="/" element={<StakeActions />} />
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
                <Header />
                <div className="overflow-auto pb-[112px] ">
                        <Routes>

                            {DefaultRoutes()}

                        </Routes>
                    <ToastContainer />
                </div>
                <Footer />
            </BrowserRouter>
        </Container>

    );
}

export default App;
