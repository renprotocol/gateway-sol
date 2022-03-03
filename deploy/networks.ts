import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { utils } from "@renproject/utils";

export enum Chain {
    Hardhat = "Hardhat",

    Ethereum = "Ethereum",
    Goerli = "Goerli",
    BinanceSmartChain = "BinanceSmartChain",
    Fantom = "Fantom",
    Polygon = "Polygon",
    Avalanche = "Avalanche",
    Arbitrum = "Arbitrum",
}

export interface NetworkConfig {
    tokenPrefix: "dev" | "test" | "ren";
    chainName: Chain | string;
    mintAuthority: string;
    darknodeRegistry: string;
    governanceAddress?: string;
    create2SaltOverride?: string;
    mintGateways: Array<{
        symbol: string;
        decimals: number;
        token?: string;
        gateway?: string;
    }>;

    lockGateways?: Array<{
        symbol: string;
        token?: string | { totalSupply: string };
        gateway?: string;
        decimals: number;
    }>;
}

export const mainnetTokens = [
    {
        symbol: "REN",
        decimals: 18,
        origin: { chain: Chain.Ethereum, token: "0x408e41876cccdc0f92210600ef50372656052a38" },
    },
    {
        symbol: "DAI",
        decimals: 18,
        origin: { chain: Chain.Ethereum, token: "0x6b175474e89094c44da98b954eedeac495271d0f" },
    },
    {
        symbol: "USDC",
        decimals: 6,
        origin: { chain: Chain.Ethereum, token: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" },
    },
    {
        symbol: "USDT",
        decimals: 6,
        origin: { chain: Chain.Ethereum, token: "0xdac17f958d2ee523a2206206994597c13d831ec7" },
    },
    {
        symbol: "EURT",
        decimals: 6,
        origin: { chain: Chain.Ethereum, token: "0xc581b735a1688071a1746c968e0798d642ede491" },
    },
    {
        symbol: "BUSD",
        decimals: 18,
        origin: { chain: Chain.Ethereum, token: "0x4Fabb145d64652a948d72533023f6E7A623C7C53" },
    },
    {
        symbol: "MIM",
        decimals: 18,
        origin: { chain: Chain.Ethereum, token: "0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3" },
    },
    {
        symbol: "CRV",
        decimals: 18,
        origin: { chain: Chain.Ethereum, token: "0xd533a949740bb3306d119cc777fa900ba034cd52" },
    },
    {
        symbol: "LINK",
        decimals: 18,
        origin: { chain: Chain.Ethereum, token: "0x514910771af9ca656af840dff83e8264ecf986ca" },
    },
    {
        symbol: "UNI",
        decimals: 18,
        origin: { chain: Chain.Ethereum, token: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984" },
    },
    {
        symbol: "SUSHI",
        decimals: 18,
        origin: { chain: Chain.Ethereum, token: "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2" },
    },
    {
        symbol: "FTT",
        decimals: 18,
        origin: { chain: Chain.Ethereum, token: "0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9" },
    },
    {
        symbol: "ROOK",
        decimals: 18,
        origin: { chain: Chain.Ethereum, token: "0xfa5047c9c78b8877af97bdcb85db743fd7313d4a" },
    },
    {
        symbol: "BADGER",
        decimals: 18,
        origin: { chain: Chain.Ethereum, token: "0x3472a5a71965499acd81997a54bba8d852c6e53d" },
    },
    {
        symbol: "KNC",
        decimals: 18,
        origin: { chain: Chain.Ethereum, token: "0xdeFA4e8a7bcBA345F687a2f1456F5Edd9CE97202" },
    },
    {
        symbol: "ETH",
        decimals: 18,
        origin: { chain: Chain.Ethereum },
    },
    {
        symbol: "BNB",
        decimals: 18,
        origin: { chain: Chain.BinanceSmartChain },
    },
    {
        symbol: "FTM",
        decimals: 18,
        origin: { chain: Chain.Fantom },
    },
    {
        symbol: "MATIC",
        decimals: 18,
        origin: { chain: Chain.Polygon },
    },
    {
        symbol: "ArbETH",
        decimals: 18,
        origin: { chain: Chain.Arbitrum },
    },
    {
        symbol: "AVAX",
        decimals: 18,
        origin: { chain: Chain.Avalanche },
    },
];

export const testnetTokens = [
    {
        symbol: "REN",
        decimals: 18,
        origin: { chain: Chain.Ethereum, token: "0x2CD647668494c1B15743AB283A0f980d90a87394" },
    },
    {
        symbol: "DAI",
        decimals: 18,
        origin: { chain: Chain.Ethereum, token: "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa" },
    },
    {
        // Circle USD - supply: 30,000,000,000
        symbol: "USDC",
        decimals: 6,
        origin: { chain: Chain.Ethereum, token: "0x3B39BB8cEd32595D04796c0613bae316411a0653" },
    },
    {
        // Tether - supply: 33,000,000,000
        symbol: "USDT",
        decimals: 6,
        origin: { chain: Chain.Ethereum, token: "0xC826B3b96b95591E6A2217Ff72fD6E4B1611A8Fb" },
    },
    {
        // Euro Tether - supply: 00,150,000,000
        symbol: "EURT",
        decimals: 6,
        origin: { chain: Chain.Ethereum, token: "0x97B874Fa6cD1F0Bcb6e06FCc461ca8080C5966f5" },
    },
    {
        // Binance USD - supply: 13,000,000,000
        symbol: "BUSD",
        decimals: 18,
        origin: { chain: Chain.Ethereum, token: "0xCd7A07f75c4538637dcf112fCE09b1936A83c24D" },
    },
    {
        // Magic Internet Money - supply: 01,280,000,000
        symbol: "MIM",
        decimals: 18,
        origin: { chain: Chain.Ethereum, token: "0x145ed5c661b549111cf2322B0A7b38E2CA6489B7" },
    },
    {
        // Curve - supply: 01,600,000,000
        symbol: "CRV",
        decimals: 18,
        origin: { chain: Chain.Ethereum, token: "0x6b4160A18486DB9F3FC6d950d5436f8408899408" },
    },
    {
        // Chainlink - supply: 01,000,000,000
        symbol: "LINK",
        decimals: 18,
        origin: { chain: Chain.Ethereum, token: "0xf5642b1c94Bc56f7e8dA3c8EB3EFaF188263631a" },
    },
    {
        // Uniswap - supply: 01,000,000,000
        symbol: "UNI",
        decimals: 18,
        origin: { chain: Chain.Ethereum, token: "0x6b40eCe84eD16b54aFAa6F218BEd0020E4fbE5DD" },
    },
    {
        // Sushiswap - supply: 00,235,000,000
        symbol: "SUSHI",
        decimals: 18,
        origin: { chain: Chain.Ethereum, token: "0x44FEE8FFcc8cC6Bd7d560B188FC97a4006f10eeF" },
    },
    {
        // FTX - supply: 00,336,000,000
        symbol: "FTT",
        decimals: 18,
        origin: { chain: Chain.Ethereum, token: "0x869a2293a0c107E7933B0dA5DbFd0ed3f87E9662" },
    },
    {
        // KeeperDAO - supply: 00,001,240,000
        symbol: "ROOK",
        decimals: 18,
        origin: { chain: Chain.Ethereum, token: "0xAEB8c8AF46DC5a8fEeDE27F61b1dC87bCe2115dC" },
    },
    {
        // Badger DAO - supply: 00,021,000,000
        symbol: "BADGER",
        decimals: 18,
        origin: { chain: Chain.Ethereum, token: "0x7C1e18111fE23CCDa8C8A354dDbc4193b62e560e" },
    },
    {
        // Kyber Network - supply: 00,174,000,000
        symbol: "KNC",
        decimals: 18,
        origin: { chain: Chain.Ethereum, token: "0x54c864EBD4b84c1ce3F415f1E7c074572d863652" },
    },
    {
        symbol: "ETH",
        decimals: 18,
        origin: { chain: Chain.Ethereum },
    },
    {
        symbol: "BNB",
        decimals: 18,
        origin: { chain: Chain.BinanceSmartChain },
    },
    {
        symbol: "FTM",
        decimals: 18,
        origin: { chain: Chain.Fantom },
    },
    {
        symbol: "MATIC",
        decimals: 18,
        origin: { chain: Chain.Polygon },
    },
    {
        symbol: "ArbETH",
        decimals: 18,
        origin: { chain: Chain.Arbitrum },
    },
    {
        symbol: "AVAX",
        decimals: 18,
        origin: { chain: Chain.Avalanche },
    },
    {
        symbol: "gETH",
        decimals: 18,
        origin: { chain: Chain.Goerli },
    },
];

// mintAuthority is generated by
// > utils.toChecksumAddress(utils.pubToAddress("... public key ...", true).toString("hex"))

const renvmMainnetConfig = {
    darknodeRegistry: "0x2D7b6C95aFeFFa50C068D50f89C5C0014e054f0A",
    mintAuthority: "0x7f64e4e4b2d7589eb0ac8439c0e639856aeceee7",
    tokenPrefix: "ren" as const,
};

const renvmTestnetConfig = {
    darknodeRegistry: "0x9954C9F839b31E82bc9CA98F234313112D269712",
    mintAuthority: "0x44Bb4eF43408072bC888Afd1a5986ba0Ce35Cb54",
    tokenPrefix: "test" as const,
};

const renvmDevnetConfig = {
    darknodeRegistry: "",
    mintAuthority: "0x1A5650DAd360803ea7912b7a0a747446b554a5BE",
    tokenPrefix: "dev" as const,
};

export const networks: { [network: string]: NetworkConfig } = {
    hardhat: {
        mintAuthority: "0x0000000000000000000000000000000000000001",
        darknodeRegistry: "0x0000000000000000000000000000000000000002",
        tokenPrefix: "dev",
        chainName: Chain.Hardhat,

        mintGateways: [
            {
                //  renBTC
                symbol: "BTC",
                decimals: 8,
                token: "",
                gateway: "",
            },
            {
                // renZEC
                symbol: "ZEC",
                decimals: 8,
                token: "",
                gateway: "",
            },
            {
                // renBCH
                symbol: "BCH",
                decimals: 8,
                token: "",
                gateway: "",
            },
        ],
        lockGateways: [
            {
                symbol: "DAI",
                token: { totalSupply: "500,000,000" },
                decimals: 18,
            },
            {
                symbol: "REN",
                token: { totalSupply: "1,000,000,000" },
                decimals: 18,
            },
        ],
    },

    ethereumMainnet: {
        chainName: Chain.Ethereum,
        ...renvmMainnetConfig,

        mintGateways: [
            {
                //  renBTC
                symbol: "BTC",
                decimals: 8,
                token: "0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D",
                gateway: "0xe4b679400F0f267212D5D812B95f58C83243EE71",
            },
            {
                // renZEC
                symbol: "ZEC",
                decimals: 8,
                token: "0x1C5db575E2Ff833E46a2E9864C22F4B22E0B37C2",
                gateway: "0xc3BbD5aDb611dd74eCa6123F05B18acc886e122D",
            },
            {
                // renBCH
                symbol: "BCH",
                decimals: 8,
                token: "0x459086F2376525BdCebA5bDDA135e4E9d3FeF5bf",
                gateway: "0xCc4FF5b8A4A7adb35F00ff0CBf53784e07c3C52F",
            },
            {
                // renFIL
                symbol: "FIL",
                decimals: 18,
                token: "0xD5147bc8e386d91Cc5DBE72099DAC6C9b99276F5",
                gateway: "0xED7D080AA1d2A4D468C615a5d481125Bb56BF1bf",
            },
            {
                // renDGB
                symbol: "DGB",
                decimals: 8,
                token: "0xe3Cb486f3f5C639e98cCBaF57d95369375687F80",
                gateway: "0x05387a10Bb3EF789b6C2a9CE2d6C21D5a8c6B1aA",
            },
            {
                // testDOGE
                symbol: "DOGE",
                decimals: 8,
                token: "0x3832d2F059E55934220881F831bE501D180671A7",
                gateway: "0x2362843745615368F4ef0A43D7502353649C0783",
            },
            {
                // renLUNA
                symbol: "LUNA",
                decimals: 6,
                token: "0x52d87F22192131636F93c5AB18d0127Ea52CB641",
                gateway: "0xD7D7Deab930B6d3f98b35A26a4c431630d5AB874",
            },
            ...mainnetTokens.filter((x) => x.origin.chain !== Chain.Ethereum),
        ],

        lockGateways: [
            ...mainnetTokens
                .filter((x) => x.origin.chain === Chain.Ethereum && x.origin.token)
                .map((x) => ({
                    symbol: x.symbol,
                    decimals: x.decimals,
                    token: x.origin.token,
                })),
        ],
    },

    ethereumTestnet: {
        chainName: Chain.Ethereum,
        ...renvmTestnetConfig,

        mintGateways: [
            {
                // testBTC
                symbol: "BTC",
                decimals: 8,
                token: "0x0A9ADD98C076448CBcFAcf5E457DA12ddbEF4A8f",
                gateway: "0x55363c0dBf97Ff9C0e31dAfe0fC99d3e9ce50b8A",
            },
            {
                // testZEC
                symbol: "ZEC",
                decimals: 8,
                token: "0x42805DA220DF1f8a33C16B0DF9CE876B9d416610",
                gateway: "0xAACbB1e7bA99F2Ed6bd02eC96C2F9a52013Efe2d",
            },
            {
                // testBCH
                symbol: "BCH",
                decimals: 8,
                token: "0x618dC53e856b1A601119F2Fed5F1E873bCf7Bd6e",
                gateway: "0x9827c8a66a2259fd926E7Fd92EA8DF7ed1D813b1",
            },
            {
                // testDGB
                symbol: "DGB",
                decimals: 8,
                token: "0xAE2f4e711ca562a07E16939C5dfD40b05C68AEe5",
                gateway: "0xC9A81412B538A3c190Bc6E537357c09A23D5A90E",
            },
            {
                // testDOGE
                symbol: "DOGE",
                decimals: 8,
                token: "0x442412c823884Cb8fa5e6a096b5DadD8BD94e798",
                gateway: "0x0D3D33790466D67d66cF61C02494B31AB63B9097",
            },
            {
                // testFIL
                symbol: "FIL",
                decimals: 18,
                token: "0x41db5283522Ef37225c095908C5865d6E9C2F460",
                gateway: "0x1b94fD4ad404d3502b71A5c083BcE9eC978C2478",
            },
            {
                // testLUNA
                symbol: "LUNA",
                decimals: 6,
                token: "0x34CC35cdB6fF0c3db189428ACe45084231664CD0",
                gateway: "0xFdF1F7bFB789bb06e830EBaC76e6241fcB29B5e1",
            },
            ...testnetTokens.filter((x) => x.origin.chain !== Chain.Ethereum),
        ],

        lockGateways: [
            ...testnetTokens
                .filter((x) => x.origin.chain === Chain.Ethereum && x.origin.token)
                .map((x) => ({
                    symbol: x.symbol,
                    decimals: x.decimals,
                    token: x.origin.token,
                })),
        ],
    },

    ethereumDevnet: {
        chainName: Chain.Ethereum,
        ...renvmDevnetConfig,

        mintGateways: [
            {
                // devBTC
                symbol: "BTC",
                decimals: 8,
                token: "0x581347fc652f9FCdbCA8372A4f65404C4154e93b",
                gateway: "0xb4fc6D131A44A3b44668E997Ce0CE00A52D4D9ed",
            },
            {
                // devZEC
                symbol: "ZEC",
                decimals: 8,
                token: "0x6f35D542f3E0886281fb6152010fb52aC6B931F6",
                gateway: "0x3E31c6E07Eb4C471A6443e90E304E9C68dcdEd7d",
            },
            {
                // devBCH
                symbol: "BCH",
                decimals: 8,
                token: "0x148234809A551c131951bD01640494eecB905b08",
                gateway: "0x86efB11aF3f2c3E3df525a851e3F28E03F4Dcb17",
            },
            {
                // devFIL
                symbol: "FIL",
                decimals: 18,
                token: "",
                gateway: "",
            },
            {
                // devDGB
                symbol: "DGB",
                decimals: 8,
                token: "0x73E1E84B3bAe87c06FD694b6C2be3bb9d254de5E",
                gateway: "0x8b127F7095413a0EbF68050bCc57faD6eF44D12D",
            },
            {
                // devtDOGE
                symbol: "DOGE",
                decimals: 8,
                token: "0x68eF7e45b2A23D6851c36F0ac17026c51CDC968D",
                gateway: "0x8B8C3eb521f39b968Dd599d9eF8849Db7aebDA09",
            },
            {
                // devLUNA
                symbol: "LUNA",
                decimals: 6,
                token: "0x8a71f84BFF32926f948164F148121079598fA70c",
                gateway: "0x30dec16dFff3fDD84dc885eCB1A3F200628D8Ef5",
            },
        ],
    },

    bscMainnet: {
        chainName: Chain.BinanceSmartChain,
        ...renvmMainnetConfig,

        mintGateways: [
            {
                // renBTC
                symbol: "BTC",
                decimals: 8,
                token: "0xfCe146bF3146100cfe5dB4129cf6C82b0eF4Ad8c",
                gateway: "0x95De7b32e24B62c44A4C44521eFF4493f1d1fE13",
            },
            {
                // renZEC
                symbol: "ZEC",
                decimals: 8,
                token: "0x695FD30aF473F2960e81Dc9bA7cB67679d35EDb7",
                gateway: "0xfdecB67cE94A22C8e227D17938c3127EA1B47B4E",
            },
            {
                // renBCH
                symbol: "BCH",
                decimals: 8,
                token: "0xA164B067193bd119933e5C1e7877421FCE53D3E5",
                gateway: "0x3023DD075B0291Cd6aDc890A1EBDD6C400595E08",
            },
            {
                // renFIL
                symbol: "FIL",
                decimals: 18,
                token: "0xDBf31dF14B66535aF65AaC99C32e9eA844e14501",
                gateway: "0x05Cadbf3128BcB7f2b89F3dD55E5B0a036a49e20",
            },
            {
                // renDGB
                symbol: "DGB",
                decimals: 8,
                token: "0x31a0D1A199631D244761EEba67e8501296d2E383",
                gateway: "0x7986568375Af35B427f3f51389d73196967C356a",
            },
            {
                // testDOGE
                symbol: "DOGE",
                decimals: 8,
                token: "0xc3fEd6eB39178A541D274e6Fc748d48f0Ca01CC3",
                gateway: "0x06A2C5d79c66268610eEBBca10AFa17092860830",
            },
            {
                // renLUNA
                symbol: "LUNA",
                decimals: 6,
                token: "0xc4Ace9278e7E01755B670C0838c3106367639962",
                gateway: "0x4d59f628CB8e4670b779eAE22aF0c46DebC06695",
            },
            ...mainnetTokens.filter((x) => x.origin.chain !== Chain.BinanceSmartChain),
        ],

        lockGateways: [
            ...mainnetTokens
                .filter((x) => x.origin.chain === Chain.BinanceSmartChain && x.origin.token)
                .map((x) => ({
                    symbol: x.symbol,
                    decimals: x.decimals,
                    token: x.origin.token,
                })),
        ],
    },

    bscDevnet: {
        chainName: Chain.BinanceSmartChain,
        ...renvmDevnetConfig,

        mintGateways: [
            {
                // testBTC
                symbol: "BTC",
                decimals: 8,
                token: "0xF4FAf1b22CEe0a024ad6b12Bb29EC0E13F5827c2",
                gateway: "0x8a4a68DB5Ad08C215c6078111BE8793843A53302",
            },
            {
                // testDOGE
                symbol: "DOGE",
                decimals: 8,
                token: "0x78ecF69F6d23861C6F8Ca75C39b3Dc5E7a7eE8c2",
                gateway: "0x0E1B161b33dE8E56B917f4735AfC26d5cf760c0C",
            },
            // {
            //     // testETH
            //     symbol: "ETH",
            //     decimals: 18,
            //     token: "0xe9Ab97d707ad9A67bd01345233C3c179f42F9aD0",
            //     gateway: "0x43D828c81Ea229f5F4601D12C5EC00133bD17dE1"
            // },
            {
                symbol: "ZEC",
                decimals: 8,
                token: "0x84e70956240B9cf02300d69c22cd2b28fe139789",
                gateway: "0x44d4ee551934cfC8aD7f9Ae20ce4bA58f7ed9D3C",
            },
            {
                symbol: "BCH",
                decimals: 8,
                token: "0x2788b9D0A5d8802e4D18980C21dAc74277b8c58C",
                gateway: "0x6FCa0Ef511F2Dad8B51e55E3eB8E4404AFD2Feb0",
            },
            {
                symbol: "DGB",
                decimals: 8,
                token: "0x621e18A6cF77dB6a1F531B03BE29e218b7B8c04d",
                gateway: "0x8e95761fF55Ec16ffc1845273387E17d829F3026",
            },
            {
                symbol: "FIL",
                decimals: 18,
                token: "",
                gateway: "",
            },
            {
                symbol: "LUNA",
                decimals: 6,
                token: "0x6e5F9FB4f1C9d1C579f5FDdF79E85a66686cc7a1",
                gateway: "0x671c7f6319d04999dE58aF32075C50061383240F",
            },
        ],
    },

    bscTestnet: {
        ...renvmTestnetConfig,
        chainName: Chain.BinanceSmartChain,

        mintGateways: [
            {
                // devBTC
                symbol: "BTC",
                decimals: 8,
                token: "0x5eB4F537889eC3C7Ec397F1acB33c70D8C0ee438",
                gateway: "0x6003FD1C2d4eeDed7cb5E89923AB457d1DE5cE89",
            },
            {
                // devDOGE
                symbol: "DOGE",
                decimals: 8,
                token: "0xAF787a25241c69ae213A8Ee08a2518D858b32dBd",
                gateway: "0x7517FadFA7247ffe52d57c78780FfF0662a09936",
            },
            {
                // devZEC
                symbol: "ZEC",
                decimals: 8,
                token: "0xD566bB681a231f5648D7cB0f09A89cb47fd09513",
                gateway: "0x00E094aff24746196Bf73491A4C276fa4db503b4",
            },
            {
                // devBCH
                symbol: "BCH",
                decimals: 8,
                token: "0xE980BC9e17094EB273c6b5A1139b3A30EcdF05e0",
                gateway: "0xBA7236b2fbe3F12Df15a0d5fcE57d891016822f8",
            },
            {
                // devDGB
                symbol: "DGB",
                decimals: 8,
                token: "0x8C0248Ab26FcD6868Cc5aaea954f0ce28F8E103f",
                gateway: "0xd5E7d585D471BaFF2060dAFeaf701ff89114e439",
            },
            {
                // devFIL
                symbol: "FIL",
                decimals: 18,
                token: "0xDC42759e28e41898BdE199aB044F366dACbF3436",
                gateway: "0xF461Fe16eb3BcFC6e930dB0bDD2A3aD28636BBB9",
            },
            {
                // devLUNA
                symbol: "LUNA",
                decimals: 6,
                token: "0x2c82a39549858A0fF1a369D84695D983791d0786",
                gateway: "0x26f4F36A070190Ee4379241DD1463A420768EB4B",
            },
            ...testnetTokens.filter((x) => x.origin.chain !== Chain.BinanceSmartChain),
        ],

        lockGateways: [
            ...testnetTokens
                .filter((x) => x.origin.chain === Chain.BinanceSmartChain && x.origin.token)
                .map((x) => ({
                    symbol: x.symbol,
                    decimals: x.decimals,
                    token: x.origin.token,
                })),
        ],
    },

    fantomDevnet: {
        ...renvmDevnetConfig,
        chainName: Chain.Fantom,

        mintGateways: [
            {
                // devBTC
                symbol: "BTC",
                decimals: 8,
                token: "0x880Ad65DC5B3F33123382416351Eef98B4aAd7F1",
                gateway: "0x29Aa535b65b9C9A08bEdEbA8F9398aAf4832F98b",
            },
            {
                // devZEC
                symbol: "ZEC",
                decimals: 8,
                token: "0xEF685D1D44EA983927D9F8D67F77894fAEC92FCF",
                gateway: "0xF9fAE250B8dda539B9AFfEb606C8e2631976413E",
            },
            {
                // devBCH
                symbol: "BCH",
                decimals: 8,
                token: "0x6662449d05312Afe0Ca147Db6Eb155641077883F",
                gateway: "0x42c72B4090Ed0627c85ED878f699B2dB254beECa",
            },
            {
                // devDGB
                symbol: "DGB",
                decimals: 8,
                token: "0x799709491B1A26B867450bc68aC0d10979884aae",
                gateway: "0x6268002A734EDcDe6c2111ae339E0D92B1ED2Bfa",
            },
            {
                // devDOGE
                symbol: "DOGE",
                decimals: 8,
                token: "0xc96884276D70a1176b2fe102469348d224B0A1fa",
                gateway: "0x7352e7244899b7Cb5d803CC02741c8910d3B75de",
            },
            {
                // devFIL
                symbol: "FIL",
                decimals: 18,
                token: "",
                gateway: "",
            },
            {
                // devLUNA
                symbol: "LUNA",
                decimals: 6,
                token: "0x59fE85a45D2ecBDB1499dab315A109De8E4e2DAd",
                gateway: "0xA0b04e9D8B883626769Ac23aF4fb019e34B944C4",
            },
        ],
    },

    fantomTestnet: {
        ...renvmTestnetConfig,
        chainName: Chain.Fantom,

        mintGateways: [
            {
                // testBTC
                symbol: "BTC",
                decimals: 8,
                token: "0xe10d0253Aa8242d542265607cb9253FF8b8bf68e",
                gateway: "0xcCfFF6762Ce0Cad34Fda40300da72CB3c355C75f",
            },
            {
                // testZEC
                symbol: "ZEC",
                decimals: 8,
                token: "0xcEe1D5a9DD8bcD337eAbE9D53c0754E60C404c9F",
                gateway: "0x31A320f0Af9897eF1bf2599f681d727d377F24Bf",
            },
            {
                // testBCH
                symbol: "BCH",
                decimals: 8,
                token: "0x44d4ee551934cfC8aD7f9Ae20ce4bA58f7ed9D3C",
                gateway: "0xBef2E118E4138D6aF64Dd8cFa12918104F16A27E",
            },
            {
                // testDOGE
                symbol: "DOGE",
                decimals: 8,
                token: "0x6FCa0Ef511F2Dad8B51e55E3eB8E4404AFD2Feb0",
                gateway: "0xC50BDE3Cb2eedC62abB10247F5cE785Afb00245F",
            },
            {
                // testDGB
                symbol: "DGB",
                decimals: 8,
                token: "0x8e95761fF55Ec16ffc1845273387E17d829F3026",
                gateway: "0x15Bb312a96ca334348E98F6284B23D0Ce5Df1267",
            },
            {
                // testFIL
                symbol: "FIL",
                decimals: 18,
                token: "0xEd9780F478a28786A30C51d004972910bb8778fd",
                gateway: "0xD566bB681a231f5648D7cB0f09A89cb47fd09513",
            },
            {
                // testLUNA
                symbol: "LUNA",
                decimals: 6,
                token: "0x671c7f6319d04999dE58aF32075C50061383240F",
                gateway: "0x075046dE7D7e708da1593bB7476dE0547a3A057a",
            },
            ...testnetTokens.filter((x) => x.origin.chain !== Chain.Fantom),
        ],

        lockGateways: [
            ...testnetTokens
                .filter((x) => x.origin.chain === Chain.Fantom && x.origin.token)
                .map((x) => ({
                    symbol: x.symbol,
                    decimals: x.decimals,
                    token: x.origin.token,
                })),
        ],
    },

    fantomMainnet: {
        chainName: Chain.Fantom,
        ...renvmMainnetConfig,

        mintGateways: [
            {
                // renBTC
                symbol: "BTC",
                decimals: 8,
                token: "0xDBf31dF14B66535aF65AaC99C32e9eA844e14501",
                gateway: "0x05Cadbf3128BcB7f2b89F3dD55E5B0a036a49e20",
            },
            {
                // renZEC
                symbol: "ZEC",
                decimals: 8,
                token: "0x31a0D1A199631D244761EEba67e8501296d2E383",
                gateway: "0x7986568375Af35B427f3f51389d73196967C356a",
            },
            {
                // renBCH
                symbol: "BCH",
                decimals: 8,
                token: "0xc3fEd6eB39178A541D274e6Fc748d48f0Ca01CC3",
                gateway: "0x06A2C5d79c66268610eEBBca10AFa17092860830",
            },
            {
                // renFIL
                symbol: "FIL",
                decimals: 18,
                token: "0xc4Ace9278e7E01755B670C0838c3106367639962",
                gateway: "0x4d59f628CB8e4670b779eAE22aF0c46DebC06695",
            },

            {
                // renDGB
                symbol: "DGB",
                decimals: 8,
                token: "0x2628568509E87c4429fBb5c664Ed11391BE1BD29",
                gateway: "0x677b23D0ffc82414B063accA197f74d791285952",
            },
            {
                // renDOGE
                symbol: "DOGE",
                decimals: 8,
                token: "0xcE829A89d4A55a63418bcC43F00145adef0eDB8E",
                gateway: "0x9FB2C0b19A9fee6d02E7Ea861C71503608B64d6A",
            },
            {
                // renLUNA
                symbol: "LUNA",
                decimals: 6,
                token: "0x7c7DAAF2dB46fEFd067f002a69FD0BE14AeB159f",
                gateway: "0x731Ea4Ba77fF184d89dBeB160A0078274Acbe9D2",
            },
            ...mainnetTokens.filter((x) => x.origin.chain !== Chain.Fantom),
        ],

        lockGateways: [
            ...mainnetTokens
                .filter((x) => x.origin.chain === Chain.Fantom && x.origin.token)
                .map((x) => ({
                    symbol: x.symbol,
                    decimals: x.decimals,
                    token: x.origin.token,
                })),
        ],
    },

    polygonTestnet: {
        ...renvmTestnetConfig,
        chainName: Chain.Polygon,

        mintGateways: [
            {
                // testBTC
                symbol: "BTC",
                decimals: 8,
                token: "0x880Ad65DC5B3F33123382416351Eef98B4aAd7F1",
                gateway: "0x29Aa535b65b9C9A08bEdEbA8F9398aAf4832F98b",
            },
            {
                // testZEC
                symbol: "ZEC",
                decimals: 8,
                token: "0xEF685D1D44EA983927D9F8D67F77894fAEC92FCF",
                gateway: "0xF9fAE250B8dda539B9AFfEb606C8e2631976413E",
            },
            {
                // testBCH
                symbol: "BCH",
                decimals: 8,
                token: "0x6662449d05312Afe0Ca147Db6Eb155641077883F",
                gateway: "0x42c72B4090Ed0627c85ED878f699B2dB254beECa",
            },
            {
                // testDOGE
                symbol: "DOGE",
                decimals: 8,
                token: "0x799709491B1A26B867450bc68aC0d10979884aae",
                gateway: "0x6268002A734EDcDe6c2111ae339E0D92B1ED2Bfa",
            },
            {
                // testDGB
                symbol: "DGB",
                decimals: 8,
                token: "0xc96884276D70a1176b2fe102469348d224B0A1fa",
                gateway: "0x7352e7244899b7Cb5d803CC02741c8910d3B75de",
            },
            {
                // testFIL
                symbol: "FIL",
                decimals: 18,
                token: "0x9485Fd224a4B0075a47d26d49d0A6c5bd3dEfFD9",
                gateway: "0x3ce3266Ab11b6C23ea50dF8a777198d6dedAd85f",
            },
            {
                // testLUNA
                symbol: "LUNA",
                decimals: 6,
                token: "0xF5DC123b4622b17511cCf3251Dc00d8adC620A6D",
                gateway: "0xb98E6dA48F27e86D32dc9ab8721ce19c95E206b8",
            },
            ...testnetTokens.filter((x) => x.origin.chain !== Chain.Polygon),
        ],

        lockGateways: [
            ...testnetTokens
                .filter((x) => x.origin.chain === Chain.Polygon && x.origin.token)
                .map((x) => ({
                    symbol: x.symbol,
                    decimals: x.decimals,
                    token: x.origin.token,
                })),
        ],
    },

    polygonMainnet: {
        chainName: Chain.Polygon,
        ...renvmMainnetConfig,

        mintGateways: [
            {
                // renBTC
                symbol: "BTC",
                decimals: 8,
                token: "0xDBf31dF14B66535aF65AaC99C32e9eA844e14501",
                gateway: "0x05Cadbf3128BcB7f2b89F3dD55E5B0a036a49e20",
            },
            {
                // renZEC
                symbol: "ZEC",
                decimals: 8,
                token: "0x31a0D1A199631D244761EEba67e8501296d2E383",
                gateway: "0x7986568375Af35B427f3f51389d73196967C356a",
            },
            {
                // renBCH
                symbol: "BCH",
                decimals: 8,
                token: "0xc3fEd6eB39178A541D274e6Fc748d48f0Ca01CC3",
                gateway: "0x06A2C5d79c66268610eEBBca10AFa17092860830",
            },
            {
                // renFIL
                symbol: "FIL",
                decimals: 18,
                token: "0xc4Ace9278e7E01755B670C0838c3106367639962",
                gateway: "0x4d59f628CB8e4670b779eAE22aF0c46DebC06695",
            },
            {
                // renDGB
                symbol: "DGB",
                decimals: 8,
                token: "0x2628568509E87c4429fBb5c664Ed11391BE1BD29",
                gateway: "0x677b23D0ffc82414B063accA197f74d791285952",
            },
            {
                // renDOGE
                symbol: "DOGE",
                decimals: 8,
                token: "0xcE829A89d4A55a63418bcC43F00145adef0eDB8E",
                gateway: "0x9FB2C0b19A9fee6d02E7Ea861C71503608B64d6A",
            },
            {
                // renLUNA
                symbol: "LUNA",
                decimals: 6,
                token: "0x7c7DAAF2dB46fEFd067f002a69FD0BE14AeB159f",
                gateway: "0x731Ea4Ba77fF184d89dBeB160A0078274Acbe9D2",
            },
            ...mainnetTokens.filter((x) => x.origin.chain !== Chain.Polygon),
        ],

        lockGateways: [
            ...mainnetTokens
                .filter((x) => x.origin.chain === Chain.Polygon && x.origin.token)
                .map((x) => ({
                    symbol: x.symbol,
                    decimals: x.decimals,
                    token: x.origin.token,
                })),
        ],
    },

    avalancheTestnet: {
        ...renvmTestnetConfig,
        chainName: Chain.Avalanche,

        mintGateways: [
            {
                // testBTC
                symbol: "BTC",
                decimals: 8,
                token: "0x880Ad65DC5B3F33123382416351Eef98B4aAd7F1",
                gateway: "0x29Aa535b65b9C9A08bEdEbA8F9398aAf4832F98b",
            },
            {
                // testZEC
                symbol: "ZEC",
                decimals: 8,
                token: "0xEF685D1D44EA983927D9F8D67F77894fAEC92FCF",
                gateway: "0xF9fAE250B8dda539B9AFfEb606C8e2631976413E",
            },
            {
                // testBCH
                symbol: "BCH",
                decimals: 8,
                token: "0x6662449d05312Afe0Ca147Db6Eb155641077883F",
                gateway: "0x42c72B4090Ed0627c85ED878f699B2dB254beECa",
            },
            {
                // testDOGE
                symbol: "DOGE",
                decimals: 8,
                token: "0x799709491B1A26B867450bc68aC0d10979884aae",
                gateway: "0x6268002A734EDcDe6c2111ae339E0D92B1ED2Bfa",
            },
            {
                // testDGB
                symbol: "DGB",
                decimals: 8,
                token: "0xc96884276D70a1176b2fe102469348d224B0A1fa",
                gateway: "0x7352e7244899b7Cb5d803CC02741c8910d3B75de",
            },
            {
                // testFIL
                symbol: "FIL",
                decimals: 18,
                token: "0xcf3B06E64dc24CCd4Add10E6f97D8EF0438D6e54",
                gateway: "0xec1fbb79bcA682EF2CCcBE6194Ab62413e6c7895",
            },
            {
                // testLUNA
                symbol: "LUNA",
                decimals: 6,
                token: "0x59fE85a45D2ecBDB1499dab315A109De8E4e2DAd",
                gateway: "0xA0b04e9D8B883626769Ac23aF4fb019e34B944C4",
            },
            ...testnetTokens.filter((x) => x.origin.chain !== Chain.Avalanche),
        ],

        lockGateways: [
            ...testnetTokens
                .filter((x) => x.origin.chain === Chain.Avalanche && x.origin.token)
                .map((x) => ({
                    symbol: x.symbol,
                    decimals: x.decimals,
                    token: x.origin.token,
                })),
        ],
    },

    avalancheMainnet: {
        chainName: Chain.Avalanche,
        ...renvmMainnetConfig,

        mintGateways: [
            {
                // renBTC
                symbol: "BTC",
                decimals: 8,
                token: "0xDBf31dF14B66535aF65AaC99C32e9eA844e14501",
                gateway: "0x05Cadbf3128BcB7f2b89F3dD55E5B0a036a49e20",
            },
            {
                // renZEC
                symbol: "ZEC",
                decimals: 8,
                token: "0x31a0D1A199631D244761EEba67e8501296d2E383",
                gateway: "0x7986568375Af35B427f3f51389d73196967C356a",
            },
            {
                // renBCH
                symbol: "BCH",
                decimals: 8,
                token: "0xc3fEd6eB39178A541D274e6Fc748d48f0Ca01CC3",
                gateway: "0x06A2C5d79c66268610eEBBca10AFa17092860830",
            },
            {
                // renFIL
                symbol: "FIL",
                decimals: 18,
                token: "0xc4Ace9278e7E01755B670C0838c3106367639962",
                gateway: "0x4d59f628CB8e4670b779eAE22aF0c46DebC06695",
            },
            {
                // renDGB
                symbol: "DGB",
                decimals: 8,
                token: "0x2628568509E87c4429fBb5c664Ed11391BE1BD29",
                gateway: "0x677b23D0ffc82414B063accA197f74d791285952",
            },
            {
                // renDOGE
                symbol: "DOGE",
                decimals: 8,
                token: "0xcE829A89d4A55a63418bcC43F00145adef0eDB8E",
                gateway: "0x9FB2C0b19A9fee6d02E7Ea861C71503608B64d6A",
            },
            {
                // renLUNA
                symbol: "LUNA",
                decimals: 6,
                token: "0x7c7DAAF2dB46fEFd067f002a69FD0BE14AeB159f",
                gateway: "0x731Ea4Ba77fF184d89dBeB160A0078274Acbe9D2",
            },
            ...mainnetTokens.filter((x) => x.origin.chain !== Chain.Avalanche),
        ],

        lockGateways: [
            ...mainnetTokens
                .filter((x) => x.origin.chain === Chain.Avalanche && x.origin.token)
                .map((x) => ({
                    symbol: x.symbol,
                    decimals: x.decimals,
                    token: x.origin.token,
                })),
        ],
    },

    arbitrumTestnet: {
        ...renvmTestnetConfig,
        chainName: Chain.Arbitrum,

        mintGateways: [
            {
                // testBTC
                symbol: "BTC",
                decimals: 8,
                token: "0x43D828c81Ea229f5F4601D12C5EC00133bD17dE1",
                gateway: "0xF47dff1B8442f6f37491DF74c058904AB2d306fd",
            },
            {
                // testZEC
                symbol: "ZEC",
                decimals: 8,
                token: "0xb98E6dA48F27e86D32dc9ab8721ce19c95E206b8",
                gateway: "0x83785ad4B3B5255Af409Da3e34052ca5eaa8f9d5",
            },
            {
                // testBCH
                symbol: "BCH",
                decimals: 8,
                token: "0x5AF020172107C379a62D8C9B1614d3038186E0eA",
                gateway: "0x07deB3917d234f787AEd86E0c88E829277D4a33b",
            },
            {
                // testDOGE
                symbol: "DOGE",
                decimals: 8,
                token: "0xBB25c81031ae580B0029dA1859c625e87e5468cD",
                gateway: "0xd46aBBa0936915d8B34c6a5d4687241413e1B142",
            },
            {
                // testDGB
                symbol: "DGB",
                decimals: 8,
                token: "0xec1fbb79bcA682EF2CCcBE6194Ab62413e6c7895",
                gateway: "0x84c9eb3c7e21714dfEe7c1AA91800a8B365daa9E",
            },
            {
                // testFIL
                symbol: "FIL",
                decimals: 18,
                token: "0x527C7f02588D0d1fba5059d3D69DF55E44186F9e",
                gateway: "0xcD2D8f9E9f6A0Ef47FD3F8dDD011ee2B12Ae91D9",
            },
            {
                // testLUNA
                symbol: "LUNA",
                decimals: 6,
                token: "0xCa920A213f8f20406612eB02AA00EDDdAf5005EF",
                gateway: "0xa6e39c23fe29D15b0302E8ca234b365328fD49B5",
            },
            ...testnetTokens.filter((x) => x.origin.chain !== Chain.Arbitrum),
        ],

        lockGateways: [
            ...testnetTokens
                .filter((x) => x.origin.chain === Chain.Arbitrum && x.origin.token)
                .map((x) => ({
                    symbol: x.symbol,
                    decimals: x.decimals,
                    token: x.origin.token,
                })),
        ],
    },

    arbitrumMainnet: {
        chainName: Chain.Arbitrum,
        ...renvmMainnetConfig,

        mintGateways: [
            {
                // renBTC
                symbol: "BTC",
                decimals: 8,
                token: "0xDBf31dF14B66535aF65AaC99C32e9eA844e14501",
                gateway: "0x05Cadbf3128BcB7f2b89F3dD55E5B0a036a49e20",
            },

            {
                // renZEC
                symbol: "ZEC",
                decimals: 8,
                token: "0x31a0D1A199631D244761EEba67e8501296d2E383",
                gateway: "0x7986568375Af35B427f3f51389d73196967C356a",
            },

            {
                // renBCH
                symbol: "BCH",
                decimals: 8,
                token: "0xc3fEd6eB39178A541D274e6Fc748d48f0Ca01CC3",
                gateway: "0x06A2C5d79c66268610eEBBca10AFa17092860830",
            },

            {
                // renFIL
                symbol: "FIL",
                decimals: 18,
                token: "0xc4Ace9278e7E01755B670C0838c3106367639962",
                gateway: "0x4d59f628CB8e4670b779eAE22aF0c46DebC06695",
            },

            {
                // renDGB
                symbol: "DGB",
                decimals: 8,
                token: "0x2628568509E87c4429fBb5c664Ed11391BE1BD29",
                gateway: "0x677b23D0ffc82414B063accA197f74d791285952",
            },

            {
                // renDOGE
                symbol: "DOGE",
                decimals: 8,
                token: "0xcE829A89d4A55a63418bcC43F00145adef0eDB8E",
                gateway: "0x9FB2C0b19A9fee6d02E7Ea861C71503608B64d6A",
            },

            {
                // renLUNA
                symbol: "LUNA",
                decimals: 6,
                token: "0x7c7DAAF2dB46fEFd067f002a69FD0BE14AeB159f",
                gateway: "0x731Ea4Ba77fF184d89dBeB160A0078274Acbe9D2",
            },
            ...mainnetTokens.filter((x) => x.origin.chain !== Chain.Arbitrum),
        ],

        lockGateways: [
            ...mainnetTokens
                .filter((x) => x.origin.chain === Chain.Arbitrum && x.origin.token)
                .map((x) => ({
                    symbol: x.symbol,
                    decimals: x.decimals,
                    token: x.origin.token,
                })),
        ],
    },

    goerliTestnet: {
        ...renvmTestnetConfig,
        chainName: Chain.Goerli,

        mintGateways: [
            {
                // testBTC
                symbol: "BTC",
                decimals: 8,
                token: "0x880Ad65DC5B3F33123382416351Eef98B4aAd7F1",
                gateway: "0x29Aa535b65b9C9A08bEdEbA8F9398aAf4832F98b",
            },
            {
                // testZEC
                symbol: "ZEC",
                decimals: 8,
                token: "0xf98A573BEabDB73a2d8697001bD411c21CBb89b1",
                gateway: "0x098ecF3bEb11E308f1B9C38c1E1b50c10FC02af3",
            },
            {
                // testBCH
                symbol: "BCH",
                decimals: 8,
                token: "0xc735241F93F87D4DBEA499EE6e1d41Ec50e3D8cE",
                gateway: "0xe1Ae770a368ef05158c65c572701778575Da85d0",
            },
            {
                // testDGB
                symbol: "DGB",
                decimals: 8,
                token: "0x6268002A734EDcDe6c2111ae339E0D92B1ED2Bfa",
                gateway: "0x20471d322f20E3cAE8f8b75D1481B5BD53c41695",
            },
            {
                // testDOGE
                symbol: "DOGE",
                decimals: 8,
                token: "0x7352e7244899b7Cb5d803CC02741c8910d3B75de",
                gateway: "0x0E6bbBb35835cC3624a000e1698B7B68E9eeC7DF",
            },
            {
                // testFIL
                symbol: "FIL",
                decimals: 18,
                token: "0x1156663dFab56A9BAdd844e12eDD69eC96Dd0eFb",
                gateway: "0x038b63C120a7e60946d6EbAa6Dcfc3a475108cc9",
            },
            {
                // testLUNA
                symbol: "LUNA",
                decimals: 6,
                token: "0xA0b04e9D8B883626769Ac23aF4fb019e34B944C4",
                gateway: "0x75A33b43Af9d532da65750c01F5fAB3c3FC0b8F9",
            },
            ...testnetTokens.filter((x) => x.origin.chain !== Chain.Goerli),
        ],

        lockGateways: [
            ...testnetTokens
                .filter((x) => x.origin.chain === Chain.Goerli && x.origin.token)
                .map((x) => ({
                    symbol: x.symbol,
                    decimals: x.decimals,
                    token: x.origin.token,
                })),
        ],
    },
};

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {};
func.tags = [];
export default func;