import React from "react";

type TableProps<T> = {
  data: [];
  headers: { [K in keyof T]: string };
};

function ResultTable<T>({ data, headers } : TableProps<T>) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[300px]">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 max-h-[300px]">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
          <tr>
            {Object.values(headers).map((header) => (
              <th key={header as string} className="px-6 py-3">
                {header as string}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index) => (
            <tr
              key={index}
              className={`border-b ${
                index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
              }  dark:border-gray-700`}
            >
              {Object.keys(headers).map((key) => (
                <td key={key} className="px-6 py-4 text-center">
                  {/* @ts-ignore */}
                  {row[key]?.toString() || "None"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultTable;