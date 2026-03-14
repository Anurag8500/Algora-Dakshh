export interface Execution {
  _id: string;
  userWallet: string;
  agentId: string;
  paymentAmount: number;
  status: "pending" | "paid" | "running" | "completed" | "failed";
  input: any;
  result: any;
  resultHash?: string;
  txHash?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface ExecutionApiResponse {
  success: boolean;
  data?: Execution;
  executionId?: string;
  paymentRequired?: boolean;
  amount?: number;
  token?: string;
  message?: string;
  status?: string;
  result?: any;
}
