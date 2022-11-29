import React from "react";
import {
    Modal,
    Box,
    Typography,
    Paper,
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Button,
    Link,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLanderModalOpenState } from "redux/actions/application";
import { ChevronLeft, ChevronRight, Circle } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { configuration } from "config";
import { useModalCookie } from "hooks/useModalCookie";

export function LanderHelpModal() {
    const { isModalOpen } = useSelector((s) => ({ isModalOpen: s.application.landerModalOpen }));
    const dispatch = useDispatch();
    const theme = useTheme();
    const [, setHideModalCookie] = useModalCookie();

    const modalPageNames = { welcome: "welcome", migration: "migration", staking: "staking" };
    const pageNameToIdx = { [modalPageNames.welcome]: 0, [modalPageNames.migration]: 1, [modalPageNames.staking]: 2 };
    const [modalPage, setModalPage] = React.useState(modalPageNames.welcome); // welcome | migration | staking

    const closeModal = () => {
        dispatch(setLanderModalOpenState(false));
        setHideModalCookie();
    };

    React.useEffect(() => {
        // Reset page on close
        if (!isModalOpen) {
            setModalPage(modalPageNames.welcome);
        }
    }, [isModalOpen, modalPageNames.welcome]);

    const ModalHeader = () => (
        <>
            <Box
                sx={{ display: "flex", justifyContent: "end", fontWeight: "bold", cursor: "pointer" }}
                onClick={closeModal}
            >
                X
            </Box>
            <Typography id="modal-modal-title" variant="h5" component="h2">
                Welcome to AliceNet
            </Typography>
            <Typography id="modal-modal-subtitle" variant="p" component="h2">
                This help modal can be re-opened by clicking help at the top of the screen
            </Typography>
        </>
    );

    const tabPropeties = {
        disableRipple: true,
        sx: {
            color: "",
            fontSize: 14,
            "&.Mui-selected": {
                color: theme.palette.secondary.main,
            },
        },
    };
    const ModalMenu = () => (
        <>
            <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2 }}>
                <Tabs
                    TabIndicatorProps={{ style: { background: theme.palette.secondary.main } }}
                    value={pageNameToIdx[modalPage]}
                    aria-label="help modal tabs"
                >
                    <Tab label="Welcome" {...tabPropeties} onClick={() => setModalPage(modalPageNames.welcome)} />
                    <Tab label="Migration" {...tabPropeties} onClick={() => setModalPage(modalPageNames.migration)} />
                    <Tab label="Staking" {...tabPropeties} onClick={() => setModalPage(modalPageNames.staking)} />
                </Tabs>
            </Box>
        </>
    );

    const ModalContent = () => {
        const listItemProps = { disablePadding: true, display: "list-item" };
        const BulletPoint = () => (
            <ListItemIcon sx={{ minWidth: "1rem" }}>
                {" "}
                <Circle sx={{ fontSize: "8px" }} />{" "}
            </ListItemIcon>
        );
        const ContentListItem = ({ children, ...props }) => (
            <ListItem {...listItemProps} {...props}>
                <BulletPoint />
                <ListItemText primary={children} />
            </ListItem>
        );

        const welcomeListContent = [
            <>
                Be part of the{" "}
                <Link href={configuration.site.url_madTokenEtherScan} {...configuration.site.href_props}>
                    MAD Token Migration
                </Link>
            </>,
            "Acquire on decentralized exchanges",
        ];
        const WelcomeContent = () => (
            <Box>
                <Typography variant="p">
                    This DAPP is built around interacting with{" "}
                    <Link href={configuration.site.url_aliceNet} {...configuration.site.href_props}>
                        alice.net
                    </Link>{" "}
                    ALCA token. Previous holders of MadToken will always be able to use this interface to migrate to
                    ALCA and all others can use it for staking to earn rewards based on the{" "}
                    <Link href={configuration.site.url_aliceNet} {...configuration.site.href_props}>
                        alice.net
                    </Link>{" "}
                    protocol.
                    <br />
                    <br />
                    <b>Ways to obtain ALCA</b>
                </Typography>
                <List>
                    {welcomeListContent.map((content, i) => (
                        <ContentListItem key={i}>{content}</ContentListItem>
                    ))}
                </List>
            </Box>
        );

        const migrationListContent = [
            <>
                Migration FAQ{" "}
                <Link href={configuration.site.url_migrationBlogLink} {...configuration.site.href_props}>
                    More info
                </Link>
            </>,
            <>
                Information About ALCA Token{" "}
                <Link href={configuration.site.url_alcaTokenBlog} {...configuration.site.href_props}>
                    More info
                </Link>
            </>,
            <>
                Mad Token on Etherscan:{" "}
                <Link href={configuration.site.url_madTokenEtherScan} {...configuration.site.href_props}>
                    0x5b09a0371c1da44a8e24d36bf5deb1141a84d875
                </Link>
            </>,
        ];
        const MigrationContent = () => (
            <Box>
                <Typography>
                    Migration will be available to users who have existing MadToken Etherscan in their wallet and can be
                    staked right away, or held without staking.
                    <br />
                    <br />
                    ALCA is can be converted from Mad token at an exchange rate of 1.55555555556 ALCA per MAD.
                    <br />
                    <br />
                </Typography>
                <Typography variant="p" fontWeight={800}>
                    Addition information can be found below
                </Typography>
                <List>
                    {migrationListContent.map((content, i) => (
                        <ContentListItem key={i}>{content}</ContentListItem>
                    ))}
                </List>
            </Box>
        );

        const stakingListContent_1 = [
            "1/3 of block rewards go to ALCA Staked positions",
            "The reamining 2/3 go to the Validators",
            "Each staked position receives the pro rata division of the noted 1/3 ALCA block rewards",
        ];
        const stakingListContent_2 = [
            "Claim all rewards associated with a position without unstaking",
            "Unstake and claim all rewards associated with a posiiton",
            "Tokens can be locked for a specified time for additional rewards during a Lockup period",
        ];
        const StakingContent = () => (
            <Box>
                <Typography>
                    ALCA can be staked to earn rewards based on the alice.net&#8216;s tokenomics
                    <br />
                    <br />
                    By staking ALCA you will earn a pro rata portion of block rewards distributed as follows:
                </Typography>
                <List disablePadding sx={{ mt: 1 }}>
                    {stakingListContent_1.map((content, i) => (
                        <ContentListItem key={i}>{content}</ContentListItem>
                    ))}
                </List>
                <Typography>
                    <br />
                    ALCA Staked positions are minted as ERC-721&#8216;s that represent your staked position.
                    <br />
                    The following actions are available to staked positions:
                </Typography>
                <List disablePadding sx={{ mt: 1 }}>
                    {stakingListContent_2.map((content, i) => (
                        <ContentListItem key={i}>{content}</ContentListItem>
                    ))}
                </List>
                <br />
                <br />
                <Typography>
                    More information on the alice.net tokenomics can be found{" "}
                    <Link href={configuration.site.url_alcaTokenBlog} {...configuration.site.href_props}>
                        here
                    </Link>
                </Typography>
            </Box>
        );

        const ModalContent = (props) => {
            const pageContent =
                modalPage === modalPageNames.welcome ? (
                    <WelcomeContent />
                ) : modalPage === modalPageNames.staking ? (
                    <StakingContent />
                ) : (
                    <MigrationContent />
                );
            return <Box {...props}>{pageContent}</Box>;
        };

        return (
            <Box>
                <ModalContent sx={{ mt: 2, maxWidth: "75ch" }} />
            </Box>
        );
    };

    const changeTab = (step) => {
        if (step === -1) {
            if (modalPage === modalPageNames.welcome) return;
            if (modalPage === modalPageNames.migration) setModalPage(modalPageNames.welcome);
            if (modalPage === modalPageNames.staking) setModalPage(modalPageNames.migration);
        } else if (step === 1) {
            if (modalPage === modalPageNames.welcome) setModalPage(modalPageNames.migration);
            if (modalPage === modalPageNames.migration) setModalPage(modalPageNames.staking);
            if (modalPage === modalPageNames.staking) return;
        }
    };

    const ModalActions = () => {
        return (
            <Box sx={{ display: "flex", mt: 2, justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                        size="large"
                        variant="outlined"
                        color="secondary"
                        disableRipple
                        onClick={() => changeTab(-1)}
                        disabled={modalPage === modalPageNames.welcome}
                        sx={{ gap: 2 }}
                    >
                        <ChevronLeft /> Back
                    </Button>
                    <Button
                        size="large"
                        variant="outlined"
                        color="secondary"
                        disableRipple
                        onClick={() => changeTab(+1)}
                        disabled={modalPage === modalPageNames.staking}
                        sx={{ gap: 2 }}
                    >
                        Next <ChevronRight />
                    </Button>
                </Box>
                <Box>
                    <Button size="large" variant="contained" color="secondary" disableRipple onClick={closeModal}>
                        Close
                    </Button>
                </Box>
            </Box>
        );
    };

    return (
        <Modal
            open={isModalOpen}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Paper
                sx={{
                    position: "absolute",
                    width: "90%",
                    maxWidth: 1080,
                    left: 0,
                    right: 0,
                    marginLeft: "auto",
                    marginRight: "auto",
                    background:
                        " linear-gradient(180deg, rgba(165, 198, 255, 0.16) 0%, rgba(165, 198, 255, 0.16) 100%), #11151C;",
                    mt: 8,
                    p: "24px",
                }}
            >
                <ModalHeader />
                <ModalMenu />
                <ModalContent />
                <ModalActions />
            </Paper>
        </Modal>
    );
}
