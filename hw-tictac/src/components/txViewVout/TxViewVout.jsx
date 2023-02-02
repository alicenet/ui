import React from "react";
import { SecondaryAccordion, TertiaryAccordion, TxViewDataStore, TxViewValueStore, } from "components";
import { ReactComponent as DataStoreIcon } from "assets/datastore-icon.svg";
import { ReactComponent as ValueStoreIcon } from "assets/valuestore-icon.svg";
import { aliceNetAdapter } from "adapter/alicenetadapter";

export function TxViewVout({ txInfo }) {

    const dataStores = txInfo.filter(tx => tx.DataStore);
    const valueStores = txInfo.filter(tx => tx.ValueStore);

    return (

        <>

            {
                dataStores.length > 0 &&
                <SecondaryAccordion
                    padded
                    title="DataStores"
                    itemsCount={dataStores.length}
                    icon={<DataStoreIcon />}
                >
                    {dataStores.map((dataStore, index) => (
                        <TertiaryAccordion
                            key={`collapsable-tx-vout-ds-${index}`}
                            title={`DataStore 0x${dataStore['DataStore']['DSLinker']['DSPreImage']['Index']}`}
                        >
                            <TxViewDataStore dataStore={dataStore?.DataStore} />
                        </TertiaryAccordion>
                    ))}
                </SecondaryAccordion>
            }

            {
                valueStores.length > 0 &&
                <SecondaryAccordion
                    padded
                    title="ValueStores"
                    itemsCount={valueStores.length}
                    icon={<ValueStoreIcon />}
                >
                    {valueStores.map((valueStore, index) => (
                        <TertiaryAccordion
                            key={`collapsable-tx-vout-vs-${index}`}
                            title={`ValueStore ${aliceNetAdapter.hexToInt(valueStore['ValueStore']['VSPreImage']['Value'])}`}
                        >
                            <TxViewValueStore valueStore={valueStore?.ValueStore} />
                        </TertiaryAccordion>
                    ))}
                </SecondaryAccordion>
            }

        </>
    );

}
