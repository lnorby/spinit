import styled from 'styled-components';
import Link from 'next/link';
import Logo from '@components/Logo/Logo';
import { useRouter } from 'next/router';
import { FiSearch } from 'react-icons/fi';
import useScrollPosition from '@react-hook/window-scroll';

const Header = () => {
   const router = useRouter();
   const windowScrollPosition = useScrollPosition();

   return (
      <StyledHeader overlayVisible={windowScrollPosition > 0}>
         <Logo />
         {router.pathname !== '/search' ? (
            <SearchButton href="/search">
               <FiSearch size={24} />
            </SearchButton>
         ) : null}
      </StyledHeader>
   );
};

const StyledHeader = styled.header<{ overlayVisible: boolean }>`
   position: fixed;
   top: 0;
   left: 0;
   z-index: 99;
   display: flex;
   align-items: center;
   width: 100%;
   height: 80px;
   padding: 0 30px;

   &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      background: linear-gradient(rgba(0, 0, 0, 0.4), transparent);
      opacity: ${(p) => (p.overlayVisible ? 1 : 0)};
      transition: opacity 0.2s;
   }
`;

const SearchButton = styled(Link)`
   margin-left: auto;
`;

export default Header;
