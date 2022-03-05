import { expect } from 'chai';
import { ethers } from 'hardhat';
import { VRFv2Consumer } from '../typechain';

describe('VRFv2Consumer', function () {
  let smartContractInstance: VRFv2Consumer;

  before(async function () {
    const VRFv2Consumer = await ethers.getContractFactory('VRFv2Consumer');
    smartContractInstance = VRFv2Consumer.attach(
      // replace with your own contract address
      '0xB4F7510DF8638ea19b9FEc412090e6e3DDb13deA',
    );
  });

  it('Should received only 2 random words', async function () {
    await smartContractInstance.requestRandomWords();

    const result0 = await smartContractInstance.s_randomWords(0);
    expect(ethers.BigNumber.from(result0).gt(ethers.BigNumber.from(0))).to.be
      .true;

    const result1 = await smartContractInstance.s_randomWords(1);
    expect(ethers.BigNumber.from(result1).gt(ethers.BigNumber.from(0))).to.be
      .true;
  });
});
