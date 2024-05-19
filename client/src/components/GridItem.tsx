import React from 'react'

const GridItem = ({ title, children }: {title: string, children: React.ReactNode}) => {
  return (
    <div className='flex flex-col items-center justify-center py-4 md:px-4 shadow bg-white rounded-xl h-[300px] md:h-[400px] overflow-auto'>
      <h3>{title}</h3>
      {children}
    </div>
  )
}

export default GridItem;
