import React, { useEffect, useState } from "react";
import { fetchTeams } from "../../services/api";

interface Team {
  _id: string;
  name: string;
  organizationId: string;
}

const TeamList: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const getTeams = async () => {
      const data = await fetchTeams();
      setTeams(data);
    };

    getTeams();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Teams</h2>
      <ul className="space-y-3">
        {teams.map((team) => (
          <li
            key={team._id}
            className="flex justify-between items-center p-4 border border-gray-200 rounded-md hover:bg-gray-100 transition"
          >
            <div>
              <strong className="text-lg text-gray-700">{team.name}</strong>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamList;
