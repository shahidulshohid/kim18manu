"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Download,
  Search,
  ChevronDown,
  Filter,
  Eye,
  Pencil,
  Trash2,
  ArrowLeft,
  CheckCircle2,
  X,
  Phone,
  Mail,
  Calendar,
  Clock,
  Shield,
  Activity,
  UserCheck,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { superAdminUsersList } from "./data";
import { SuperAdminUser } from "./types";

const fallbackUsers: SuperAdminUser[] = [
  {
    id: "user-1",
    name: "Ahmad Fauzi",
    initials: "AF",
    role: "customer",
    email: "ahmad@email.com",
    status: "Active",
    activity: "12 searches",
    joined: "2026-08-15",
    lastActive: "2 hr ago",
    phone: "+62 812-3456-7890",
  },
  {
    id: "user-2",
    name: "Budi Santoso",
    initials: "BS",
    role: "agent",
    email: "budi@propertyai.id",
    status: "Approved",
    activity: "8 listings, 24 leads",
    joined: "2025-03-15",
    lastActive: "15 min ago",
    phone: "+62 811-9876-5432",
  },
  {
    id: "user-3",
    name: "Lina Kusuma",
    initials: "LK",
    role: "customer",
    email: "lina@email.com",
    status: "Active",
    activity: "5 saved, 2 visits",
    joined: "2026-09-01",
    lastActive: "1 day ago",
    phone: "+62 813-2345-6789",
  },
  {
    id: "user-4",
    name: "Rizki Pratama",
    initials: "RP",
    role: "agent",
    email: "rizki@propertyai.id",
    status: "Approved",
    activity: "4 listings, 11 leads",
    joined: "2025-07-20",
    lastActive: "3 hr ago",
    phone: "+62 812-8765-4321",
  },
  {
    id: "user-5",
    name: "Hendra Wijaya",
    initials: "HW",
    role: "agent",
    email: "hendra@email.com",
    status: "Pending Review",
    activity: "Application subm...",
    joined: "2026-10-01",
    lastActive: "—",
    phone: "+62 819-0123-4567",
  },
  {
    id: "user-6",
    name: "Sari Dewi",
    initials: "SD",
    role: "agent",
    email: "sari@propertyai.id",
    status: "Approved",
    activity: "6 listings, 18 leads",
    joined: "2025-05-01",
    lastActive: "30 min ago",
    phone: "+62 817-4567-8901",
  },
  {
    id: "user-7",
    name: "James Kwon",
    initials: "JK",
    role: "customer",
    email: "james@email.com",
    status: "Active",
    activity: "3 searches",
    joined: "2026-09-20",
    lastActive: "2 days ago",
    phone: "+62 818-6789-0123",
  },
  {
    id: "user-8",
    name: "Tono Susanto",
    initials: "TS",
    role: "agent",
    email: "tono@email.com",
    status: "Suspended",
    activity: "Suspended account",
    joined: "2026-05-12",
    lastActive: "30 days ago",
    phone: "+62 815-9012-3456",
  },
];

export default function SuperAdminUsersView() {
  const [users, setUsers] = useState<SuperAdminUser[]>(() =>
    Array.isArray(superAdminUsersList) && superAdminUsersList.length > 0
      ? superAdminUsersList
      : fallbackUsers
  );
  const [activeTab, setActiveTab] = useState<"all" | "customers" | "agents">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [sortOption, setSortOption] = useState("Sort: Newest");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [showBulkMenu, setShowBulkMenu] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [viewingUser, setViewingUser] = useState<SuperAdminUser | null>(null);
  const [editingUser, setEditingUser] = useState<SuperAdminUser | null>(null);
  const [deletingUser, setDeletingUser] = useState<SuperAdminUser | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Tab counts with defensive safety
  const safeUsers = Array.isArray(users) ? users : fallbackUsers;
  const totalCount = safeUsers.length;
  const customersCount = safeUsers.filter((u) => u.role === "customer").length;
  const agentsCount = safeUsers.filter((u) => u.role === "agent").length;

  // Filter and sort logic
  const filteredUsers = useMemo(() => {
    return safeUsers
      .filter((user) => {
        // Tab filter
        if (activeTab === "customers" && user.role !== "customer") return false;
        if (activeTab === "agents" && user.role !== "agent") return false;

        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = user.name.toLowerCase().includes(q);
          const matchEmail = user.email.toLowerCase().includes(q);
          const matchRole = user.role.toLowerCase().includes(q);
          if (!matchName && !matchEmail && !matchRole) return false;
        }

        // Role dropdown
        if (roleFilter === "Customers" && user.role !== "customer") return false;
        if (roleFilter === "Agents" && user.role !== "agent") return false;

        // Status dropdown
        if (statusFilter !== "All Statuses" && user.status !== statusFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOption === "Sort: Newest") {
          return new Date(b.joined).getTime() - new Date(a.joined).getTime();
        }
        if (sortOption === "Sort: Oldest") {
          return new Date(a.joined).getTime() - new Date(b.joined).getTime();
        }
        if (sortOption === "Sort: Name A-Z") {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [users, activeTab, searchQuery, roleFilter, statusFilter, sortOption]);

  // Checkbox handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedUserIds(filteredUsers.map((u) => u.id));
    } else {
      setSelectedUserIds([]);
    }
  };

  const handleToggleRow = (id: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isAllSelected =
    filteredUsers.length > 0 &&
    filteredUsers.every((u) => selectedUserIds.includes(u.id));

  // Export to CSV
  const handleExportUsers = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "ID,Name,Role,Email,Status,Activity,Joined,Last Active\n" +
      filteredUsers
        .map(
          (u) =>
            `${u.id},"${u.name}",${u.role},${u.email},${u.status},"${u.activity}",${u.joined},${u.lastActive}`
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `propertyai_users_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`✓ Exported ${filteredUsers.length} user records to CSV.`);
  };

  // Save edited user
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setUsers((prev) =>
      prev.map((u) => (u.id === editingUser.id ? editingUser : u))
    );
    showToast(`✓ User ${editingUser.name} updated successfully.`);
    setEditingUser(null);
  };

  // Delete user
  const handleConfirmDelete = () => {
    if (!deletingUser) return;
    setUsers((prev) => prev.filter((u) => u.id !== deletingUser.id));
    setSelectedUserIds((prev) => prev.filter((id) => id !== deletingUser.id));
    showToast(`✕ Removed user ${deletingUser.name}.`);
    setDeletingUser(null);
  };

  // Bulk actions
  const handleBulkStatusChange = (status: SuperAdminUser["status"]) => {
    setUsers((prev) =>
      prev.map((u) =>
        selectedUserIds.includes(u.id) ? { ...u, status } : u
      )
    );
    setShowBulkMenu(false);
    showToast(`✓ Updated status for ${selectedUserIds.length} users to ${status}.`);
    setSelectedUserIds([]);
  };

  const handleBulkDelete = () => {
    setUsers((prev) => prev.filter((u) => !selectedUserIds.includes(u.id)));
    showToast(`✕ Deleted ${selectedUserIds.length} selected users.`);
    setSelectedUserIds([]);
    setShowBulkMenu(false);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-medium px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Section matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-snug">
            User Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-normal mt-0.5">
            Manage all customers, agents and staff accounts
          </p>
        </div>

        {/* Right: Export Button */}
        <button
          type="button"
          onClick={handleExportUsers}
          className="h-10 px-4 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs sm:text-sm flex items-center gap-2 shadow-2xs transition-all active:scale-95 self-start sm:self-auto cursor-pointer"
        >
          <Download className="h-4 w-4 text-slate-500" />
          <span>Export</span>
        </button>
      </div>

      {/* 2. Filter Tabs Row matching screenshot */}
      <div className="flex items-center gap-6 sm:gap-8 border-b border-slate-100 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab("all")}
          className={cn(
            "pb-3 text-xs sm:text-sm font-semibold transition-all relative shrink-0 cursor-pointer",
            activeTab === "all"
              ? "text-blue-600 font-bold"
              : "text-slate-500 hover:text-slate-800 font-medium"
          )}
        >
          All Users ({totalCount})
          {activeTab === "all" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("customers")}
          className={cn(
            "pb-3 text-xs sm:text-sm font-semibold transition-all relative shrink-0 cursor-pointer",
            activeTab === "customers"
              ? "text-blue-600 font-bold"
              : "text-slate-500 hover:text-slate-800 font-medium"
          )}
        >
          Customers ({customersCount})
          {activeTab === "customers" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("agents")}
          className={cn(
            "pb-3 text-xs sm:text-sm font-semibold transition-all relative shrink-0 cursor-pointer",
            activeTab === "agents"
              ? "text-blue-600 font-bold"
              : "text-slate-500 hover:text-slate-800 font-medium"
          )}
        >
          Agents ({agentsCount})
          {activeTab === "agents" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>
      </div>

      {/* 3. Table Card Container */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden">
        {/* Top Controls Toolbar matching screenshot */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 flex-1">
            {/* Search input with search icon */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 transition-all shadow-2xs"
              />
            </div>

            {/* Dropdown 1: All Roles */}
            <div className="relative">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="appearance-none h-9 pl-3 pr-8 rounded-xl border border-slate-200/90 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 focus:outline-none cursor-pointer"
              >
                <option>All Roles</option>
                <option>Customers</option>
                <option>Agents</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>

            {/* Dropdown 2: All Statuses */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none h-9 pl-3 pr-8 rounded-xl border border-slate-200/90 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 focus:outline-none cursor-pointer"
              >
                <option>All Statuses</option>
                <option>Active</option>
                <option>Approved</option>
                <option>Pending Review</option>
                <option>Suspended</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>

            {/* Dropdown 3: Sort: Newest */}
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none h-9 pl-3 pr-8 rounded-xl border border-slate-200/90 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 focus:outline-none cursor-pointer"
              >
                <option>Sort: Newest</option>
                <option>Sort: Oldest</option>
                <option>Sort: Name A-Z</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Right: Bulk Actions with funnel icon */}
          <div className="relative self-start lg:self-auto">
            <button
              type="button"
              onClick={() => setShowBulkMenu(!showBulkMenu)}
              className="h-9 px-3.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Filter className="h-3.5 w-3.5 text-slate-500" />
              <span>Bulk Actions</span>
              {selectedUserIds.length > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-blue-600 text-white rounded-full text-[10px]">
                  {selectedUserIds.length}
                </span>
              )}
            </button>

            {showBulkMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-xl border border-slate-100 p-1.5 z-40 animate-in fade-in zoom-in-95 duration-100 text-xs">
                <button
                  type="button"
                  disabled={selectedUserIds.length === 0}
                  onClick={() => handleBulkStatusChange("Active")}
                  className="w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
                >
                  Set as Active
                </button>
                <button
                  type="button"
                  disabled={selectedUserIds.length === 0}
                  onClick={() => handleBulkStatusChange("Approved")}
                  className="w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
                >
                  Set as Approved
                </button>
                <button
                  type="button"
                  disabled={selectedUserIds.length === 0}
                  onClick={() => handleBulkStatusChange("Suspended")}
                  className="w-full text-left px-3 py-2 rounded-lg text-amber-700 hover:bg-amber-50 disabled:opacity-50 cursor-pointer"
                >
                  Suspend Selected
                </button>
                <div className="my-1 h-px bg-slate-100" />
                <button
                  type="button"
                  disabled={selectedUserIds.length === 0}
                  onClick={handleBulkDelete}
                  className="w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 disabled:opacity-50 font-medium cursor-pointer"
                >
                  Delete Selected
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 4. Table matching screenshot columns and styling */}
        <div className="w-full overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider select-none">
                <th className="py-3 px-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </th>
                <th className="py-3 px-4">USER</th>
                <th className="py-3 px-4">ROLE</th>
                <th className="py-3 px-4">EMAIL / CONTACT</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">ACTIVITY</th>
                <th className="py-3 px-4">JOINED</th>
                <th className="py-3 px-4">LAST ACTIVE</th>
                <th className="py-3 px-4 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    No users match your filters.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const isChecked = selectedUserIds.includes(user.id);

                  // Status pill styling matching screenshot
                  let statusBadge = "bg-emerald-50 text-emerald-700 border-emerald-200/60";
                  if (user.status === "Pending Review") {
                    statusBadge = "bg-amber-50 text-amber-700 border-amber-200/60";
                  } else if (user.status === "Suspended") {
                    statusBadge = "bg-red-50 text-red-700 border-red-200/60";
                  }

                  return (
                    <tr
                      key={user.id}
                      className={cn(
                        "hover:bg-slate-50/80 transition-colors group",
                        isChecked ? "bg-blue-50/30" : ""
                      )}
                    >
                      {/* Checkbox */}
                      <td className="py-3.5 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleRow(user.id)}
                          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      </td>

                      {/* USER: Avatar + Name */}
                      <td className="py-3.5 px-4 font-medium text-slate-900">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                            {user.initials}
                          </div>
                          <span className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                            {user.name}
                          </span>
                        </div>
                      </td>

                      {/* ROLE */}
                      <td className="py-3.5 px-4">
                        <span
                          className={cn(
                            "px-2.5 py-0.5 rounded-full text-[11px] font-medium capitalize",
                            user.role === "agent"
                              ? "bg-blue-50 text-blue-600 border border-blue-100/60"
                              : "bg-slate-100 text-slate-700"
                          )}
                        >
                          {user.role}
                        </span>
                      </td>

                      {/* EMAIL / CONTACT */}
                      <td className="py-3.5 px-4 text-slate-500 text-xs">
                        {user.email}
                      </td>

                      {/* STATUS */}
                      <td className="py-3.5 px-4">
                        <span
                          className={cn(
                            "px-2.5 py-0.5 rounded-full text-[11px] font-semibold border inline-block",
                            statusBadge
                          )}
                        >
                          {user.status}
                        </span>
                      </td>

                      {/* ACTIVITY */}
                      <td className="py-3.5 px-4 text-slate-500 text-xs truncate max-w-[150px]">
                        {user.activity}
                      </td>

                      {/* JOINED */}
                      <td className="py-3.5 px-4 text-slate-500 text-xs whitespace-nowrap">
                        {user.joined}
                      </td>

                      {/* LAST ACTIVE */}
                      <td className="py-3.5 px-4 text-slate-500 text-xs whitespace-nowrap">
                        {user.lastActive}
                      </td>

                      {/* ACTIONS: Eye, Pencil, Trash */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => setViewingUser(user)}
                            className="p-1.5 rounded-lg text-slate-300 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                            title="View User Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingUser(user)}
                            className="p-1.5 rounded-lg text-slate-300 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Edit User"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingUser(user)}
                            className="p-1.5 rounded-lg text-slate-300 hover:text-red-600 hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Delete User"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 5. Pagination matching screenshot */}
        <div className="p-4 sm:p-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <span className="text-slate-400 font-medium">
            Showing {filteredUsers.length} of {safeUsers.length} users
          </span>

          <div className="flex items-center gap-1.5 self-end sm:self-auto select-none">
            <button
              type="button"
              className="px-2 py-1 text-slate-400 hover:text-slate-700 font-medium cursor-pointer"
            >
              Previous
            </button>
            <button
              type="button"
              className="h-7 w-7 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center shadow-xs"
            >
              1
            </button>
            <button
              type="button"
              className="h-7 w-7 rounded-lg text-slate-500 hover:bg-slate-100 font-medium flex items-center justify-center cursor-pointer transition-colors"
            >
              2
            </button>
            <button
              type="button"
              className="h-7 w-7 rounded-lg text-slate-500 hover:bg-slate-100 font-medium flex items-center justify-center cursor-pointer transition-colors"
            >
              3
            </button>
            <button
              type="button"
              className="px-2 py-1 text-slate-500 hover:text-slate-700 font-medium cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* 6. Floating 'Back to Portal Select' Button matching screenshot */}
      <div className="flex justify-center pt-2 pb-6">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm hover:shadow hover:text-blue-600 hover:border-blue-200 transition-all active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Portal Select</span>
        </Link>
      </div>

      {/* Modal 1: View User Details */}
      {viewingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setViewingUser(null)}
          />
          <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                  {viewingUser.initials}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">
                    {viewingUser.name}
                  </h3>
                  <span className="capitalize text-xs text-slate-400">
                    {viewingUser.role} Account
                  </span>
                </div>
              </div>
              <button
                onClick={() => setViewingUser(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 mb-6">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Email:</strong> {viewingUser.email}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Phone:</strong> {viewingUser.phone || "+62 812-XXXX-XXXX"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Account Status:</strong> {viewingUser.status}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Activity:</strong> {viewingUser.activity}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Date Joined:</strong> {viewingUser.joined}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Last Active:</strong> {viewingUser.lastActive}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  const userToEdit = viewingUser;
                  setViewingUser(null);
                  setEditingUser(userToEdit);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
              >
                Edit User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Edit User */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setEditingUser(null)}
          />
          <form
            onSubmit={handleSaveEdit}
            className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Edit User Profile
              </h3>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs mb-6">
              <div>
                <label className="block text-slate-500 font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, name: e.target.value })
                  }
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-medium mb-1">
                    Role
                  </label>
                  <select
                    value={editingUser.role}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        role: e.target.value as "customer" | "agent",
                      })
                    }
                    className="w-full h-9 px-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-600 bg-white"
                  >
                    <option value="customer">customer</option>
                    <option value="agent">agent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-500 font-medium mb-1">
                    Status
                  </label>
                  <select
                    value={editingUser.status}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        status: e.target.value as SuperAdminUser["status"],
                      })
                    }
                    className="w-full h-9 px-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-600 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending Review">Pending Review</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">
                  Activity Notes
                </label>
                <input
                  type="text"
                  value={editingUser.activity}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, activity: e.target.value })
                  }
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal 3: Delete Confirmation */}
      {deletingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setDeletingUser(null)}
          />
          <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <AlertTriangle className="h-6 w-6" />
              <h3 className="text-base font-bold text-slate-900">
                Delete User Account?
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Are you sure you want to remove <strong>{deletingUser.name}</strong> (
              {deletingUser.email}) from the platform? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeletingUser(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
