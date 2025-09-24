import React from 'react'

const page = () => {
  return (
    <div>
        {/* Secondary Menu Bar (Modules Navigation) */}
      <div className="bg-gray-100 border-b p-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="flex space-x-6 h-2 items-center">
            <a href="/dashboard" className="px-1 py-1 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors">
              Dashboard
            </a>
            <a href="/modules" className="px-1 py-1 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors">
              Modules
            </a>
            <a href="#" className="px-1 py-1 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors">
              Reports
            </a>
            <a href="#" className="px-1 py-1 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors">
              Settings
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page;