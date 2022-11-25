import styled from 'styled-components';

const Logo = () => {
   return <StyledLogo>SpinIt</StyledLogo>;
};

const StyledLogo = styled.h1`
   font-size: 26px;
   font-weight: 700;
   //text-shadow: 0 0 8px rgba(0, 0, 0, 0.7);
`;

export default Logo;
