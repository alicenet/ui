import React from "react";
import { Error } from "@mui/icons-material";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useHistory } from "react-router-dom";
import { ErrorContainer } from "components";

export function SearchNotFound({ term }) {

    const history = useHistory();
    const theme = useTheme();

    return (

        <ErrorContainer>

            <Box display="flex" flexDirection="column" fontWeight="bold">
                <Box display="flex" flexDirection="row" alignItems="center" gap={1} fontSize="xxx-large">
                    <Error fontSize="x-large" />
                    <h2>OOPS!</h2>
                </Box>
                <Typography variant="span" fontWeight="bold" fontSize="x-large">Search not found</Typography>
            </Box>

            <Box display="flex" flexDirection="column">
                <span>
                    The search data you entered was:&nbsp;
                    <Typography sx={{ wordBreak: "break-all" }} variant="span" fontWeight="bold">
                        {term}
                    </Typography>
                </span>
                <span>
                    Sorry! This is an invalid search entry.
                </span>
            </Box>

            <Box display="flex" flexDirection="column">
                <span>
                    Instead please try:
                </span>
                <Typography sx={{ color: theme.palette.secondary.main }} variant="span">
                    Block | Transaction | DataStores
                </Typography>
            </Box>

            <Box>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => history.push('/')}
                    sx={{ paddingX: 4, fontSize: "small" }}
                >
                    Back to Monitor
                </Button>
            </Box>

        </ErrorContainer>

    );

}
