import React, { useState, useEffect } from "react";
import { fetchOrganizations, createTeam } from "../../services/api";

interface Organization {
  _id: string;
  name: string;
}

const AddTeamForm: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [name, setName] = useState("");
  const [organizationId, setOrganizationId] = useState("");

  useEffect(() => {
    const getOrganizations = async () => {
      const data = await fetchOrganizations();
      setOrganizations(data);
    };

    getOrganizations();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!organizationId) {
      alert("Please select an organization.");
      return;
    }

    await createTeam({ name, organizationId });
    alert("Team added successfully!");
    setName("");
    setOrganizationId("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto space-y-4"
    >
      <h3 className="text-xl font-semibold text-gray-800">Add Team</h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Team Name"
        required
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={organizationId}
        onChange={(e) => setOrganizationId(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select an Organization</option>
        {organizations.map((org) => (
          <option key={org._id} value={org._id}>
            {org.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        Add Team
      </button>
    </form>
  );
};

export default AddTeamForm;
