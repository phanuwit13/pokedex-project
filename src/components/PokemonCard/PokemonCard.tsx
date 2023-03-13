import { Link } from 'react-router-dom'
import { Type } from '@/interface/pokemonDetail'

interface PokemonCardPropsType {
  name: string
  id: number
  image: string
  types: Type[]
}

const PokemonCard = ({ name, id, image, types }: PokemonCardPropsType) => {
  return (
    <div className='relative flex justify-self-center rounded-[20px] max-w-[250px]  bg-clip-border shadow-3xl shadow-shadow-500 flex-col w-full !p-4 3xl:p-![18px] bg-[#253641] undefined'>
      <button className='absolute top-5 right-5 flex items-center justify-center rounded-full bg-[#253641] p-2 text-brand-500 hover:cursor-pointer !z-10'>
        <div className='flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50'>
          <svg
            stroke='currentColor'
            fill='currentColor'
            strokeWidth='0'
            viewBox='0 0 512 512'
            height='1em'
            width='1em'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='32'
              d='M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z'
            ></path>
          </svg>
        </div>
      </button>
      <Link
        to={`/detail/${name}`}
        key={`pokemon-${id}`}
        className='h-full w-full'
      >
        <div className='relative w-full aspect-square bg-[url("/images/poke-card-bg.png")] bg-center rounded-xl'>
          <img
            src={image}
            className='mb-3 w-full rounded-xl 3xl:h-full 3xl:w-full h-[218px] p-[40px]'
            alt=''
          />
        </div>
        <div className='mb-3 flex items-center justify-between px-1 md:items-start text-gray-100'>
          <div className='mb-2'>
            <p className='text-lg font-bold text-navy-700 capitalize'>{name}</p>
          </div>
          <div className='mb-2'>
            <p className='text-lg font-bold text-navy-700 capitalize'>#{id}</p>
          </div>
        </div>
        <div className='flex items-center justify-end md:items-center lg:justify-end gap-[6px]'>
          {types.map((v) => {
            return (
              <span
                key={`badge-type-${v.slot}`}
                className={`min-w-[70px] rounded-[20px] px-3 py-1 text-black text-base font-medium text-[14px] badge-type-${v.type.name} text-center`}
              >
                {v.type.name}
              </span>
            )
          })}
        </div>
      </Link>
    </div>
  )
}

export default PokemonCard
