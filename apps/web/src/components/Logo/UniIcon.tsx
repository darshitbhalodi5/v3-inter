import styled from "styled-components";
import logo from "../../assets/images/Logo.png";

// ESLint reports `fill` is missing, whereas it exists on an SVGProps type
export type SVGProps = React.SVGProps<SVGSVGElement> & {
  fill?: string;
  height?: string | number;
  width?: string | number;
  gradientId?: string;
  clickable?: boolean;
};

export const UniIcon = ({ clickable, ...props }: SVGProps) => (
  <Container clickable={clickable}>
    <img src={logo} style={{ width: "70px" }}></img>
  </Container>
);

const Container = styled.div<{ clickable?: boolean }>`
  position: relative;
  cursor: ${({ clickable }) => (clickable ? "pointer" : "auto")};
`;
