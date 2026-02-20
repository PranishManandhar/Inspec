export default function AccessLogs() {
  const access = [
    { user: "Admin", time: "10:32 AM", ip: "192.168.1.1" },
    { user: "Inspector", time: "11:15 AM", ip: "192.168.1.12" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md border p-6">
      <h2 className="text-xl font-semibold mb-4">Access Logs</h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="pb-2 text-left">User</th>
            <th className="pb-2 text-left">Time</th>
            <th className="pb-2 text-left">IP Address</th>
          </tr>
        </thead>
        <tbody>
          {access.map((entry, index) => (
            <tr key={index} className="border-b last:border-none">
              <td className="py-2">{entry.user}</td>
              <td className="py-2">{entry.time}</td>
              <td className="py-2">{entry.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
