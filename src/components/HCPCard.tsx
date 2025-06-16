import React, { useState, useMemo } from "react";
import { User } from "lucide-react";
import { Button, Switch, Label } from "@/components/";
import graphData from "@/data/graphData.json";

const HCPCard: React.FC<{ id: string }> = React.memo(({ id }) => {
  const [showConnections, setShowConnections] = useState(false);
  const [showMyConnections, setShowMyConnections] = useState(true);
  const researcher = graphData.nodes.find((n) => n.id === id);

  const connections = graphData.links.filter(
    (link) => link.source === id || link.target === id
  );

  const peers = connections.length;

  const { profileImage, title, following, name } = useMemo(() => {
    const titles = [
      "Cardiologist",
      "Neurologist",
      "Oncologist",
      "Pediatrician",
      "Dermatologist",
      "Researcher",
    ];
    if (!researcher)
      return { profileImage: "", title: "", following: 0, name: "" };
    const nodeIndex = id?.slice(-4);
    const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${nodeIndex}&size=300`;
    const titleSeed = parseInt(nodeIndex || "0", 10) % titles.length;
    const followingSeed = (parseInt(nodeIndex || "0", 10) % 50) + 10;

    return {
      name: researcher.name,
      profileImage: profileImage,
      title: titles[titleSeed],
      peers: peers,
      following: followingSeed,
    };
  }, [id, researcher, peers]);

  if (!researcher) {
    return null;
  }

  return (
    <div className="flex items-start justify-between grid grid-cols-7 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex justify-between items-center col-span-5">
        <div className="flex items-center gap-4">
          {profileImage !== "" ? (
            <img
              src={profileImage}
              alt={name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <User
              size={20}
              className="w-16 h-16 rounded-full bg-gray-200  object-cover"
            />
          )}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
            <p className="text-gray-600">{title}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center gap-2">
              <span className="text-sm text-gray-500">My Peers</span>
              <span className="text-sm font-semibold">{peers}</span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <span className="text-sm text-gray-500">Following</span>
              <span className="text-sm font-semibold">{following}</span>
            </div>
          </div>

          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-12">
            Create web
          </Button>
        </div>
      </div>

      <div className="flex items-center col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-2">
            <Switch
              id="show-connections"
              checked={showConnections}
              onCheckedChange={setShowConnections}
            />
            <Label htmlFor="show-connections">Show connections</Label>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Switch
              id="show-my-connections"
              checked={showMyConnections}
              onCheckedChange={setShowMyConnections}
            />
            <Label htmlFor="show-my-connections">
              Show my connections on map
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
});

export default HCPCard;
