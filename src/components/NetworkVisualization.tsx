import React, { useState } from "react";
import ForceGraph3D from "react-force-graph-3d";
import * as THREE from "three";
import { X, Users, Building2, Calendar, FileText } from "lucide-react";
import { FilteredGraphData } from "@/hooks/useNetworkData";
import { useGraphData } from "@/hooks/useGraphData";

const NetworkVisualization = React.memo(
  ({
    id,
    width,
    filteredGraphData,
    hasConnections,
    setProfessionalId,
  }: {
    id: string;
    width: number;
    filteredGraphData: FilteredGraphData;
    hasConnections: boolean;
    setProfessionalId: (id: string) => void;
  }) => {
    const { graphData } = useGraphData();
    const [selectedConnection, setSelectedConnection] = useState<{
      source: string;
      target: string;
      type: string;
      label: string;
    } | null>(null);

    if (!filteredGraphData || filteredGraphData.nodes.length === 0) {
      return (
        <div
          style={{ width, height: width }}
          className="flex items-center justify-center bg-white border border-gray-200 rounded-lg"
        >
          <div className="text-gray-500">Loading...</div>
        </div>
      );
    }

    if (!hasConnections) {
      return (
        <div
          style={{ width, height: width }}
          className="flex items-center justify-center bg-white border border-gray-200 rounded-lg"
        >
          <div className="text-gray-500">
            No connections found for this researcher
          </div>
        </div>
      );
    }

    return (
      <div className="relative">
        {selectedConnection && graphData && (
          <div className="absolute top-4 right-4 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-6 max-w-md">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Connection Details
              </h3>
              <button
                onClick={() => setSelectedConnection(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-blue-500" />
                <span className="text-sm font-medium">Connection Type:</span>
                <span className="text-sm text-gray-600 capitalize">
                  {selectedConnection.type}
                </span>
              </div>

              <div className="flex items-start gap-2">
                <FileText size={16} className="text-green-500 mt-0.5" />
                <div>
                  <span className="text-sm font-medium">Description:</span>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedConnection.label}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Building2 size={16} className="text-purple-500" />
                <span className="text-sm font-medium">Researchers:</span>
                <div className="text-sm text-gray-600">
                  {typeof selectedConnection.source === "string"
                    ? graphData.nodes.find(
                        (n: { id: string }) =>
                          n.id === selectedConnection.source
                      )?.name || selectedConnection.source
                    : (selectedConnection.source as { name: string }).name}{" "}
                  ↔{" "}
                  {typeof selectedConnection.target === "string"
                    ? graphData.nodes.find(
                        (n: { id: string }) =>
                          n.id === selectedConnection.target
                      )?.name || selectedConnection.target
                    : (selectedConnection.target as { name: string }).name}
                </div>
              </div>

              {selectedConnection.type === "coauthorship" && (
                <div className="bg-blue-50 p-3 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={16} className="text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">
                      Collaboration Details
                    </span>
                  </div>
                  <p className="text-xs text-blue-700">
                    This represents a research collaboration between the two
                    researchers.
                  </p>
                </div>
              )}

              {selectedConnection.type === "sharedWorkplace" && (
                <div className="bg-green-50 p-3 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 size={16} className="text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      Workplace Connection
                    </span>
                  </div>
                  <p className="text-xs text-green-700">
                    These researchers have worked at the same institution or on
                    joint projects.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <ForceGraph3D
          key={`${id}-${filteredGraphData.links.length}-${filteredGraphData.nodes.length}`}
          width={width}
          height={width}
          backgroundColor="#ffffff"
          graphData={filteredGraphData}
          nodeThreeObject={(node: { id: string; education: string[] }) => {
            const isMainResearcher = node.id === id;
            const nodeIndex = node.id.slice(-4);
            const sprite = new THREE.Sprite();
            const scale = isMainResearcher ? 24 : 16;
            sprite.scale.set(scale, scale, 1);
            sprite.renderOrder = 999;

            const getBorderColor = (education: string[]) => {
              if (!education || education.length === 0) return "#6b7280";
              const uni = education[0].toLowerCase();
              if (uni.includes("harvard")) return "#dc2626";
              if (uni.includes("stanford")) return "#16a34a";
              if (uni.includes("johns hopkins")) return "#2563eb";
              if (uni.includes("ucla")) return "#7c3aed";
              if (uni.includes("oxford")) return "#ea580c";
              return "#0891b2";
            };

            const borderColor = isMainResearcher
              ? "#fbbf24"
              : getBorderColor(node.education);
            const borderWidth = isMainResearcher ? 12 : 8;

            const createCircleAvatar = (imageUrl: string) => {
              const canvas = document.createElement("canvas");
              const size = 400;
              canvas.width = size;
              canvas.height = size;
              const ctx = canvas.getContext("2d");
              if (!ctx) return null;

              ctx.fillStyle = "white";
              ctx.beginPath();
              ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
              ctx.fill();

              ctx.strokeStyle = borderColor;
              ctx.lineWidth = borderWidth;
              ctx.beginPath();
              ctx.arc(
                size / 2,
                size / 2,
                size / 2 - borderWidth / 2,
                0,
                Math.PI * 2
              );
              ctx.stroke();

              const padding = 48;
              ctx.save();
              ctx.beginPath();
              ctx.arc(
                size / 2,
                size / 2,
                size / 2 - borderWidth - padding,
                0,
                Math.PI * 2
              );
              ctx.clip();

              const img = new Image();
              img.crossOrigin = "anonymous";
              img.onload = () => {
                ctx.drawImage(
                  img,
                  borderWidth + padding,
                  borderWidth + padding,
                  size - (borderWidth + padding) * 2,
                  size - (borderWidth + padding) * 2
                );
                const texture = new THREE.CanvasTexture(canvas);
                texture.colorSpace = THREE.SRGBColorSpace;
                sprite.material = new THREE.SpriteMaterial({
                  map: texture,
                  depthTest: true,
                  depthWrite: true,
                });
              };
              img.src = imageUrl;

              ctx.restore();
              return canvas;
            };

            createCircleAvatar(
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${nodeIndex}&size=400`
            );

            sprite.material = new THREE.SpriteMaterial({
              color: borderColor,
              transparent: true,
              opacity: 0.8,
              depthTest: true,
              depthWrite: true,
            });

            sprite.position.z = 1;

            return sprite;
          }}
          nodeLabel="name"
          nodeAutoColorBy="id"
          nodeRelSize={2}
          linkLabel="label"
          linkDirectionalArrowLength={3.5}
          linkDirectionalArrowRelPos={1}
          linkColor={(link: { type: string }) => {
            if (link.type === "coauthorship") return "#ff3b30";
            if (link.type === "sharedWorkplace") return "#007aff";
            return "#8e8e93";
          }}
          linkWidth={1}
          d3AlphaDecay={0.01}
          d3VelocityDecay={0.3}
          cooldownTicks={100}
          numDimensions={3}
          onNodeClick={(node) => {
            setProfessionalId(node.id);
          }}
          onLinkClick={(link) => {
            setSelectedConnection({
              source: link.source,
              target: link.target,
              type: link.type,
              label: link.label,
            });
          }}
        />
      </div>
    );
  }
);

export default NetworkVisualization;
