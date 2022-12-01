import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import { VscClose } from 'react-icons/vsc';

type SearchInputProps = {
   onChange: (value: string) => void;
};

const SearchInput = ({ onChange }: SearchInputProps) => {
   const [value, setValue] = useState<string>('');
   const inputRef = useRef<HTMLInputElement>(null);

   useEffect(() => {
      const timer = setTimeout(() => onChange?.(value), 400);
      return () => {
         clearTimeout(timer);
      };
   }, [value]);

   useEffect(() => {
      inputRef.current?.focus();
   }, []);

   return (
      <SearchContainer>
         <SearchIcon size={26} />
         <StyledSearchInput
            ref={inputRef}
            value={value}
            placeholder="Mit szeretnél hallgatni?"
            onChange={(e) => setValue(e.target.value)}
         />
         {value !== '' ? (
            <SearchClearButton onClick={() => setValue('')}>
               <VscClose size={26} />
            </SearchClearButton>
         ) : null}
      </SearchContainer>
   );
};

SearchInput.displayName = 'SearchInput';

const SearchContainer = styled.div`
   position: relative;
   width: 364px;
   height: 40px;
   color: ${(p) => p.theme.colors.text.inverse};
`;

const SearchIcon = styled(FiSearch)`
   position: absolute;
   top: 50%;
   left: 10px;
   pointer-events: none;
   transform: translateY(-50%);
`;

const StyledSearchInput = styled.input`
   width: 100%;
   height: 100%;
   padding: 5px 20px 5px 48px;
   border-radius: 20px;
   background: #fff;
   font-size: 15px;
`;

const SearchClearButton = styled.button`
   position: absolute;
   top: 0;
   right: 0;
   display: flex;
   align-items: center;
   height: 100%;
   padding: 0 10px;
`;

export default SearchInput;
