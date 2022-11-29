import { ComponentPropsWithoutRef, ReactElement, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

type TabsProps = {
   children: ReactElement[];
   value?: string;
};

type Props = TabsProps & Omit<ComponentPropsWithoutRef<'div'>, keyof TabsProps>;

// TODO: make it TS compatible
const Tabs = ({ children, value: initialValue, ...restProps }: Props) => {
   const [value, setValue] = useState(initialValue ?? children[0].props.value);
   const [activatedTabs, setActivatedTabs] = useState<Set<string>>(new Set());

   const handleClick = (value: string) => {
      setValue(value);
      setActivatedTabs((state) => new Set(state).add(value));
   };

   useEffect(() => {
      setActivatedTabs((state) => new Set(state).add(value));
   }, [value]);

   let buttons: ReactElement[] = [];
   let panels: ReactElement[] = [];

   children.map((child) => {
      buttons.push(
         <Button
            active={child.props.value === value}
            key={child.props.value}
            onClick={() => handleClick(child.props.value)}
         >
            {child.props.label}
         </Button>
      );

      if (activatedTabs.has(child.props.value)) {
         panels.push(
            <section hidden={child.props.value !== value} key={child.props.value}>
               {child}
            </section>
         );
      }
   });

   return (
      <div {...restProps}>
         <ButtonContainer>{buttons}</ButtonContainer>
         {panels}
      </div>
   );
};

const ButtonContainer = styled.div`
   display: flex;
   align-items: center;
   margin: 0 0 30px -12px;
`;

const Button = styled.button<{ active: boolean }>`
   margin-left: 12px;
   padding: 0 12px;
   border-radius: 99px;
   background: rgba(255, 255, 255, 0.07);
   font-size: 14px;
   line-height: 32px;
   ${(p) =>
      p.active
         ? css`
              color: ${(p) => p.theme.colors.text.inverse};
              background: #fff;
           `
         : ''}
`;

export default Tabs;
