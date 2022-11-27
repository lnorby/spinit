import { ReactNode } from 'react';

export type Value = string | number;

type TabPanelProps = {
   label: string;
   value: Value;
   children: ReactNode;
};

const TabPanel = ({ children }: TabPanelProps) => {
   return <>{children}</>;
};

export default TabPanel;
