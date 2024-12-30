import React, { useState, useEffect } from "react";
import { fetchMembers } from "../../services/api";

interface Member {
  _id: string;
  name: string;
  status: string;
  imagePath: string | null;
}

const MemberList: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const getMembers = async () => {
      const data = await fetchMembers();
      setMembers(data);
    };

    getMembers();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Members</h2>
      <ul className="space-y-3">
        {members.map((member) => (
          <li
            key={member._id}
            className="flex justify-between items-center p-4 border border-gray-200 rounded-md hover:bg-gray-100 transition"
          >
            <div className="flex items-center">
              {member.imagePath ? (
                <img
                  src={member.imagePath}
                  alt={member.name}
                  className="w-10 h-10 rounded-full mr-4"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 mr-4"></div>
              )}
              <span className="text-lg font-medium text-gray-700">{member.name}</span>
            </div>
            <span
              className={`py-1 px-3 text-sm rounded-full ${
                member.status === "Image Uploaded"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {member.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;
