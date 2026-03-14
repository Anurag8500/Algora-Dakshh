import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExecution extends Document {

  userWallet:string;

  agentId:mongoose.Types.ObjectId;

  paymentAmount:number;

  status:
  | "pending"
  | "paid"
  | "running"
  | "completed"
  | "failed";

  input:any;

  result:any;

  resultHash?:string;

  txHash?:string;

  contractExecutionId?:number;

  latency?:number;

  startedAt?:Date;

  completedAt?:Date;

  errorMessage?:string;

  executionLogs?:{
    providerResponse?:any;
    statusCode?:number;
    latency?:number;
  };

  createdAt:Date;

  updatedAt:Date;

}

const ExecutionSchema:Schema = new Schema({

  userWallet:{
    type:String,
    required:true,
    lowercase:true,
    trim:true
  },

  agentId:{
    type:Schema.Types.ObjectId,
    ref:"Agent",
    required:true
  },

  paymentAmount:{
    type:Number,
    required:true,
    min:0
  },

  status:{
    type:String,
    enum:[
      "pending",
      "paid",
      "running",
      "completed",
      "failed"
    ],
    default:"pending"
  },

  input:{
    type:Schema.Types.Mixed
  },

  result:{
    type:Schema.Types.Mixed
  },

  resultHash:{
    type:String
  },

  txHash:{
    type:String
  },

  contractExecutionId:{
    type:Number
  },

  latency:{
    type:Number
  },

  startedAt:{
    type:Date
  },

  completedAt:{
    type:Date
  },

  errorMessage:{
    type:String
  },

  executionLogs:{
    type:Schema.Types.Mixed
  }

},{
  timestamps:true
});

const Execution:Model<IExecution> =
mongoose.models.Execution ||
mongoose.model<IExecution>("Execution",ExecutionSchema);

export default Execution;