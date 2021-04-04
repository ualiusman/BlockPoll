pragma solidity ^0.8.1;


contract PollContract{


    struct Poll{
        uint256 id;
        string question;
        string thumbnail;
        uint64[] votes;
        string[] options;
    }

    struct Voter{
        address id;
        uint256[] votedIds;
        mapping(uint256 => bool) votedMap;
    }

    Poll[] polls;
    mapping(address => Voter) private voters;


    function createPoll(string memory _question, string memory _thum, string[] memory _options) public {
        require(bytes(_question).length > 0,"Empty question");
        require((_options.length > 1),"At least two options are required");

        uint256 pollId = polls.length;

        Poll memory newPoll = Poll({
            id: pollId,
            question: _question,
            thumbnail: _thum,
            options: _options,
            votes:  new uint64[](_options.length)
        });

        polls.push(newPoll);
    }


    function getPoll(uint256 _pollId) external view returns(uint256, string memory, string memory, uint64[] memory, string[] memory ){
        require(_pollId < polls.length && _pollId >= 0,"No poll found");
        return (
            polls[_pollId].id,
            polls[_pollId].question,
            polls[_pollId].thumbnail,
            polls[_pollId].votes,
            polls[_pollId].options

            );
    }
}
