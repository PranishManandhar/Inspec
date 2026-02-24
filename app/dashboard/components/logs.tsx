import { useEffect, useState } from "react";

interface Log {
  log_id: number;
  log_text: string;
  log_timestamp: string;
  log_code_string: string;
  status_code: number;
  source: string;
}

export default function Logs() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  }

  async function handleLogs() {
    const token = getCookie("token");
    
    if (!token) {
      setError("No authentication token found");
      setLoading(false);
      return;
    }
    
    try {
      // Changed to GET
      const res = await fetch("http://localhost:5000/api/logs", {
        method: "GET",  
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch logs: ${res.status}`);
      }

      const response = await res.json();
      
      if (response.success) {
        const logsData = Array.isArray(response.data) 
          ? response.data 
          : [response.data];
        setLogs(logsData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch logs");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleLogs();
  }, []);

  function formatDate(timestamp: string) {
    return new Date(timestamp).toLocaleString();
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md border p-6">
        <h2 className="text-xl font-semibold mb-4">System Logs</h2>
        <p className="text-gray-500">Loading logs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-md border p-6">
        <h2 className="text-xl font-semibold mb-4">System Logs</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border p-6">
      <h2 className="text-xl font-semibold mb-4">System Logs</h2>
      
      {logs.length === 0 ? (
        <p className="text-gray-500">No logs found</p>
      ) : (
        <ul className="space-y-2">
          {logs.map((log) => (
            <li 
              key={log.log_id} 
              className="border-b pb-2 last:border-none"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-medium text-gray-900">
                    {log.log_text}
                  </span>
                  <div className="text-sm text-gray-600 mt-1">
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-2">
                      {log.log_code_string}
                    </span>
                    <span className="mr-2">Source: {log.source}</span>
                    <span>Status: {log.status_code}</span>
                  </div>
                </div>
                <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                  {formatDate(log.log_timestamp)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}