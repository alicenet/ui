export const getDefaultTabStyles = () => ({
    borderRadius: 1,
    textTransform: "none",
    fontSize: 14,
    height: 42,
    minHeight: "inherit",
});

export const getActiveTabStyles = (theme) => ({
    background: `linear-gradient(
        180deg,
        ${theme.palette.custom.startGradient} 18.53%,
        ${theme.palette.custom.endGradient} 167.76%
    )`,
    color: theme.palette.background.default,
});

export const getBoxStyles = (theme) => ({
    background: `linear-gradient(
        180deg,
        ${theme.palette.custom.elevation12} 0%,
        ${theme.palette.custom.elevation12} 100%
    ), ${theme.palette.background.default}`,
    padding: 2,
    borderRadius: 1,
    "& .even": {
        background: `linear-gradient(
            180deg, ${theme.palette.custom.elevation3} 0%,
            ${theme.palette.action.hover} 100%,
            ${theme.palette.custom.elevation1} 100%
        ), ${theme.palette.background.default}`,
    },
    "& .customRow": {
        fontFamily: theme.typography.subtitle1.fontFamily,
        borderRadius: 1,
    },
    "& .headerClass": {
        fontFamily: "JetBrains Mono",
    },
    "& .MuiDataGrid-cell:focus-within": {
        outline: "none",
    },
    "& .odd.MuiDataGrid-row:hover": {
        background: `linear-gradient(
            180deg, ${theme.palette.custom.elevation12} 0%,
            ${theme.palette.custom.elevation12} 100%
        ), ${theme.palette.background.default}`,
    },
    "& .even.MuiDataGrid-row:hover": {
        background: `linear-gradient(
            180deg, ${theme.palette.custom.elevation3} 0%,
            ${theme.palette.action.hover} 100%,
            ${theme.palette.custom.elevation1} 100%
        ), ${theme.palette.background.default}`,
    },
});
