"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Barlist = [
    {
        id: 1,
        name: "Home",
        link: "/",
    },
    {
        id: 2,
        name: "Products",
        link: "/",
    },
    {
        id: 3,
        name: "Categories",
        link: "/",
    },
    {
        id: 5,
        name: "About",
        link: "/",
    },
];

const Header = () => {
    const router = useRouter();
    const { user } = useAuth();

    const handleCartClick = () => {
        router.push("/store/cart");
    };
    const handleProfileClick = () => {
        if (!user) return;
        router.push("/user/profile");
    };

    return (
        <div className="header flex h-[118px] items-center justify-between bg-gray-300 px-6 lg:pl-[120px] lg:pr-[120px] text-black border-b overflow-y-auto">
            <a href="/" className="logo flex gap-1">
                <div className="bg-[#1E99F5] h-[38px] w-[38px] flex items-center justify-center rounded-full  italic text-[24px]">
                    <span>f</span>
                </div>
                <div className="flex items-center text-[20px] font-bold text-black">
                    <span>
                        Furni<span className="text-[#1E99F5]">Flex</span>
                    </span>
                </div>
            </a>
            <div className="middle-selection flex  gap-[3.5rem] font-medium  h-20 items-center">
                {Barlist.map((item) => (
                    <a
                        key={item.id}
                        href={item.link}
                        className="hover:bg-slate-300/45 p-1 rounded-lg hover:pt-2 "
                    >
                        {item.name}
                    </a>
                ))}
            </div>
            <div className="shops&profile-icon flex items-center justify-center gap-5">
                <button onClick={handleCartClick} className="shops relative ">
                    <div className=" absolute flex w-[16px] h-[16px] bg-[#323232] items-center justify-center rounded-full translate-x-4 translate-y-[1.1rem] mx-auto">
                        <span className="text-[11.2px] font-medium text-white">
                            {user ? user.CartItems.length : 0}
                        </span>
                    </div>
                    <Image
                        src="/assets/icons/Added.svg"
                        className="min-w-[33px] w-[33px] min-h-[34px] h-[34px]"
                        alt="alt"
                        width={1440}
                        height={1440}
                    />
                </button>
                <button
                    className="profile rounded-full object-cover overflow-hidden"
                    onClick={handleProfileClick}
                >
                    {user ? (
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/Users/${user.UserId}/Image`}
                            alt="alt"
                            className="w-[40px] min-w-[40px] min-h-[40px] h-[40px] "
                            width={1440}
                            height={1440}
                        />
                    ) : (
                        <img
                            src={`/assets/icons/Account.svg`}
                            alt="alt"
                            className="w-[40px] min-w-[40px] min-h-[40px] h-[40px] "
                            width={1440}
                            height={1440}
                        />
                    )}
                </button>
                {user ? (
                    <span className="text-lg -m-2">
                        Hi,
                        <span className="font-bold text-gray-700">
                            {user?.FirstName}
                        </span>
                    </span>
                ) : (
                    <Link
                        href="/auth/login"
                        className="font-bold text-gray-800"
                    >
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Header;
