import { ethers } from "ethers";

export async function verifyAvalanchePayment(
 txHash:string,
 expectedSender:string,
 expectedRecipient:string,
 expectedAmount:number
){
 try{
  const provider = new ethers.JsonRpcProvider(
    process.env.AVALANCHE_RPC || "https://api.avax-test.network/ext/bc/C/rpc"
  );
  const tx = await provider.getTransaction(txHash);

  if(!tx){
   return { success:false, message:"Transaction not found" };
  }

  if(
   tx.from?.toLowerCase() !== expectedSender.toLowerCase()
  ){
   return { success:false, message:"Invalid sender" };
  }

  if(
   tx.to?.toLowerCase() !== expectedRecipient.toLowerCase()
  ){
   return { success:false, message:"Invalid recipient" };
  }

  const amount = Number(
   ethers.formatEther(tx.value)
  );

  if(amount < expectedAmount){
   return { success:false, message:"Insufficient amount" };
  }

  const receipt = await provider.getTransactionReceipt(txHash);

  if(receipt?.status !== 1){
   return { success:false, message:"Transaction failed" };
  }

  return {
   success:true,
   amount,
   blockNumber:receipt.blockNumber
  };

 }catch(error:any){

  return {
   success:false,
   message:error.message
  };

 }

}