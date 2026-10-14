"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  SquarePen,
  Trash2,
  ArrowLeft,
  X,
  CheckCircle2,
  Shield,
  UserCheck,
  Lock,
  History,
  Key,
  Users,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { superAdminStaffList } from "./data";
import { SuperAdminStaffMember } from "./types";

const fallbackStaff: SuperAdminStaffMember[] = [
  {
    id: "staff-1",
    initials: "SA",
    name: "Super Admin",
    role: "admin",
    email: "superadmin@propertyai.id",
    status: "Active",
    joined: "2025-01-01",
    phone: "+62 811-0000-1111",
    lastLogin: "2026-10-14 09:15 WIB",
  },
  {
    id: "staff-2",
    initials: "BS",
    name: "Budi Santoso",
    role: "agent",
    email: "budi@propertyai.id",
    status: "Approved",
    joined: "2025-03-15",
    phone: "+62 812-3344-5566",
    lastLogin: "2026-10-14 08:40 WIB",
  },
  {
    id: "staff-3",
    initials: "SD",
    name: "Sari Dewi",
    role: "agent",
    email: "sari@propertyai.id",
    status: "Approved",
    joined: "2025-05-01",
    phone: "+62 813-7788-9900",
    lastLogin: "2026-10-13 17:25 WIB",
  },
  {
    id: "staff-4",
    initials: "CS",
    name: "CS Support",
    role: "support",
    email: "support@propertyai.id",
    status: "Active",
    joined: "2025-04-01",
    phone: "+62 814-1122-3344",
    lastLogin: "2026-10-14 09:00 WIB",
  },
  {
    id: "staff-5",
    initials: "RP",
    name: "Rizki Pratama",
    role: "agent",
    email: "rizki@propertyai.id",
    status: "Approved",
    joined: "2025-07-20",
    phone: "+62 815-5566-7788",
    lastLogin: "2026-10-13 14:10 WIB",
  },
];

type TeamTab = "Staff Accounts" | "Permissions Matrix" | "Activity Logs";

interface SuperAdminTeamViewProps {
  initialStaff?: SuperAdminStaffMember[];
}

export default function SuperAdminTeamView({
  initialStaff = superAdminStaffList,
}: SuperAdminTeamViewProps) {
  const safeStaff =
    Array.isArray(initialStaff) && initialStaff.length > 0
      ? initialStaff
      : fallbackStaff;

  const [activeTab, setActiveTab] = useState<TeamTab>("Staff Accounts");
  const [staffList, setStaffList] = useState<SuperAdminStaffMember[]>(safeStaff);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<SuperAdminStaffMember | null>(null);
  const [deletingStaff, setDeletingStaff] = useState<SuperAdminStaffMember | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Staff Form State
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<SuperAdminStaffMember["role"]>("agent");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Role Badge Styling Helper
  const getRoleBadge = (role: SuperAdminStaffMember["role"]) => {
    switch (role) {
      case "admin":
        return "bg-blue-50 text-blue-600 border-blue-200/80";
      case "agent":
        return "bg-indigo-50 text-indigo-600 border-indigo-200/80";
      case "support":
        return "bg-slate-100 text-slate-600 border-slate-200/80";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  // Add Staff Handler
  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const initials = newName
      .trim()
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);

    const newMember: SuperAdminStaffMember = {
      id: `staff-${Date.now()}`,
      initials: initials || "ST",
      name: newName.trim(),
      role: newRole,
      email: newEmail.trim(),
      status: "Active",
      joined: new Date().toISOString().slice(0, 10),
    };

    setStaffList((prev) => [...prev, newMember]);
    setNewName("");
    setNewEmail("");
    setIsAddModalOpen(false);
    showToast(`✓ Staff member ${newMember.name} added successfully!`);
  };

  // Save Edit Handler
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStaff) return;
    setStaffList((prev) =>
      prev.map((s) => (s.id === editingStaff.id ? editingStaff : s))
    );
    showToast(`✓ Staff member ${editingStaff.name} updated!`);
    setEditingStaff(null);
  };

  // Delete Staff Handler
  const handleDeleteStaff = () => {
    if (!deletingStaff) return;
    setStaffList((prev) => prev.filter((s) => s.id !== deletingStaff.id));
    showToast(`Removed staff member ${deletingStaff.name}.`);
    setDeletingStaff(null);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-24 text-slate-800 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2.5 rounded-xl bg-slate-900/95 backdrop-blur px-4 py-3 text-xs font-medium text-white shadow-xl border border-slate-700 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Team & Access Control
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-normal mt-0.5">
            Staff accounts, role permissions, and audit logs
          </p>
        </div>

        {/* Add Staff Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Staff</span>
        </button>
      </div>

      {/* TABS ROW */}
      <div className="border-b border-slate-200">
        <nav className="flex items-center gap-8 overflow-x-auto no-scrollbar">
          {(["Staff Accounts", "Permissions Matrix", "Activity Logs"] as TeamTab[]).map(
            (tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "relative pb-3 text-xs sm:text-sm transition-colors whitespace-nowrap cursor-pointer",
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "text-slate-400 hover:text-slate-700 font-medium"
                  )}
                >
                  <span>{tab}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              );
            }
          )}
        </nav>
      </div>

      {/* TAB 1: STAFF ACCOUNTS TABLE */}
      {activeTab === "Staff Accounts" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/40 text-[11px] font-bold uppercase tracking-wider text-slate-400 select-none">
                  <th className="py-3.5 px-4 sm:px-6">Staff Member</th>
                  <th className="py-3.5 px-4 sm:px-6">Role</th>
                  <th className="py-3.5 px-4 sm:px-6">Email</th>
                  <th className="py-3.5 px-4 sm:px-6">Status</th>
                  <th className="py-3.5 px-4 sm:px-6">Joined</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {staffList.map((staff) => (
                  <tr
                    key={staff.id}
                    className="hover:bg-slate-50/70 transition-colors group"
                  >
                    {/* STAFF MEMBER: Initials circle + Name */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                          {staff.initials}
                        </div>
                        <span className="font-bold text-slate-900 text-xs">
                          {staff.name}
                        </span>
                      </div>
                    </td>

                    {/* ROLE: Pill Badge */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <span
                        className={cn(
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium lowercase border",
                          getRoleBadge(staff.role)
                        )}
                      >
                        {staff.role}
                      </span>
                    </td>

                    {/* EMAIL */}
                    <td className="py-4 px-4 sm:px-6 font-normal text-slate-700 whitespace-nowrap">
                      {staff.email}
                    </td>

                    {/* STATUS: Green Pill */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/80">
                        {staff.status}
                      </span>
                    </td>

                    {/* JOINED */}
                    <td className="py-4 px-4 sm:px-6 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                      {staff.joined}
                    </td>

                    {/* ACTIONS: Edit + Trash */}
                    <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        {/* Edit Button */}
                        <button
                          onClick={() => setEditingStaff(staff)}
                          title="Edit staff role"
                          className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <SquarePen className="w-4 h-4 stroke-[1.8]" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => setDeletingStaff(staff)}
                          title="Remove staff"
                          className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4 stroke-[1.8]" />
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

      {/* TAB 2: PERMISSIONS MATRIX */}
      {activeTab === "Permissions Matrix" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">
              Role Access & Permission Matrix
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Defines permission tiers across platform administrative modules
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase">
                  <th className="py-3 px-4">Permission Module</th>
                  <th className="py-3 px-4 text-center">Super Admin</th>
                  <th className="py-3 px-4 text-center">Agent</th>
                  <th className="py-3 px-4 text-center">Support</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {[
                  { name: "User Management (Ban / Verify)", admin: true, agent: false, support: false },
                  { name: "Property Approval & Publishing", admin: true, agent: true, support: false },
                  { name: "Lead CRM Pipeline Access", admin: true, agent: true, support: true },
                  { name: "Partner Application Reviews", admin: true, agent: false, support: false },
                  { name: "Escrow Transactions & Settlement", admin: true, agent: false, support: false },
                  { name: "AI Speech Telemetry & Prompt Ops", admin: true, agent: false, support: false },
                  { name: "System Settings & API Keys", admin: true, agent: false, support: false },
                ].map((perm) => (
                  <tr key={perm.name} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-medium">{perm.name}</td>
                    <td className="py-3 px-4 text-center">
                      {perm.admin ? (
                        <Check className="w-4 h-4 text-emerald-600 mx-auto stroke-[2.5]" />
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {perm.agent ? (
                        <Check className="w-4 h-4 text-emerald-600 mx-auto stroke-[2.5]" />
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {perm.support ? (
                        <Check className="w-4 h-4 text-emerald-600 mx-auto stroke-[2.5]" />
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ACTIVITY LOGS */}
      {activeTab === "Activity Logs" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">
              Staff Security & Audit Logs
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Immutable audit trail of administrator and team access actions
            </p>
          </div>

          <div className="space-y-3">
            {[
              { actor: "Super Admin", action: "Updated role permissions for Budi Santoso", time: "2026-10-14 09:12 WIB", type: "Security" },
              { actor: "Budi Santoso", action: "Approved listing: Seminyak Shophouse (L004)", time: "2026-10-14 08:35 WIB", type: "Content" },
              { actor: "CS Support", action: "Reassigned lead #LD002 to Sari Dewi", time: "2026-10-14 08:15 WIB", type: "CRM" },
              { actor: "Super Admin", action: "Generated monthly transactions & escrow report", time: "2026-10-13 18:00 WIB", type: "Finance" },
              { actor: "Rizki Pratama", action: "Disbursed broker commission for TRX-001", time: "2026-10-13 14:10 WIB", type: "Settlement" },
            ].map((log, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-900">{log.actor}</span>
                  <span className="text-slate-600">{log.action}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    {log.type}
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">
                    {log.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADD STAFF MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <form
            onSubmit={handleAddStaff}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
              <h3 className="text-sm font-bold text-slate-900">
                Add New Staff Member
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Putri"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. maya@propertyai.id"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">
                  Administrative Role
                </label>
                <Select
                  value={newRole}
                  onValueChange={(val) =>
                    setNewRole(val as SuperAdminStaffMember["role"])
                  }
                >
                  <SelectTrigger className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-normal focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-2xs">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="z-[80] shadow-xl border border-slate-200/90 rounded-2xl bg-white p-1">
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2 py-0.5">
                        <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                        <span className="font-semibold text-slate-800">Admin</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="agent">
                      <div className="flex items-center gap-2 py-0.5">
                        <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                        <span className="font-semibold text-slate-800">Agent</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="support">
                      <div className="flex items-center gap-2 py-0.5">
                        <span className="w-2 h-2 rounded-full bg-slate-500 shrink-0" />
                        <span className="font-semibold text-slate-800">Support</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm cursor-pointer"
              >
                Create Staff Account
              </button>
            </div>
          </form>
        </div>
      )}

      {/* EDIT STAFF MODAL */}
      {editingStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <form
            onSubmit={handleSaveEdit}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
              <h3 className="text-sm font-bold text-slate-900">
                Edit Staff: {editingStaff.name}
              </h3>
              <button
                type="button"
                onClick={() => setEditingStaff(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editingStaff.name}
                  onChange={(e) =>
                    setEditingStaff({ ...editingStaff, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">
                  Role
                </label>
                <Select
                  value={editingStaff.role}
                  onValueChange={(val) =>
                    setEditingStaff({
                      ...editingStaff,
                      role: val as SuperAdminStaffMember["role"],
                    })
                  }
                >
                  <SelectTrigger className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-normal focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-2xs">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="z-[80] shadow-xl border border-slate-200/90 rounded-2xl bg-white p-1">
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2 py-0.5">
                        <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                        <span className="font-semibold text-slate-800">Admin</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="agent">
                      <div className="flex items-center gap-2 py-0.5">
                        <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                        <span className="font-semibold text-slate-800">Agent</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="support">
                      <div className="flex items-center gap-2 py-0.5">
                        <span className="w-2 h-2 rounded-full bg-slate-500 shrink-0" />
                        <span className="font-semibold text-slate-800">Support</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">
                  Status
                </label>
                <Select
                  value={editingStaff.status}
                  onValueChange={(val) =>
                    setEditingStaff({
                      ...editingStaff,
                      status: val as SuperAdminStaffMember["status"],
                    })
                  }
                >
                  <SelectTrigger className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-normal focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-2xs">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="z-[80] shadow-xl border border-slate-200/90 rounded-2xl bg-white p-1">
                    <SelectItem value="Active">
                      <div className="flex items-center gap-2 py-0.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                        <span className="font-semibold text-slate-800">Active</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Approved">
                      <div className="flex items-center gap-2 py-0.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                        <span className="font-semibold text-slate-800">Approved</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Suspended">
                      <div className="flex items-center gap-2 py-0.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                        <span className="font-semibold text-slate-800">Suspended</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
              <button
                type="button"
                onClick={() => setEditingStaff(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Remove Staff Member?
            </h3>
            <p className="text-xs text-slate-600">
              Are you sure you want to remove{" "}
              <strong className="text-slate-900">{deletingStaff.name}</strong> from
              the administrative team? This will revoke all platform access.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeletingStaff(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteStaff}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm"
              >
                Remove Staff
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
