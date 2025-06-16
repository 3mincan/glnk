import { useState, useEffect } from 'react';
import { HCP } from '@/types';
import { useGraphData } from './useGraphData';

export const useSearch = (): {
  searchTerm: string;
  searchResults: HCP[];
  isSearching: boolean;
  handleSearch: (term: string) => void;
  selectHcp: (orcid: string) => void;
  selectedHcpId: string | null;
} => {
  const { graphData } = useGraphData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHcpId, setSelectedHcpId] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<HCP[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim() || !graphData) {
      setSearchResults([]);
      return;
    }

    const debounceTimer = setTimeout(() => {
      setIsSearching(true);
      try {
        const lowerSearchTerm = searchTerm.toLowerCase();
        const results = graphData.nodes.filter((item: HCP) => {
          const nameMatch = item.name.toLowerCase().includes(lowerSearchTerm);
          const orcidMatch = item.id.toLowerCase().includes(lowerSearchTerm);
          
          return nameMatch || orcidMatch;
        });
        setSearchResults(results);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, graphData]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const selectHcp = (orcid: string) => {
    setSelectedHcpId(orcid);
  };


  return {
    searchTerm,
    searchResults,
    isSearching,
    handleSearch,
    selectHcp,
    selectedHcpId,
  };
};
