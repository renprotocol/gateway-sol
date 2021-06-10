/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface LockGatewayStateV1Interface extends ethers.utils.Interface {
  functions: {
    "feeRecipient()": FunctionFragment;
    "lockFee()": FunctionFragment;
    "minimumBurnAmount()": FunctionFragment;
    "mintAuthority()": FunctionFragment;
    "nextN()": FunctionFragment;
    "releaseFee()": FunctionFragment;
    "status(bytes32)": FunctionFragment;
    "token()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "feeRecipient",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "lockFee", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "minimumBurnAmount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "mintAuthority",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "nextN", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "releaseFee",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "status", values: [BytesLike]): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "feeRecipient",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "lockFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "minimumBurnAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mintAuthority",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "nextN", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "releaseFee", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "status", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;

  events: {};
}

export class LockGatewayStateV1 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: LockGatewayStateV1Interface;

  functions: {
    feeRecipient(overrides?: CallOverrides): Promise<[string]>;

    lockFee(overrides?: CallOverrides): Promise<[number]>;

    minimumBurnAmount(overrides?: CallOverrides): Promise<[BigNumber]>;

    mintAuthority(overrides?: CallOverrides): Promise<[string]>;

    nextN(overrides?: CallOverrides): Promise<[BigNumber]>;

    releaseFee(overrides?: CallOverrides): Promise<[number]>;

    status(arg0: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;

    token(overrides?: CallOverrides): Promise<[string]>;
  };

  feeRecipient(overrides?: CallOverrides): Promise<string>;

  lockFee(overrides?: CallOverrides): Promise<number>;

  minimumBurnAmount(overrides?: CallOverrides): Promise<BigNumber>;

  mintAuthority(overrides?: CallOverrides): Promise<string>;

  nextN(overrides?: CallOverrides): Promise<BigNumber>;

  releaseFee(overrides?: CallOverrides): Promise<number>;

  status(arg0: BytesLike, overrides?: CallOverrides): Promise<boolean>;

  token(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    feeRecipient(overrides?: CallOverrides): Promise<string>;

    lockFee(overrides?: CallOverrides): Promise<number>;

    minimumBurnAmount(overrides?: CallOverrides): Promise<BigNumber>;

    mintAuthority(overrides?: CallOverrides): Promise<string>;

    nextN(overrides?: CallOverrides): Promise<BigNumber>;

    releaseFee(overrides?: CallOverrides): Promise<number>;

    status(arg0: BytesLike, overrides?: CallOverrides): Promise<boolean>;

    token(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    feeRecipient(overrides?: CallOverrides): Promise<BigNumber>;

    lockFee(overrides?: CallOverrides): Promise<BigNumber>;

    minimumBurnAmount(overrides?: CallOverrides): Promise<BigNumber>;

    mintAuthority(overrides?: CallOverrides): Promise<BigNumber>;

    nextN(overrides?: CallOverrides): Promise<BigNumber>;

    releaseFee(overrides?: CallOverrides): Promise<BigNumber>;

    status(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    feeRecipient(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lockFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    minimumBurnAmount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mintAuthority(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nextN(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    releaseFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    status(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}