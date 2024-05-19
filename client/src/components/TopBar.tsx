import { TopBarPropTypes } from '@/types';
const TopBar = ({page}: TopBarPropTypes) => {
  return (
    <section className='shadow px-6 py-3 rounded-md flex justify-between items-center bg-[#ffffffc0]'>
      <h3 className='text-xl uppercase font-semibold'>{page}</h3>
    </section>
  )
}

export default TopBar
