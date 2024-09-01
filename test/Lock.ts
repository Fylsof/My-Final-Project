import { expect } from "chai";
import hre from "hardhat";

describe("Voting", function () {
  it("Should mint and vote", async function () {
    const Voting = await hre.ethers.getContractFactory("VotingSystem");
    const voting = await Voting.deploy();
    await voting.waitForDeployment();

    const [owner, Aziz, notVoter] = await hre.ethers.getSigners();

    await voting.mint(owner.address, 100);
    await voting.mint(Aziz.address, 100);

    await voting.connect(owner).submitProposal("Proposal 1");
    await voting.connect(Aziz).submitProposal("Proposal 2");

    await voting.connect(owner).vote(0, true);
    await voting.connect(Aziz).vote(1, false);

    const proposal1 = await voting.proposals(0);
    const proposal2 = await voting.proposals(1);

    expect(proposal1.yesVotes).to.equal(1);
    expect(proposal1.noVotes).to.equal(0);
    expect(proposal2.yesVotes).to.equal(0);
    expect(proposal2.noVotes).to.equal(1);
  });
});

it("it's should be allowing voting only users with tokens", async function() { 
  const Voting = await hre.ethers.getContractFactory("VotingSystem");
  const voting = await Voting.deploy();
  await voting.waitForDeployment();

  const [owner, owner1, owner2,owner3,owner4, notVoter] = await hre.ethers.getSigners();
  // Mint for the belwo users.
  await voting.mint(owner.address, 100);
  await voting.mint(owner1.address, 100);
  await voting.mint(owner2.address, 0);
  await voting.mint(owner3.address, 100);
  await voting.mint(owner4.address, 100);

  

  // Execute proposals
  await voting.connect(owner).submitProposal("Proposal 1");
  await voting.connect(owner1).submitProposal("Proposal 2");
  await voting.connect(owner2).submitProposal("Proposal 3");
  await voting.connect(owner3).submitProposal("Proposal 4");
  await voting.connect(owner4).submitProposal("Proposal 5");

  // Valid votes
  await voting.connect(owner).vote(0, true);
  await voting.connect(owner1).vote(1, false);
  await voting.connect(owner2).vote(2, false);
  await voting.connect(owner3).vote(3, false);
  await voting.connect(owner4).vote(4, false);

});



it("it's should be allowing five users to propose and votes", async function () {
  const Voting = await hre.ethers.getContractFactory("VotingSystem");
  const voting = await Voting.deploy();
  await voting.waitForDeployment();

  const [owner, owner1, owner2, owner3, owner4, owner5, notVoter] = await hre.ethers.getSigners();

  // Mint tokens for all the users
  await voting.mint(owner.address, 100);
  await voting.mint(owner1.address, 100);
  await voting.mint(owner2.address, 100);
  //await voting.mint(owner3.address, 100);
  //await voting.mint(owner4.address, 100);
  //await voting.mint(owner5.address, 100);

  // Execute the proposals
  await voting.connect(owner).submitProposal("Proposal 1");
  await voting.connect(owner1).submitProposal("Proposal 2");
  await voting.connect(owner2).submitProposal("Proposal 3");
  //await voting.connect(owner3).submitProposal("Proposal 4");
 //await voting.connect(owner4).submitProposal("Proposal 5");

  // Votes from the five users..                                
  await voting.connect(owner).vote(0, true);
  await voting.connect(owner1).vote(1, false);
  await voting.connect(owner2).vote(2, false);
 

it("it's Should be preventing the users from voting multiple times", async function () {
  const Voting = await hre.ethers.getContractFactory("VotingSystem");
  const voting = await Voting.deploy();
  await voting.waitForDeployment();

  const [owner, owner1, owner2] = await hre.ethers.getSigners();

  // Mint the tokens for the below users..
  await voting.mint(owner.address, 100);
  await voting.mint(owner1.address, 100);
  await voting.mint(owner2.address, 100);

  // Execute the proposals..
  await voting.connect(owner).submitProposal("Proposal 1");
  await voting.connect(owner1).submitProposal("Proposal 2");
  await voting.connect(owner2).submitProposal("Proposal 3");

  // Voters..
  await voting.connect(owner).vote(0, true);
  await voting.connect(owner1).vote(1, false);
  await voting.connect(owner2).vote(2, false);

});

});
