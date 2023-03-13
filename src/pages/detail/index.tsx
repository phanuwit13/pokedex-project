import { useEffect, useState } from 'react'
import { pokemonListServices, pokemonDetailServices } from '@/service'
import { IPokemonDetailResponse } from '@/interface/pokemonDetail'
import { Link, useParams } from 'react-router-dom'

interface IPokemonDetailState {
  data: IPokemonDetailResponse | undefined
  loading: boolean
  error?: any
}

const INITIAL_DATA = {
  data: undefined,
  loading: false,
  error: null,
}

const Detail = () => {
  let { name } = useParams()
  const [pokemonDetail, setPokemonDetail] =
    useState<IPokemonDetailState>(INITIAL_DATA)

  const fetchPokemonList = async () => {
    // let pokemonList = [];
    setPokemonDetail((prev) => ({
      ...prev,
      loading: true,
    }))
    const response = await pokemonDetailServices.getPokemonDetail(
      name?.toString() || ''
    )

    const result = {
      ...response.data,
      image: response.data?.sprites?.other?.dream_world?.front_default,
    } as IPokemonDetailResponse

    setPokemonDetail((prev) => ({
      ...prev,
      data: result,
      loading: false,
    }))
  }

  useEffect(() => {
    fetchPokemonList()
  }, [])

  return (
    <div className='w-[90%] max-w-[700px] m-auto '>
      <div className='flex m-auto w-fit '>
        <img
          src='/images/logo.webp'
          alt=''
          className='max-h-[80px] mt-[20px]'
        />
      </div>
      <div className='my-[20px]'>
        <Link
          to='/'
          className=' bg-gray-200 px-2 pr-4 rounded-[4px] flex items-center w-fit'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            width='16'
            height='16'
          >
            <path d='M9.78 12.78a.75.75 0 0 1-1.06 0L4.47 8.53a.75.75 0 0 1 0-1.06l4.25-4.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L6.06 8l3.72 3.72a.75.75 0 0 1 0 1.06Z'></path>
          </svg>
          Back
        </Link>
      </div>
      {pokemonDetail.data && (
        <div className='!z-5 relative flex justify-self-center rounded-[20px]  bg-clip-border shadow-3xl shadow-shadow-500 flex-col w-full !p-4 3xl:p-![18px] bg-white undefined'>
          <div className='h-full w-full'>
            <div className='relative w-full aspect-square'>
              <img
                src={pokemonDetail.data?.image}
                className='mb-3 w-full rounded-xl 3xl:h-full 3xl:w-full h-[218px] p-[20px]'
                alt=''
              />
              <button className='absolute top-0 right-0 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer'>
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
            </div>
            <div className='mb-3 flex items-center justify-between px-1 md:items-start'>
              <div className='mb-2'>
                <p className='text-lg font-bold text-navy-700 capitalize'>
                  {pokemonDetail.data?.name}
                </p>
              </div>
              <div className='mb-2'>
                <p className='text-lg font-bold text-navy-700 capitalize'>
                  #{pokemonDetail.data?.id}
                </p>
              </div>
            </div>
            <div className='flex items-center justify-end md:items-center lg:justify-end gap-[6px]'>
              {pokemonDetail.data?.types.map((v) => {
                return (
                  <span
                    key={`badge-type-${v.slot}`}
                    className={`min-w-[70px] rounded-[20px] px-3 py-1 text-base font-medium text-[14px] badge-type-${v.type.name} text-center`}
                  >
                    {v.type.name}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Detail
