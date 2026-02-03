"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Navbar, Footer, Copyright } from "@/app/components";

export default function Table() {
    // user data object
  type UserData = {
    id: number;
    name: string;
    email: string;
    [key: string]: any; // optional: allow other keys
  };

//   react hooks
  const param = useParams();
  const [Data, setData] = useState<UserData[]>([]);

//   gets data from api and stores it in data state
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsers();
  }, []);

  
  const allowedKeys = ["id", "name", "email"]; // only these will be table columns
//   loads the headers that were said to be allowed (ie filters others out)
  const headers =
    Data.length > 0
      ? Object.keys(Data[0]).filter((key) => allowedKeys.includes(key))
      : [];

  return (
    <>
      <Navbar />

      <div className="justify-center px-4 py-8">
        <h1 className="text-5xl text-center font-bold mb-8 border">
          {param.table?.toString().toUpperCase()}
        </h1>

{/* shows the table headers */}
        <div className="max-w-[100rem] mx-auto p-5 overflow-x-auto">
          <table className="w-full min-w-[800px] border border-red-500">
            <thead>
              <tr className="bg-gray-100">
                {headers.map((key) => (
                  <th
                    key={key}
                    className="border border-gray-300 p-3 min-w-[150px]">
                    {key.toUpperCase()}
                  </th>
                ))}
                <th className="border border-gray-300 p-3 min-w-[150px]">
                  ACTION
                </th>
              </tr>
            </thead>

        {/* shows the data of the table */}
            <tbody>
              {Data.map((item) => (
                <tr key={item.id}>
                  {allowedKeys.map((key) => (
                    <td key={key} className="border border-gray-300 p-3">
                      {item[key]}
                    </td>
                  ))}
                  <td className="border border-gray-300 p-3">
                    <button className="border w-full border-black p-3 bg-black text-white hover:scale-105 h-auto whitespace-nowrap">
                      View More
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            
          </table>
        </div>
      </div>

      <Footer />
      
      <Copyright />
    </>
  );
}
