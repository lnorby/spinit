import { ComponentPropsWithoutRef, ReactElement, useState } from 'react';
import styled, { css } from 'styled-components';

type TabsProps = {
   children: ReactElement<{ label: string; value: string }>[];
   value?: string;
};

type Props = TabsProps & Omit<ComponentPropsWithoutRef<'div'>, keyof TabsProps>;

// TODO: make it TS compatible
const Tabs = ({ children, value: initialValue, ...restProps }: Props) => {
   const [value, setValue] = useState<string>(initialValue ?? children[0].props.value);

   return (
      <div {...restProps}>
         <ButtonContainer>
            {children.map((child) => (
               <Button
                  active={child.props.value === value}
                  key={child.props.value}
                  onClick={() => setValue(child.props.value)}
               >
                  {child.props.label}
               </Button>
            ))}
         </ButtonContainer>
         {children.find((child) => child.props.value === value)}
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
