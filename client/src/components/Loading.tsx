'use client';

const Loading = ({text ='Please wait'}) => {
  return (
    <div className="flex gap-4 items-center">
        <div className="w-[20px] h-[20px] border-dashed border-[#333333a2] duration-[3000ms] animate-spin ease-in rounded-full border-[3px]"></div>
        <p className="text-sm animate-pulse">{text}</p>
    </div>
  )
}

export default Loading;
