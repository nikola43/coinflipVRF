// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

contract TykheLuckyOracle is VRFConsumerBaseV2 {
    LinkTokenInterface LINKTOKEN;

    // Avalanche Fuji coordinator. For other networks,
    // see https://docs.chain.link/docs/vrf-contracts/#configurations
    address vrfCoordinator;

    // Avalanche Fuji LINK token contract. For other networks, see
    // https://docs.chain.link/docs/vrf-contracts/#configurations
    address link_token_contract;

    // The gas lane to use, which specifies the maximum gas price to bump to.
    // For a list of available gas lanes on each network,
    // see https://docs.chain.link/docs/vrf-contracts/#configurations
    bytes32 keyHash;

    // A reasonable default is 100000, but this value could be different
    // on other networks.
    uint32 callbackGasLimit;

    // The default is 1, but you can set this higher.
    uint16 requestConfirmations;

    // For this example, retrieve 2 random values in one request.
    // Cannot exceed VRFCoordinatorV2.MAX_NUM_WORDS.
    uint32 numWords;

    address private _owner;

    // Storage parameters
    uint256[] public s_randomWords;
    uint256 public s_requestId;
    uint64 public s_subscriptionId;
    VRFCoordinatorV2Interface COORDINATOR;

    // Modifier to verify the caller is the owner of the contract
    modifier onlyOwner() {
        require(msg.sender == _owner);
        _;
    }

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    /// @custom:oz-upgrades-unsafe-allow constructor

    constructor(
        address _vrfCoordinator,
        address _link_token_contract,
        bytes32 _keyHash
    ) VRFConsumerBaseV2(vrfCoordinator) {
        _owner = msg.sender;
        numWords = 1;
        requestConfirmations = 1;
        callbackGasLimit = 100000;

        vrfCoordinator = _vrfCoordinator;
        link_token_contract = _link_token_contract;
        keyHash = _keyHash;

        LINKTOKEN = LinkTokenInterface(link_token_contract);
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);

        //Create a new subscription when you deploy the contract.
        //createNewSubscription();
    }

    /**
     * @dev Transfers ownership of the contract to a new account ('newOwner').
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }

    // Assumes the subscription is funded sufficiently.
    function requestRandomWords() external onlyOwner {
        // Will revert if subscription is not set and funded.
        s_requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
    }

    // Callback function to receive the random values
    function fulfillRandomWords(
        uint256, /* requestId */
        uint256[] memory randomWords
    ) internal override {
        s_randomWords = randomWords;
    }

    // get the details of the subscription
    function askOracle() external view returns (uint256[] memory) {
        return s_randomWords;
    }

    // Create a new subscription
    function createNewSubscription() public onlyOwner {
        require(s_subscriptionId == 0, "A subscription already exist");
        // Create a subscription with a new subscription ID.
        address[] memory consumers = new address[](1);
        consumers[0] = address(this);
        s_subscriptionId = COORDINATOR.createSubscription();
        // Add this contract as a consumer of its own subscription.
        COORDINATOR.addConsumer(s_subscriptionId, consumers[0]);
    }

    // get the details of the subscription
    function getSubscriptionDetails()
        external
        view
        returns (
            uint96 balance,
            uint64 reqCount,
            address owner,
            address[] memory consumers
        )
    {
        return COORDINATOR.getSubscription(s_subscriptionId);
    }

    // check if pending requests Exist
    function pendingRequestExists() external view returns (bool) {
        (, bytes memory returnData) = address(COORDINATOR).staticcall(
            abi.encodeWithSignature(
                "pendingRequestExists(uint64)",
                s_subscriptionId
            )
        );
        return abi.decode(returnData, (bool));
    }

    // Assumes this contract owns link. This function must be called to fund the subscription
    // 1000000000000000000 = 1 LINK
    function topUpSubscription(uint256 amount) external onlyOwner {
        LINKTOKEN.transferAndCall(
            address(COORDINATOR),
            amount,
            abi.encode(s_subscriptionId)
        );
    }

    // Add a consumer contract to the subscription.
    function addConsumer(address consumerAddress) external onlyOwner {
        COORDINATOR.addConsumer(s_subscriptionId, consumerAddress);
    }

    // Remove a consumer contract from the subscription.
    function removeConsumer(address consumerAddress) external onlyOwner {
        COORDINATOR.removeConsumer(s_subscriptionId, consumerAddress);
    }

    // Cancel the subscription and send the remaining LINK to a wallet address.
    function cancelSubscription(address receivingWallet) external onlyOwner {
        require(
            s_subscriptionId > 0,
            "A subscription does not exist for this contract"
        );
        COORDINATOR.cancelSubscription(s_subscriptionId, receivingWallet);
        s_subscriptionId = 0;
    }

    // Transfer this contract's funds to an address.
    // 1000000000000000000 = 1 LINK
    function withdraw(uint256 amount, address to) external onlyOwner {
        LINKTOKEN.transfer(to, amount);
    }

    // Link balance of the contract
    function getLinkBalance() external view returns (uint256 balance) {
        return LINKTOKEN.balanceOf(address(this));
    }
}
