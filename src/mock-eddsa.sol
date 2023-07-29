// SPDX-License-Identifier: GPL-3.0
import "hardhat/console.sol";
// solhint-disable-next-line
pragma solidity ^0.8.0;

contract MockEDDSA {
    constructor() {
        console.log("Hello, world!");
    }
    // struct PubKey {
    //     uint256 x;
    //     uint8 parity;
    // }

    function p() public pure returns (uint256) {
        return 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F;
    }

    function n() public pure returns (uint256) {
        return 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141;
    }

    function lessThanP(uint256 _num) public pure returns (bool) {
        return _num < p();
    }

    function lessThanN(uint256 _num) public pure returns (bool) {
        return _num < n();
    }

    function validate(uint256  _x,uint8 _parity) public view {
        // PubKey
        uint256 x;
        uint8 parity;
        bytes memory _pubKey = abi.encodePacked(_x,_parity);


        assembly {
            x := mload(add(_pubKey, 0x20))
            parity := byte(0, mload(add(_pubKey, 0x60)))
        }
        console.log("x", x,_x);
        console.log("parity", parity,_parity);
        console.log("pubKey", string(_pubKey));

        require(x != 0, "EDDSA: pubKey cannot be set to address zero");
        require(lessThanP(x), "EDDSA: pubKey cannot be greater than p");
        require(parity == 0 || parity == 1, "EDDSA: parity can only be 0 or 1");
    }

    function verify(
        bytes memory pubKey,
        bytes32 sigHash,
        bytes memory signature
    ) public pure returns (bool) {
        require(signature.length == 96, "EDDSA: Invalid signature length");

        // PubKey
        uint256 x;
        uint8 parity;

        // Signature
        uint256 rx;
        uint256 ry;
        uint256 s;

        assembly {
            x := mload(add(pubKey, 0x20))
            parity := byte(0, mload(add(pubKey, 0x40)))

            rx := mload(add(signature, 0x20))
            ry := mload(add(signature, 0x40))
            s := mload(add(signature, 0x60))
        }

        require(lessThanP(rx), "EDDSA: Invalid RX");
        require(lessThanP(ry), "EDDSA: Invalid RY");
        require(lessThanN(s), "EDDSA: Invalid S");

        uint8 rParity = uint8(ry) & 0x01;

        bytes memory buf = bytes.concat(
            bytes1(rParity),
            abi.encodePacked(rx),
            bytes1(parity),
            abi.encodePacked(x),
            sigHash
        );

        uint256 e = abi.decode(abi.encodePacked(sha256(buf)), (uint256));

        address q = ecrecover(
            bytes32(n() - mulmod(s, x, n())),
            27 + parity,
            bytes32(x),
            bytes32(n() - mulmod(e, x, n()))
        );

        return q == address(uint160(uint256(keccak256(bytes.concat(abi.encodePacked(rx, ry))))));
    }
}