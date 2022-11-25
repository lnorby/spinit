import styled from 'styled-components';

type SpacerProps = {
   x?: number;
   y?: number;
};

const Spacer = styled.div<SpacerProps>`
   width: ${(p) => p.x ?? 0}px;
   height: ${(p) => p.y ?? 0}px;
`;

export default Spacer;
