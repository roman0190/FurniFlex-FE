"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../contexts/AuthContext";

const Sidebar = () => {
  const Options = [
    {
      id: 1,
      name: "My Profile",
      path: "/user/profile", // Adjusted path
      imgUrl: "/assets/icons/user.svg", // Adjusted imgUrl
    },
    {
      id: 2,
      name: "Settings",
      path: "/settings", // Adjusted path
      imgUrl: "/assets/icons/setting.svg", // Adjusted imgUrl
    },
    {
      id: 3,
      name: "Notifications",
      path: "/notifications", // Adjusted path
      imgUrl: "/assets/icons/bell.svg", // Adjusted imgUrl
    },
  ];

  const router = useRouter(); // Initialize the router
  const { logout } = useAuth(); // Use the context to access logout function

  const handleLogout = () => {
    logout(); // Call the logout function
    router.push("/auth/signup"); // Redirect after logout
  };
  return (
    <div className="bg-[#e9eae9] w-1/4 rounded-lg p-10 h-[50%] text-black">
      <div className="text-[18px] font-semibold">Options</div>
      <hr className="border-gray-500 border-t-[0.1px] mt-2" />
      <div className="mt-8 flex flex-col gap-3">
        {Options.map((option) => (
          <a
            href={option.path}
            key={option.id}
            className="flex font-semibold mb-4"
          >
            <Image
              src={option.imgUrl}
              alt={option.name}
              width={1000}
              height={1000}
              className="w-[24px] h-[24px] mr-2"
            />
            <div className="flex justify-between w-full">
              <span>{option.name}</span>
              <Image
                src="/assets/icons/rightnav.svg" // Keep this as a static image
                alt="alt"
                width={1000}
                height={1000}
                className="w-[24px] h-[24px]"
              />
            </div>
          </a>
        ))}
        <button onClick={handleLogout} className="flex font-semibold mb-4">
          <Image
            src="/assets/icons/logout.svg"
            alt="logout"
            width={1000}
            height={1000}
            className="w-[24px] h-[24px] mr-2"
          />
          <div className="flex justify-between w-full">
            <span>Logout</span>
            <Image
              src="/assets/icons/rightnav.svg" // Keep this as a static image
              alt="alt"
              width={1000}
              height={1000}
              className="w-[24px] h-[24px]"
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
