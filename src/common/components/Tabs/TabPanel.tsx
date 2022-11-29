import { ReactNode } from 'react';

type TabPanelProps = {
   label: string;
   value: string;
   children: ReactNode;
};

const TabPanel = ({ children }: TabPanelProps) => {
   return <>{children}</>;
};

export default TabPanel;
