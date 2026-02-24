import { useState } from "react";

export default function ManageUser() {
  const [user] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // ── Add User Form State ───────────────────────────────────────
  const [addForm, setAddForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [addStatus, setAddStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [addMessage, setAddMessage] = useState("");

  // ── Remove User Form State ────────────────────────────────────
  const [removeIdentifier, setRemoveIdentifier] = useState(""); // email or username
  const [removeStatus, setRemoveStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [removeMessage, setRemoveMessage] = useState("");

 async function handleRegister(e: React.FormEvent) {
  e.preventDefault();
  setAddStatus("loading");
  setAddMessage("");

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addForm),
    });

    if (!res.ok) {
      let errorText = "";
      try {
        const errData = await res.json();           // try JSON error
        errorText = errData.message || `HTTP ${res.status}`;
      } catch {
        errorText = await res.text();          
        console.error("Raw response (not JSON):", errorText.substring(0, 300));
      }
      throw new Error(`Server error: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    setAddStatus("success");
    setAddMessage("User created! " + (data.message || ""));
    setAddForm({ username: "", email: "", password: "", role: "" });
  } catch (err: any) {
    console.error("Fetch failed:", err);
    setAddStatus("error");
    setAddMessage(err.message || "Failed to create user");
  }
}

  async function handleRemove(e: React.FormEvent) {
    e.preventDefault();
    if (!removeIdentifier.trim()) {
      setRemoveStatus("error");
      setRemoveMessage("Please enter email or username");
      return;
    }

    setRemoveStatus("loading");
    setRemoveMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/users/remove", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: removeIdentifier.trim() }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to remove user");
      }

      setRemoveStatus("success");
      setRemoveMessage("User removed successfully");
      setRemoveIdentifier("");
    } catch (err: any) {
      setRemoveStatus("error");
      setRemoveMessage(err.message || "Something went wrong");
    }
  }

  return (
    <>
      <h1 className="text-4xl font-bold p-4">Manage Users</h1>

      {/* ── Add User ────────────────────────────────────────────── */}
      <div className="border rounded-lg p-6 drop-shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-6">Add User</h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Email</label>
            <input
              type="email"
              value={addForm.email}
              onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
              placeholder="Enter email"
              required
              className="px-4 py-2 border focus:border-black rounded-md"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold">Username</label>
            <input
              type="text"
              value={addForm.username}
              onChange={(e) => setAddForm({ ...addForm, username: e.target.value })}
              placeholder="Enter username"
              required
              className="px-4 py-2 border focus:border-black rounded-md"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold">Password</label>
            <input
              type="password"
              value={addForm.password}
              onChange={(e) => setAddForm({ ...addForm, password: e.target.value })}
              placeholder="Enter password"
              required
              className="px-4 py-2 border focus:border-black rounded-md"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold">Role</label>
            <select
              value={addForm.role}
              onChange={(e) => setAddForm({ ...addForm, role: e.target.value })}
              required
              className="px-4 py-2 border focus:border-black rounded-md bg-white"
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value="admin">Admin</option>
              <option value="hr">HR</option> 
              <option value="verifier">Verifier</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={addStatus === "loading"}
            className={`
              mt-2 px-6 py-2 bg-black text-white font-bold rounded-md
              hover:bg-gray-800 transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {addStatus === "loading" ? "Creating..." : "Create User"}
          </button>

          {addMessage && (
            <p
              className={`mt-2 text-sm font-medium ${
                addStatus === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {addMessage}
            </p>
          )}
        </form>
      </div>

      {/* ── Remove User ─────────────────────────────────────────── */}
      <div className="border rounded-lg p-6 drop-shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Remove User</h2>

        <form onSubmit={handleRemove} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Email or Username</label>
            <input
              type="text"
              value={removeIdentifier}
              onChange={(e) => setRemoveIdentifier(e.target.value)}
              placeholder="Enter email or username"
              required
              className="px-4 py-2 border focus:border-black rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={removeStatus === "loading"}
            className={`
              mt-2 px-6 py-2 bg-red-600 text-white font-bold rounded-md
              hover:bg-red-700 transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {removeStatus === "loading" ? "Removing..." : "Remove User"}
          </button>

          {removeMessage && (
            <p
              className={`mt-2 text-sm font-medium ${
                removeStatus === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {removeMessage}
            </p>
          )}
        </form>
      </div>
    </>
  );
}