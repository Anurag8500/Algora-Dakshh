import { ethers } from "ethers";

const ABI = [
  "function completeExecution(uint256 id) public",
  "function refundExecution(uint256 id) public",
  "function executions(uint256) public view returns (address user, address developer, uint256 amount, bool completed, bool refunded)"
];

const RPC_URL = process.env.AVALANCHE_RPC || "https://api.avax-test.network/ext/bc/C/rpc";
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "";
const PRIVATE_KEY = process.env.BACKEND_PRIVATE_KEY || "";

export async function getContract() {
  if (!CONTRACT_ADDRESS || !PRIVATE_KEY) {
    throw new Error("Contract address or backend private key missing");
  }
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
}

export async function completeContractExecution(executionId: number) {
  try {
    const contract = await getContract();
    console.log(`Completing contract execution for ID: ${executionId}`);
    const tx = await contract.completeExecution(executionId);
    await tx.wait();
    console.log(`Contract execution completed: ${tx.hash}`);
    return { success: true, hash: tx.hash };
  } catch (error: any) {
    console.error("Error completing contract execution:", error);
    throw error;
  }
}

export async function refundContractExecution(executionId: number) {
  try {
    const contract = await getContract();
    console.log(`Refunding contract execution for ID: ${executionId}`);
    const tx = await contract.refundExecution(executionId);
    await tx.wait();
    console.log(`Contract refund completed: ${tx.hash}`);
    return { success: true, hash: tx.hash };
  } catch (error: any) {
    console.error("Error refunding contract execution:", error);
    throw error;
  }
}

export async function verifyContractPayment(executionId: number, userWallet: string, expectedAmount: string) {
  try {
    const contract = await getContract();
    const execution = await contract.executions(executionId);
    
    const amountInEth = ethers.formatEther(execution.amount);
    
    // Check if user matches, amount matches, and it's not already processed
    const isValid = 
      execution.user.toLowerCase() === userWallet.toLowerCase() &&
      amountInEth === expectedAmount &&
      !execution.completed &&
      !execution.refunded;
      
    return isValid;
  } catch (error) {
    console.error("Error verifying contract payment:", error);
    return false;
  }
}
