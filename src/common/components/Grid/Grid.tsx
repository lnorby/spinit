import styled from 'styled-components';

type GridProps = {
   gap?: number;
   gapX?: number;
   gapY?: number;
   minColumnWidth: number;
   maxColumnWidth?: number;
};

const Grid = styled.div<GridProps>`
   display: grid;
   grid-template-columns: repeat(
      auto-fill,
      minmax(
         ${(p) => p.minColumnWidth}px,
         ${(p) => (p.maxColumnWidth ? `${p.maxColumnWidth}px` : '1fr')}
      )
   );
   column-gap: ${(p) => p.gapX ?? p.gap ?? 0}px;
   row-gap: ${(p) => p.gapY ?? p.gap ?? 0}px;
`;

export default Grid;
