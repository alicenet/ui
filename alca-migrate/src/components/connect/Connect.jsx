import { Button, Container, Message } from "semantic-ui-react";
import { useContext, useState } from "react";
import config from "utils";
import { TabPanesContext } from "contexts";
import { useSelector } from "react-redux";
import ethAdapter from "eth/ethAdapter";

export function Connect() {
    const { generic, constants } = config;
    const [error, setError] = useState("");
    const { setActiveTabPane } = useContext(TabPanesContext);
    const { web3Connected } = useSelector((state) => ({
        web3Connected: state.application.web3Connected,
    }));

    const connect = () => {
        ethAdapter.connectToWeb3Wallet((err) => {
            if (err) {
                console.error(err?.error);
                setError(err?.error);
            } else {
                setError("");
                setActiveTabPane(constants.tabPanes.MIGRATE);
            }
        });
    };

    return (
        <>
            <Container className="flex flex-col justify-around items-center p-4 min-h-[240px]">
                <div className="text-sm text-center">
                    {web3Connected ? (
                        <></>
                    ) : (
                        <div>
                            <div>Press the button below to connect your web3 wallet</div>
                            <Button
                                className="m-0 mt-8"
                                secondary
                                color="black"
                                onClick={connect}
                                content="Connect Wallet"
                            />
                        </div>
                    )}
                </div>
            </Container>

            <div className="absolute left-0 top-[100%]">
                <Message size="mini" error={!!error} content={error} className="mt-4" hidden={!error} />
            </div>

            <div className="absolute mt-4 right-0 top-[100%]">
                <Button
                    primary
                    content="Continue"
                    className={generic.classNames("m-0", { hidden: !web3Connected })}
                    onClick={() => setActiveTabPane(constants.tabPanes.MIGRATE)}
                />
            </div>
        </>
    );
}
