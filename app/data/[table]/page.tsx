import { Navbar, Footer, Copyright, ViewMoreButton } from "@/app/components";
import { notFound } from "next/navigation";

interface persons {
  id: number;
  name: string;
  dob: string;
}

interface Hospital {
  hospital_id: number;
  hospital_name: string;
  hospital_address: string;
}

interface School {
  school_id: number;
  school_name: string;
  school_address: string;
}

interface Jurisdiction {
  jurisdiction_id: number;
  jurisdiction_name: string;
  jurisdiction_mayor: string;
}

interface Company {
  company_id: number;
  company_name: string;
  company_type: string;
}

type TableData = persons | Hospital | School | Jurisdiction | Company;

async function getData(table: string): Promise<TableData[]> {
  const routeMap: Record<string, string> = {
    persons: "persons",
    hospitals: "organizations/hospitals",
    schools: "organizations/schools",
    jurisdictions: "organizations/jurisdictions",
    companies: "organizations/companies",
  };

  const route = routeMap[table];
  if (!route) notFound();

  const res = await fetch(`http://localhost:5000/api/${route}`, {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  });

  if (!res.ok) notFound();

  const json = await res.json();
  return json.data;
}

export default async function Table({
  params,
}: {
  params: Promise<{ table: string }>;
}) {
  const { table } = await params;
  const data = await getData(table);

  data.sort((a: any, b: any) => {
    const aId =
      a.id ?? a.hospital_id ?? a.school_id ?? a.jurisdiction_id ?? a.company_id;
    const bId =
      b.id ?? b.hospital_id ?? b.school_id ?? b.jurisdiction_id ?? b.company_id;
    return aId - bId;
  });

  const columnMap: Record<string, string[]> = {
    persons: ["id", "name", "dob"],
    hospitals: ["hospital_id", "hospital_name", "hospital_address"],
    schools: ["school_id", "school_name", "school_address"],
    jurisdictions: [
      "jurisdiction_id",
      "jurisdiction_name",
      "jurisdiction_mayor",
    ],
    companies: ["company_id", "company_name", "company_type"],
  };

  const headers = columnMap[table] ?? [];

  return (
    <>
      <Navbar />

      <div className="justify-center px-4 py-8">
        <h1 className="text-5xl text-center font-bold mb-8 border">
          {table.toUpperCase()}
        </h1>

        {/* shows the table headers */}
        <div className="max-w-[100rem] mx-auto p-5 overflow-x-auto">
          <table className="w-full min-w-[800px] border border-red-500">
            <thead>
              <tr className="bg-gray-100">
                {headers.map((key) => (
                  <th
                    key={key}
                    className="border border-gray-300 p-3 min-w-[150px]"
                  >
                    {key.toUpperCase()}
                  </th>
                ))}
                {table === "persons" && (
                  <th className="border border-gray-300 p-3 min-w-[150px]">
                    ACTION
                  </th>
                )}
              </tr>
            </thead>

            {/* shows the data of the table */}
            <tbody>
              {data.map((item: any) => (
                <tr
                  key={
                    item.id ??
                    item.hospital_id ??
                    item.school_id ??
                    item.jurisdiction_id ??
                    item.company_id
                  }
                >
                  {headers.map((key) => (
                    <td key={key} className="border border-gray-300 p-3">
                      {(item as any)[key]}
                    </td>
                  ))}
                  {table === "persons" && (
                    <td className="border border-gray-300 p-3">
                      <ViewMoreButton id={item.id} />
                    </td>
                  )}
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
