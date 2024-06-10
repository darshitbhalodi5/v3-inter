import { transparentize } from "polished";
import { ReactNode } from "react";
import { AlertTriangle } from "react-feather";
import styled, { css } from "styled-components";
import { Z_INDEX } from "theme/zIndex";

import { ButtonText } from "theme/components";
import { AutoColumn } from "../Column";

export const PageWrapper = styled.div`
  padding: 68px 8px 0px;
  max-width: 500px;
  width: 100%;

  @media only screen and (max-width: ${({ theme }) =>
      `${theme.breakpoint.md}px`}) {
    padding-top: 48px;
  }

  @media only screen and (max-width: ${({ theme }) =>
      `${theme.breakpoint.sm}px`}) {
    padding-top: 20px;
  }
`;

// Mostly copied from `AppBody` but it was getting too hard to maintain backwards compatibility.
export const SwapWrapperOuter = styled.main<{ isDark?: boolean }>`
  position: relative;
  z-index: ${Z_INDEX.default};
  transition: transform 250ms ease;
  border-radius: 24px;
`;

export const SwapWrapper = (
  props: React.ComponentProps<typeof SwapWrapperOuter>,
) => {
  return (
    <SwapWrapperOuter {...props}>
      <SwapWrapperInner>{props.children}</SwapWrapperInner>
    </SwapWrapperOuter>
  );
};

const SwapWrapperInner = styled.div`
  border-radius: 24px;
  z-index: -1;
`;

export const ArrowWrapper = styled.div<{ clickable: boolean }>`
  border-radius: 12px;
  height: 40px;
  width: 40px;
  position: relative;
  margin-top: -18px;
  margin-bottom: -18px;
  margin-left: auto;
  margin-right: auto;
  background-color: ${({ theme }) => theme.surface2};
  border: 4px solid;
  border-color: ${({ theme }) => theme.surface1};

  z-index: 2;
  ${({ clickable }) =>
    clickable
      ? css`
          :hover {
            cursor: pointer;
            opacity: 0.8;
            background-color: rgb(28, 25, 36);
          }
        `
      : null}
`;

// styles
export const Dots = styled.span`
  &::after {
    display: inline-block;
    animation: ellipsis 1.25s infinite;
    content: ".";
    width: 1em;
    text-align: left;
  }
  @keyframes ellipsis {
    0% {
      content: ".";
    }
    33% {
      content: "..";
    }
    66% {
      content: "...";
    }
  }
`;

const SwapCallbackErrorInner = styled.div`
  background-color: ${({ theme }) => transparentize(0.9, theme.critical)};
  border-radius: 1rem;
  display: flex;
  align-items: center;
  font-size: 0.825rem;
  width: 100%;
  padding: 3rem 1.25rem 1rem 1rem;
  margin-top: -2rem;
  color: ${({ theme }) => theme.critical};
  z-index: -1;
  p {
    padding: 0;
    margin: 0;
    font-weight: 535;
  }
`;

const SwapCallbackErrorInnerAlertTriangle = styled.div`
  background-color: ${({ theme }) => transparentize(0.9, theme.critical)};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  border-radius: 12px;
  min-width: 48px;
  height: 48px;
`;

export function SwapCallbackError({ error }: { error: ReactNode }) {
  return (
    <SwapCallbackErrorInner>
      <SwapCallbackErrorInnerAlertTriangle>
        <AlertTriangle size={24} />
      </SwapCallbackErrorInnerAlertTriangle>
      <p style={{ wordBreak: "break-word" }}>{error}</p>
    </SwapCallbackErrorInner>
  );
}

export const SwapShowAcceptChanges = styled(AutoColumn)`
  background-color: ${({ theme }) => transparentize(0.95, theme.accent1)};
  color: ${({ theme }) => theme.accent1};
  padding: 12px;
  border-radius: 12px;
`;

export const SwapSection = styled.div`
  background-color: ${({ theme }) => theme.surface2};
  box-shadow:
    rgba(0, 0, 0, 0.01) 0px 0px 1px,
    rgba(0, 0, 0, 0.04) 0px 4px 8px,
    rgba(0, 0, 0, 0.04) 0px 16px 24px,
    rgba(0, 0, 0, 0.01) 0px 24px 32px;
  border-radius: 16px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  height: 120px;
  line-height: 20px;
  padding: 16px;
  position: relative;
  &:before {
    box-sizing: border-box;
    background-size: 100%;
    border-radius: inherit;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    content: "";
  }
  &:hover:before {
    border-color: ${({ theme }) => theme.deprecated_stateOverlayHover};
  }
  &:focus-within:before {
    border-color: ${({ theme }) => theme.deprecated_stateOverlayPressed};
  }
`;

export const OutputSwapSection = styled(SwapSection)`
  border-bottom: ${({ theme }) => `1px solid ${theme.surface1}`};
`;

export const ArrowContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const SwapHeaderTabButton = styled(ButtonText)<{ $isActive: boolean }>`
  color: ${({ theme, $isActive }) => ($isActive ? "#9657EB" : "#525252")};
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 18px;
  gap: 4px;

  font-weight: 550;
  &:focus {
    text-decoration: none;
    color: white;
  }
  &:active {
    text-decoration: none;
  }
  &:hover {
    color: #ffffff;
    opacity: 1;
  }
`;
