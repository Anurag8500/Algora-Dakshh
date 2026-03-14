import pkg from "hardhat";

const { ethers } = pkg;

async function main() {
  const platformWallet = process.env.PLATFORM_WALLET;
  if (!platformWallet) {
    throw new Error("PLATFORM_WALLET not set in .env.local");
  }

  console.log("Deploying AlgoraEscrow...");

  const AlgoraEscrow = await ethers.getContractFactory("AlgoraEscrow");
  const escrow = await AlgoraEscrow.deploy(platformWallet);

  await escrow.waitForDeployment();

  const address = await escrow.getAddress();
  console.log(`AlgoraEscrow deployed to: ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
