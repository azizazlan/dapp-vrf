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
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "outDir": "dist"
  },
  "include": ["src", "./scripts", "./test", "./typechain"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

> Some of the `compilerOptions` and `include` properties are combined from the orginal `tsconfig.json` created by hardhat and vite.

- Then install other third-party npms as needed. For example:

  npm install --save-dev --save-exact prettier prettier-plugin-solidity

  npm install redux react-redux redux-saga @types/react-redux @types/redux-saga reselect

  npm install --save-dev redux-devtools-extension redux-logger @types/redux-logger
