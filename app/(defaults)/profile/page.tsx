import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { ProfileForm } from "@/components/profile";

export const metadata: Metadata = {
  title: "Profile",
};

const Profile = () => {
  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href="#" className="text-primary hover:underline">
            Users
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Profile</span>
        </li>
      </ul>
      <ProfileForm />
    </div>
  );
};

export default Profile;
