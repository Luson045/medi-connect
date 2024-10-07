import React from 'react';

const TableComponent = () => {
  const tableData = [
    {
      time: '8:30 AM - 10:30 AM',
      patients: 200,
      wtDistribution: [89, 56, 25, 13, 10, 7],
      meanSD: '46.30±0.028',
      consultationTimes: [61, 57, 43, 23, 16],
      consultationMeanSD: '09.34±0.004',
    },
    {
      time: '10:30 AM - 12:30 PM',
      patients: 81,
      wtDistribution: [25, 18, 15, 10, 7, 6],
      meanSD: '61.39±0.031',
      consultationTimes: [16, 19, 24, 17, 5],
      consultationMeanSD: '11.01±0.004',
    },
    {
      time: '12:30 PM - 2:30 PM',
      patients: 13,
      wtDistribution: [7, 1, 2, 2, 1, 0],
      meanSD: '53.56±0.032',
      consultationTimes: [6, 1, 1, 1, 0],
      consultationMeanSD: '07.51±0.003',
    },
    {
      time: '2:30 PM - 4:30 PM',
      patients: 6,
      wtDistribution: [3, 1, 1, 1, 0, 0],
      meanSD: '36.47±0.023',
      consultationTimes: [1, 1, 1, 1, 0],
      consultationMeanSD: '09.56±0.002',
    },
    {
      time: 'Total',
      patients: 300,
      wtDistribution: [124, 76, 44, 25, 22, 9],
      meanSD: '',
      consultationTimes: [84, 78, 75, 42, 21],
      consultationMeanSD: '',
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 text-sm">
        <thead>
          <tr className="bg-gray-50">
            <th
              className="py-3 px-4 border-b font-semibold text-gray-700"
              rowSpan={2}
            >
              Patient Arrival Schedule
            </th>
            <th
              className="py-3 px-4 border-b font-semibold text-gray-700"
              rowSpan={2}
            >
              No. of Patients
            </th>
            <th
              className="py-3 px-4 border-b font-semibold text-gray-700"
              colSpan={6}
            >
              Waiting Time (WT) and No. of Patients
            </th>
            <th
              className="py-3 px-4 border-b font-semibold text-gray-700"
              rowSpan={2}
            >
              Mean ± SD (WT)
            </th>
            <th
              className="py-3 px-4 border-b font-semibold text-gray-700"
              colSpan={5}
            >
              Consultation Time (CT) and No. of Patients
            </th>
            <th
              className="py-3 px-4 border-b font-semibold text-gray-700"
              rowSpan={2}
            >
              Mean ± SD (CT)
            </th>
          </tr>
          <tr className="bg-gray-50">
            <th className="py-2 px-3 border-b font-medium text-gray-600">
              &lt;30 min
            </th>
            <th className="py-2 px-3 border-b font-medium text-gray-600">
              30 min - 1 hr
            </th>
            <th className="py-2 px-3 border-b font-medium text-gray-600">
              1-1.5 hrs
            </th>
            <th className="py-2 px-3 border-b font-medium text-gray-600">
              1.5-2 hrs
            </th>
            <th className="py-2 px-3 border-b font-medium text-gray-600">
              2-2.5 hrs
            </th>
            <th className="py-2 px-3 border-b font-medium text-gray-600">
              2.5-3 hrs
            </th>
            <th className="py-2 px-3 border-b font-medium text-gray-600">
              &lt;5 min
            </th>
            <th className="py-2 px-3 border-b font-medium text-gray-600">
              5-10 min
            </th>
            <th className="py-2 px-3 border-b font-medium text-gray-600">
              10-15 min
            </th>
            <th className="py-2 px-3 border-b font-medium text-gray-600">
              15-20 min
            </th>
            <th className="py-2 px-3 border-b font-medium text-gray-600">
              20-25 min
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr
              key={index}
              className={`
                ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                transition-colors duration-150 ease-in-out
                hover:bg-[#e1f3f7]
              `}
            >
              <td className="py-2 px-4 border-b text-gray-800">{row.time}</td>
              <td className="py-2 px-4 border-b text-gray-800 text-center">
                {row.patients}
              </td>
              {row.wtDistribution.map((wt, i) => (
                <td
                  key={i}
                  className="py-2 px-3 border-b text-gray-800 text-center"
                >
                  {wt}
                </td>
              ))}
              <td className="py-2 px-4 border-b text-gray-800 text-center">
                {row.meanSD}
              </td>
              {row.consultationTimes.map((ct, i) => (
                <td
                  key={i}
                  className="py-2 px-3 border-b text-gray-800 text-center"
                >
                  {ct}
                </td>
              ))}
              <td className="py-2 px-4 border-b text-gray-800 text-center">
                {row.consultationMeanSD}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
