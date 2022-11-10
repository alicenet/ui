import { Button, Container, Message } from "semantic-ui-react";
import React, { useState } from "react";
import ethAdapter from "eth/ethAdapter";

export function Connect() {
    const [error, setError] = useState("");

    const [loading, setLoading] = React.useState(false);

    const connect = async () => {
        setError("");
        setLoading(true);
        await ethAdapter.connectToWeb3Wallet((err) => {
            if (err) {
                console.error(err?.error);
                setError(err?.error);
            }
        });
        setLoading(false);
    };

    return (
        <>
            <Container className="flex flex-col justify-around items-center p-4 min-h-[240px]">
                <Button className="m-0 mt-8" secondary color="black" onClick={connect} content="Connect Wallet" loading={loading} />
            </Container>

            <div className="absolute left-0 top-[100%]">
                <Message size="mini" error={!!error} content={error} className="mt-4" hidden={!error} />
            </div>
        </>
    );
}
