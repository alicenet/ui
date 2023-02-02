//////////////////////////
// State Env Defaults  //
////////////////////////
const envType = process.env.REACT_APP_DEPLOYMENT_TYPE;
if (!envType) { throw new Error("Validate .env has DEPLOYMENT_TYPE set"); }

export const aliceNetProvider = process.env["REACT_APP_ALICENET_RPC_ENDPOINT_" + envType];