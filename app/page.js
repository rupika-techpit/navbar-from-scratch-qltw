"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  // useEffect(() => {
  //   router.push("/admin/");
  // },[])

  return (
    <div className="flex-grow w-full overflow-y-auto p-2">
      {/* Content Area */}
        <main className="flex-grow w-full mx-auto px-0 py-2">
            <div className="bg-background text-foreground">
                <p>
                    Here is the content
                </p>
            </div>
        </main>

    </div>
  )
}

export default page



