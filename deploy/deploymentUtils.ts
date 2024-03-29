import { randomBytes } from "crypto";

import {
    readValidations,
    withDefaults,
} from "@openzeppelin/hardhat-upgrades/dist/utils";
import {
    assertStorageUpgradeSafe,
    assertUpgradeSafe,
    getImplementationAddress,
    getStorageLayout,
    getStorageLayoutForAddress,
    getUnlinkedBytecode,
    getVersion,
    Manifest,
    setProxyKind,
} from "@openzeppelin/upgrades-core";
import { SyncOrPromise, utils } from "@renproject/utils";
import BigNumber from "bignumber.js";
import BN from "bn.js";
import chalk from "chalk";
import {
    BaseContract,
    ContractFactory,
    ContractTransaction,
    PopulatedTransaction,
} from "ethers";
import { getAddress, keccak256 } from "ethers/lib/utils";
import { CallOptions, DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import {
    AccessControlEnumerableUpgradeable,
    ERC20,
    Ownable,
    Ownable__factory,
    RenProxyAdmin,
    RenTimelock,
    TransparentUpgradeableProxy,
    TransparentUpgradeableProxy__factory,
} from "../typechain";
import { NetworkConfig, networks } from "./networks";

export const Ox0 = "0x0000000000000000000000000000000000000000";
export const Ox0_32 = "0x" + "00".repeat(32);
export const CREATE2_DEPLOYER = "0x2222229fb3318a6375fa78fd299a9a42ac6a8fbf";
export interface ConsoleInterface {
    log(message?: any, ...optionalParams: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
}

export const create2Salt = (network: string) => `REN.RC1`; // Release Candidate 1

export const getContractAt =
    (hre: HardhatRuntimeEnvironment) =>
    async <T extends BaseContract>(name: string, address: string) => {
        const { getNamedAccounts, ethers } = hre;
        const { deployer } = await getNamedAccounts();
        return await ethers.getContractAt<T>(name, address, deployer);
    };

export const setupGetExistingDeployment =
    (hre: HardhatRuntimeEnvironment) =>
    async <T extends BaseContract>(name: string): Promise<T | null> => {
        const { deployments, getNamedAccounts, ethers, network } = hre;
        const { getOrNull } = deployments;

        if (network.name === "hardhat") {
            return null;
        }

        const { deployer } = await getNamedAccounts();
        const result = await getOrNull(name);

        return result ? await ethers.getContractAt<T>(name, result.address, deployer) : result;
    };

export const setupDeploy =
    (hre: HardhatRuntimeEnvironment, logger: ConsoleInterface = console) =>
    async <
        F extends ContractFactory,
        C extends F extends { deploy: (...args: any) => Promise<infer C> } ? C : never = F extends {
            deploy: (...args: any) => Promise<infer C>;
        }
            ? C
            : never
    >(
        name: string,
        args: F extends { deploy: (...args: infer X) => Promise<any> } ? X : never,
        overrides?: CallOptions
    ): Promise<F extends { deploy: (...args: any) => Promise<infer C> } ? C : never> => {
        const { deployments, getNamedAccounts, ethers, network } = hre;
        const { deploy } = deployments;

        const { deployer } = await getNamedAccounts();
        logger.log(`Deploying ${name} from ${deployer}`);

        const result = await deploy(name, {
            from: deployer,
            args: args,
            log: true,
            skipIfAlreadyDeployed: false,
            ...overrides,
        });
        logger.log(`Deployed ${name} at ${result.address}`);
        const contract = await ethers.getContractAt<C>(name, result.address, deployer);

        let owner;
        try {
            owner = await (contract as any as Ownable).owner();
        } catch (error) {}
        if (owner && owner.toLowerCase() === CREATE2_DEPLOYER) {
            throw new Error(`${name}'s owner was initialized to CREATE2 deployer!`);
        }

        let roleAdmin;
        try {
            roleAdmin = await (contract as any as AccessControlEnumerableUpgradeable).getRoleAdmin(
                await (contract as any as AccessControlEnumerableUpgradeable).DEFAULT_ADMIN_ROLE()
            );
        } catch (error) {}
        if (roleAdmin && roleAdmin.toLowerCase() === CREATE2_DEPLOYER) {
            throw new Error(`${name}'s role admin was initialized to CREATE2 deployer!`);
        }

        return contract;
    };

export const setupCreate2 =
    (hre: HardhatRuntimeEnvironment, create2SaltOverride?: string, logger: ConsoleInterface = console) =>
    async <
        F extends ContractFactory,
        C extends F extends { deploy: (...args: any) => Promise<infer C> } ? C : never = F extends {
            deploy: (...args: any) => Promise<infer C>;
        }
            ? C
            : never
    >(
        name: string,
        args: F extends { deploy: (...args: infer X) => Promise<any> } ? X : never,
        overrides?: CallOptions,
        create2SaltOverrideAlt?: string
    ): Promise<F extends { deploy: (...args: any) => Promise<infer C> } ? C : never> => {
        const { deployments, getNamedAccounts, ethers, network } = hre;
        const { deploy } = deployments;

        const { deployer } = await getNamedAccounts();
        const salt = keccak256(Buffer.from(create2SaltOverrideAlt || create2SaltOverride || create2Salt(network.name)));
        logger.log(`Deploying ${name} from ${deployer} (salt: keccak256(${create2Salt(network.name)}))`);

        const result = await deploy(name, {
            from: deployer,
            args: args,
            log: true,
            deterministicDeployment: salt,
            skipIfAlreadyDeployed: true,
            ...overrides,
        });
        logger.log(`Deployed ${name} at ${result.address}`);
        const contract = await ethers.getContractAt<C>(name, result.address, deployer);

        let owner;
        try {
            owner = await (contract as any as Ownable).owner();
        } catch (error) {}
        if (owner && owner.toLowerCase() === CREATE2_DEPLOYER) {
            throw new Error(`${name}'s owner was initialized to CREATE2 deployer!`);
        }

        let roleAdmin;
        try {
            roleAdmin = await (contract as any as AccessControlEnumerableUpgradeable).getRoleAdmin(
                await (contract as any as AccessControlEnumerableUpgradeable).DEFAULT_ADMIN_ROLE()
            );
        } catch (error) {}
        if (roleAdmin && roleAdmin.toLowerCase() === CREATE2_DEPLOYER) {
            throw new Error(`${name}'s role admin was initialized to CREATE2 deployer!`);
        }

        return contract;
    };

export const setupDeployProxy =
    (
        hre: HardhatRuntimeEnvironment,
        create2: ReturnType<typeof setupCreate2>,
        proxyAdmin: RenProxyAdmin,
        renTimelock: RenTimelock,
        logger: ConsoleInterface = console
    ) =>
    async <
        F extends ContractFactory,
        C extends F extends { deploy: () => Promise<infer C> } ? C : never = F extends {
            deploy: () => Promise<infer C>;
        }
            ? C
            : never
    >(
        contractName: string,
        proxyName: string,
        // Due to this function not first deploying the proxy with a mock
        // implementation, the address of the proxy depends on the
        // implementation first used when deploying the proxy. To avoid the
        // proxy address changing on new networks, we first deploy the original
        // version.
        originalContractName: string,
        options: {
            initializer: keyof C["callStatic"];
            constructorArgs: unknown[];
            kind?: "transparent";
        },
        isInitialized: (t: C) => SyncOrPromise<boolean>,
        create2SaltOverrideAlt?: string
    ): Promise<C> => {
        const { getNamedAccounts, ethers } = hre;
        const Ox = ethers.utils.getAddress;

        const { deployer } = await getNamedAccounts();

        const { initializer, constructorArgs } = options;

        const waitForTx = setupWaitForTx(logger);
        const waitForTimelockedTx = setupWaitForTimelockedTx(hre, renTimelock, logger);

        const existingProxyDeployment = await setupGetExistingDeployment(hre)<TransparentUpgradeableProxy>(proxyName);

        // openzeppelin-upgrades checks ////////////////////////////////////////
        const { provider } = hre.network;
        const manifest = await Manifest.forNetwork(provider);
        const ImplFactory = await ethers.getContractFactory(contractName);
        const validations = await readValidations(hre);
        const unlinkedBytecode = getUnlinkedBytecode(validations, ImplFactory.bytecode);
        const encodedArgs = ImplFactory.interface.encodeDeploy([]);
        const version = getVersion(unlinkedBytecode, ImplFactory.bytecode, encodedArgs);
        const layout = getStorageLayout(validations, version);
        const fullOpts = withDefaults(options);
        assertUpgradeSafe(validations, version, fullOpts);
        if (existingProxyDeployment) {
            await setProxyKind(provider, existingProxyDeployment.address, options);
            const currentImplAddress = await getImplementationAddress(provider, existingProxyDeployment.address);
            const currentLayout = await getStorageLayoutForAddress(manifest, validations, currentImplAddress);
            assertStorageUpgradeSafe(currentLayout, layout, fullOpts);
        }
        ////////////////////////////////////////////////////////////////////////

        const implementation = (await create2<F>(
            contractName,
            [] as any,
            undefined,
            create2SaltOverrideAlt
        )) as unknown as C;

        let originalImplementation: { address: string } | undefined;
        if (originalContractName !== contractName) {
            originalImplementation = (await create2<F>(
                originalContractName,
                [] as any,
                undefined,
                create2SaltOverrideAlt
            )) as unknown as C;
        }

        // openzeppelin-upgrades manifest //////////////////////////////////////
        await manifest.lockedRun(async () => {
            const data = await manifest.read();
            data.admin = {
                address: proxyAdmin.address,
            };
            data.impls[version.linkedWithoutMetadata] = {
                address: implementation.address,
                layout,
            };
            manifest.write(data);
        });
        ////////////////////////////////////////////////////////////////////////

        if (!(await isInitialized(implementation))) {
            logger.log(`Initializing ${contractName} instance (optional).`);
            await waitForTx(implementation[initializer](...constructorArgs));
        }

        let proxy: TransparentUpgradeableProxy;
        if (existingProxyDeployment) {
            logger.log(`Reusing ${proxyName} at ${existingProxyDeployment.address}`);
            proxy = existingProxyDeployment;
        } else {
            proxy = await create2<TransparentUpgradeableProxy__factory>(
                proxyName,
                [originalImplementation?.address || implementation.address, proxyAdmin.address, []],
                undefined,
                create2SaltOverrideAlt
            );

            // openzeppelin-upgrades manifest //////////////////////////////////
            await manifest.addProxy({ ...proxy, kind: "transparent" });
            ////////////////////////////////////////////////////////////////////
        }

        const currentImplementation = await proxyAdmin.getProxyImplementation(proxy.address);
        logger.log(proxyName, "points to", currentImplementation);
        if (currentImplementation.toLowerCase() !== implementation.address.toLowerCase()) {
            logger.log(
                `Updating ${proxyName} to point to ${implementation.address} instead of ${currentImplementation}`
            );

            // Check if the proxyAdmin is owned by the timelock.
            await waitForTimelockedTx(proxyAdmin.populateTransaction.upgrade(proxy.address, implementation.address));
        }

        const final = await ethers.getContractAt<C>(contractName, proxy.address, deployer);

        if (!(await isInitialized(final))) {
            logger.log(`Initializing ${contractName} proxy.`);
            const initData: string = final.interface.encodeFunctionData(initializer as string, constructorArgs);
            await waitForTx(
                ethers.provider.getSigner().sendTransaction({
                    from: deployer,
                    to: final.address,
                    data: initData,
                })
            );
        }

        if (!(await isInitialized(final))) {
            throw new Error(`Invalid 'isInitialized' method.`);
        }

        return final;
    };

/**
 * Submits a transaction and waits for it to be mined.
 */
export const setupWaitForTx =
    (logger: ConsoleInterface = console) =>
    async (txOrPromise: Promise<ContractTransaction> | ContractTransaction, msg?: string) => {
        if (msg) {
            logger.log(msg);
        }
        const tx = await txOrPromise;
        process.stdout.write(`Waiting for ${tx.hash}...`);
        await tx.wait();
        // Clear the line
        process.stdout.write(`\x1B[2K\r`);
        logger.log(`Transaction confirmed: ${tx.hash}`);
    };

export const setupWaitForTimelockedTx =
    (hre: HardhatRuntimeEnvironment, renTimelock: RenTimelock, logger: ConsoleInterface = console) =>
    async (txDetailsPromise: Promise<PopulatedTransaction> | PopulatedTransaction, msg?: string) => {
        const waitForTx = setupWaitForTx(logger);

        const { ethers, getNamedAccounts } = hre;
        const Ox = ethers.utils.getAddress;
        const { deployer } = await getNamedAccounts();
        const provider = await ethers.getSigner(deployer);

        const txDetails = await txDetailsPromise;

        const ownableContract = await Ownable__factory.connect(txDetails.to || Ox0, provider);

        // Check if the proxyAdmin is owned by the timelock.
        if (Ox(await ownableContract.owner()) === Ox(renTimelock.address)) {
            const minimumDelay = (await renTimelock.getMinDelay()).toNumber();

            // If the call hasn't already been scheduled, schedule it with the
            // smallest delay.
            const hash = await renTimelock.hashOperation(
                txDetails.to || Ox0,
                0,
                txDetails.data || Buffer.from([]),
                Ox0_32,
                Ox0_32
            );
            if (!(await renTimelock.isOperation(hash))) {
                const tx = renTimelock.schedule(
                    txDetails.to || Ox0,
                    0,
                    txDetails.data || Buffer.from([]),
                    Ox0_32,
                    Ox0_32,
                    minimumDelay
                );
                await waitForTx(tx, `Sheduling ${msg || "timelock call"}`);
            }

            // Check if the timelocked call is ready to be called.
            const readyTimestamp = (await renTimelock.getTimestamp(hash)).toNumber() - Date.now() / 1000;
            if (readyTimestamp <= 60) {
                if (readyTimestamp > 0) {
                    console.log(`Sleeping ${readyTimestamp.toFixed(2)} seconds for timelock`);
                    await utils.sleep(readyTimestamp * utils.sleep.SECONDS);
                }
                const tx2 = renTimelock.execute(
                    txDetails.to || Ox0,
                    0,
                    txDetails.data || Buffer.from([]),
                    Ox0_32,
                    Ox0_32
                );
                await waitForTx(tx2, msg);
            } else {
                const hoursRemaining = readyTimestamp / 60 / 60;
                logger.log(
                    `WARNING: Timelock not ready for another ${hoursRemaining.toFixed(2)} hours: ${msg || hash}`
                );
                // Continue without calling `execute`. If there's any calls in
                // the rest of the migration that depend on the execution, they
                // will fail.
            }
        } else {
            await waitForTx((await ethers.getSigner(deployer)).sendTransaction(txDetails), msg);
        }
    };

export const fixNonce = async (hre: HardhatRuntimeEnvironment, nonce: number) => {
    const { getNamedAccounts, ethers } = hre;
    const { deployer } = await getNamedAccounts();

    const tx = await ethers.provider.getSigner().sendTransaction({
        from: deployer,
        to: deployer,
        nonce: nonce,
        value: 0,
        gasPrice: 2000000000,
        gasLimit: 22000,
    });
    await tx.wait();
};

export const forwardBalance = async (hre: HardhatRuntimeEnvironment, to: string) => {
    const { getNamedAccounts, ethers } = hre;
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.getSigner(deployer);
    const balance = new BigNumber((await ethers.provider.getBalance(deployer)).toString());
    const tx = await signer.sendTransaction({
        from: deployer,
        to,
        value: "0x" + new BN(balance.minus(0.01 * 1e18).toFixed()).toArrayLike(Buffer, "be", 32).toString("hex"),
    });
    console.log(
        `Sending ${balance
            .minus(0.01 * 1e18)
            .shiftedBy(-18)
            .toFixed()}: ${tx.hash}`
    );
    await tx.wait();
};

export const randomAddress = (): string => getAddress("0x" + randomBytes(20).toString("hex"));

export const forwardTokens =
    (hre: HardhatRuntimeEnvironment, config?: NetworkConfig, logger: ConsoleInterface = console) =>
    async (to: string) => {
        const { getNamedAccounts, ethers, network } = hre;

        logger.log(`Deploying to ${network.name}...`);

        const Ox = ethers.utils.getAddress;

        config = config || networks[network.name as "hardhat"];
        if (!config) {
            throw new Error(`No network configuration found for ${network.name}!`);
        }

        const { deployer } = await getNamedAccounts();

        const waitForTx = setupWaitForTx(logger);

        // Test Tokens are deployed when a particular lock-asset doesn't exist on a
        // testnet.
        console.log(`Handling ${(config.lockGateways || []).length} lock assets.`);
        for (const { symbol, gateway, token, decimals } of config.lockGateways || []) {
            console.log(chalk.yellow(`Lock asset: ${symbol}`));
            // Check token symbol and decimals
            if (token && typeof token === "string") {
                const erc20 = await ethers.getContractAt<ERC20>("ERC20", token);
                const recipient = Ox(to);
                const deployerBalance = new BigNumber((await erc20.balanceOf(deployer)).toString());
                const recipientBalance = new BigNumber((await erc20.balanceOf(recipient)).toString());
                const decimals = await erc20.decimals();
                const amount = BigNumber.min(
                    deployerBalance.dividedBy(10),
                    new BigNumber(10000).shiftedBy(decimals)
                ).minus(recipientBalance);
                if (amount.isGreaterThan(0)) {
                    console.log(`Transferring ${amount.shiftedBy(-decimals).toFixed()} ${symbol}`);
                    await waitForTx(erc20.transfer(recipient, amount.toFixed()));
                } else {
                    console.log(`Skipping ${symbol}`);
                }
            }
        }
    };

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {};
func.tags = [];
export default func;
