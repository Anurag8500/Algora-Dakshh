import { motion, AnimatePresence } from "framer-motion";
import { Play, Eye, Edit2, BarChart2, Loader2, CheckCircle, AlertCircle, X, Beaker, Wallet } from "lucide-react";
import { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useSwitchChain, usePublicClient } from "wagmi";
import { parseEther, decodeEventLog } from "viem";
import { avalancheFuji } from "wagmi/chains";

const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "developer",
        "type": "address"
      }
    ],
    "name": "createExecution",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "completeExecution",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "refundExecution",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "executionId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "developer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "ExecutionCreated",
    "type": "event"
  }
] as const;

interface AgentCardProps {
  id?: string;
  name: string;
  category: string;
  price: string;
  description: string;
  type?: "marketplace" | "developer";
  status?: "active" | "draft" | "disabled" | "paused";
  executions?: number;
  revenue?: string;
  inputType?: "text" | "image" | "file" | "json";
  outputType?: "text" | "json" | "image" | "classification" | "score";
}

export function AgentCard({ 
  id,
  name, 
  category, 
  price, 
  description, 
  type = "marketplace",
  status,
  executions,
  revenue,
  inputType = "text",
  outputType = "text"
}: AgentCardProps) {
  const { address, chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();
  
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionState, setExecutionState] = useState<"idle" | "input" | "requesting" | "payment_required" | "processing_payment" | "verifying_tx" | "running" | "completed" | "failed" | "testing">("idle");
  const [executionResult, setExecutionResult] = useState<any>(null);
  const [executionId, setExecutionId] = useState<string | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [developerWallet, setDeveloperWallet] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userInput, setUserInput] = useState<string>("");
  const [testResult, setTestResult] = useState<any>(null);

  const handleTestAgent = async () => {
    if (!id) return;
    setExecutionState("testing");
    setIsExecuting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/agents/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId: id }),
      });
      const data = await response.json();
      
      setTestResult(data);
      if (!data.success) {
        setErrorMessage(data.message);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleRunAgent = async () => {
    if (!address || !id) return;
    setExecutionState("input");
    setIsExecuting(true);
  };

  const startExecution = async () => {
    if (!address || !id) return;
    
    setErrorMessage(null);
    setExecutionState("requesting");

    try {
      let finalInput: any = userInput;
      if (inputType === "json") {
        try {
          finalInput = JSON.parse(userInput);
        } catch (e) {
          throw new Error("Invalid JSON input");
        }
      }

      // 1. Create Execution
      const createRes = await fetch("/api/executions/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: id,
          userWallet: address,
          input: finalInput
        }),
      });
      
      const createText = await createRes.text();
      let createData: any;
      try {
        createData = JSON.parse(createText);
      } catch (e) {
        throw new Error(`Server error (${createRes.status}): Invalid response format`);
      }

      if (!createData.success) throw new Error(createData.message);
      setExecutionId(createData.executionId);

      // 2. Payment Request
      const payReqRes = await fetch("/api/payment/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ executionId: createData.executionId }),
      });
      
      const payReqText = await payReqRes.text();
      let payReqData: any;
      try {
        payReqData = JSON.parse(payReqText);
      } catch (e) {
        throw new Error(`Server error (${payReqRes.status}): Invalid response format`);
      }

      if (!payReqData.success) throw new Error(payReqData.message);
      
      setPaymentDetails(payReqData.payment);
      setDeveloperWallet(payReqData.developerWallet);
      setExecutionState("payment_required");

    } catch (error: any) {
      console.error("Run agent error:", error);
      setExecutionState("failed");
      setErrorMessage(error.message);
    }
  };

  const handleContractPayment = async () => {
    if (!executionId || !paymentDetails || !developerWallet) return;

    try {
      // PART 4 & 6 - Debug and Validation
      console.log("Payment target (Contract):", paymentDetails.contract);
      console.log("Amount (AVAX):", paymentDetails.amount);
      console.log("Developer Wallet:", developerWallet);

      if (!paymentDetails.contract) {
        throw new Error("Contract address missing from payment details");
      }

      // Ensure we are on Avalanche Fuji
      if (chainId !== avalancheFuji.id) {
        setExecutionState("processing_payment");
        await switchChain({ chainId: avalancheFuji.id });
      }

      setExecutionState("processing_payment");

      // PART 9 - Call createExecution on Escrow Contract
      const contractAddr = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || paymentDetails.contract;
      
      const txHash = await writeContractAsync({
        address: contractAddr as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'createExecution',
        args: [developerWallet as `0x${string}`],
        value: parseEther(paymentDetails.amount.toString()),
      });

      console.log("Transaction sent:", txHash);
      setExecutionState("verifying_tx");

      // PART 2 - Wait for transaction confirmation properly
      if (publicClient) {
        console.log("Waiting for transaction receipt...");
        await publicClient.waitForTransactionReceipt({ 
          hash: txHash 
        });
        console.log("Transaction confirmed on-chain");
      }

      const confirmRes = await fetch("/api/payment/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          executionId,
          txHash,
          userWallet: address,
          contractExecutionId: 0 // Backend will find the real one from logs
        }),
      });
      
      const confirmText = await confirmRes.text();
      let confirmData: any;
      try {
        confirmData = JSON.parse(confirmText);
      } catch (e) {
        throw new Error(`Server error (${confirmRes.status}): Invalid response format`);
      }

      if (!confirmData.success) {
        throw new Error(confirmData.message || "Payment confirmation failed");
      }

      // PART 9 - Set to running after success
      setExecutionState("running");
      pollExecutionStatus(executionId);

    } catch (error: any) {
      console.error("Payment error:", error);
      // PART 1 & 6 - Only set failed if it's an actual error, not just a slow confirm
      if (error.message?.includes("User rejected") || error.message?.includes("failed")) {
        setExecutionState("failed");
        setErrorMessage(error.message || "Transaction failed or rejected");
      } else if (!executionState.includes("running")) {
        // If we are already running (polling), don't set to failed on a late network error
        setExecutionState("failed");
        setErrorMessage(error.message || "Something went wrong during payment");
      }
    }
  };

  const pollExecutionStatus = async (execId: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/executions/${execId}`);
        const data = await response.json();

        if (data.success) {
          // PART 5 - Polling must continue if status is paid or running
          if (data.status === "completed") {
            clearInterval(interval);
            setExecutionResult(data.result);
            setExecutionState("completed");
            console.log("Execution completed successfully");
          } else if (data.status === "failed") {
            clearInterval(interval);
            setExecutionState("failed");
            setErrorMessage(data.errorMessage || "Agent execution failed");
            console.log("Execution failed:", data.errorMessage);
          } else if (data.status === "running") {
            setExecutionState("running");
          }
          // if "paid", just keep polling
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    }, 1500); // Slightly slower polling to be safe
  };

  const resetExecution = () => {
    setIsExecuting(false);
    setExecutionState("idle");
    setExecutionResult(null);
    setExecutionId(null);
    setPaymentDetails(null);
    setErrorMessage(null);
    setUserInput("");
    setTestResult(null);
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6 flex flex-col h-full hover:border-[#333] transition-colors group relative overflow-hidden"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-[#00FF88] transition-colors">{name}</h3>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/5 text-[#A1A1A1] border border-white/10">
              {category}
            </span>
          </div>
          
          {type === "developer" && status && (
            <span className={`px-2.5 py-1 rounded border text-xs font-bold uppercase tracking-wider
              ${status === "active" ? "bg-[#00FF88]/10 text-[#00FF88] border-[#00FF88]/20" : ""}
              ${status === "draft" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" : ""}
              ${status === "paused" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" : ""}
              ${status === "disabled" ? "bg-red-500/10 text-red-500 border-red-500/20" : ""}
            `}>
              {status}
            </span>
          )}
        </div>

        <p className="text-[#A1A1A1] text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
          {description}
        </p>

        {type === "developer" ? (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-black/50 rounded-lg p-3 border border-[#1F1F1F]">
              <p className="text-xs text-[#A1A1A1] mb-1">Executions</p>
              <p className="text-sm font-bold text-white">{executions?.toLocaleString()}</p>
            </div>
            <div className="bg-black/50 rounded-lg p-3 border border-[#1F1F1F]">
              <p className="text-xs text-[#A1A1A1] mb-1">Revenue</p>
              <p className="text-sm font-bold text-[#00FF88]">{revenue}</p>
            </div>
          </div>
        ) : (
          <div className="mb-6 flex items-center justify-between bg-black/50 rounded-lg p-3 border border-[#1F1F1F]">
            <span className="text-sm text-[#A1A1A1]">Cost / Execution</span>
            <span className="font-mono text-[#00FF88] font-bold">{price}</span>
          </div>
        )}

        <div className="flex gap-3 mt-auto">
          {type === "marketplace" ? (
            <>
              <button 
                onClick={handleRunAgent}
                disabled={!address || !id}
                className="flex-1 bg-[#00FF88] hover:bg-[#00C76A] text-black font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play className="w-4 h-4" />
                Run Agent
              </button>
              <button className="flex-1 border border-[#333] hover:border-[#00FF88] text-white hover:text-[#00FF88] font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
                <Eye className="w-4 h-4" />
                View
              </button>
            </>
          ) : (
            <>
              <button className="flex-1 border border-[#333] hover:border-white text-white font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button 
                onClick={handleTestAgent}
                className="flex-1 border border-[#333] hover:border-[#00FF88] text-[#00FF88] font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm bg-[#00FF88]/5"
              >
                <Beaker className="w-4 h-4" />
                Test
              </button>
            </>
          )}
        </div>
      </motion.div>

      {/* Execution Modal Overlay */}
      <AnimatePresence>
        {isExecuting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#111111] border border-[#1F1F1F] rounded-3xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(0,0,0,0.5)] relative"
            >
              <button 
                onClick={resetExecution}
                className="absolute top-4 right-4 p-2 text-[#A1A1A1] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  {executionState === "completed" ? (
                    <CheckCircle className="w-8 h-8 text-[#00FF88]" />
                  ) : executionState === "failed" ? (
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  ) : (
                    <Loader2 className="w-8 h-8 text-[#00FF88] animate-spin" />
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {executionState === "testing" && "Testing Agent"}
                    {executionState === "input" && "Agent Input"}
                    {executionState === "requesting" && "Initializing..."}
                    {executionState === "payment_required" && "Payment Required"}
                    {executionState === "processing_payment" && "Switching Network..."}
                    {executionState === "verifying_tx" && "Verifying Transaction..."}
                    {executionState === "running" && "Executing Agent..."}
                    {executionState === "completed" && "Execution Complete"}
                    {executionState === "failed" && "Execution Failed"}
                  </h3>
                  <p className="text-[#A1A1A1] text-sm">
                    {executionState === "testing" && (testResult ? (testResult.success ? "Agent reachable and working!" : "Agent test failed.") : "Checking if agent is reachable...")}
                    {executionState === "input" && `Please provide the required ${inputType} data.`}
                    {executionState === "payment_required" && `This agent requires ${price} to run. Funds will be held in escrow.`}
                    {executionState === "verifying_tx" && "Waiting for blockchain confirmation..."}
                    {executionState === "running" && "The AI agent is processing your request."}
                    {executionState === "completed" && "The results are ready below."}
                    {executionState === "failed" && (errorMessage || "Something went wrong.")}
                  </p>
                </div>

                {executionState === "testing" && testResult && (
                  <div className="w-full flex flex-col gap-4">
                    <div className="bg-black/50 border border-[#1F1F1F] rounded-xl p-4 text-left">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-[#A1A1A1] uppercase font-bold">Status</span>
                        <span className={`text-xs font-bold ${testResult.success ? "text-[#00FF88]" : "text-red-500"}`}>
                          {testResult.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-[#A1A1A1] uppercase font-bold">Latency</span>
                        <span className="text-xs text-white font-mono">{testResult.latency}ms</span>
                      </div>
                      {testResult.data && (
                        <div className="mt-4">
                          <p className="text-xs text-[#A1A1A1] uppercase font-bold mb-2">Sample Output</p>
                          <pre className="text-[10px] text-[#00FF88] font-mono whitespace-pre-wrap max-h-[100px] overflow-auto">
                            {JSON.stringify(testResult.data, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={resetExecution}
                      className="w-full border border-[#333] hover:border-white text-white font-bold py-3.5 rounded-xl transition-colors"
                    >
                      Close
                    </button>
                  </div>
                )}

                {executionState === "input" && (
                  <div className="w-full flex flex-col gap-4">
                    {inputType === "text" || inputType === "json" ? (
                      <textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder={inputType === "json" ? '{ "key": "value" }' : "Enter input text..."}
                        className="w-full bg-black border border-[#1F1F1F] rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-[#00FF88] min-h-[120px]"
                      />
                    ) : (
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Enter file URL or base64..."
                        className="w-full bg-black border border-[#1F1F1F] rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-[#00FF88]"
                      />
                    )}
                    <button
                      onClick={startExecution}
                      className="w-full bg-[#00FF88] hover:bg-[#00C76A] text-black font-bold py-3.5 rounded-xl transition-all"
                    >
                      Continue to Payment
                    </button>
                  </div>
                )}

                {executionState === "payment_required" && (
                  <button
                    onClick={handleContractPayment}
                    className="w-full bg-[#00FF88] hover:bg-[#00C76A] text-black font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(0,255,136,0.2)] flex items-center justify-center gap-2"
                  >
                    <Wallet className="w-5 h-5" />
                    Pay Escrow ({price})
                  </button>
                )}

                {executionState === "completed" && executionResult && (
                  <div className="w-full bg-black/50 border border-[#1F1F1F] rounded-xl p-4 text-left overflow-auto max-h-[300px]">
                    <p className="text-xs text-[#A1A1A1] uppercase font-bold tracking-wider mb-3">Result ({outputType})</p>
                    
                    {outputType === "score" ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white font-bold">{executionResult.output || executionResult}%</span>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${executionResult.output || executionResult}%` }}
                            className="h-full bg-[#00FF88]"
                          />
                        </div>
                      </div>
                    ) : outputType === "classification" && typeof (executionResult.output || executionResult) === "object" ? (
                      <div className="flex flex-col gap-2">
                        {Object.entries(executionResult.output || executionResult).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center border-b border-white/5 py-1 last:border-0">
                            <span className="text-xs text-[#A1A1A1] capitalize">{key}</span>
                            <span className="text-xs text-[#00FF88] font-mono">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <pre className="text-xs text-[#00FF88] font-mono whitespace-pre-wrap">
                        {typeof executionResult === 'object' 
                          ? JSON.stringify(executionResult, null, 2)
                          : executionResult
                        }
                      </pre>
                    )}
                  </div>
                )}

                {(executionState === "completed" || executionState === "failed") && (
                  <button
                    onClick={resetExecution}
                    className="w-full border border-[#333] hover:border-white text-white font-bold py-3.5 rounded-xl transition-colors"
                  >
                    Close
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
