// Icon Import
import AdbIcon from "@mui/icons-material/Adb";

// If environment is staging, do not show UI
const [environment, isLive] = (() => {
    let environment = "";
    let isLive = "";
    switch (process.env.REACT_APP__ENVIRONMENT) {
        case "LOCAL":
            environment = "LOCAL";
            break;
        case "STAGING":
            environment = "STAGING";
            break;
        case "PRODUCTION":
            environment = "PRODUCTION";
            break;
        default:
            throw new Error("REACT_APP__ENVIRONMENT must be set correctly in application src .env file!");
    }
    switch (process.env.REACT_APP__ALCA_LIVE) {
        case "TRUE":
            isLive = true;
            break;
        case "FALSE":
            isLive = false;
            break;
        default:
            throw new Error("REACT_APP_ALCA_LIVE must be set correctly in application src .env file!");
    }
    return [environment, isLive];
})();

const site_configuration = {
    copyriteName: "AliceNetUI", // Copyrite business name title
    webView: {
        headerLinkSpacing: 2, //sx.mx applied to header links in webView
        headerHeight: 1, // sx.my applied to header links in webView
    },
    environment: {
        isLocal: environment === "LOCAL",
        isStaging: environment === "STAGING",
        isProduction: environment === "PRODUCTION",
    },
    isLive: isLive,
    navIcon: <AdbIcon />, // NavBar Icon
    navTitle: "Alicenet - UI", // NavBar Text
    title: "Alicenet - UI", // Browser Document Title
    url_documentation: "https://github.com/alicenet/alicenet/wiki", // Link for documentation click under "Help"
    url_termsOfService: "https://alice.net/terms-of-use", // Link for terms of service url under "Help"
    url_aliceNet: "https://alice.net",
    url_madTokenEtherScan: "https://etherscan.io/token/0x5b09a0371c1da44a8e24d36bf5deb1141a84d875",
    url_migrationBlogLink: "https://medium.com/alicenet/mad-token-to-alca-token-migration-faq-23ff5940044b",
    url_alcaTokenBlog: "https://medium.com/alicenet/announcing-alicenet-c904e99d4179",
    href_props: { target: "_blank", rel: "noopener noreferrer" },
    url_about: "https://medium.com/alicenet/introducing-alicenet-40b54474d2f2", // Link for about page
    url_blockExplorer: "https://explorer.alice.net", // Link for the block explorer
};

export const configuration = {
    site: site_configuration,
};
