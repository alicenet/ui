import React from "react";
import ethAdapter from "eth/ethAdapter";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_ACTIONS } from "redux/actions";
import { Grid, Header, Input, Button, Dimmer, Loader, Message, Modal, Icon } from "semantic-ui-react";
import { TOKEN_TYPES } from "redux/constants";
import { LOCK_APP_URL } from "utils/constants";
import { useCookies } from "react-cookie";
import { sha256 } from "ethers/lib/utils";
import utils from "utils";
import { formatNumberToLocale } from "utils/locale";

const DECIMALS = 18;
const ETHERSCAN_URL = process.env.REACT_APP__ETHERSCAN_TX_URL || "https://etherscan.io/tx/";

export function StakeStake() {
    const { connectedAddress, tokenId, alcaBalance, alcaStakeAllowance } = useSelector(state => ({
        tokenId: state.application.stakedPosition.tokenId,
        alcaBalance: state.application.balances.alca,
        alcaStakeAllowance: state.application.allowances.alcaStakeAllowance,
        connectedAddress: state.application.connectedAddress
    }))

    const dispatch = useDispatch();
    const [stakeAmt, setStakeAmt] = React.useState('');
    const [waiting, setWaiting] = React.useState(false);
    const [status, setStatus] = React.useState({});
    const [allowanceMet, setAllowanceMet] = React.useState(false);
    const [hash, setHash] = React.useState('');
    const [multipleTx, setMultipleTx] = React.useState('');
    const [aboutModalOpen, setAboutModalOpen] = React.useState(false);

    const [currentContent, setCurrentContent] = React.useState('staking')
    const [cookies, setCookie] = useCookies([]);


    React.useEffect(() => {
        setStakeAmt('');
    }, [])

    const updateStakeAmt = (amt) => {
        if (amt === "." || amt === "") {
            return setStakeAmt("");
        }
        if (!/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/.test(amt)) {
            return;
        }
        let split = amt.split(".");
        if (split[0].length >= 11 || (split[1] && split[1].length > 18)) {
            return
        }
        setStakeAmt(amt);
    }

    React.useEffect(() => {
        try {
            if (!stakeAmt) return;
            const parsedStakeAmt = ethers.utils.parseUnits(stakeAmt || "0", DECIMALS);

            setStatus({});

            setAllowanceMet(ethers.BigNumber.from(alcaStakeAllowance || 0).gte(parsedStakeAmt));

            if (parsedStakeAmt.gt(ethers.utils.parseUnits(alcaBalance || "0", DECIMALS))) {
                setStatus({
                    error: true,
                    message: "Stake amount higher than current balance"
                });
            }
        } catch (exc) {
            setStatus({
                error: true,
                message: "There was a problem with your input, please verify"
            });
        }
    }, [stakeAmt, alcaBalance, alcaStakeAllowance]);

    const approveStaking = async () => {
        const tx = await ethAdapter.sendStakingAllowanceRequest(stakeAmt);
        if (tx.error) throw tx.error;
        const rec = tx.hash && await tx.wait();

        if (rec.transactionHash) {
            setHash(rec.transactionHash);
            setMultipleTx('1/2 completed');
            setStatus({
                error: false,
                message: `You have successfully allowed ${stakeAmt} ALCA`
            });
        }
    }

    const stake = async () => {
        const tx = await ethAdapter.openStakingPosition(stakeAmt);
        if (tx.error) throw tx.error;
        const rec = await tx.wait();

        if (rec.transactionHash) {
            await dispatch(APPLICATION_ACTIONS.updateBalances(TOKEN_TYPES.ALL));
            setHash(rec.transactionHash);
            setStakeAmt('');
            setStatus({
                error: false,
                message: `You have successfully staked ${formatNumberToLocale(stakeAmt)} ALCA`
            });
        }
    }

    const handleStaking = async () => {
        try {
            setWaiting(true);
            setHash('');
            setMultipleTx('');
            setStatus({});

            if (allowanceMet) await stake();

            if (!allowanceMet) {
                await approveStaking();
                await stake();
            }

            setWaiting(false);
            setCurrentContent('stakeSuccess')
            setCookie('lockOptionShown', sha256(connectedAddress))
        } catch (exception) {
            setStatus({
                error: true,
                message: exception.toString() || "There was a problem with your request, please verify or try again later"
            });
            setWaiting(false);
        }
    }

    const handleLocking = async () => {
        try {
            setWaiting(true);
            setHash('');
            setMultipleTx('');
            setStatus({});

            const tx = await ethAdapter.safeTransferFromPublicStakingNFT(tokenId);
            if (tx.error) throw tx.error;
            const rec = await tx.wait();

            if (rec.transactionHash) {
                await dispatch(APPLICATION_ACTIONS.updateBalances(TOKEN_TYPES.ALL));
                setHash(rec.transactionHash);
                setStatus({
                    error: false,
                    message: "You have successfully locked your NFT"
                });
            }

            setCurrentContent('lockSuccess')
            setWaiting(false);
        } catch (exception) {
            setStatus({
                error: true,
                message: exception.toString() || "There was a problem with your request, please verify or try again later"
            });
            setCurrentContent('errorLocking')
            setWaiting(false);
        }
    }

    /////////////////////
    /* Render function */
    ////////////////////
    function renderMessage() {
        if (!status?.message || status?.error) return <></>

        return (
            <Header className="mt-6">
                <div className="mb-4 text-base">
                    {status?.message}
                </div>

                <Header.Subheader>
                    <p>You can check the transaction hash below</p>
                    <p>
                        {hash}
                        <Icon
                            name="copy"
                            className="cursor-pointer"
                            onClick={() => utils.string.copyText(hash)}
                        />
                    </p>
                </Header.Subheader>
            </Header>
        )

    }

    function renderLockNftButton(text) {
        if (cookies.lockOptionShown == sha256(connectedAddress)) return <></>

        text = text || "Lock My Stake"

        return (
            <Button
                content={text}
                secondary
                onClick={handleLocking}
            />
        )
    }

    function renderStakeSuccess() {
        if (currentContent != 'stakeSuccess') return <></>;

        return (
            <div className="mt-4">
                <div className="flex">
                    <div>
                        <Button
                            content={"View on Etherscan"}
                            secondary
                            onClick={() => window.open(`${ETHERSCAN_URL}${hash}`, '_blank').focus()}
                        />
                    </div>
                    <div className="ml-4">
                        {renderLockNftButton()}
                    </div>
                </div>
            </div>
        )
    }

    function renderRetryLockNftButton() {
        if (currentContent != 'errorLocking') return <></>;

        return (
            <div>
                <div>There was an error locking your Stake. Please try again.</div>
                <div className="mt-3">
                    {renderLockNftButton("Retry Lock My Stake")}
                </div>
            </div>
        )
    }

    function renderStaking() {
        if (currentContent != "staking") return <></>;

        return (
            <>
                <Header>Stake your ALCA
                    <Header.Subheader>
                        {alcaBalance} available for staking
                    </Header.Subheader>
                </Header>

                <div className="text-xs font-bold">
                    You will need to sign two transactions to stake your ALCA
                </div>

                <div>
                    <Input
                        placeholder={`Amount to stake`}
                        value={stakeAmt}
                        type="text"
                        inputMode="decimal"
                        pattern="^[0-9]*[.]?[0-9]*$"
                        onChange={e => e.target.validity.valid && updateStakeAmt(e.target.value)}
                        action={{
                            content: "Max",
                            onClick: () => { setStakeAmt(alcaBalance) }
                        }}
                    />
                </div>

                <div>
                    <Button
                        className="mt-4"
                        secondary
                        content={
                            (!alcaStakeAllowance || !stakeAmt)
                                ? "Enter an amount"
                                : allowanceMet ? "Stake ALCA" : `Stake ${stakeAmt} ALCA`
                        }
                        onClick={handleStaking}
                        disabled={!stakeAmt || ethers.utils.parseUnits(stakeAmt || "0", DECIMALS).gt(ethers.utils.parseUnits(alcaBalance || "0", DECIMALS))}
                    />

                    <div
                        className="cursor-pointer text-xs mt-4 underline"
                        onClick={() => setAboutModalOpen(true)}
                    >
                        About ALCA Staked rewards
                    </div>
                </div>
            </>
        )
    }

    function renderLockSuccess() {
        if (currentContent != 'lockSuccess') return <></>

        return (
            <div>Visited <a className="underline" href={LOCK_APP_URL} target="_blank">the Lock App</a> for more details.</div>
        )
    }

    return (<>

        <Modal open={aboutModalOpen} onClose={() => setAboutModalOpen(false)}>
            <Modal.Header>About</Modal.Header>
            <Modal.Content>
                Lorem Ipsum . . .
            </Modal.Content>
        </Modal>

        <Grid padded>
            {waiting && (
                <Dimmer inverted active>
                    <Loader indeterminate>
                        {multipleTx ? multipleTx : 'Processing Transaction..'}
                    </Loader>
                </Dimmer>
            )}

            {renderMessage()}

            <Grid.Column width={16}>
                {renderStaking()}
            </Grid.Column>

            <Grid.Column width={16}>
                {renderLockSuccess()}

                {renderStakeSuccess()}

                {renderRetryLockNftButton()}
            </Grid.Column>

            {status.error && (
                <Grid.Column width={16}>
                    <Message negative>
                        <p>{status.message}</p>
                    </Message>
                </Grid.Column>
            )}
        </Grid>
    </>
    )
}
