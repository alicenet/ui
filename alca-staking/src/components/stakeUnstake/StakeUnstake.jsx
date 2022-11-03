import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_ACTIONS } from "redux/actions";
import ethAdapter from "eth/ethAdapter";
import { Grid, Header, Button, Icon, Message } from "semantic-ui-react";
import utils from "utils";
import { TOKEN_TYPES } from "redux/constants";
import { formatNumberToLocale } from "utils/locale";

const ETHERSCAN_URL = process.env.REACT_APP__ETHERSCAN_TX_URL || "https://etherscan.io/tx/";

export function StakeUnstake() {
    const dispatch = useDispatch();
    const [waiting, setWaiting] = React.useState(false);
    const [success, setSuccessStatus] = React.useState(false);
    const [status, setStatus] = React.useState({});
    const [txHash, setTxHash] = React.useState("");
    const [unstakedAmount, setUnstakedAmount] = React.useState("");
    const [claimedEthRewards, setClaimedEthRewards] = React.useState("");
    const [claimedAlcaRewards, setClaimedAlcaRewards] = React.useState("");

    const { stakedAlca, tokenId, ethRewards, alcaRewards } = useSelector((state) => ({
        stakedAlca: state.application.stakedPosition.stakedAlca,
        tokenId: state.application.stakedPosition.tokenId,
        ethRewards: state.application.stakedPosition.ethRewards,
        alcaRewards: state.application.stakedPosition.alcaRewards,
    }));

    const unstakePosition = async () => {
        try {
            setWaiting(true);
            setStatus({});

            const tx = await ethAdapter.unstakingPosition(tokenId);
            if (tx.error) throw tx.error;
            const rec = tx.hash && (await tx.wait());

            if (rec.transactionHash) {
                await dispatch(APPLICATION_ACTIONS.updateBalances(TOKEN_TYPES.ALL));
                setWaiting(false);
                setSuccessStatus(true);
                setUnstakedAmount(stakedAlca);
                setClaimedEthRewards(ethRewards);
                setClaimedAlcaRewards(alcaRewards);
                setTxHash(rec.transactionHash);
            }
        } catch (exception) {
            setStatus({
                error: true,
                message: exception.toString() || "There was a problem with your request, please verify or try again later",
            });
            setWaiting(false);
        }
    };

    const renderRequestUnstake = () => (
        <>
            <Grid.Column width={16}>
                <Header>
                    Unstake ALCA Position
                    <Header.Subheader>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Header.Subheader>
                </Header>
            </Grid.Column>

            <Grid.Column width={16}>
                <div>
                    <Header as="h2">{formatNumberToLocale(stakedAlca)} ALCA</Header>
                    <Header as="h3">
                        Rewards to Claim: {formatNumberToLocale(ethRewards)} ETH / {formatNumberToLocale(alcaRewards)} ALCA
                    </Header>
                    <p>Rewards will be sent automatically to your wallet</p>
                </div>

                <div>
                    <Button className="mt-4" secondary content={"Unstake Position"} onClick={unstakePosition} disabled={false} loading={waiting} />
                </div>
            </Grid.Column>
        </>
    );

    const renderUnstakedSuccessfully = () => (
        <>
            <Grid.Column width={16}>
                <Header>
                    Unstake completed
                    <Header.Subheader>
                        <strong>You have successfully unstaked {unstakedAmount} ALCA</strong> and claimed a{" "}
                        <strong>
                            reward of {claimedEthRewards} ETH / {claimedAlcaRewards} ALCA
                        </strong>{" "}
                        to your wallet
                    </Header.Subheader>
                </Header>
            </Grid.Column>

            <Grid.Column width={16}>
                <div>
                    <p>You can check the transaction hash below</p>
                    <p>
                        {txHash}
                        <Icon name="copy" className="cursor-pointer" onClick={() => utils.string.copyText(txHash)} />
                    </p>
                </div>

                <div>
                    <Button
                        className="mt-4"
                        secondary
                        content={"View on Etherscan"}
                        onClick={() => window.open(`${ETHERSCAN_URL}${txHash}`, "_blank").focus()}
                    />
                </div>
            </Grid.Column>
        </>
    );

    return (
        <Grid padded>
            {Boolean(stakedAlca) && (
                <div className="font-bold text-sm absolute left-[24px] -top-[54px] p-3 bg-blue-50 text-blue-500 border-r-blue-400 rounded">
                    <Icon name="warning sign" className="mr-4" />
                    {stakedAlca} ALCA already staked!
                </div>
            )}

            {success ? renderUnstakedSuccessfully() : renderRequestUnstake()}

            {status.error && (
                <Grid.Column width={16}>
                    <Message negative>
                        <p>{status.message}</p>
                    </Message>
                </Grid.Column>
            )}
        </Grid>
    );
}
