import React from 'react'

const page = () => {
  return (
    <div className="flex-grow w-full overflow-y-auto p-2">
      {/* Content Area */}
        <main className="flex-grow w-full mx-auto px-0 py-2">
            <div className="bg-background text-foreground">
                <p>
                    this is subModule
                </p>
            </div>
        </main>

    </div>
  )
}

export default page;