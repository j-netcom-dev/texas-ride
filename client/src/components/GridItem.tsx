import React from 'react'

const GridItem = ({ title, children }: {title: string, children: React.ReactNode}) => {
  return (
    <div className='flex flex-col items-center justify-center p-4 shadow bg-white rounded-xl h-[400px]'>
      <h3>{title}</h3>
      {children}
    </div>
  )
}

export default GridItem;
