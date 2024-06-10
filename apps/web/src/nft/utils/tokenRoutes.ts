import { IRoute, Protocol } from "darshitswap-router-sdk";
import { Currency, CurrencyAmount } from "darshitswap-sdk-core";
import { Pair } from "darshitswap-v2-sdk";
import { Pool } from "darshitswap-v3-sdk";
import { ClassicTrade } from "state/routing/types";
import {
  TokenAmountInput,
  TokenTradeRouteInput,
  TradePoolInput,
} from "uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks";

interface SwapAmounts {
  inputAmount: CurrencyAmount<Currency>;
  outputAmount: CurrencyAmount<Currency>;
}

interface TradeTokenInputAmounts {
  inputAmount: TokenAmountInput;
  outputAmount: TokenAmountInput;
}

interface Swap {
  route: IRoute<Currency, Currency, Pair | Pool>;
  inputAmount: CurrencyAmount<Currency>;
  outputAmount: CurrencyAmount<Currency>;
}

function buildTradeRouteInputAmounts(
  swapAmounts: SwapAmounts,
): TradeTokenInputAmounts {
  return {
    inputAmount: {
      amount: swapAmounts.inputAmount.quotient.toString(),
      token: {
        address: swapAmounts.inputAmount.currency.isToken
          ? swapAmounts.inputAmount.currency.address
          : "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        chainId: swapAmounts.inputAmount.currency.chainId,
        decimals: swapAmounts.inputAmount.currency.decimals,
        isNative: swapAmounts.inputAmount.currency.isNative,
      },
    },
    outputAmount: {
      amount: swapAmounts.outputAmount.quotient.toString(),
      token: {
        address: swapAmounts.outputAmount.currency.isToken
          ? swapAmounts.outputAmount.currency.address
          : "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        chainId: swapAmounts.outputAmount.currency.chainId,
        decimals: swapAmounts.outputAmount.currency.decimals,
        isNative: swapAmounts.outputAmount.currency.isNative,
      },
    },
  };
}

function buildPool(pool: Pair | Pool): TradePoolInput {
  const isPool = "fee" in pool;

  return {
    pair: !isPool
      ? {
          tokenAmountA: {
            amount: pool.reserve0.quotient.toString(),
            token: {
              address: pool.token0.address,
              chainId: pool.token0.chainId,
              decimals: pool.token0.decimals,
              isNative: pool.token0.isNative,
            },
          },
          tokenAmountB: {
            amount: pool.reserve1.quotient.toString(),
            token: {
              address: pool.token1.address,
              chainId: pool.token1.chainId,
              decimals: pool.token1.decimals,
              isNative: pool.token1.isNative,
            },
          },
        }
      : undefined,
    pool: isPool
      ? {
          fee: pool.fee,
          liquidity: pool.liquidity.toString(),
          sqrtRatioX96: pool.sqrtRatioX96.toString(),
          tickCurrent: pool.tickCurrent.toString(),
          tokenA: {
            address: pool.token0.address,
            chainId: pool.token0.chainId,
            decimals: pool.token0.decimals,
            isNative: pool.token0.isNative,
          },
          tokenB: {
            address: pool.token1.address,
            chainId: pool.token1.chainId,
            decimals: pool.token1.decimals,
            isNative: pool.token1.isNative,
          },
        }
      : undefined,
  };
}

function buildPools(pools: (Pair | Pool)[]): TradePoolInput[] {
  return pools.map((pool) => buildPool(pool));
}

function buildTradeRouteInput(swap: Swap): TokenTradeRouteInput {
  return {
    ...buildTradeRouteInputAmounts({
      inputAmount: swap.inputAmount,
      outputAmount: swap.outputAmount,
    }),
    pools: buildPools(swap.route.pools),
  };
}

export function buildAllTradeRouteInputs(trade: ClassicTrade): {
  mixedTokenTradeRouteInputs?: TokenTradeRouteInput[];
  v2TokenTradeRouteInputs?: TokenTradeRouteInput[];
  v3TokenTradeRouteInputs?: TokenTradeRouteInput[];
} {
  const mixedTokenTradeRouteInputs: TokenTradeRouteInput[] = [];
  const v2TokenTradeRouteInputs: TokenTradeRouteInput[] = [];
  const v3TokenTradeRouteInputs: TokenTradeRouteInput[] = [];

  const swaps = trade.swaps;

  for (const swap of swaps) {
    if (swap.route.protocol === Protocol.MIXED) {
      mixedTokenTradeRouteInputs.push(buildTradeRouteInput(swap));
    } else if (swap.route.protocol === Protocol.V2) {
      v2TokenTradeRouteInputs.push(buildTradeRouteInput(swap));
    } else {
      v3TokenTradeRouteInputs.push(buildTradeRouteInput(swap));
    }
  }

  return {
    mixedTokenTradeRouteInputs:
      mixedTokenTradeRouteInputs.length > 0
        ? mixedTokenTradeRouteInputs
        : undefined,
    v2TokenTradeRouteInputs:
      v2TokenTradeRouteInputs.length > 0 ? v2TokenTradeRouteInputs : undefined,
    v3TokenTradeRouteInputs:
      v3TokenTradeRouteInputs.length > 0 ? v3TokenTradeRouteInputs : undefined,
  };
}
