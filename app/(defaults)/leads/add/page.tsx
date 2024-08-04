import { AddForm } from "@/components/leads";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { LINKS } from "@/constants";

export const metadata: Metadata = {
  title: "Add new",
};

const AddLead = () => {
  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link
            href={LINKS.leads.route}
            className="text-primary hover:underline"
          >
            Leads
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Add</span>
        </li>
      </ul>
      <AddForm />
    </div>
  );
};

export default AddLead;
