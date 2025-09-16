import React from 'react';

const Dashboard = () => {
  // Sample stats data
  const stats = [
    { label: "Events", value: 5 },
    { label: "Members", value: 150 },
    { label: "Gallery Items", value: 20 },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-6 md:p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-gray-400 mt-2">
          Welcome to the admin dashboard. Here you can manage church activities.
        </p>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-[#CE1F2F] to-[#541616] rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-lg font-semibold">{stat.label}</h2>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Dashboard;