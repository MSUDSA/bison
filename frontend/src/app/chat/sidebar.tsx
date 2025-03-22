"use client"
import { LucideProps, Menu, SquarePen } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes, useEffect, useState } from "react";
import { getAllDirectMessages } from "./utils";
import CreateNewChat from "./CreateNewChat";
import { DirectMessageType } from "./types";
import { useRouter } from "next/navigation";

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);

    const [dms, setDms] = useState<DirectMessageType[]>()
    useEffect(() => {
      const getDms = async () => {

        const data = await getAllDirectMessages();
        setDms(data)
        console.log('data',data)
      }
      getDms()
    },[])
    return (
      <div className={`h-screen ${isOpen ? "w-64" : "w-20"} bg-green-800 text-white transition-all duration-300 flex flex-col p-4`}>
      <button onClick={() => setIsOpen(!isOpen)} className="mb-4 p-2 rounded-lg bg-green-600 hover:bg-green-500">
        <Menu size={24} />
      </button>
  
      <nav className="flex flex-col space-y-4">
          <h6><b>Today</b></h6>
        <NewChatButton isOpen={isOpen} Icon={SquarePen} label="Create New chat" />
        {dms?.map((dm, index) => (
          <NavItem isOpen={isOpen} label={dm.title} id={dm.id} key={index} />
        ))}
      </nav>
    </div>
    );
  }

  const NavItem = ({ isOpen,Icon, label, id }: NavItemType) => {
    const router = useRouter()
    return (
      <div className="flex items-center space-x-4 p-2 rounded-lg hover:bg-green-700 cursor-pointer" onClick={() => router.push(`/chat/${id}`)}>
        {Icon !== undefined ? <Icon size={24} /> : <></>}
        {isOpen && (
          <span className="truncate overflow-hidden whitespace-nowrap w-full">
            {label}
          </span>
        )}
      </div>
    

    )
  }
    
  const NewChatButton = ({ isOpen,Icon, label }: NavItemType) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (

      <div className="flex items-center space-x-4 p-2 rounded-lg hover:bg-green-700 cursor-pointer">
        {Icon !== undefined ? <Icon size={24} /> : <></>}
        {isOpen && (
          <>
          <span className="truncate overflow-hidden whitespace-nowrap w-full" onClick={openModal}>
            {label}
          </span>
          <CreateNewChat isOpen={isModalOpen} onClose={closeModal}/>
          </>
        )}
      </div>
  )
}
    
  interface NavItemType {
      isOpen: boolean;
      Icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
      label: string
      id?: number;
  }