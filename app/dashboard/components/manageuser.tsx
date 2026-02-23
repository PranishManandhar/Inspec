export default function ManageUser() {
  return (
    <>
      <h1 className="text-4xl font-bold p-4">Manage Users</h1>
        {/* table view here */}
    

    
      {/* add user */}
      <div className="border rounded-lg p-6 drop-shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Add User</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className="px-4 py-2 border focus:border-black rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              className="px-4 py-2 border focus:border-black rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Role</label>
            <select
              name="role"
              defaultValue=""
              className="px-4 py-2 border focus:border-black rounded-md bg-white"
            >
              <option value="" disabled hidden>
                Select a role
              </option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>
          <button className="mt-2 px-6 py-2 bg-black text-white font-bold rounded-md hover:bg-gray-800 transition-colors">
            Create User
          </button>
        </div>
      </div>
        {/* remove user */}
      <div className="border rounded-lg p-6 drop-shadow-lg mt-7">
            <h2 className="text-2xl font-bold mb-6">Remove User</h2>

                    <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className="px-4 py-2 border focus:border-black rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              className="px-4 py-2 border focus:border-black rounded-md"
            />
          </div>
          <button className="mt-2 px-6 py-2 bg-black text-white font-bold rounded-md hover:bg-gray-800 transition-colors">
            Remove User
          </button>
        </div>
      </div>
    </>
  );
}
