import React from "react";
import SearchFilter from "@/components/SearchFilter";

const Home: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <SearchFilter />
      </div>
    </div>
  );
};

export default Home;
