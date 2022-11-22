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
    url_aliceNet: "https://alice.net",
    url_madTokenEtherScan: "https://etherscan.io/token/0x5b09a0371c1da44a8e24d36bf5deb1141a84d875",
    url_migrationBlogLink: "https://medium.com/alicenet/mad-token-to-alca-token-migration-faq-23ff5940044b",
    url_alcaTokenBlog: "https://medium.com/alicenet/announcing-alicenet-c904e99d4179",
    href_props: { target: "_blank", rel: "noopener noreferrer" },
};

export const configuration = {
    site: site_configuration,
};
