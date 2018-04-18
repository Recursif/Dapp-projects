pragma solidity ^0.4.0;
contract HelloWorld {
    address public creator; // data-type 'address'
    uint public myNumber; // data-type 'unit'
    string public message; // data-type 'string'

    // constructor - runs once on contract creation transaction
    function HelloWorld() {
        creator = msg.sender; // set 'creator' variable to address of transaction sender
        message = 'Hello, world'; // set our message
        myNumber = 5; // also set a number
    }
}
