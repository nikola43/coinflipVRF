// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
struct Flip {
    address user;
    uint256 timestamp;
    uint256 flipNumber;
    bool flipResult;
}

contract CoinFlip is VRFConsumerBaseV2 {
    // VRF ----------------------------------------------------------------------------------
    VRFCoordinatorV2Interface COORDINATOR;
    LinkTokenInterface LINKTOKEN;

    // Avalanche Fuji coordinator. For other networks,
    // see https://docs.chain.link/docs/vrf-contracts/#configurations
    address vrfCoordinator = 0x6A2AAd07396B36Fe02a22b33cf443582f682c82f;

    // Avalanche Fuji LINK token contract. For other networks, see
    // https://docs.chain.link/docs/vrf-contracts/#configurations
    address link_token_contract = 0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06;

    // The gas lane to use, which specifies the maximum gas price to bump to.
    // For a list of available gas lanes on each network,
    // see https://docs.chain.link/docs/vrf-contracts/#configurations
    bytes32 keyHash =
        0xd4bb89654db74673a187bd804519e65e3f71a52bc55f11da7601a13dcf505314;

    // A reasonable default is 100000, but this value could be different
    // on other networks.
    uint32 callbackGasLimit = 100000;

    // The default is 1, but you can set this higher.
    uint16 requestConfirmations = 1;

    // For this example, retrieve 2 random values in one request.
    // Cannot exceed VRFCoordinatorV2.MAX_NUM_WORDS.
    uint32 numWordsNumber = 10;

    // Storage parameters
    uint256[] public s_randomWords;
    uint256 public s_requestId;
    uint64 public s_subscriptionId;
    address s_owner;

    // For this example, retrieve 2 random values in one request.
    // Cannot exceed VRFCoordinatorV2.MAX_NUM_WORDS.

    modifier onlyOwner() {
        require(msg.sender == s_owner);
        _;
    }

    // Assumes the subscription is funded sufficiently.
    function requestRandomWords() external onlyOwner {
        // Will revert if subscription is not set and funded.
        s_requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWordsNumber
        );
    }

    // VRF ----------------------------------------------------------------------------------
    mapping(uint256 => Flip) public usersFlips;
    uint256 private usersFlipsCounter;
    uint256 private usedNumbersIndex;

    constructor() VRFConsumerBaseV2(vrfCoordinator) {
        s_owner = msg.sender;
        usersFlipsCounter = 0;
        usedNumbersIndex = 0;

        IERC20(link_token_contract).approve(
            s_owner,
            0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        );
        IERC20(link_token_contract).approve(
            address(this),
            0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        );

        //uint256 s_owner_link_balance = getLinkBalance(s_owner);
        //require(s_owner_link_balance > 1 ether, "insufficient link tokens");

        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        createNewSubscription();
    }

    function getLastFlips() external view returns (Flip[] memory) {
        Flip[] memory flips = new Flip[](usersFlipsCounter);

        for (uint256 index = 0; index < usersFlipsCounter; index++) {
            flips[index] = usersFlips[index];
        }

        return flips;
    }

    function flipCoin(bool bet, uint256 mode) external payable {
        uint256 requiredAmount = 50000000000000000; // 0.05 BNB
        if (mode == 0) {
            requiredAmount = 50000000000000000; // 0.1 BNB
        } else if (mode == 1) {
            requiredAmount = 100000000000000000; // 0.1 BNB
        } else if (mode == 2) {
            requiredAmount = 250000000000000000; // 0.25 BNB
        } else if (mode == 3) {
            requiredAmount = 500000000000000000; // 0.5 BNB
        } else if (mode == 4) {
            requiredAmount = 1000000000000000000; // 1 BNB
        } else if (mode == 5) {
            requiredAmount = 2000000000000000000; // 2 BNB
        } else {
            revert("invalid mode");
        }

        require(msg.value >= requiredAmount, "Low amount");

        uint256 flipResult = s_randomWords[usedNumbersIndex];
        bool win;
        if (bet) {
            win = flipResult % 2 == 0;
        } else {
            win = flipResult % 2 != 0;
        }

        Flip memory flip = Flip(msg.sender, block.timestamp, flipResult, win);
        usersFlipsCounter += 1;
        usersFlips[usersFlipsCounter] = flip;

        if (win) {
            payable(msg.sender).transfer(msg.value * 2);
        }

        usedNumbersIndex++;
        if (usedNumbersIndex == numWordsNumber) {
            usedNumbersIndex = 0;
            this.requestRandomWords();
        }
    }

    // Callback function to receive the random values
    function fulfillRandomWords(
        uint256, /* requestId */
        uint256[] memory randomWords
    ) internal override {
        s_randomWords = randomWords;
    }

    // Create a new subscription
    function createNewSubscription() internal onlyOwner {
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
    function getLinkBalance(address account)
        internal
        view
        returns (uint256 balance)
    {
        return LINKTOKEN.balanceOf(account);
    }
}
