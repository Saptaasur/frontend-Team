import React from "react";
import Header from "../components/Header";
import OrganizationList from "../components/OrganizationList";
import TeamList from "../components/TeamList";
import MemberList from "../components/MemberList";
import AddOrganizationForm from "../components/AddOrganizationForm";
import AddTeamForm from "../components/AddTeamForm";
import AddMemberForm from "../components/AddMemberForm";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <Header />

      {/* Forms Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <AddOrganizationForm />
        <AddTeamForm />
        <AddMemberForm />
      </div>

      {/* Lists Section */}
      <div className="p-6 space-y-6">
        <OrganizationList />
        <TeamList />
        <MemberList />
      </div>
    </div>
  );
};

export default Dashboard;
