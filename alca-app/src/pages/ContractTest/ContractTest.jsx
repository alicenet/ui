import React from "react";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Grid2 from "@mui/material/Unstable_Grid2"; // Grid version 2

import { useTheme } from "@emotion/react";
import ethAdapter from "eth-adapter";

export function ContractTest() {
    const theme = useTheme();
    const CONTRACT_FXS = ethAdapter.contractMethods;

    console.log(CONTRACT_FXS);

    // Track all contract method states individually
    const [inputStates, setInputStates] = React.useState({});
    const [responseStates, setResponseStates] = React.useState({});
    const [loadingStates, setLoadingStates] = React.useState({});

    // Create nested object for tracking contract method states
    const createNestedContractState = (s, contractFxKey, contractMethodKey, parameterName, parameterValue) => {
        let stateUpdateObjectBase = { ...s };
        // Fill object voids
        if (!stateUpdateObjectBase[contractFxKey]) {
            stateUpdateObjectBase[contractFxKey] = {};
        }
        if (!stateUpdateObjectBase[contractFxKey][contractMethodKey]) {
            stateUpdateObjectBase[contractFxKey][contractMethodKey] = {};
        }
        // Create final state object
        let stateUpdateObject = {
            ...stateUpdateObjectBase,
            [contractFxKey]: {
                ...stateUpdateObjectBase[contractFxKey],
                [contractMethodKey]: {
                    ...stateUpdateObjectBase[contractFxKey][contractMethodKey],
                    [parameterName]: parameterValue,
                },
            },
        };
        return stateUpdateObject;
    };

    const updateInputState = (contractFxKey, contractMethodKey, parameterName, parameterValue) =>
        setInputStates((s) => createNestedContractState(s, contractFxKey, contractMethodKey, parameterName, parameterValue));

    const updateResponseState = (contractFxKey, contractMethodKey, parameterName, parameterValue) =>
        setResponseStates((s) => createNestedContractState(s, contractFxKey, contractMethodKey, parameterName, parameterValue));

    const updateLoadingState = (contractFxKey, contractMethodKey, parameterName, parameterValue) =>
        setLoadingStates((s) => createNestedContractState(s, contractFxKey, contractMethodKey, parameterName, parameterValue));

    console.log(loadingStates);

    const renderContractMethodGrid = () => {
        let contractFxGroups = {};

        for (let contractFxKey in CONTRACT_FXS) {
            contractFxGroups[contractFxKey] = {};

            // Get methods for contractGroup and compoile components from it into a contract's method array
            contractFxGroups[contractFxKey] = [];
            for (let contractMethodKey in CONTRACT_FXS[contractFxKey]) {
                let mtd = CONTRACT_FXS[contractFxKey][contractMethodKey];
                let methodName = mtd.name;
                let methodParams = mtd.params;
                let methodParamString = "(";

                for (let i = 0; i < methodParams.length; i++) {
                    let param = methodParams[i];
                    methodParamString += `${param.name}_${param.type}`;
                    if (i !== methodParams.length - 1) {
                        methodParamString += ",";
                    }
                }

                methodParamString += ")";

                const getParamInputs = () => {
                    let inputs = [];
                    for (let param of methodParams) {
                        inputs.push(
                            <Grid2 xs={2}>
                                <TextField
                                    variant="standard"
                                    label={param.name}
                                    value={inputStates?.contractFxKey?.contractMethodKey[param.name]}
                                    onChange={(e) => updateInputState(contractFxKey, contractMethodKey, param.name + "_" + param.type, e.target.value)}
                                    placeholder={param.type}
                                />
                            </Grid2>
                        );
                    }
                    // Push action

                    const attemptMethod = async () => {
                        updateLoadingState(contractFxKey, contractMethodKey, methodName, true);
                        let response;
                        try {
                            console.log("input", inputStates);
                            let res =
                                methodParams.length > 0
                                    ? await CONTRACT_FXS[contractFxKey][contractMethodKey]({ ...inputStates?.[contractFxKey]?.[contractMethodKey] })
                                    : await CONTRACT_FXS[contractFxKey][contractMethodKey]();
                            if (res.error) {
                                throw new Error(res.error);
                            }
                            // If method is waitable, wait for it. . .
                            if (res.wait) {
                                res = await res.wait();
                            }
                            response = {
                                error: false,
                                message: res,
                            };
                        } catch (ex) {
                            console.log(ex);
                            response = {
                                error: true,
                                message: ex.message,
                            };
                        }
                        // Wait for response
                        updateLoadingState(contractFxKey, contractMethodKey, methodName, false);
                        updateResponseState(contractFxKey, contractMethodKey, methodName, response);
                    };

                    const responseObj = responseStates?.[contractFxKey]?.[contractMethodKey]?.[methodName];

                    inputs.push(
                        <Grid2 xs={12}>
                            <Button onClick={attemptMethod} variant="outlined" sx={{ p: 1, pl: 2.75, m: 0 }}>
                                <Box sx={{ mr: 2 }}>Execute</Box>
                                {loadingStates?.[contractFxKey]?.[contractMethodKey]?.[methodName] && <CircularProgress size={14} />}
                            </Button>
                            <Typography color={responseObj?.error ? "red" : "green"} variant="body2" sx={{ mt: 2, mb: 0, height: "24px" }}>
                                {JSON.stringify(responseObj?.message)}
                            </Typography>
                        </Grid2>
                    );
                    return inputs;
                };

                contractFxGroups[contractFxKey].push(
                    <Grid2 xs={12} sx={{ borderBottom: "1px dashed", borderColor: theme.palette.primary.main }}>
                        <Typography variant="h6" sx={{ fontWeight: 900, color: theme.palette.primary.main, textDecoration: "underline" }}>
                            {methodName}
                            {methodParamString}
                        </Typography>
                        <Grid2 container spacing={4} sx={{ pl: 0 }}>
                            {getParamInputs()}
                        </Grid2>
                    </Grid2>
                );
            }
        }

        let ContractFxGroups = [];

        for (let contractFxGroupKey in contractFxGroups) {
            ContractFxGroups.push(contractFxGroups[contractFxGroupKey]);
        }

        return ContractFxGroups;
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ textDecoration: "underline" }}>
                Contract Methods
            </Typography>

            {/* <Box sx={{ display: "flex", flexFlow: "column" }} sx={{ mt: 2 }}>

                <TextField variant="standard" label="storeValue" size="small" value="" placeholder="Store Value"
                    InputProps={{ endAdornment: <IconButton><CreateIcon /></IconButton> }}
                />

                <TextField sx={{mt: 1}} variant="standard" label="readValue" size="small" value="" placeholder="Read Value"
                InputProps={{endAdornment: <IconButton><SearchIcon/></IconButton> }}
                />

            </Box> */}

            <Grid2 container spacing={1} sx={{ mt: 2 }}>
                {renderContractMethodGrid()}
            </Grid2>
        </Box>
    );
}
