require('colors');
const fs = require('fs');
const networks = require("../src/config/networks.json");

const hre = require("hardhat");

async function main() {
	const netId = "BSC"
	const decimals = 18
	const admin = "0x79342eE3f703Cb2bcDA33942cFB64353FE40F16C";
	const stakeTokenAddress = "0x5697A61D1DD5E2bbD730Dce55bc84cbB386d1444";//THC coin address on bsc test net
	const marketingWalletAddress = "0xE36F29Ab33dbF47340EAB8769E519ef4493836b5";//staking test2 address to my wallet

	const signer = await hre.ethers.getSigner();
	const network = await signer.provider._networkPromise;
	const rpc = 'https://data-seed-prebsc-1-s1.binance.org:8545'; // signer.provider.connection.url;
	const explorer = 'https://testnet.bscscan.com/'; // signer.provider.connection.url;
	const chainId = network.chainId;
	const blocktime = 3000;
	const erc20 = 'BEP20';
	const confirmations = 12
	const coin = "BNB"
	console.log('Starting ' + netId + ('(' + String(chainId).red + ')') + ' by ', signer.address.yellow);

	console.log('Deploying ' + netId + ' staking contract...'.blue);
	const staking = await hre.ethers.getContractFactory("Staking");
	console.log('Deploying passed-1...'.green);
	const _staking = await staking.deploy(stakeTokenAddress, marketingWalletAddress);
	console.log('Deploying passed-2...'.green);
	console.log('\t staking' + '\t' + _staking.address.green);

	console.log('writing network...'.blue);
	/* -------------- writing... -----------------*/
	// fs.writeFileSync(`./src/config/networks.json`, JSON.stringify({ ...networks, [netId]: { _staking: _staking.address, chainId, coin, decimals, confirmations, blocktime, rpc, explorer, erc20 } }, null, 4));
}

main().then(() => {
}).catch((error) => {
	console.error(error);
	process.exit(1);
});
