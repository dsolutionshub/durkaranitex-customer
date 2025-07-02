"use client";

import { User, Mail, Phone, Calendar } from "lucide-react";

export default function AccountDetails({ data }) {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold dark-color">Account Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-1 pl-2">
              <User className="w-4 h-4 mr-2 inline-block" />
              <span className="translate-y-[1px] inline-block">Full Name</span>
            </label>
            <div className="px-4 py-3 bg-gray-200 rounded-xl text-gray-900 font-medium">
              {data?.name || '-'}
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-1 pl-2">
              <Mail className="w-4 h-4 mr-2 inline-block" />
              <span className="translate-y-[1px] inline-block">
                Email Address
              </span>
            </label>
            <div className="px-4 py-3 bg-gray-200 rounded-xl text-gray-900 font-medium">
              {data?.email || '-'}
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-1 pl-2">
              <Phone className="w-4 h-4 mr-2 inline-block" />
              <span className="translate-y-[1px] inline-block">
                Phone Number
              </span>
            </label>
            <div className="px-4 py-3 bg-gray-200 rounded-xl text-gray-900 font-medium">
              {data?.mobile || "-"}
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-1 pl-2">
              <Calendar className="w-4 h-4 mr-2 inline-block" />
              <span className="translate-y-[1px] inline-block">
                Member Since
              </span>
            </label>
            <div className="px-4 py-3 bg-gray-200 rounded-xl text-gray-900 font-medium">
              {data?.created_date || "-"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
