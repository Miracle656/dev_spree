// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title TipJar
 * @notice A decentralized tipping/donation system with platform fees
 * @dev Supports ERC20 tokens and native ETH donations
 */
contract TipJar {
    // Platform fee (1% = 100 basis points)
    uint256 public constant PLATFORM_FEE_BPS = 100;
    uint256 public constant BPS_DENOMINATOR = 10000;
    
    address public immutable platformWallet;
    
    struct Donation {
        address donor;
        address recipient;
        uint256 amount;
        uint256 platformFee;
        string message;
        uint256 timestamp;
    }
    
    struct RecipientStats {
        uint256 totalReceived;
        uint256 donationCount;
        uint256 withdrawableBalance;
    }
    
    // Mappings
    mapping(address => RecipientStats) public recipientStats;
    mapping(address => Donation[]) public recipientDonations;
    mapping(address => mapping(address => uint256)) public donorToRecipient;
    
    // Arrays for tracking
    Donation[] public allDonations;
    address[] public recipients;
    mapping(address => bool) public isRecipient;
    
    // Platform earnings
    uint256 public platformEarnings;
    
    // Events
    event DonationReceived(
        address indexed donor,
        address indexed recipient,
        uint256 amount,
        uint256 platformFee,
        string message,
        uint256 timestamp
    );
    
    event Withdrawal(
        address indexed recipient,
        uint256 amount,
        uint256 timestamp
    );
    
    event PlatformFeesWithdrawn(
        address indexed to,
        uint256 amount,
        uint256 timestamp
    );
    
    constructor(address _platformWallet) {
        require(_platformWallet != address(0), "Invalid platform wallet");
        platformWallet = _platformWallet;
    }
    
    /**
     * @notice Send a tip/donation to a recipient
     * @param recipient Address to receive the donation
     * @param message Optional message to include with the donation
     */
    function donate(address recipient, string calldata message) external payable {
        require(msg.value > 0, "Donation must be greater than 0");
        require(recipient != address(0), "Invalid recipient");
        require(recipient != msg.sender, "Cannot donate to yourself");
        
        // Calculate platform fee (1%)
        uint256 platformFee = (msg.value * PLATFORM_FEE_BPS) / BPS_DENOMINATOR;
        uint256 recipientAmount = msg.value - platformFee;
        
        // Update platform earnings
        platformEarnings += platformFee;
        
        // Track recipient
        if (!isRecipient[recipient]) {
            recipients.push(recipient);
            isRecipient[recipient] = true;
        }
        
        // Update recipient stats
        recipientStats[recipient].totalReceived += recipientAmount;
        recipientStats[recipient].donationCount += 1;
        recipientStats[recipient].withdrawableBalance += recipientAmount;
        
        // Track donor to recipient total
        donorToRecipient[msg.sender][recipient] += recipientAmount;
        
        // Create donation record
        Donation memory newDonation = Donation({
            donor: msg.sender,
            recipient: recipient,
            amount: recipientAmount,
            platformFee: platformFee,
            message: message,
            timestamp: block.timestamp
        });
        
        // Store donation
        allDonations.push(newDonation);
        recipientDonations[recipient].push(newDonation);
        
        emit DonationReceived(
            msg.sender,
            recipient,
            recipientAmount,
            platformFee,
            message,
            block.timestamp
        );
    }
    
    /**
     * @notice Withdraw accumulated donations
     */
    function withdraw() external {
        uint256 balance = recipientStats[msg.sender].withdrawableBalance;
        require(balance > 0, "No balance to withdraw");
        
        // Reset balance before transfer (reentrancy protection)
        recipientStats[msg.sender].withdrawableBalance = 0;
        
        // Transfer funds
        (bool success, ) = msg.sender.call{value: balance}("");
        require(success, "Transfer failed");
        
        emit Withdrawal(msg.sender, balance, block.timestamp);
    }
    
    /**
     * @notice Withdraw platform fees (only platform wallet)
     */
    function withdrawPlatformFees() external {
        require(msg.sender == platformWallet, "Only platform wallet");
        require(platformEarnings > 0, "No fees to withdraw");
        
        uint256 amount = platformEarnings;
        platformEarnings = 0;
        
        (bool success, ) = platformWallet.call{value: amount}("");
        require(success, "Transfer failed");
        
        emit PlatformFeesWithdrawn(platformWallet, amount, block.timestamp);
    }
    
    /**
     * @notice Get total number of donations
     */
    function getTotalDonations() external view returns (uint256) {
        return allDonations.length;
    }
    
    /**
     * @notice Get donations for a specific recipient
     */
    function getRecipientDonations(address recipient) 
        external 
        view 
        returns (Donation[] memory) 
    {
        return recipientDonations[recipient];
    }
    
    /**
     * @notice Get all recipients
     */
    function getAllRecipients() external view returns (address[] memory) {
        return recipients;
    }
    
    /**
     * @notice Get top recipients by total received
     * @param count Number of top recipients to return
     */
    function getTopRecipients(uint256 count) 
        external 
        view 
        returns (
            address[] memory topAddresses,
            uint256[] memory amounts
        ) 
    {
        uint256 recipientCount = recipients.length;
        uint256 returnCount = count > recipientCount ? recipientCount : count;
        
        topAddresses = new address[](returnCount);
        amounts = new uint256[](returnCount);
        
        // Simple bubble sort for small arrays
        // For production, consider off-chain indexing
        address[] memory sortedRecipients = recipients;
        
        for (uint256 i = 0; i < recipientCount; i++) {
            for (uint256 j = i + 1; j < recipientCount; j++) {
                if (recipientStats[sortedRecipients[i]].totalReceived < 
                    recipientStats[sortedRecipients[j]].totalReceived) {
                    address temp = sortedRecipients[i];
                    sortedRecipients[i] = sortedRecipients[j];
                    sortedRecipients[j] = temp;
                }
            }
        }
        
        for (uint256 i = 0; i < returnCount; i++) {
            topAddresses[i] = sortedRecipients[i];
            amounts[i] = recipientStats[sortedRecipients[i]].totalReceived;
        }
        
        return (topAddresses, amounts);
    }
    
    /**
     * @notice Get recent donations
     * @param count Number of recent donations to return
     */
    function getRecentDonations(uint256 count) 
        external 
        view 
        returns (Donation[] memory) 
    {
        uint256 totalDonations = allDonations.length;
        uint256 returnCount = count > totalDonations ? totalDonations : count;
        
        Donation[] memory recentDonations = new Donation[](returnCount);
        
        for (uint256 i = 0; i < returnCount; i++) {
            recentDonations[i] = allDonations[totalDonations - 1 - i];
        }
        
        return recentDonations;
    }
    
    /**
     * @notice Get recipient statistics
     */
    function getRecipientStats(address recipient) 
        external 
        view 
        returns (
            uint256 totalReceived,
            uint256 donationCount,
            uint256 withdrawableBalance
        ) 
    {
        RecipientStats memory stats = recipientStats[recipient];
        return (stats.totalReceived, stats.donationCount, stats.withdrawableBalance);
    }
}
