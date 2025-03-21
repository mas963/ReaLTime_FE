interface NotificationProps {
  title: string;
  description?: string;
  link?: string;
  date: string;
}

export default function NotificationCard({ title, description, link, date }: NotificationProps) {
  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-4 rounded-lg shadow-lg w-96 mt-4">
      <div className="flex items-center gap-4">
        <div className="bg-gray-700 p-2 rounded-lg">
          <span className="text-xl font-semibold">🔔</span>
        </div>
        <div>
          <h2 className="font-bold text-lg">{title}</h2>
          <p className="text-sm text-gray-300">{description}</p>
        </div>
      </div>

      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
        >
          Git
        </a>
      ) : null}
    </div>
  );
}