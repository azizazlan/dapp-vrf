import { expect } from 'chai';
import { ethers } from 'hardhat';
import { VRFv2Consumer } from '../typechain';

describe('VRFv2Consumer', function () {
  let smartContractInstance: VRFv2Consumer;

  beforeEach(async function () {
    const VRFv2Consumer = await ethers.getContractFactory('VRFv2Consumer');
    smartContractInstance = VRFv2Consumer.attach(
      '0x5c8b58C4990e6D1A0863e1eee073ee9a5381f208',
    );
  });

  it('Should received only 2 random words', async function () {
    // each request will get 2 random words. Refer numWords in the VRFv2Consumer.sol
    await smartContractInstance.requestRandomWords();

    const result0 = await smartContractInstance.s_randomWords(0);
    expect(ethers.BigNumber.from(result0).gt(ethers.BigNumber.from(0))).to.be
      .true;

    const result1 = await smartContractInstance.s_randomWords(1);
    expect(ethers.BigNumber.from(result1).gt(ethers.BigNumber.from(0))).to.be
      .true;
  });
});
