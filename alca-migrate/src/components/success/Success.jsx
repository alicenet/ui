import { Button, Container, Icon } from "semantic-ui-react";
import React, { useContext } from "react";
import { tabPanes } from "utils/constants";
import { TabPanesContext } from "contexts";
import { useSelector } from "react-redux";
import { MigrationPanel } from "components/migrationPanel/MigrationPanel";
import { formatNumberToLocale } from "utils/locale";

export function Success() {
    const { activeTabPane, setActiveTabPane } = useContext(TabPanesContext);

    const goExtLink = (target) => {
        let finalTarget = target;
        if (document.location.href.indexOf("staging") !== -1 || document.location.href.indexOf("localhost") !== -1) {
            let tarSplit = target.split("://");
            let alcSplit = tarSplit[1].split(".alice.net");
            let alcTarget = alcSplit[0];
            finalTarget = "https://" + alcTarget + ".staging.alice.net";
        }
        window.open(finalTarget, "_blank").focus();
    };

    const { alcaBalance, madBalance, approvalHash, migrationHash, migrationAmount, alcaExchangeRate, prevMadBal, prevAlcaBal } = useSelector((state) => ({
        approvalHash: state.application.approvalHash,
        migrationHash: state.application.migrationHash,
        prevAlcaBal: state.application.startingBalances.alca,
        alcaBalance: state.application.balances.alca,
        prevMadBal: state.application.startingBalances.mad,
        madBalance: state.application.balances.mad,
        migrationAmount: state.application.migrationAmount,
        alcaExchangeRate: state.application.alcaExchangeRate,
    }));

    return (
        <Container className="flex flex-col justify-around items-center p-4 min-h-[240px] text-sm">
            <div className="text-sm text-center">
                <div className="text-xl">
                    <div className="text-sm mb-2">Thank you for migrating to ALCA</div>
                    <div className="font-bold">
                        You have migrated {formatNumberToLocale(migrationAmount)} MAD to {formatNumberToLocale(alcaExchangeRate)} ALCA
                    </div>
                </div>
            </div>

            <div className="flex justify-between  mt-8">
                <MigrationPanel
                    preTextHeader="Previous Balance"
                    postTextHeader="Current Balance"
                    quadrants={[
                        { title: "MAD Balance", value: formatNumberToLocale(prevMadBal), valueName: "MAD" },
                        { title: "ALCA Balance", value: formatNumberToLocale(prevAlcaBal), valueName: "ALCA" },
                        { title: "MAD Balance", value: formatNumberToLocale(madBalance), valueName: "MAD" },
                        { title: "ALCA Balance", value: formatNumberToLocale(alcaBalance), valueName: "ALCA" },
                    ]}
                    hideButton
                    hideInput
                    disableLeft
                />
            </div>

            <div className="py-8">
                <div className="flex justify-between items-center h-6">
                    <div className="mr-2">
                        <b>&nbsp;Approval Hash:</b>
                    </div>{" "}
                    {approvalHash ? (
                        <a className="text-blue-500 underline" target="_blank" rel="noopener noreferrer" href={`https://etherscan.io/tx/${approvalHash}`}>
                            {" "}
                            {approvalHash} <Icon name="external" className="m-0 h-full" />{" "}
                        </a>
                    ) : (
                        "N/A"
                    )}
                </div>

                <div className="mt-2 flex items-center justify-between h-6">
                    <div className="mr-2">
                        <b>Migration Hash:</b>
                    </div>{" "}
                    {migrationHash ? (
                        <a className="text-blue-500 underline" target="_blank" rel="noopener noreferrer" href={`https://etherscan.io/tx/${migrationHash}`}>
                            {" "}
                            {migrationHash} <Icon name="external" className="m-0 h-full" />{" "}
                        </a>
                    ) : (
                        "N/A"
                    )}
                </div>
            </div>

            <div className="flex justify-between min-w-[420px]">
                <div>
                    <Button secondary content="Migrate More Tokens" onClick={() => setActiveTabPane(tabPanes.MIGRATE)} />
                </div>
                <div className="ml-4">
                    <Button primary content="Stake ALCA" onClick={() => goExtLink("https://stake.alice.net")} />
                </div>
            </div>
        </Container>
    );
}
