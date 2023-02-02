import AliceNetAdapter from "alicenetjs-adapter";
import { aliceNetProvider } from "../config/config";

export const aliceNetAdapter = new AliceNetAdapter(aliceNetProvider);

aliceNetAdapter.init();