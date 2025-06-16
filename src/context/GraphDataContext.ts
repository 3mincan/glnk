import { LinkProps, NodeProps } from '@/types';
import { createContext } from 'react';

export interface GraphDataContextType {
  graphData: {
    nodes: NodeProps[];
    links: LinkProps[];
    primaryLinksCount: number;
  } | null;
  isLoading: boolean;
  error: string | null;
}

export const GraphDataContext = createContext<GraphDataContextType | undefined>(
  undefined
); 