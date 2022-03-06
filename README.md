# Dapp-VRF

This project was inspired after reading Chainlink's verifiable random function or "VRF" [here](https://docs.chain.link/docs/get-a-random-number/#create-and-deploy-a-vrf-v2-compatible-contract). This app generate random number between 1 and 50.

<p align="center">
![Screenshot 2022-03-06 at 4 00 34 PM](https://user-images.githubusercontent.com/732071/156914580-b13b9fa3-45f5-42f1-8ae8-9fa80e4ab046.png)
</p>

## Prerequisite

1. Connect Chainlink [VRF](https://vrf.chain.link/) page to your metamask wallet (chrome extension).

2. Edit the environment file .env to configure the `SUBSCRIPTION_ID`, `RINKEBY_URL` and `PRIVATE_KEY`

3. Then edit the `hardhat.config.ts` file so that the network is pointed to the Rinkeby network:

```
networks: {
  rinkeby: {
    url: process.env.RINKEBY_URL || '',
    accounts:
      process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
  },
},
```

## Usage

1. Clone this repo, change into the locally cloned directory and run `npm install`
2. Create the .env file with the following contents:

   ```
   SUBSCRIPTION_ID=<refer_subscription_page>
   RINKEBY_URL=https://eth-rinkeby.alchemyapi.io/v2/<appId>
   PRIVATE_KEY=86...
   VITE_RANGEVRFV2CONSUMER=0x...
   ```

   where `VITE_RANGEVRFV2CONSUMER` is the smart contract address which can be obtained once it is deployed in Step 1 of Test 2 below.

3. Then run:

   ```
   npm run dev
   ```

## Test 1

1. Deploy the "consumer" contract VRFv2Consumer.
   Record the contract address once it is successfully deployed. To deploy run:

   ```
   npx hardhat run --network rinkeby scripts/deploy-VRFv2Consumer.ts
   ```

2. Add new consumer in the Chainlink's Subscription Manager [page](https://vrf.chain.link/rinkeby).
   Make sure your account have sufficient ETHER and LINK. Click "Add Funds" and key in, for example "10".

3. Edit the `test/vrfconsumer-test.ts` test file so that the contract instance it attached to the address :

   ```
   const VRFv2Consumer = await ethers.getContractFactory('VRFv2Consumer');
   smartContractInstance = VRFv2Consumer.attach(
       '0xF10B109FF...DED45DDdd3', // <- replace with your "consumer" contract address
   );
   ```

4. Run the test:

   ```
   npx hardhat test test/vrfconsumer-test.ts --network rinkeby
   ```

If you receive the following error:

```
Error: cannot estimate gas; transaction may fail or may require manual gas limit
```

then you might want to add more funds in the Subscription Manager page. Also check in the page that the transaction is still pending in the "Pending" section.

## Test 2

In this test, RangeVRFv2Consumer contract only store one random number between 0 and 50.

1. Akin to Test 1, first deploy the the contract:

   ```
   npx hardhat run --network rinkeby scripts/deploy-RangeVRFv2Consumer.ts
   ```

2. Once deployed, copy the address and use it to add a new consumer in the Subscription Page.
3. Then (like in Step 3 in Test 1) edit the `test/rangevrfconsumer-test.ts` file before executing the test.
4. Run the test:

   ```
   npx hardhat test test/rangevrfconsumer-test.ts --network rinkeby
   ```

## Notes

Steps to create this project from scratch:

- Create a vite project:

```
 npm create vite@latest
```

- Rename the `tsconfig.json` file to `tsconfig.vite.json`. (we are going to change back to `tsconfig.json` later)

- Change into the project directory and install hardhat:

```
npm install hardhat
```

- Create an advanced hardhat project with the typescript support:

```
npx hardhat
```

- Rename the `tsconfig.json` (created by the hardhat wizard) to `tsconfig.bak.json`. Then rename the `tsconfig.vite.json` back to `tsconfig.json`

Edit the file so that the contents looks like followings:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": false,
    "skipLibCheck": false,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "commonjs",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "outDir": "dist"
  },
  "include": ["src", "./scripts", "./test", "./typechain"],
  "references": [{ "path": "./tsconfig.node.json" }],
  "files": ["./hardhat.config.ts"]
}
```

> Some of the `compilerOptions` and `include` properties are combined from the orginal `tsconfig.json` created by hardhat and vite.

- Edit the `hardhat.config.ts` file to add the `paths` property as the following.

```
  paths: {
    artifacts: './src/artifacts',
  },
```

> So that the artifacts will be placed in the src folder of the vite web app once the smart contracts are compiled.

- Then install other third-party npms as needed. For example:

```
npm install --save-dev --save-exact prettier prettier-plugin-solidity
```

```
npm install --save-dev ts-node
```

```
npm install --save-dev --save-exact prettier prettier-plugin-solidity
```

```
npm install redux react-redux redux-saga @types/react-redux @types/redux-saga reselect
```

```
npm install --save-dev redux-devtools-extension redux-logger @types/redux-logger
```
