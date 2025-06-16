import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ProfessionalDetails,
  NetworkVisualization,
  SearchFilter,
  HCPCard,
} from "@/components";
import { useGraphData } from "@/hooks/useGraphData";
import { useNetworkData } from "@/hooks/useNetworkData";

const ResearcherDetail: React.FC = () => {
  const [professionalId, setProfessionalId] = useState<string | null>(null);
  const [width, setWidth] = useState(800);
  const networkRef = useRef<HTMLDivElement>(null);
  const { id } = useParams<{ id: string }>();
  const { graphData, isLoading, error } = useGraphData();
  const { filteredGraphData, hasConnections } = useNetworkData(id || "");

  const handleSetProfessionalId = useCallback((newId: string) => {
    setProfessionalId(newId);
  }, []);

  useEffect(() => {
    if (networkRef.current) {
      const elementWidth = networkRef.current.offsetWidth;
      setWidth(elementWidth);
    }
  }, []);

  useEffect(() => {
    setProfessionalId(null);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !graphData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500">Error loading data</div>
          <Link to="/" className="text-blue-600 hover:underline mt-2 block">
            ← Back to search
          </Link>
        </div>
      </div>
    );
  }

  const researcher = graphData.nodes.find((n: { id: string }) => n.id === id);

  if (!researcher) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <div className="flex-1">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Researcher not found</h2>
            <Link to="/" className="text-blue-600 hover:underline">
              ← Back to search
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1">
        <HCPCard id={id || ""} />

        <SearchFilter />

        <div className="grid grid-cols-7 gap-6 mt-6">
          <div className="col-span-2 rounded-lg">
            <ProfessionalDetails professionalId={professionalId} />
          </div>
          <div className="col-span-5 rounded-lg" ref={networkRef}>
            <NetworkVisualization
              key={id}
              id={id || ""}
              width={width}
              filteredGraphData={filteredGraphData}
              hasConnections={hasConnections}
              setProfessionalId={handleSetProfessionalId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearcherDetail;
