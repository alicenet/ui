import React from "react";
import { FormControl, MenuItem, Select, useTheme } from "@mui/material";

export function SearchBarMenu({ options, selectedOption, handleChange }) {

    const theme = useTheme();

    return (
        <FormControl variant="outlined">
            <Select
                sx={{
                    textAlign: "center",
                    minWidth: "10em",
                    background: theme.palette.clearGray.main,
                    color: "black",
                    fontWeight: "bold",
                    borderTopRightRadius: { xs: theme.spacing, md: 0 },
                    borderBottomRightRadius: { xs: theme.spacing, md: 0 },
                    "& .MuiSvgIcon-root": {
                        color: "black"
                    },
                    "&& .MuiOutlinedInput-notchedOutline": {
                        border: 0
                    }
                }}
                value={selectedOption.value}
                onChange={handleChange}
                inputProps={{
                    sx: {
                        paddingY: 1.5,
                    }
                }}
                MenuProps={{
                    sx: {
                        "& .MuiPaper-root": {
                            background: "white",
                        },
                        "&& .Mui-selected": {
                            background: theme.palette.primary.light
                        }
                    }
                }}
            >
                {options.map(option =>
                    <MenuItem
                        key={`header-option-${option.value}`}
                        value={option.value}
                        sx={{
                            color: "black",
                            fontWeight: "bold",
                            "&:hover": {
                                background: theme.palette.dark.light,
                            }
                        }}
                    >
                        {option.text}
                    </MenuItem>
                )}
            </Select>
        </FormControl>
    );
}