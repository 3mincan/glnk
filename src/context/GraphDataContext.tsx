import React, { useState, useEffect } from "react";
import { GraphDataContext } from "./GraphDataContext";
import { LinkProps, NodeProps } from "@/types";

export const GraphDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [graphData, setGraphData] = useState<{
    nodes: NodeProps[];
    links: LinkProps[];
    primaryLinksCount: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGraphData = async () => {
      try {
        setIsLoading(true);
        const data = await import("@/data/graphData.json");
        setGraphData(
          data.default as unknown as {
            nodes: NodeProps[];
            links: LinkProps[];
            primaryLinksCount: number;
          }
        );
        setError(null);
      } catch (err) {
        setError("Failed to load graph data");
        console.error("Error loading graph data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadGraphData();
  }, []);

  return (
    <GraphDataContext.Provider value={{ graphData, isLoading, error }}>
      {children}
    </GraphDataContext.Provider>
  );
};
