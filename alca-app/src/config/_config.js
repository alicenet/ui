// Icon Import
import AdbIcon from "@mui/icons-material/Adb";

const site_configuration = {
    copyriteName: "AliceNetUI", // Copyrite business name title
    webView: {
        headerLinkSpacing: 2, //sx.mx applied to header links in webView
        headerHeight: 1, // sx.my applied to header links in webView
    },
    navIcon: <AdbIcon />, // NavBar Icon
    navTitle: "Alicenet - UI", // NavBar Text
    title: "Alicenet - UI", // Browser Document Title
    url_documentation: "https://github.com/alicenet/alicenet/wiki", // Link for documentation click under "Help"
    url_termsOfService: "https://alice.net", // Link for terms of service url under "Help"
};

export const configuration = {
    site: site_configuration,
};
