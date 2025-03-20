"use client"
import { Menu } from "lucide-react";
import { useState } from "react";

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div className={`h-screen ${isOpen ? "w-64" : "w-20"} bg-green-800 text-white transition-all duration-300 flex flex-col p-4`}>
      <button onClick={() => setIsOpen(!isOpen)} className="mb-4 p-2 rounded-lg bg-green-600 hover:bg-green-500">
        <Menu size={24} />
      </button>
  
      <nav className="flex flex-col space-y-4">
          <h6><b>Today</b></h6>
        <NavItem isOpen={isOpen} label="This is a test to see if it is going to collapse but it hasn't" />
        <NavItem isOpen={isOpen} label="You should have collapsed by now." />
        <NavItem isOpen={isOpen} label="Settings" />
      </nav>
    </div>
    );
  }

  const NavItem = ({ isOpen, label }: NavItemType) => (
      <div className="flex items-center space-x-4 p-2 rounded-lg hover:bg-green-700 cursor-pointer">
        {isOpen && (
          <span className="truncate overflow-hidden whitespace-nowrap w-full">
            {label}
          </span>
        )}
      </div>
    );
    
  interface NavItemType {
      isOpen: boolean;
      label: string
  }
