import { ComponentPropsWithoutRef, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';

type SearchInputProps = ComponentPropsWithoutRef<'input'>;

const SearchInput = (props: SearchInputProps) => {
   const inputRef = useRef<HTMLInputElement>(null);

   useEffect(() => {
      if (props.autoFocus) {
         inputRef.current?.focus();
      }
   }, [props.autoFocus]);

   return (
      <SearchContainer>
         <SearchIcon size={26} />
         <StyledSearchInput ref={inputRef} {...props} />
      </SearchContainer>
   );
};

SearchInput.displayName = 'SearchInput';

const SearchContainer = styled.div`
   position: relative;
   width: 364px;
   height: 40px;
   border-radius: 20px;
   background: #fff;
`;

const SearchIcon = styled(FiSearch)`
   position: absolute;
   top: 50%;
   left: 10px;
   pointer-events: none;
   transform: translateY(-50%);
   color: ${(p) => p.theme.colors.text.inverse};
`;

const StyledSearchInput = styled.input`
   width: 100%;
   height: 100%;
   padding: 5px 20px 5px 48px;
   font-size: 15px;
   color: ${(p) => p.theme.colors.text.inverse};
`;

export default SearchInput;
