import { useMemo } from 'react';
import { useGraphData } from './useGraphData';
import { NodeProps, LinkProps } from '@/types';

interface FilteredGraphData {
  nodes: NodeProps[];
  links: LinkProps[];
  primaryLinksCount: number;
}

export const useNetworkData = (researcherId: string) => {
  const { graphData, isLoading, error } = useGraphData();
  
  const filteredGraphData = useMemo((): FilteredGraphData => {
    if (!graphData || !graphData.links || !graphData.nodes || !researcherId) {
      return {
        nodes: [],
        links: [],
        primaryLinksCount: 0,
      };
    }

    const primaryLinks = graphData.links.filter(
      (link: LinkProps) => link.source === researcherId || link.target === researcherId
    );

    const primaryConnectedIds = new Set([researcherId]);
    primaryLinks.forEach((link: LinkProps) => {
      primaryConnectedIds.add(link.source);
      primaryConnectedIds.add(link.target);
    });

    const secondaryLinks = graphData.links.filter(
      (link: LinkProps) =>
        primaryConnectedIds.has(link.source) ||
        primaryConnectedIds.has(link.target)
    );

    const allConnectedIds = new Set([researcherId]);
    [...primaryLinks, ...secondaryLinks].forEach((link: LinkProps) => {
      allConnectedIds.add(link.source);
      allConnectedIds.add(link.target);
    });

    const filteredNodes = graphData.nodes.filter((node: NodeProps) =>
      allConnectedIds.has(node.id)
    );

    return {
      nodes: filteredNodes,
      links: secondaryLinks,
      primaryLinksCount: primaryLinks.length,
    };
  }, [graphData, researcherId]);

  return {
    filteredGraphData,
    isLoading,
    error,
    hasConnections: filteredGraphData.primaryLinksCount > 0,
  };
};

export type { FilteredGraphData }; 