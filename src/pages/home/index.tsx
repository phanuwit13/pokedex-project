import SearchForm from '@/components/SearchForm'
import PokemonCard from '@/components/PokemonCard'
import ReactLoading from 'react-loading'
import { usePokemonListStore } from '@/store/pokemonList'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSearchParams } from 'react-router-dom'
import { generationList } from '@/utils/optionList'
import { useMemo } from 'react'

const Home = () => {
  const { pokemon, fetchPokemon, refetch,hasMore } = usePokemonListStore()
  const [searchParams] = useSearchParams()

  const handleRefetch = () => {
    refetch?.()
  }

  return (
    <div className='w-[90%] max-w-[1100px] m-auto '>
      <button onClick={handleRefetch}>refetch</button>
      <div className='flex m-auto w-fit '>
        <img
          src='/images/logo.webp'
          alt=''
          className='max-h-[80px] mt-[20px]'
        />
      </div>
      <SearchForm />
      <div>
        <InfiniteScroll
          dataLength={pokemon.data.length} //This is important field to render the next data
          next={handleRefetch}
          hasMore={hasMore}
          loader={
            <div className='col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4'>
              <div className='flex items-center justify-center  h-[70vh]'>
                <ReactLoading type='cubes' color='#3265AF' />
              </div>
            </div>
          }
          // endMessage={
          //   <p style={{ textAlign: 'center' }}>
          //     <b>Yay! You have seen it all</b>
          //   </p>
          // }
          className='pb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-[20px] mt-[40px]'
        >
          {pokemon.data?.map((item) => {
            return (
              <PokemonCard
                key={`poke-card-${item.id}`}
                name={item.name}
                id={item.id}
                image={item.image || ''}
                types={item.types}
              />
            )
          })}
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Home
