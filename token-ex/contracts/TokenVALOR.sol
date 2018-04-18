pragma solidity ^0.4.22;

interface tokenRecipient { function receiveApproval(address _from, uint256 _value, address _token, bytes _extraData) external; }


contract TokenVALOR {
  // Public variables of the token
  address public owner;
  string public name;
  string public symbol;

  uint256 public totalSupply;

  // commission fees on transfer expressed in percentage multiply by 1000000
  uint256 public fees;

  // This creates an array with all balances
  mapping (address => uint256) public balanceOf;

  // This generates a public event on the blockchain that will notify clients
  event TransferWithFees(address indexed from, address indexed to, uint256 value, uint256 fees);

  /**
   * Constructor function
   *
   * Initializes contract with initial supply tokens to the creator of the contract
   */
  constructor(
      uint256 initialSupply,
      uint commissions,
      string tokenName,
      string tokenSymbol
  ) public {
      owner = msg.sender;
      totalSupply = initialSupply;              // Update total supply
      fees = commissions;                       // Set the fees for transfer
      balanceOf[owner] = totalSupply;      // Give the creator all initial tokens
      name = tokenName;                         // Set the name for display purposes
      symbol = tokenSymbol;                     // Set the symbol for display purposes
  }

  /**
   * Transfer Function With Fees
   */


  /**
   * Internal transferWithFees, only can be called by this contract
   */
  function _transferWithFees(address _from, address _to, uint256 _value) internal {
    // Prevent transfer to 0x0 address. Use burn() instead
    require(_to != 0x0);
    // Check if the sender has enough
    require(balanceOf[_from] >= _value);
    // Check for overflows
    require(balanceOf[_to] + _value >= balanceOf[_to]);
    // Calcul the fees
    uint256 calculatedFees = (_value * fees) / 1000000;
    // Subtract from the sender
    balanceOf[_from] -= _value;
    // Add this value to the recipient minus the fees
    balanceOf[_to] += _value - calculatedFees;
    // Add the fees to the balances of the owner
    balanceOf[owner] += calculatedFees;
    // Emit an event
    emit TransferWithFees(_from, _to, _value, calculatedFees);
  }

  /**
   * Transfer tokens with fees
   *
   * Send `_value` tokens to `_to` from your account
   *
   * @param _to The address of the recipient
   * @param _value the amount to send
   */
  function transferWithFees(address _to, uint256 _value) public {
    _transferWithFees(msg.sender, _to, _value);
  }
}
