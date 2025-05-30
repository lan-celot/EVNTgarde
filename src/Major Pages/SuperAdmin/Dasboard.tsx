export default function Dashboard() {
  return (
    <div className="ml-64"> {/* pangsukat lang ng sidebar */}
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold dark:text-gray-800">Dashboard</h1>
      </div>

      {/* Empty Dashboard Content */}
      <div className="bg-white dark:bg-gray-100 rounded-lg shadow-sm border border-gray-200 dark:border-gray-300 max-w-8xl w-full">
        <div className="flex flex-col items-center justify-center py-32 px-8">
          {/* Intentionally left blank as requested */}
        </div>
      </div>
    </div>
  )
}
