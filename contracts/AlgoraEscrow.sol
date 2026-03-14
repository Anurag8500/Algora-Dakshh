// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AlgoraEscrow is Ownable {
    struct Execution {
        address user;
        address developer;
        uint amount;
        bool completed;
        bool refunded;
    }

    mapping(uint => Execution) public executions;
    uint public executionCounter;
    
    address public platformWallet;
    uint public platformFeePercent = 20;
    uint public developerPercent = 80;

    event ExecutionCreated(
        uint indexed executionId,
        address indexed user,
        address indexed developer,
        uint amount
    );
    event ExecutionCompleted(uint indexed executionId);
    event ExecutionRefunded(uint indexed executionId);

    constructor(address _platformWallet) Ownable(msg.sender) {
        require(_platformWallet != address(0), "Invalid platform wallet");
        platformWallet = _platformWallet;
    }

    function createExecution(address developer) public payable returns (uint) {
        require(msg.value > 0, "Amount must be greater than 0");
        require(developer != address(0), "Invalid developer address");

        executionCounter++;
        uint executionId = executionCounter;

        executions[executionId] = Execution({
            user: msg.sender,
            developer: developer,
            amount: msg.value,
            completed: false,
            refunded: false
        });

        emit ExecutionCreated(executionId, msg.sender, developer, msg.value);
        return executionId;
    }

    function completeExecution(uint id) public onlyOwner {
        Execution storage exec = executions[id];
        require(exec.amount > 0, "Execution does not exist");
        require(!exec.completed, "Already completed");
        require(!exec.refunded, "Already refunded");

        uint developerAmount = (exec.amount * developerPercent) / 100;
        uint platformAmount = (exec.amount * platformFeePercent) / 100;

        exec.completed = true;

        (bool devSuccess, ) = payable(exec.developer).call{value: developerAmount}("");
        require(devSuccess, "Developer transfer failed");

        (bool platformSuccess, ) = payable(platformWallet).call{value: platformAmount}("");
        require(platformSuccess, "Platform transfer failed");

        emit ExecutionCompleted(id);
    }

    function refundExecution(uint id) public onlyOwner {
        Execution storage exec = executions[id];
        require(exec.amount > 0, "Execution does not exist");
        require(!exec.completed, "Already completed");
        require(!exec.refunded, "Already refunded");

        exec.refunded = true;

        (bool success, ) = payable(exec.user).call{value: exec.amount}("");
        require(success, "Refund transfer failed");

        emit ExecutionRefunded(id);
    }

    function updatePlatformWallet(address _newWallet) public onlyOwner {
        require(_newWallet != address(0), "Invalid wallet");
        platformWallet = _newWallet;
    }

    function updateFees(uint _platformFee, uint _developerSplit) public onlyOwner {
        require(_platformFee + _developerSplit == 100, "Must equal 100%");
        platformFeePercent = _platformFee;
        developerPercent = _developerSplit;
    }
}
