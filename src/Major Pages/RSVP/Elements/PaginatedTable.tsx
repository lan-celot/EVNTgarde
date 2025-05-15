import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface TableData {
  guestId: string;
  name: string;
  gender: string;
  emailAddress: string;
  contactNumber: string;
  eventStatus: string;
}

const PaginatedTable: React.FC = () => {
  // Mock data for demonstration purposes
  const initialData: TableData[] = [
    {
      guestId: "G1002318",
      name: "John Doe",
      gender: "Male",
      emailAddress: "johndoe@gmail.com",
      contactNumber: "+63 917 123 4567",
      eventStatus: "Pending",
    },
    {
      guestId: "G1002319",
      name: "Jane Smith",
      gender: "Female",
      emailAddress: "jane.smith@email.com",
      contactNumber: "+63 918 987 6543",
      eventStatus: "Confirmed",
    },
    {
      guestId: "G1002316",
      name: "Robert Jones",
      gender: "Male",
      emailAddress: "robert.jones@test.com",
      contactNumber: "+63 919 222 3333",
      eventStatus: "Pending",
    },
    {
      guestId: "G1002317",
      name: "Mary Brown",
      gender: "Female",
      emailAddress: "mary.brown@sample.com",
      contactNumber: "+63 920 444 5555",
      eventStatus: "Cancelled",
    },
    {
      guestId: "G1002315",
      name: "Michael Davis",
      gender: "Male",
      emailAddress: "michael.davis@example.com",
      contactNumber: "+63 921 666 7777",
      eventStatus: "Confirmed",
    },
    {
      guestId: "G1002313",
      name: "Jennifer Wilson",
      gender: "Female",
      emailAddress: "jennifer.wilson@domain.com",
      contactNumber: "+63 922 888 9999",
      eventStatus: "Pending",
    },
    {
      guestId: "G1002320",
      name: "David Garcia",
      gender: "Male",
      emailAddress: "david.garcia@email.com",
      contactNumber: "+63 923 111 2222",
      eventStatus: "Confirmed",
    },
    {
      guestId: "G1002321",
      name: "Linda Rodriguez",
      gender: "Female",
      emailAddress: "linda.rodriguez@test.com",
      contactNumber: "+63 924 333 4444",
      eventStatus: "Pending",
    },
    {
      guestId: "G1002322",
      name: "Christopher Williams",
      gender: "Male",
      emailAddress: "chris.williams@sample.com",
      contactNumber: "+63 925 555 6666",
      eventStatus: "Cancelled",
    },
    {
      guestId: "G1002323",
      name: "Angela Garcia",
      gender: "Female",
      emailAddress: "angela.garcia@example.com",
      contactNumber: "+63 926 777 8888",
      eventStatus: "Confirmed",
    },
    {
      guestId: "G1002324",
      name: "Brian Martinez",
      gender: "Male",
      emailAddress: "brian.martinez@domain.com",
      contactNumber: "+63 927 999 0000",
      eventStatus: "Pending",
    },
    {
      guestId: "G1002325",
      name: "Nicole Robinson",
      gender: "Female",
      emailAddress: "nicole.robinson@email.com",
      contactNumber: "+63 928 222 1111",
      eventStatus: "Confirmed",
    },
    {
      guestId: "G1002326",
      name: "Kevin Hernandez",
      gender: "Male",
      emailAddress: "kevin.hernandez@test.com",
      contactNumber: "+63 929 444 3333",
      eventStatus: "Pending",
    },
    {
      guestId: "G1002327",
      name: "Stephanie Lopez",
      gender: "Female",
      emailAddress: "stephanie.lopez@sample.com",
      contactNumber: "+63 930 666 5555",
      eventStatus: "Cancelled",
    },
    {
      guestId: "G1002328",
      name: "Jason Young",
      gender: "Male",
      emailAddress: "jason.young@example.com",
      contactNumber: "+63 931 888 7777",
      eventStatus: "Confirmed",
    },
  ];

  const [data, setData] = useState<TableData[]>(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`px-3 py-1 rounded-md ${
            currentPage === i
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }
    return (
      <>
        <button
          onClick={() => paginate(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md text-gray-600 bg-gray-100 hover:bg-gray-200 disabled:text-gray-400 disabled:bg-gray-50 mr-2"
        >
          Previous
        </button>
        {pageNumbers}
        <button
          onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md text-gray-600 bg-gray-100 hover:bg-gray-200 disabled:text-gray-400 disabled:bg-gray-50 ml-2"
        >
          Next
        </button>
      </>
    );
  };

  return (
    <div className="bg-white rounded-md shadow-md p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Guest ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center">
                Event Status
                <ChevronDown className="h-4 w-4 ml-1" />
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRows.map((row, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.guestId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.gender}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.emailAddress}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.contactNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                    {row.eventStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center items-center">
        {renderPageNumbers()}
      </div>
    </div>
  );
};

export default PaginatedTable;
