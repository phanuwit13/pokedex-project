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
    <div className='w-[90%] max-w-[600px] m-auto '>
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
          className='bg-[#253641] px-2 pr-4 rounded-[4px] flex items-center w-fit'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            width='16'
            height='16'
            className='fill-white'
          >
            <path d='M9.78 12.78a.75.75 0 0 1-1.06 0L4.47 8.53a.75.75 0 0 1 0-1.06l4.25-4.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L6.06 8l3.72 3.72a.75.75 0 0 1 0 1.06Z'></path>
          </svg>
          Back
        </Link>
      </div>
      {pokemonDetail.data && (
        <div className='!z-5 relative flex justify-self-center rounded-[20px]  bg-clip-border shadow-3xl shadow-shadow-500 flex-col w-full !p-4 3xl:p-![18px]  undefined'>
          <div className='h-full w-full'>
            <div className=' w-full'>
              <div className='relative w-[100%] h-[400px]'>
                <img
                  src='\images\pokemon_bg.png'
                  className='absolute h-[auto] max-h-[400px] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]'
                  alt=''
                />
                <img
                  src={pokemonDetail.data?.sprites?.other?.dream_world?.front_default || pokemonDetail.data?.sprites?.other?.['official-artwork']?.front_default}
                  className='mb-3 w-full rounded-xl 3xl:h-full 3xl:w-full h-[180px] sm:h-[218px] p-[20px] absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]'
                  alt=''
                />
              </div>
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

            <div className='bg-[#253641] grid grid-cols-1 sm:grid-cols-2 w-[100%] mt-[20px] rounded-[12px] p-[16px] gap-y-[20px] gap-x-[30px]'>
              <div className=''>
                <div className='flex gap-[16px]'>
                  <div className='text-[#b3eafe]'>Height</div>
                  <div>{(pokemonDetail.data.height / 10).toFixed(2)} m</div>
                </div>
                <div className='flex gap-[16px]'>
                  <div className='text-[#b3eafe]'>Weight</div>
                  <div>{(pokemonDetail.data.weight / 10).toFixed(2)} kg.</div>
                </div>
              </div>
              <div className='flex justify-start sm:justify-end gap-[6px] h-fit'>
                {pokemonDetail.data.types.map((v) => {
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
              <div className='w-[100%] h-fit'>
                <h2>Abilities</h2>
                <div className='grid grid-cols-2 sm:grid-cols-1 gap-[10px] flex-col mt-[10px]'>
                  {pokemonDetail.data.abilities.map((ability) => {
                    return (
                      <div
                        key={`ability-${ability.ability}`}
                        className={`min-w-[70px] capitalize rounded-[20px] px-3 py-1 text-black text-base font-medium text-[14px] bg-[#b3eafe] text-center`}
                      >
                        {ability.ability.name}
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className='w-[100%] h-fit'>
                <h2>State</h2>
                <div className='flex gap-[10px] flex-col mt-[10px]'>
                  {pokemonDetail.data.stats.map((state) => {
                    return (
                      <div className='flex gap-[16px] justify-between'>
                        <div className='text-[#b3eafe] capitalize'>
                          {state.stat.name}
                        </div>
                        <div>{state.base_stat}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Detail
