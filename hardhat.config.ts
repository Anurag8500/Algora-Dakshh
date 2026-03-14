import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    fuji: {
      url: process.env.AVALANCHE_RPC || "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: process.env.BACKEND_PRIVATE_KEY ? [process.env.BACKEND_PRIVATE_KEY] : [],
      chainId: 43113,
    },
  },
};

export default config;
