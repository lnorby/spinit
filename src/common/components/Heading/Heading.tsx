import styled, { css } from 'styled-components';
import { fluidFontSize } from '@styles/utils';

type HeadingProps = {
   level: 1 | 2;
};

const styles = {
   1: css`
      font-weight: 800;
      ${fluidFontSize(30, 88)}
   `,
   2: css`
      font-weight: 700;
      ${fluidFontSize(20, 24)}
   `,
};

const Heading = styled.h1<HeadingProps>`
   ${(p) => styles[p.level]}
`;

export default Heading;
