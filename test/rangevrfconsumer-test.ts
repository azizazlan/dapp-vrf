import { expect } from 'chai';
import { ethers } from 'hardhat';
import { RangeVRFv2Consumer } from '../typechain';

describe('RangeVRFv2Consumer', function () {
  let smartContractInstance: RangeVRFv2Consumer;

  before(async function () {
    const RangeVRFv2Consumer = await ethers.getContractFactory(
      'RangeVRFv2Consumer',
    );
    smartContractInstance = RangeVRFv2Consumer.attach(
      // replace the contract address below with yours
      '0xc7785913671a614A053c905738Ac2c768D706682',
    );
  });

  it('Should be only 1 random number which is equal or less than 50', async function () {
    await smartContractInstance.requestRandomWords();

    const result0 = await smartContractInstance.s_randomWord();
    expect(ethers.BigNumber.from(result0).lte(ethers.BigNumber.from(50))).to.be
      .true;
  });
});
