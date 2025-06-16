import { useContext } from 'react';
import { GraphDataContext } from '@/context';

export const useGraphData = () => {
  const context = useContext(GraphDataContext);
  if (context === undefined) {
    throw new Error('useGraphData must be used within a GraphDataProvider');
  }
  return context;
}; 