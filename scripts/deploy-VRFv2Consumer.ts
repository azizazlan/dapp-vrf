// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import * as dotenv from 'dotenv';
import { ethers } from 'hardhat';

dotenv.config();

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const subscriptionId = process.env.SUBSCRIPTION_ID; // Get this value from Chainlink Subscription Manager page
  if (!subscriptionId) {
    console.log('Could not deploy smart contract because no subscription id');
    return;
  }
  console.log(`Chainlink subscription id ${subscriptionId}`);
  const VFRv2Consumer = await ethers.getContractFactory('VRFv2Consumer');
  const contractInstance = await VFRv2Consumer.deploy(subscriptionId);
  await contractInstance.deployed();
  console.log(
    'Successfully VRFv2Consumer deployed to:',
    contractInstance.address,
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
