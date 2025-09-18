// AdminManagement.jsx
import React, { useState } from 'react';
import AdminDetailsModal from './AdminDetailsModal';
import CreateAdminModal from './CreateAdminModal';

const AdminManagement = () => {
  // Sample admin data
  const [admins, setAdmins] = useState([
    { id: 1, name: "John Doe", email: "john@logic.church", role: "Super Admin", phone: "+1234567890", joined: "2023-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@logic.church", role: "Editor", phone: "+0987654321", joined: "2023-05-22" },
    { id: 3, name: "Michael Brown", email: "michael@logic.church", role: "Viewer", phone: "+1122334455", joined: "2024-02-10" },
  ]);

  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const openDetailsModal = (admin) => {
    setSelectedAdmin(admin);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedAdmin(null);
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  // Function to add new admin (passed to CreateAdminModal)
  const handleCreateAdmin = (newAdmin) => {
    setAdmins([...admins, { id: admins.length + 1, ...newAdmin }]);
    closeCreateModal();
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-6 md:p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Admin Management</h1>
        <p className="text-gray-400 mt-2">
          View and manage church admin accounts.
        </p>
      </header>

      {/* Add Admin Button */}
      <div className="mb-6">
        <button
          onClick={openCreateModal}
          className="bg-gradient-to-r from-[#CE1F2F] to-[#541616] text-white px-5 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          + Add New Admin
        </button>
      </div>

      {/* Admins Table */}
      <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {admins.map((admin) => (
              <tr key={admin.id} className="hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4">{admin.name}</td>
                <td className="px-6 py-4">{admin.email}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-[#a82031]/20 text-[#a82031] rounded-full text-xs">
                    {admin.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => openDetailsModal(admin)}
                    className="text-[#a82031] hover:underline"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {isDetailsModalOpen && (
        <AdminDetailsModal
          admin={selectedAdmin}
          onClose={closeDetailsModal}
        />
      )}

      {isCreateModalOpen && (
        <CreateAdminModal
          onCreate={handleCreateAdmin}
          onClose={closeCreateModal}
        />
      )}
    </div>
  );
};

export default AdminManagement;