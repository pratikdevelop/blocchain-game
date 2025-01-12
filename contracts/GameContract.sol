// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GameContract {
    address public owner;
    uint public fee; // Fixed fee for playing the game

    struct Player {
        address playerAddress;
        uint gamesPlayed;
    }

    mapping(address => Player) public players;

    event GamePlayed(address indexed player, uint feePaid);

    constructor(uint _fee) {
        owner = msg.sender;
        fee = _fee; // Initialize game fee
    }

    function setFee(uint _fee) public {
        require(msg.sender == owner, "Only the owner can set the fee");
        fee = _fee;
    }

    function playGame() public payable {
        require(msg.value >= fee, "Insufficient gas fee sent");

        if (players[msg.sender].playerAddress == address(0)) {
            players[msg.sender] = Player(msg.sender, 0);
        }

        players[msg.sender].gamesPlayed += 1;

        emit GamePlayed(msg.sender, msg.value);
    }

    function withdraw() public {
        require(msg.sender == owner, "Only the owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
