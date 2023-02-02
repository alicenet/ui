export const fancyToggleStyles = {
    width: 212,
    height: 52,
    padding: 2,
    letterSpacing: "1px",
    "& .MuiSwitch-switchBase": {
        margin: 4,
        padding: 0,
        transform: "translateX(6px)",
        "&.Mui-checked": {
            color: "#fff",
            transform: "translateX(22px)",
            "& .MuiSwitch-thumb:before": {
                position: "relative",
                content: '"Unstake"',
                left: 15,
            },
            "& + .MuiSwitch-track": {
                opacity: 1,
                backgroundColor: "#000000",
                "&:before": {
                    content: '"Stake"',
                    color: "rgba(255, 255, 255, 0.5)",
                    position: "relative",
                    top: 12,
                    left: 23,
                },
            },
            "& .MuiSwitch-thumb": {
                left: 90,
            },
        },
        ":not(.Mui-checked):after": {
            content: '"Unstake"',
            color: "rgba(255, 255, 255, 0.5)",
            position: "relative",
            zIndex: -1,
            top: -2,
            left: 10,
        },
    },
    "& .MuiSwitch-thumb": {
        transition: "all .35s cubic-bezier(0.45, 0, 0.55, 1)",
        position: "relative",
        left: -9,
        top: -2,
        backgroundColor: "#DB09A9",
        width: 96,
        height: 48,
        borderRadius: 24,
        "&:before": {
            content: '"Stake"',
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 23,
            top: 12,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
        },
    },
    "& .MuiSwitch-track": {
        opacity: 0.5,
        backgroundColor: "#000000",
        borderRadius: "22px",
    },
};
