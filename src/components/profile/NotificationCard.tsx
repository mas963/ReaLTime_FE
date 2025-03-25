import { formatRelativeDate } from "@/utils/dateUtils";
import { Youtube } from "lucide-react";

interface NotificationProps {
  title: string;
  description?: string;
  link?: string;
  date: string;
}

export default function NotificationCard({ title, description, link, date }: NotificationProps) {
  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-4 rounded-lg shadow-lg lg:w-[600px] w-[450px] mt-4">
      <div className="flex items-center gap-4">
        <div className="bg-gray-700 p-2 rounded-lg">
          <span className="text-xl font-semibold"><Youtube /></span>
        </div>
        <div>
          <h2 className="font-bold">{title}</h2>
          <p className="text-sm text-gray-300">{description}</p>
        </div>
      </div>

      <div className="grid grid-rows-2">
        <p className="text-sm text-gray-300 text-right">{formatRelativeDate(date)}</p>
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="ml-auto flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 013 8.25v10.5A2.25 2.25 0 015.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            View
          </a>
        )}
      </div>
    </div>
  );
}