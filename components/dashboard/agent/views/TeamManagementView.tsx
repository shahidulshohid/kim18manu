"use client";

import React, { useState } from "react";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  CheckCircle2,
  X,
  User,
  Shield,
  Activity,
  Calendar,
  Building2,
  Mail,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export interface StaffAccount {
  id: string;
  name: string;
  email: string;
  role: "agent" | "admin" | "support";
  listings: string;
  leads: string;
  status: "Approved" | "Pending" | "Suspended";
  joined: string;
}

interface ActivityLogEntry {
  id: string;
  user: string;
  action: string;
  record: string;
  result: "Success" | "Created" | "Rejected";
  timestamp: string;
}

const initialStaff: StaffAccount[] = [
  {
    id: "staff-1",
    name: "Budi Santoso",
    email: "budi@propertyai.id",
    role: "agent",
    listings: "8",
    leads: "24",
    status: "Approved",
    joined: "2025-03-15",
  },
  {
    id: "staff-2",
    name: "Sari Dewi",
    email: "sari@propertyai.id",
    role: "agent",
    listings: "6",
    leads: "18",
    status: "Approved",
    joined: "2025-05-01",
  },
  {
    id: "staff-3",
    name: "Rizki Pratama",
    email: "rizki@propertyai.id",
    role: "agent",
    listings: "4",
    leads: "11",
    status: "Approved",
    joined: "2025-07-20",
  },
  {
    id: "staff-4",
    name: "Dewi Hartati",
    email: "dewi@propertyai.id",
    role: "agent",
    listings: "5",
    leads: "15",
    status: "Approved",
    joined: "2025-08-10",
  },
  {
    id: "staff-5",
    name: "Admin User",
    email: "admin@propertyai.id",
    role: "admin",
    listings: "—",
    leads: "—",
    status: "Approved",
    joined: "2025-01-01",
  },
  {
    id: "staff-6",
    name: "CS Support",
    email: "support@propertyai.id",
    role: "support",
    listings: "—",
    leads: "—",
    status: "Approved",
    joined: "2025-04-01",
  },
];

const initialLogs: ActivityLogEntry[] = [
  {
    id: "log-1",
    user: "Admin User",
    action: "Approved application",
    record: "Agent: Maya Putri",
    result: "Success",
    timestamp: "2026-10-01 11:30",
  },
  {
    id: "log-2",
    user: "Budi Santoso",
    action: "Created listing",
    record: "L004 — Seminyak Shophouse",
    result: "Created",
    timestamp: "2026-09-30 09:15",
  },
  {
    id: "log-3",
    user: "Admin User",
    action: "Updated lead status",
    record: "LD001 → qualified",
    result: "Success",
    timestamp: "2026-09-30 08:00",
  },
  {
    id: "log-4",
    user: "Sari Dewi",
    action: "Scheduled site visit",
    record: "SCBD Apartment — Lina Kusuma",
    result: "Created",
    timestamp: "2026-09-29 16:45",
  },
  {
    id: "log-5",
    user: "Admin User",
    action: "Rejected application",
    record: "Agent: Diah Permata",
    result: "Rejected",
    timestamp: "2026-09-28 14:20",
  },
];

export default function TeamManagementView() {
  const [activeTab, setActiveTab] = useState<"Staff Accounts" | "Activity Logs">("Staff Accounts");
  const [staffList, setStaffList] = useState<StaffAccount[]>(initialStaff);
  const [activityLogs, setActivityLogs] = useState<ActivityLogEntry[]>(initialLogs);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewTarget, setViewTarget] = useState<StaffAccount | null>(null);
  const [editTarget, setEditTarget] = useState<StaffAccount | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<StaffAccount | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Staff Form state
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    role: "agent" as StaffAccount["role"],
    listings: "0",
    leads: "0",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.name.trim() || !newStaff.email.trim()) return;

    const created: StaffAccount = {
      id: `staff-${Date.now()}`,
      name: newStaff.name.trim(),
      email: newStaff.email.trim(),
      role: newStaff.role,
      listings: newStaff.role === "agent" ? newStaff.listings || "0" : "—",
      leads: newStaff.role === "agent" ? newStaff.leads || "0" : "—",
      status: "Approved",
      joined: new Date().toISOString().split("T")[0],
    };

    setStaffList((prev) => [created, ...prev]);
    showToast(`Staff account for ${created.name} created successfully!`);
    setIsAddModalOpen(false);
    setNewStaff({
      name: "",
      email: "",
      role: "agent",
      listings: "0",
      leads: "0",
    });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTarget) return;

    setStaffList((prev) =>
      prev.map((s) => (s.id === editTarget.id ? editTarget : s))
    );
    showToast(`Staff profile for ${editTarget.name} updated!`);
    setEditTarget(null);
  };

  const handleDeleteStaff = () => {
    if (!deleteTarget) return;
    setStaffList((prev) => prev.filter((s) => s.id !== deleteTarget.id));
    showToast(`Staff account for ${deleteTarget.name} removed.`);
    setDeleteTarget(null);
  };

  const renderRoleBadge = (role: StaffAccount["role"]) => {
    switch (role) {
      case "agent":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100 lowercase">
            agent
          </span>
        );
      case "admin":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100 lowercase">
            admin
          </span>
        );
      case "support":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200 lowercase">
            support
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
            {role}
          </span>
        );
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-[32px] py-6 sm:py-8 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header section matching reference screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Team & User Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage staff accounts, roles, permissions, and activity logs.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm shadow-blue-500/20 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add Staff
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-6 sm:gap-8 border-b border-slate-100 overflow-x-auto custom-scrollbar pt-1">
        {(["Staff Accounts", "Activity Logs"] as const).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-3 text-xs sm:text-sm font-semibold transition-all relative shrink-0 cursor-pointer",
                isActive
                  ? "text-blue-600 font-bold"
                  : "text-slate-500 hover:text-slate-800 font-medium"
              )}
            >
              {tab}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: STAFF ACCOUNTS (Matches Screenshot 100%) */}
      {activeTab === "Staff Accounts" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="border-b border-slate-100 bg-white">
                  <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                    USER
                  </th>
                  <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                    ROLE
                  </th>
                  <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                    LISTINGS
                  </th>
                  <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                    LEADS
                  </th>
                  <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                    STATUS
                  </th>
                  <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                    JOINED
                  </th>
                  <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase text-right">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {staffList.map((staff) => (
                  <tr
                    key={staff.id}
                    className="hover:bg-slate-50/70 transition-colors group"
                  >
                    {/* USER (Name + Email) */}
                    <td className="py-4 px-6">
                      <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                        {staff.name}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {staff.email}
                      </div>
                    </td>

                    {/* ROLE */}
                    <td className="py-4 px-6">
                      {renderRoleBadge(staff.role)}
                    </td>

                    {/* LISTINGS */}
                    <td className="py-4 px-6 text-xs sm:text-sm text-slate-600 font-medium">
                      {staff.listings}
                    </td>

                    {/* LEADS */}
                    <td className="py-4 px-6 text-xs sm:text-sm text-slate-600 font-medium">
                      {staff.leads}
                    </td>

                    {/* STATUS */}
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                        {staff.status}
                      </span>
                    </td>

                    {/* JOINED */}
                    <td className="py-4 px-6 text-xs text-slate-400 font-mono">
                      {staff.joined}
                    </td>

                    {/* ACTIONS */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2.5 text-slate-300">
                        <button
                          type="button"
                          onClick={() => setViewTarget(staff)}
                          className="hover:text-blue-600 transition-colors p-1 cursor-pointer"
                          title="View Staff Profile"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditTarget(staff)}
                          className="hover:text-blue-600 transition-colors p-1 cursor-pointer"
                          title="Edit Staff"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(staff)}
                          className="hover:text-rose-600 transition-colors p-1 cursor-pointer"
                          title="Delete Staff"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ACTIVITY LOGS (Matches Screenshot 100%) */}
      {activeTab === "Activity Logs" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="border-b border-slate-100 bg-white">
                  <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                    USER
                  </th>
                  <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                    ACTION
                  </th>
                  <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                    RECORD
                  </th>
                  <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                    RESULT
                  </th>
                  <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                    TIMESTAMP
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activityLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    {/* USER */}
                    <td className="py-4 px-6 text-xs sm:text-sm font-semibold text-slate-900">
                      {log.user}
                    </td>

                    {/* ACTION */}
                    <td className="py-4 px-6 text-xs sm:text-sm text-slate-600">
                      {log.action}
                    </td>

                    {/* RECORD */}
                    <td className="py-4 px-6 text-xs sm:text-sm text-slate-700">
                      {log.record}
                    </td>

                    {/* RESULT */}
                    <td className="py-4 px-6">
                      {log.result === "Success" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                          Success
                        </span>
                      )}
                      {log.result === "Created" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200/60">
                          Created
                        </span>
                      )}
                      {log.result === "Rejected" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                          Rejected
                        </span>
                      )}
                    </td>

                    {/* TIMESTAMP */}
                    <td className="py-4 px-6 text-xs text-slate-400 font-mono">
                      {log.timestamp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADD STAFF MODAL (Matches Reference Screenshot 100%) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <form
            onSubmit={handleAddStaff}
            className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-lg">
                Add Staff Member
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* FULL NAME */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold tracking-wider text-slate-700 uppercase block">
                FULL NAME <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Hendra Wijaya"
                value={newStaff.name}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, name: e.target.value })
                }
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold tracking-wider text-slate-700 uppercase block">
                EMAIL <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="email@propertyai.id"
                value={newStaff.email}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, email: e.target.value })
                }
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* ROLE */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold tracking-wider text-slate-700 uppercase block">
                ROLE <span className="text-red-500">*</span>
              </label>
              <Select
                value={newStaff.role}
                onValueChange={(val) =>
                  setNewStaff({
                    ...newStaff,
                    role: val as StaffAccount["role"],
                  })
                }
              >
                <SelectTrigger className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-normal">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="z-[70]">
                  <SelectItem value="agent">agent</SelectItem>
                  <SelectItem value="admin">admin</SelectItem>
                  <SelectItem value="support">support</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Footer Buttons matching screenshot */}
            <div className="grid grid-cols-2 gap-3 pt-3">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors text-center cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-semibold text-white shadow-sm shadow-blue-500/25 transition-all text-center cursor-pointer"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      )}

      {/* VIEW MODAL (Eye Icon) */}
      {viewTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Staff Account Details
                </h3>
                <span className="text-xs text-slate-400">
                  {viewTarget.email}
                </span>
              </div>
              <button
                onClick={() => setViewTarget(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Name:</span>
                <span className="font-semibold text-slate-900">{viewTarget.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Role:</span>
                <span>{renderRoleBadge(viewTarget.role)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Listings:</span>
                <span className="font-semibold text-slate-800">{viewTarget.listings}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Leads:</span>
                <span className="font-semibold text-slate-800">{viewTarget.leads}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Status:</span>
                <span className="font-semibold text-emerald-600">{viewTarget.status}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Joined Date:</span>
                <span className="font-mono text-slate-600">{viewTarget.joined}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setViewTarget(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL (Pencil Icon) */}
      {editTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <form
            onSubmit={handleSaveEdit}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                Edit Staff ({editTarget.name})
              </h3>
              <button
                type="button"
                onClick={() => setEditTarget(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">
                  Role
                </label>
                <Select
                  value={editTarget.role}
                  onValueChange={(val) =>
                    setEditTarget({
                      ...editTarget,
                      role: val as StaffAccount["role"],
                    })
                  }
                >
                  <SelectTrigger className="w-full h-10 rounded-xl border border-slate-200 text-xs sm:text-sm">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="z-[70]">
                    <SelectItem value="agent">Agent</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">
                  Status
                </label>
                <Select
                  value={editTarget.status}
                  onValueChange={(val) =>
                    setEditTarget({
                      ...editTarget,
                      status: val as StaffAccount["status"],
                    })
                  }
                >
                  <SelectTrigger className="w-full h-10 rounded-xl border border-slate-200 text-xs sm:text-sm">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="z-[70]">
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">
                  Listings
                </label>
                <input
                  type="text"
                  value={editTarget.listings}
                  onChange={(e) =>
                    setEditTarget({ ...editTarget, listings: e.target.value })
                  }
                  className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">
                  Leads
                </label>
                <input
                  type="text"
                  value={editTarget.leads}
                  onChange={(e) =>
                    setEditTarget({ ...editTarget, leads: e.target.value })
                  }
                  className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditTarget(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-sm shadow-blue-500/20"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL (Trash Icon) */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <h3 className="font-bold text-slate-900 text-base">
              Deactivate Staff Account?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Are you sure you want to remove{" "}
              <strong className="text-slate-800">{deleteTarget.name}</strong> (
              {deleteTarget.email})? This staff member will no longer have
              portal access.
            </p>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteStaff}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-sm shadow-rose-500/20"
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
