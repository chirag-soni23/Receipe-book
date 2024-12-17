import React from 'react'

const Loading = () => {
  return (
    <div className="flex items-center justify-center max-h-screen mt-36">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-green-500"></div>
    </div>
  )
}

export default Loading