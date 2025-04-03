import { formatRelativeDate } from "@/utils/dateUtils";
import * as LucideIcons from "lucide-react";

interface NotificationProps {
  title: string;
  description?: string;
  link?: string;
  date: string;
  icon?: keyof typeof LucideIcons;
  theme: {
    background: string;
    iconBackground: string;
    text: string;
  };
}

export default function NotificationCard({
  title, description, link, date, icon = "Bell", theme
}: NotificationProps) {
  const IconComponent = LucideIcons[icon] as React.ElementType || LucideIcons.Bell;

  return (
    <div className={`${theme.background} flex items-center justify-between p-4 rounded-lg
    shadow-lg w-full mt-4`}>
      <div className="flex items-center gap-4">
        <div className={`${theme.iconBackground} p-2 rounded-lg`}>
          <span className="text-xl font-semibold">
            <IconComponent className="w-6 h-6" />
          </span>
        </div>
        <div>
          <h2 className="font-bold">{title}</h2>
          <p className={`${theme.text} text-sm`}>{description}</p>
        </div>
      </div>

      <div className="grid grid-rows-2">
        <p className={`${theme.text} text-sm text-right`}>
          {formatRelativeDate(date)}
        </p>
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className={`${theme.text} 
          ml-auto flex items-center gap-2 hover:text-white`}>
            <LucideIcons.ExternalLink />
            Open
          </a>
        )}
      </div>
    </div>
  );
}