import React, { useEffect, useState } from "react";
import { fetchOrganizations } from "../../services/api";

interface Organization {
  _id: string;
  name: string;
  email: string;
  location: string;
}

const OrganizationList: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    const getOrganizations = async () => {
      const data = await fetchOrganizations();
      setOrganizations(data);
    };

    getOrganizations();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Organizations</h2>
      <ul className="space-y-3">
        {organizations.map((org) => (
          <li
            key={org._id}
            className="flex justify-between items-center p-4 border border-gray-200 rounded-md hover:bg-gray-100 transition"
          >
            <div>
              <strong className="text-lg text-gray-700">{org.name}</strong>
              <p className="text-sm text-gray-500">{org.location}</p>
            </div>
            <a
              href={`mailto:${org.email}`}
              className="text-sm text-blue-500 hover:text-blue-700 transition"
            >
              {org.email}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrganizationList;
