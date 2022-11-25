import styled from 'styled-components';

type TabsProps = {
   items: Array<{ label: string; value: any }>;
   onChange: (value: any) => void;
   value?: any;
};

const Tabs = ({ items, onChange, value }: TabsProps) => {
   return (
      <StyledTabs>
         {items.map((item) => (
            <Tab key={item.value}>
               <TabInput
                  type="radio"
                  checked={item.value === value}
                  onChange={() => onChange(item.value)}
               />
               <TabLabel>{item.label}</TabLabel>
            </Tab>
         ))}
      </StyledTabs>
   );
};

const StyledTabs = styled.div`
   display: flex;
   align-items: center;
   margin-left: -12px;
`;

const Tab = styled.label`
   position: relative;
   margin-left: 12px;
`;

const TabInput = styled.input`
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   opacity: 0;
   cursor: pointer;
`;

const TabLabel = styled.span`
   display: block;
   padding: 0 12px;
   border-radius: 99px;
   background: rgba(255, 255, 255, 0.07);
   font-size: 14px;
   line-height: 32px;

   ${TabInput}:checked + & {
      color: ${(p) => p.theme.colors.text.inverse};
      background: #fff;
   }
`;

export default Tabs;
