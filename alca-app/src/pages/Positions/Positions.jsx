import { NavigationBar } from "components/NavigationBar";
import { symbols } from "config/symbolConfiguration";

import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { Button, Container, LinearProgress, Tab, Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import { SubNavigation } from "components/SubNavigation";

export function Positions() {
    const theme = useTheme();
    const [currentTab, setCurrentTab] = useState("1");

    const handleTabChange = (_, newValue) => {
        setCurrentTab(newValue);
    };

    const stakedPositionsColumns = [
        {
            field: "amount",
            headerName: "Amount",
            flex: 0.5,
            sortable: false,
            headerClassName: "headerClass",
        },
        {
            field: "id",
            headerName: "ID",
            flex: 0.25,
            sortable: false,
            headerClassName: "headerClass",
        },
        {
            field: "stakedDate",
            headerName: "Staked Date",
            flex: 0.5,
            sortable: false,
            headerClassName: "headerClass",
        },
        {
            field: "rewards",
            headerName: "Rewards",
            flex: 0.75,
            sortable: false,
            headerClassName: "headerClass",
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            sortable: false,
            showColumnRightBorder: false,
            headerClassName: "headerClass",
            renderCell: (params) => (
                <Box sx={{ display: "flex" }}>
                    <Button variant="contained" size="small" color="secondary" sx={actionButtonStyles}>
                        Claim Rewards
                    </Button>
                    <Button variant="contained" size="small" color="secondary" sx={actionButtonStyles}>
                        Unstake
                    </Button>
                </Box>
            ),
        },
    ];

    const stakedPositionsRows = [
        {
            amount: "2388888 ALCA",
            id: 1,
            stakedDate: "03/12/2022",
            rewards: "100 ALCA / 89999 ETH",
        },
        {
            amount: `10 ${symbols.ALCA}`,
            id: 2,
            stakedDate: "03/12/2022",
            rewards: "100000000 ALCA / 10 ETH",
        },
        {
            amount: "10 ALCA",
            id: 3,
            stakedDate: "03/12/2022",
            rewards: "20000 ALCA / 10 ETH",
        },
        {
            amount: "10 ALCA",
            id: 4,
            stakedDate: "03/12/2022",
            rewards: "100 ALCA / 433 ETH",
        },
    ];

    const lockedPositionsColumns = [
        {
            field: "amount",
            headerName: "Amount",
            flex: 0.5,
            sortable: false,
            headerClassName: "headerClass",
        },
        {
            field: "id",
            headerName: "ID",
            flex: 0.25,
            sortable: false,
            headerClassName: "headerClass",
        },
        {
            field: "lockedDate",
            headerName: "Locked Date",
            flex: 0.5,
            sortable: false,
            headerClassName: "headerClass",
        },
        {
            field: "timeLeft",
            headerName: "Time Left",
            flex: 0.5,
            sortable: false,
            headerClassName: "headerClass",
        },
        {
            field: "rewardsAchieved",
            headerName: "Rewards Achieved",
            flex: 0.75,
            sortable: false,
            headerClassName: "headerClass",
            renderCell: (params) => (
                <Box sx={{ width: "100%" }}>
                    <LinearProgress variant="determinate" color="secondary" value={40} />

                    <Box sx={{ fontSize: 10, fontFamily: theme.typography.fontFamily, marginTop: 0.7 }}>
                        40% Rewards
                    </Box>
                </Box>
            ),
        },
        {
            field: "currentRewards",
            headerName: "Current Rewards",
            flex: 0.75,
            sortable: false,
            headerClassName: "headerClass",
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            sortable: false,
            showColumnRightBorder: false,
            headerClassName: "headerClass",
            renderCell: (params) => (
                <Box sx={{ display: "flex" }}>
                    <Button variant="contained" size="small" color="secondary" sx={actionButtonStyles}>
                        Claim Rewards
                    </Button>
                    <Button variant="contained" size="small" color="secondary" sx={actionButtonStyles}>
                        Unlock
                    </Button>
                </Box>
            ),
        },
    ];

    const lockedPositionsRows = [
        {
            amount: "2388888 ALCA",
            id: 1,
            lockedDate: "03/12/2022",
            timeLeft: "18 days",
            currentRewards: "100 ALCA / 10 ETH",
        },
    ];

    const actionButtonStyles = {
        textTransform: "none",
        marginRight: 2,
        fontSize: 13,
    };

    const defaultTabClasses = {
        borderRadius: 1,
        textTransform: "none",
        fontSize: 14,
    };

    const currentClasses = {
        background: "linear-gradient(180deg, #FFABD4 18.53%, #CE6D99 167.76%)",
        color: theme.palette.background.default,
    };

    let stakingTabClasses = {
        ...defaultTabClasses,
    };

    let positionTabClasses = {
        ...defaultTabClasses,
    };

    if (currentTab === "1") {
        stakingTabClasses = { ...currentClasses, ...stakingTabClasses };
    }
    if (currentTab === "2") {
        positionTabClasses = { ...currentClasses, ...positionTabClasses };
    }

    const fadeOutTextStyle = { fontSize: "14px" };
    const boxStyles = {
        background: `linear-gradient(180deg, ${theme.palette.dark.elevation12} 0%, ${theme.palette.dark.elevation12} 100%), ${theme.palette.dark.main}`,
        padding: 2,
        "& .even": {
            background: `linear-gradient(180deg, rgba(165, 198, 255, 0.08) 0%, rgba(255, 255, 255, 0.08) 100%, rgba(165, 198, 255, 0.08) 100%), #11151C`,
        },
        "& .customRow": {
            fontFamily: theme.typography.subtitle1.fontFamily,
        },
        "& .headerClass": {
            fontFamily: "JetBrains Mono",
        },
        "& .MuiDataGrid-cell:focus-within": {
            outline: "none",
        },
        "& .odd.MuiDataGrid-row:hover": {
            background: `linear-gradient(180deg, ${theme.palette.dark.elevation12} 0%, ${theme.palette.dark.elevation12} 100%), ${theme.palette.dark.main}`,
        },
        "& .even.MuiDataGrid-row:hover": {
            background: `linear-gradient(180deg, rgba(165, 198, 255, 0.08) 0%, rgba(255, 255, 255, 0.08) 100%, rgba(165, 198, 255, 0.08) 100%), #11151C`,
        },
    };

    function StakedPositionLabel() {
        return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>Staked Positions</Box>
                <Box
                    sx={{
                        marginLeft: 1,
                        fontSize: "14px",
                        color: "#fff",
                        padding: "1px 5px",
                        bgcolor: "#0000007a",
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
                <SubNavigation />

                <TabContext value={currentTab}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                            onChange={handleTabChange}
                            textColor={theme.palette.background.default}
                            indicatorColor={theme.palette.background.default}
                        >
                            <Tab label={<StakedPositionLabel />} value="1" sx={stakingTabClasses} />
                            <Tab label="Locked Positions" value="2" sx={positionTabClasses} />
                        </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ padding: 0 }}>
                        <Box sx={boxStyles}>
                            <Box sx={{ marginBottom: 1, paddingBottom: 1.5, borderBottom: "1px solid #555" }}>
                                <Typography variant="subtitle2" sx={[fadeOutTextStyle]}>
                                    Current ALCA Balance
                                </Typography>
                                <Typography variant="h5">2,000 ALCA</Typography>
                            </Box>

                            <DataGrid
                                autoPageSize
                                autoHeight
                                disableSelectionOnClick
                                disableColumnMenu
                                pageSize={10}
                                rows={stakedPositionsRows}
                                columns={stakedPositionsColumns}
                                getRowClassName={(params) => {
                                    return params.indexRelativeToCurrentPage % 2 === 0
                                        ? "customRow even"
                                        : "customRow odd";
                                }}
                                sx={{ fontSize: 14 }}
                            />
                        </Box>
                    </TabPanel>
                    <TabPanel value="2" sx={{ padding: 0 }}>
                        <Box sx={boxStyles}>
                            <Box sx={{ marginBottom: 1, paddingBottom: 1.5, borderBottom: "1px solid #555" }}>
                                <Typography variant="subtitle2" sx={[fadeOutTextStyle]}>
                                    Current ALCA Balance
                                </Typography>
                                <Typography variant="h5">2,000 ALCA</Typography>
                            </Box>

                            <DataGrid
                                autoPageSize
                                autoHeight
                                disableSelectionOnClick
                                disableColumnMenu
                                pageSize={10}
                                rows={lockedPositionsRows}
                                columns={lockedPositionsColumns}
                                getRowClassName={(params) => {
                                    return params.indexRelativeToCurrentPage % 2 === 0
                                        ? "customRow even"
                                        : "customRow odd";
                                }}
                                sx={{ fontSize: 14 }}
                            />
                        </Box>
                    </TabPanel>
                </TabContext>
            </Container>
        </>
    );
}
