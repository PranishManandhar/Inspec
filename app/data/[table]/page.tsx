"use client";
import { useParams } from "next/navigation";
import { Navbar, Footer, Copyright } from "@/app/components";

export default function Table() {
  const param = useParams();
  
  return (
    <>
      <Navbar />
      <div className="justify-center px-4 py-8">
        <h1 className="text-5xl text-center font-bold mb-8 border">
          {(param.table)?.toString().toUpperCase()}
        </h1>
        
        {/* Added overflow-x-auto for horizontal scrolling */}
        <div className="max-w-[100rem] mx-auto p-5 overflow-x-auto">
            <table className="w-full min-w-[800px] border border-red-500">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-3 min-w-[150px]">c1</th>
                        <th className="border border-gray-300 p-3 min-w-[150px]">c2</th>
                        <th className="border border-gray-300 p-3 min-w-[150px]">c3</th>
                        <th className="border border-gray-300 p-3 min-w-[150px]">c4</th>
                        <th className="border border-gray-300 p-3 min-w-[200px]">c5</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-gray-300 p-3">d1</td>
                        <td className="border border-gray-300 p-3">d2</td>
                        <td className="border border-gray-300 p-3">d3</td>
                        <td className="border border-gray-300 p-3">d4</td>
                        <td className="border border-gray-300 px-[20] py-3">
                            <button type="button" className="border w-full border-black p-3 bg-black text-white hover:scale-105 h-auto whitespace-nowrap">View More</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 p-3">d1</td>
                        <td className="border border-gray-300 p-3">d2</td>
                        <td className="border border-gray-300 p-3">d3</td>
                        <td className="border border-gray-300 p-3">d4</td>
                        <td className="border border-gray-300 px-[20] py-3">
                            <button type="button" className="border w-full border-black p-3 bg-black text-white hover:scale-105 h-auto whitespace-nowrap">View More</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 p-3">d1</td>
                        <td className="border border-gray-300 p-3">d2</td>
                        <td className="border border-gray-300 p-3">d3</td>
                        <td className="border border-gray-300 p-3">d4</td>
                        <td className="border border-gray-300 px-[20] py-3">
                            <button type="button" className="border w-full border-black p-3 bg-black text-white hover:scale-105 h-auto whitespace-nowrap">View More</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 p-3">d1</td>
                        <td className="border border-gray-300 p-3">d2</td>
                        <td className="border border-gray-300 p-3">d3</td>
                        <td className="border border-gray-300 p-3">d4</td>
                        <td className="border border-gray-300 px-[20] py-3">
                            <button type="button" className="border w-full border-black p-3 bg-black text-white hover:scale-105 h-auto whitespace-nowrap">View More</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 p-3">d1</td>
                        <td className="border border-gray-300 p-3">d2</td>
                        <td className="border border-gray-300 p-3">d3</td>
                        <td className="border border-gray-300 p-3">d4</td>
                        <td className="border border-gray-300 px-[20] py-3">
                            <button type="button" className="border w-full border-black p-3 bg-black text-white hover:scale-105 h-auto whitespace-nowrap">View More</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 p-3">d1</td>
                        <td className="border border-gray-300 p-3">d2</td>
                        <td className="border border-gray-300 p-3">d3</td>
                        <td className="border border-gray-300 p-3">d4</td>
                        <td className="border border-gray-300 px-[20] py-3">
                            <button type="button" className="border w-full border-black p-3 bg-black text-white hover:scale-105 h-auto whitespace-nowrap">View More</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 p-3">d1</td>
                        <td className="border border-gray-300 p-3">d2</td>
                        <td className="border border-gray-300 p-3">d3</td>
                        <td className="border border-gray-300 p-3">d4</td>
                        <td className="border border-gray-300 px-[20] py-3">
                            <button type="button" className="border w-full border-black p-3 bg-black text-white hover:scale-105 h-auto whitespace-nowrap">View More</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 p-3">d1</td>
                        <td className="border border-gray-300 p-3">d2</td>
                        <td className="border border-gray-300 p-3">d3</td>
                        <td className="border border-gray-300 p-3">d4</td>
                        <td className="border border-gray-300 px-[20] py-3">
                            <button type="button" className="border w-full border-black p-3 bg-black text-white hover:scale-105 h-auto whitespace-nowrap">View More</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
      
      </div>
      <Footer />
      <Copyright />
    </>
  );
}