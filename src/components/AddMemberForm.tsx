import React, { useState, useEffect } from "react";
import { fetchTeams, createMember, uploadImage } from "../../services/api";

interface Team {
  _id: string;
  name: string;
}

const AddMemberForm: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [name, setName] = useState("");
  const [teamId, setTeamId] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [image, setImage] = useState<File | null>(null); // State for image file
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTeams = async () => {
      const data = await fetchTeams();
      setTeams(data);
    };

    getTeams();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamId) {
      alert("Please select a team.");
      return;
    }

    setLoading(true);

    try {
      // Create member without image
      const member = await createMember({ name, teamId, uniqueId });

      // If an image is selected, upload it
      if (image) {
        const formData = new FormData();
        formData.append("profileImage", image);
        formData.append("memberId", member._id); // Send the member ID for associating the image

        await uploadImage(formData); // Upload the image

        alert("Member added successfully with image!");
      } else {
        alert("Member added successfully without image.");
      }

      setName("");
      setUniqueId("");
      setTeamId("");
      setImage(null); // Reset the image
    } catch (error) {
      alert("Failed to add member. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h3 className="text-xl font-bold mb-6 text-gray-700">Add Member</h3>
        <div className="mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Member Name"
            required
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
            placeholder="Unique ID"
            required
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <select
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a Team</option>
            {teams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          {loading ? "Adding..." : "Add Member"}
        </button>
      </form>
    </div>
  );
};

export default AddMemberForm;
