import { ComponentPropsWithoutRef, ReactNode, useState } from 'react';
import styled, { css } from 'styled-components';

type TabsProps = {
   items: { label: string; content: ReactNode }[];
};

type Props = TabsProps & Omit<ComponentPropsWithoutRef<'div'>, keyof TabsProps>;

const Tabs = ({ items, ...restProps }: Props) => {
   const [activeItemIndex, setActiveItemIndex] = useState(0);

   return (
      <div {...restProps}>
         <ButtonContainer>
            {items.map((item, index) => (
               <Button
                  active={index === activeItemIndex}
                  onClick={() => setActiveItemIndex(index)}
                  key={index}
               >
                  {item.label}
               </Button>
            ))}
         </ButtonContainer>
         {items[activeItemIndex].content}
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
