import React from "react";
import { Box, Typography } from "@mui/material";

export const ProofOfConcept = () =>

    <Box display="flex" flexDirection="column" gap={2}>

        <Typography variant="h5">AliceNet Tictactoe (POC)</Typography>

        <Box display="flex" gap={2} sx={{ flexDirection: { xs: "column", md: "row" } }}>

            <Typography variant="span" fontFamily="Roboto" textAlign="justify">
                This application is to demonstrate the use of multi-signature wallets where two wallets are coming
                together to create a group signature used to create, sign, and send transactions. The use cases for
                this are quite powerful as it demands two entities both agree on the data prior to authorizing the
                signature of it.
            </Typography>

            <Typography variant="span" fontFamily="Roboto" textAlign="justify">
                In the context of this application two players (wallets) are agreeing synchronously on a move before
                signing a multi-signature transaction, however the signatures can also happen on different machines
                in different locations by passing a raw transaction to the next signer.
            </Typography>

        </Box>

    </Box>