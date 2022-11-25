import styled from 'styled-components';

type ContainerProps = {
   width?: number;
};

const Container = styled.div<ContainerProps>`
   max-width: ${(p) => p.width ?? 1900}px;
   padding: 0 30px;
`;

export default Container;
