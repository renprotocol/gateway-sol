import BigNumber from "bignumber.js";
import chalk from "chalk";
import { getAddress as Ox } from "ethers/lib/utils";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { RenTimelock } from "../../typechain";
import { CREATE2_DEPLOYER } from "./general";
import { Multisig } from "./multisig";

interface Roles {
    DEFAULT: string;
    ADMIN: string;
    EXECUTOR: string;
    PROPOSER: string;
}

const getAddressRoles = async (renTimelock: RenTimelock, roles: Roles, address: string) => {
    return [
        ...((await renTimelock.hasRole(await renTimelock.TIMELOCK_ADMIN_ROLE(), address)) ? ["ADMIN"] : []),
        ...((await renTimelock.hasRole(await renTimelock.DEFAULT_ADMIN_ROLE(), address)) ? ["DEFAULT"] : []),
        ...((await renTimelock.hasRole(await renTimelock.PROPOSER_ROLE(), address)) ? ["PROPOSER"] : []),
        ...((await renTimelock.hasRole(await renTimelock.EXECUTOR_ROLE(), address)) ? ["EXECUTOR"] : []),
    ];
};

export const SECONDS = 1;
export const MINUTE = 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;

export const getTimelockConfig = async (
    hre: HardhatRuntimeEnvironment,
    renTimelock: RenTimelock,
    multisig: Multisig | undefined
) => {
    const { getNamedAccounts, ethers } = hre;
    const { deployer } = await getNamedAccounts();

    // The following may hold roles in the Timelock.
    const knownAccounts = {
        multisig: multisig ? Ox(multisig.getAddress()) : undefined,
        timelock: Ox(renTimelock.address),
        deployer: Ox(deployer),
        create2: Ox(CREATE2_DEPLOYER),
    };

    const [DEFAULT_ADMIN_ROLE, TIMELOCK_ADMIN_ROLE, EXECUTOR_ROLE, PROPOSER_ROLE] = await Promise.all([
        renTimelock.DEFAULT_ADMIN_ROLE(),
        renTimelock.TIMELOCK_ADMIN_ROLE(),
        renTimelock.EXECUTOR_ROLE(),
        renTimelock.PROPOSER_ROLE(),
    ]);

    const roles: Roles = {
        DEFAULT: DEFAULT_ADMIN_ROLE,
        ADMIN: TIMELOCK_ADMIN_ROLE,
        EXECUTOR: EXECUTOR_ROLE,
        PROPOSER: PROPOSER_ROLE,
    };

    const reverseRoles = {
        [DEFAULT_ADMIN_ROLE]: "DEFAULT",
        [TIMELOCK_ADMIN_ROLE]: "ADMIN",
        [EXECUTOR_ROLE]: "EXECUTOR",
        [PROPOSER_ROLE]: "PROPOSER",
    };

    const permissionedAccounts = new Map<string, string[]>();
    try {
        const roleGrantedLogs = await ethers.provider.getLogs({
            ...renTimelock.filters.RoleGranted(null, null, null),
            fromBlock: 1,
            toBlock: "latest",
        });

        for (const log of roleGrantedLogs) {
            const decoded = renTimelock.interface.decodeEventLog(
                renTimelock.interface.events["RoleGranted(bytes32,address,address)"],
                log.data,
                log.topics
            );
            const account = Ox(decoded.account);
            permissionedAccounts.set(account, [
                ...(permissionedAccounts.get(account) || []),
                reverseRoles[decoded.role],
            ]);
        }
    } catch (error) {
        // Ignore error - some chains don't allow fetching from block 1.
    }

    for (const [account, roles] of permissionedAccounts) {
        if (!Object.values(knownAccounts).includes(account)) {
            console.error(chalk.red(`\n\nUnknown account ${account} has Timelock roles ${roles.join(", ")}\n\n`));
        }
    }

    const [delayRaw, multisigRoles, timelockRoles, deployerRoles, create2Roles] = await Promise.all([
        renTimelock.getMinDelay(),
        knownAccounts.multisig ? getAddressRoles(renTimelock, roles, knownAccounts.multisig) : undefined,
        getAddressRoles(renTimelock, roles, knownAccounts.timelock),
        getAddressRoles(renTimelock, roles, knownAccounts.deployer),
        getAddressRoles(renTimelock, roles, knownAccounts.create2),
    ]);

    const delay = new BigNumber(delayRaw.toString());

    const delayReadable = delay.gt(DAY)
        ? `${delay.div(DAY).toFixed(2)} days`
        : delay.gt(HOUR)
        ? `${delay.div(HOUR).toFixed(2)} hours`
        : delay.gt(MINUTE)
        ? `${delay.div(MINUTE).toFixed(2)} minutes`
        : `${delay.toFixed()} seconds`;

    return {
        roles: {
            ...(multisigRoles && multisigRoles.length ? { multisig: multisigRoles } : {}),
            ...(timelockRoles && timelockRoles.length ? { timelock: timelockRoles } : {}),
            ...(deployerRoles && deployerRoles.length ? { deployer: deployerRoles } : {}),
            ...(create2Roles && create2Roles.length ? { create2: create2Roles } : {}),
        },
        delay: delayReadable,
    };
};

const func: DeployFunction = async function () {};
func.tags = [];
export default func;