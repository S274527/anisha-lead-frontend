import { EditForm } from "@/components/faq";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { LINKS } from "@/constants";

export const metadata: Metadata = {
  title: "Edit Faq",
};

const EditFaq = () => {
  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link
            href={LINKS.faq.route}
            className="text-primary hover:underline"
          >
            Faqs
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Edit</span>
        </li>
      </ul>
      <EditForm />
    </div>
  );
};

export default EditFaq;
