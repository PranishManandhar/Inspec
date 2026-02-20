export default function Overview() {
  const stats = [
    { title: "User", value: "Saroj" },
    { title: "Active Sessions", value: "12" },
    { title: "Security Alerts", value: "5" },
    { title: "System Status", value: "Stable" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="rounded-xl bg-white p-6 shadow-md border"
        >
          <h3 className="text-sm text-gray-500">{stat.title}</h3>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
