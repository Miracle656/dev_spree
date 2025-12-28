// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title SocialPolls
 * @dev verifiable on-chain polls compatible with Farcaster Frames
 */
contract SocialPolls {
    struct Poll {
        uint256 id;
        address creator;
        string question;
        string[] options;
        uint256[] votes;
        bool isActive;
        uint256 createdAt;
        uint256 duration; // in seconds
    }

    uint256 private _pollIds;
    mapping(uint256 => Poll) public polls;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    event PollCreated(
        uint256 indexed pollId,
        address indexed creator,
        string question
    );
    event Voted(
        uint256 indexed pollId,
        address indexed voter,
        uint256 optionIndex
    );

    /**
     * @notice Create a new poll
     * @param question The poll question
     * @param options List of options (max 4 for Frame compatibility)
     * @param duration Duration in seconds
     */
    function createPoll(
        string calldata question,
        string[] calldata options,
        uint256 duration
    ) external {
        require(options.length > 1, "At least 2 options required");
        require(options.length <= 4, "Max 4 options allowed");
        require(duration > 0, "Duration must be positive");

        _pollIds++;
        uint256 newPollId = _pollIds;

        uint256[] memory initialVotes = new uint256[](options.length);

        polls[newPollId] = Poll({
            id: newPollId,
            creator: msg.sender,
            question: question,
            options: options,
            votes: initialVotes,
            isActive: true,
            createdAt: block.timestamp,
            duration: duration
        });

        emit PollCreated(newPollId, msg.sender, question);
    }

    /**
     * @notice Vote on a poll
     * @param pollId The ID of the poll
     * @param optionIndex The index of the selected option
     */
    function vote(uint256 pollId, uint256 optionIndex) external {
        Poll storage poll = polls[pollId];

        require(poll.id != 0, "Poll does not exist");
        require(poll.isActive, "Poll is not active");
        require(
            block.timestamp < poll.createdAt + poll.duration,
            "Poll has ended"
        );
        require(!hasVoted[pollId][msg.sender], "Already voted");
        require(optionIndex < poll.options.length, "Invalid option");

        poll.votes[optionIndex]++;
        hasVoted[pollId][msg.sender] = true;

        emit Voted(pollId, msg.sender, optionIndex);
    }

    /**
     * @notice Get poll details
     * @param pollId The ID of the poll
     */
    function getPoll(
        uint256 pollId
    )
        external
        view
        returns (
            string memory question,
            string[] memory options,
            uint256[] memory votes,
            bool isActive,
            uint256 endTime
        )
    {
        Poll storage poll = polls[pollId];
        return (
            poll.question,
            poll.options,
            poll.votes,
            poll.isActive,
            poll.createdAt + poll.duration
        );
    }
}
