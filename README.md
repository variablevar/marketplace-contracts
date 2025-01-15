# Web3 NFT Marketplace Event Listener Monorepo

This monorepo contains a Web3-based application designed to listen to events from an Ethereum-based NFT marketplace and manage the corresponding data in MongoDB.

Make sure ur using node v18

## Table of Contents

- [Installation](#installation)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Testing](#testing)
- [Deployment](#deployment)
- [License](#license)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/variablevar/marketplace-contracts.git
   cd marketplace-contracts
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

## Scripts

The following scripts are defined in the `package.json` file:

- **Start the service**:

  ```bash
  npm start
  ```

  Runs the application using `ts-node` to execute `lib/service.ts`.

- **Build the project**:

  ```bash
  npm run build
  ```

  Compiles the TypeScript code into JavaScript using the TypeScript compiler (`tsc`).

- **Deploy contracts**:

  ```bash
  npm run deploy
  ```

  Deploys the smart contracts to the specified network using Hardhat.

- **Generate TypeChain bindings**:

  ```bash
  npm run build:typechain
  ```

  Generates TypeChain bindings for TypeScript integration.

- **Run tests**:

  ```bash
  npm test
  ```

  Executes the test suite using Mocha with coverage provided by NYC.

## Environment Variables

The project requires the following environment variables, which should be defined in a `.env` file in the root directory:

```env
CONTRACT_ADDRESS_MARKETPLACE=
CONTRACT_ADDRESS_FACTORY=
MONGO_URL=
RPC_URL=
ACCOUNT_0=
ACCOUNT_1=
ACCOUNT_2=
ACCOUNT_3=
ACCOUNT_4=
ACCOUNT_5=
ACCOUNT_6=
ACCOUNT_7=
ACCOUNT_8=
ACCOUNT_9=
ACCOUNT_11=
ACCOUNT_12=
ACCOUNT_13=
ACCOUNT_14=
ACCOUNT_15=
ACCOUNT_16=
ACCOUNT_17=
ACCOUNT_18=
ACCOUNT_19=
ACCOUNT_20=
ACCOUNT_21=
ACCOUNT_22=
ACCOUNT_23=
ACCOUNT_24=
ACCOUNT_25=
ACCOUNT_26=
ACCOUNT_27=
ACCOUNT_28=
ACCOUNT_29=
ACCOUNT_30=
ACCOUNT_31=
ACCOUNT_32=
ACCOUNT_33=
ACCOUNT_34=
ACCOUNT_35=
```

Ensure all variables are correctly set to match your development and deployment environments.

**Note**: Do not commit the `.env` file to version control to protect sensitive information.

## Usage

1. **Start the application**:

   ```bash
   npm start
   ```

   This command will run the service as specified in the `scripts` section.

2. **Interact with the application**:

   Provide instructions on how to use or interact with your application.

## Testing

To run the test suite:

```bash
npm test
```

This will execute all tests located in the `test/utils/` directory with a timeout of 600 seconds.

## Deployment

To deploy the smart contracts:

```bash
npm run deploy
```

This command uses Hardhat to deploy contracts as defined in the `scripts/deploy.ts` file to the specified network.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
