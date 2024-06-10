import styled from "styled-components";
const FilterButton = styled.button<{ active: boolean; highlight?: boolean }>`
  height: 100%;
  color: ${({ theme }) => theme.neutral1};
  background: #1c1924 !important;
  margin: 0;
  padding: 2px 6px 2px 14px;
  border-radius: 12px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 535;
  transition-duration: ${({ theme }) => theme.transition.duration.fast};
  border: 1px solid ${({ theme }) => theme.surface3};
  outline: ${({ theme, active, highlight }) =>
    active && highlight ? `1px solid ${theme.accent1}` : "none"};

  :hover {
    cursor: pointer;
    opacity: ${({ theme, active }) => (active ? theme.opacity.hover : 1)};
  }
`;
export default FilterButton;
