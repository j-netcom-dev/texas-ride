import React from 'react'

const GridItem = ({ title, children, title_alignment ='center' }: {title: string, children: React.ReactNode, title_alignment?:string}) => {
  return (
    <div className='flex flex-col items-center justify-center py-4 md:px-4 shadow bg-white rounded-xl h-[300px] md:h-[400px] overflow-auto'>
        {title &&<h3 className={`py-3 font-semibold uppercase px-4 text-${title_alignment} w-full`}>{title}</h3>}
      {children}
    </div>
  )
}

export default GridItem;
