import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ROUTES, Routes } from "../configs/routes.config";

const NavItem: React.FC<Routes> = ({ name, path, withParams }) => {
  const { pathname } = useRouter();
  const isActive = pathname === path;

  return (
    <li>
      <Link
        href={path}
        className={`flex flex-row items-center justify-between p-2 transition-all rounded-lg hover:bg-gray-700 ${
          isActive ? "bg-gray-500" : ""
        }`}
      >
        <span className="ml-3 text-sm">{name}</span>
        {withParams && (
          <span className="inline-flex px-2.5 ml-3 text-sm font-medium text-gray-800 bg-orange-700 rounded-full dark:text-gray-300">
            Param
          </span>
        )}
      </Link>
    </li>
  );
};

const SideBar: React.FC = () => {
  return (
    <aside
      id="logo-sidebar"
      className="w-[20rem]"
      aria-label="Sidebar"
      style={{minHeight: '44.2rem'}}
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {ROUTES.map((route) => (
            <NavItem
              key={route.path}
              name={route.name}
              path={route.path}
              withParams={route.withParams}
            />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;