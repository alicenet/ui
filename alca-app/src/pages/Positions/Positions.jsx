import { NavigationBar } from "components/NavigationBar";

import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { Button, Container, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { HeadingGroup } from "components/HeadingGroup";
import { useState } from "react";
import { useTheme } from "@emotion/react";

export function Positions() {
    const theme = useTheme();
    const [currentTab, setCurrentTab] = useState("1");

    const handleTabChange = (_, newValue) => {
        setCurrentTab(newValue);
    };

    const columns = [
        { field: "amount", headerName: "Amount", flex: 1 },
        {
            field: "id",
            headerName: "ID",
            editable: true,
            flex: 1,
        },
        {
            field: "stakedDate",
            headerName: "Staked Date",
            editable: true,
            flex: 1,
        },
        {
            field: "rewards",
            headerName: "Rewards",
            type: "number",
            editable: true,
            flex: 1,
        },
        {
            field: "claimReward",
            headerName: "Claim Reward",
            type: "number",
            editable: true,
            flex: 1,
            renderCell: (params) => (
                <strong>
                    <Button variant="contained" size="small" color="secondary">
                        Claim
                    </Button>
                </strong>
            ),
        },
        {
            field: "unstaked",
            headerName: "Unstaked",
            type: "number",
            editable: true,
            flex: 1,
            renderCell: (params) => (
                <strong>
                    <Button variant="contained" size="small" color="secondary">
                        Unstake
                    </Button>
                </strong>
            ),
        },
    ];

    const rows = [
        {
            amount: "10 ALCA",
            id: 1,
            stakedDate: "03/12/2022",
            rewards: "100 ALCA / 10 ETH",
            claimReward: "Claim",
            unstaked: "Unstake",
        },
        {
            amount: "10 ALCA",
            id: 2,
            stakedDate: "03/12/2022",
            rewards: "100 ALCA / 10 ETH",
            claimReward: "Claim",
            unstaked: "Unstake",
        },
    ];

    function StakedPositionLabel() {
        return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>Staked Positions</Box>
                <Box
                    sx={{
                        marginLeft: 1,
                        fontSize: "11px",
                        color: theme.palette.background.default,
                        padding: "1px 5px",
                        bgcolor: theme.palette.secondary.main,
                        borderRadius: 10,
                    }}
                >
                    10
                </Box>
            </Box>
        );
    }

    return (
        <>
            <NavigationBar />

            <Container maxWidth="lg">
                <TabContext value={currentTab}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList onChange={handleTabChange} textColor="secondary" indicatorColor="secondary">
                            <Tab label={<StakedPositionLabel />} value="1" />
                            <Tab label="Lockout Positions" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ padding: 0 }}>
                        <Box
                            sx={{
                                padding: 2,
                                bgcolor: "#222",
                                "& .odd": {
                                    bgcolor: "#333",
                                },
                            }}
                        >
                            <Box sx={{ marginBottom: 2 }}>
                                <HeadingGroup title="Current ALCA Balance" subtitle="2,000 ALCA" />
                            </Box>

                            <DataGrid
                                autoHeight
                                rows={rows}
                                columns={columns}
                                getRowClassName={(params) => {
                                    return params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd";
                                }}
                            />
                        </Box>
                    </TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                </TabContext>
            </Container>
        </>
    );
}
