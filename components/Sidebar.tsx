"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import {
  Brain, LayoutDashboard, CheckSquare, StickyNote,
  LogOut, User, Zap, Menu, X,
} from "lucide-react";

const NAV = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Tasks", href: "/tasks", icon: CheckSquare },
  { label: "Knowledge Base", href: "/notes", icon: StickyNote },

  // ⭐ AI CHAT (NEW CORE FEATURE)
  { label: "AI Assistant", href: "/chat", icon: Brain },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const close = () => setOpen(false);

  const inner = (
    <div className="flex flex-col h-full">
      
      {/* 🔥 Logo (Premium) */}
      <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-purple-600 to-purple-500 rounded-xl shadow-lg">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-white text-sm tracking-tight">
              AI Learning
            </p>
            <p className="text-xs text-slate-500">Smart Assistant</p>
          </div>
        </div>

        <button
          onClick={close}
          className="lg:hidden text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* 🔹 Section Label */}
      <p className="px-4 mt-4 text-xs text-slate-500 uppercase tracking-wider">
        Workspace
      </p>

      {/* 🔥 Navigation */}
      <nav className="flex-1 px-3 py-3 space-y-1">
        {NAV.map(({ label, href, icon: Icon }) => {
          const active =
            pathname === href || pathname.startsWith(href + "/");

          return (
            <Link
              key={href}
              href={href}
              onClick={close}
              className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
              ${
                active
                  ? "bg-gradient-to-r from-purple-600/20 to-purple-500/10 text-purple-300 border border-purple-500/20 shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/70"
              }`}
            >
              {/* Active Indicator */}
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-purple-500 rounded-r-full" />
              )}

              <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* 🔥 User Section */}
      {user && (
        <div className="px-3 py-4 border-t border-slate-800">
          
          {/* XP + Level */}
          <div className="px-4 mb-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-yellow-400" />
                {user.xp_points} XP
              </span>
              <span className="capitalize text-purple-400">
                {user.level}
              </span>
            </div>

            <div className="h-1.5 bg-slate-700 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all"
                style={{
                  width: `${Math.min(user.xp_points % 100, 100)}%`,
                }}
              />
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3 px-4 mb-3">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user.full_name || user.username}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {user.email}
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* 🔥 Mobile Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-white"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-slate-800 z-50 flex flex-col
        transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {inner}
      </aside>
    </>
  );
}