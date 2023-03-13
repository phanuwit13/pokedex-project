import { useEffect, useState } from 'react'
import { pokemonListServices, pokemonDetailServices } from '@/service'
import { IPokemonDetailResponse } from '@/interface/pokemonDetail'
import { Link } from 'react-router-dom'

interface IPokemonListState {
  data: IPokemonDetailResponse[]
  loading: boolean
  error?: any
}

const INITIAL_DATA = {
  data: [],
  loading: false,
  error: null,
}

const Home = () => {
  const [pokemonList, setPokemonList] =
    useState<IPokemonListState>(INITIAL_DATA)

  const fetchPokemonList = async () => {
    let pokemonList = []
    setPokemonList((prev) => ({
      ...prev,
      loading: true,
    }))
    const response = await pokemonListServices.getPokemonList()
    if (response.status === 200) {
      console.log('response', response.data)
      const pokemonResults = response.data?.results || []
      for (let pokemon of pokemonResults) {
        const response = await pokemonDetailServices.getPokemonDetail(
          pokemon?.name
        )
        const monster = await response?.data
        await pokemonList.push({ ...monster, score: 0 })
      }
      console.log('pokemonList', pokemonList)
      const results = pokemonList.map((item) => ({
        ...item,
        image: item?.sprites?.other?.dream_world?.front_default,
      })) as unknown as IPokemonDetailResponse[]
      setPokemonList((prev) => ({
        ...prev,
        data: results,
        loading: false,
      }))
    }
  }

  useEffect(() => {
    fetchPokemonList()
  }, [])

  return (
    <div className='w-[90%] max-w-[1100px] m-auto '>
      <div className='flex m-auto w-fit '>
        <img src='/images/logo.webp' alt='' className='max-h-[80px] mt-[20px]' />
      </div>
      <div>filter</div>
      {pokemonList.loading ? (
        <div>loading</div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-[20px] mt-[40px]'>
          {pokemonList.data?.map((item) => {
            return (
              <Link
                to={`/detail/${item.name}`}
                key={`pokemon-${item.id}`}
                className='!z-5 relative flex justify-self-center rounded-[20px] max-w-[250px]  bg-clip-border shadow-3xl shadow-shadow-500 flex-col w-full !p-4 3xl:p-![18px] bg-white undefined'
              >
                <div className='h-full w-full'>
                  <div className='relative w-full aspect-square'>
                    <img
                      src={item.image}
                      className='mb-3 w-full rounded-xl 3xl:h-full 3xl:w-full h-[218px] p-[20px] bg-yellow-50'
                      alt=''
                    />
                    <button className='absolute top-1 right-1 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer'>
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
                        {item.name}
                      </p>
                    </div>
                    <div className='mb-2'>
                      <p className='text-lg font-bold text-navy-700 capitalize'>
                        #{item.id}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center justify-end md:items-center lg:justify-end gap-[6px]'>
                    {item.types.map((v) => {
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
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Home
