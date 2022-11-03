import React from "react";
import { useSelector } from "react-redux";
import { Grid, Menu, Segment, Header } from "semantic-ui-react";
import { Connect, StakeClaim, StakeStake, StakeUnstake, StakeWelcome } from "components";
import { classNames } from "utils/generic";
import { formatNumberToLocale } from "utils/locale";

export function StakeActions() {
    const { hasReadTerms, alcaBalance, web3Connected, stakedAlca, ethRewards, alcaRewards } = useSelector((state) => ({
        hasReadTerms: state.application.hasReadTerms,
        alcaBalance: state.application.balances.alca,
        web3Connected: state.application.web3Connected,
        stakedAlca: state.application.stakedPosition.stakedAlca,
        ethRewards: state.application.stakedPosition.ethRewards,
        alcaRewards: state.application.stakedPosition.alcaRewards,
    }));

    const [activeItem, setActiveItem] = React.useState("welcome");

    const handleItemClick = (e, { name }) => {
        setActiveItem(name);
    };

    const getActiveTab = () => {
        switch (activeItem) {
            case "welcome":
                return <StakeWelcome stepForward={() => (stakedAlca > 0 ? setActiveItem("unstake") : setActiveItem("stake"))} />;
            case "stake":
                return <StakeStake />;
            case "unstake":
                return <StakeUnstake />;
            case "claim":
                return <StakeClaim />;
            default:
                return;
        }
    };

    const activeMenuClass = (checkAgainst) => {
        return checkAgainst === activeItem ? "border-l-aliceblue border-l-[3px]" : "";
    };

    return (
        <div className="flex justify-center w-full">
            <div className="max-w-[1200px] w-full mt-12">
                <Grid padded className="flex h-full">
                    <Grid.Row>
                        <Grid.Column stretched width={3} className="pr-0">
                            <Menu fluid vertical tabular role="list">
                                <Menu.Item
                                    content={<Header content="Welcome" />}
                                    active={activeItem === "welcome"}
                                    onClick={(e) => handleItemClick(e, { name: "welcome" })}
                                    onKeyPress={(e) => handleItemClick(e, { name: "welcome" })}
                                    disabled={activeItem !== "welcome"}
                                    tabIndex="1"
                                    className={activeMenuClass("welcome")}
                                />

                                <Menu.Item
                                    content={
                                        <>
                                            <Header className={classNames({ "opacity-40": stakedAlca || !web3Connected })}>Stake</Header>
                                            <div className="text-xs">{formatNumberToLocale(alcaBalance, 7)} ALCA Available</div>
                                        </>
                                    }
                                    disabled={Boolean(stakedAlca || !web3Connected)}
                                    active={activeItem === "stake"}
                                    onClick={(e) => handleItemClick(e, { name: "stake" })}
                                    onKeyPress={(e) => !Boolean(stakedAlca || !web3Connected) && handleItemClick(e, { name: "stake" })}
                                    tabIndex="1"
                                    className={activeMenuClass("stake")}
                                />

                                <Menu.Item
                                    content={
                                        <>
                                            <Header className={classNames({ "opacity-40": !stakedAlca > 0 })}>Unstake</Header>
                                            <div className="text-xs">{stakedAlca > 0 ? `${formatNumberToLocale(stakedAlca, 7)} ALCA` : "No ALCA staked"}</div>
                                        </>
                                    }
                                    disabled={Boolean(!stakedAlca)}
                                    active={activeItem === "unstake"}
                                    onClick={(e) => handleItemClick(e, { name: "unstake" })}
                                    onKeyPress={(e) => !Boolean(!stakedAlca) && handleItemClick(e, { name: "unstake" })}
                                    tabIndex="2"
                                    className={activeMenuClass("unstake")}
                                />

                                <Menu.Item
                                    content={
                                        <>
                                            <Header
                                                className={classNames({
                                                    "opacity-40": ([0, "0.0"].includes(ethRewards) && [0, "0.0"].includes(alcaRewards)) || !stakedAlca,
                                                })}
                                            >
                                                Rewards
                                            </Header>

                                            <div className="text-xs">
                                                {ethRewards > 0 ? `${formatNumberToLocale(ethRewards, 7)} ETH to claim` : "No ETH to claim"}
                                            </div>
                                            <div className="text-xs">
                                                {alcaRewards > 0 ? `${formatNumberToLocale(alcaRewards, 7)} ALCA to claim` : "No ALCA to claim"}
                                            </div>
                                        </>
                                    }
                                    disabled={Boolean(([0, "0.0"].includes(ethRewards) && [0, "0.0"].includes(alcaRewards)) || !stakedAlca)}
                                    active={activeItem === "claim"}
                                    onClick={(e) => handleItemClick(e, { name: "claim" })}
                                    onKeyPress={(e) =>
                                        !Boolean(([0, "0.0"].includes(ethRewards) && [0, "0.0"].includes(alcaRewards)) || !stakedAlca) &&
                                        handleItemClick(e, { name: "claim" })
                                    }
                                    tabIndex="3"
                                    className={activeMenuClass("claim")}
                                />
                            </Menu>
                        </Grid.Column>

                        <Grid.Column stretched width={13} className="pl-0">
                            <Segment className="border-l-0 shadow-none rounded-none">{getActiveTab()}</Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </div>
    );
}
