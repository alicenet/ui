import { useTheme } from "@emotion/react"
import { Typography, Box } from "@mui/material"
import ethAdapter from "eth-adapter";
import { useSelector } from "react-redux"
import { splitStringWithEllipses } from "utils/string"

export function ConnectWeb3Button() {

    useSelector(s => (s.ethAdapter)); // Hook into reducer updates so equalize works properly against ethAdapter
    const theme = useTheme()
    const { web3Connected, web3Accounts } = ({
        web3Connected: ethAdapter.connected,
        web3Accounts: ethAdapter.accounts
    })

    return (

        <Box>
            <Typography sx={{ fontWeight: 800, color: theme.palette.secondary.secondary }} onClick={() => ethAdapter.connectToWeb3Wallet()}>
                {web3Connected ? (<>
                    {splitStringWithEllipses(web3Accounts[0], 5)}
                </>) : (<>
                    Connect
                </>)}
            </Typography>
        </Box>
    )


}