export default function Logs() {
  const logs = [
    "User Admin logged in",
    "Data table updated",
    "Security scan completed",
    "New user registered",
  ];

  return (
    <div className="bg-white rounded-xl shadow-md border p-6">
      <h2 className="text-xl font-semibold mb-4">System Logs</h2>

      <ul className="space-y-2 text-gray-700">
        {logs.map((log, index) => (
          <li key={index} className="border-b pb-2 last:border-none">
            {log}
          </li>
        ))}
      </ul>
    </div>
  );
}
