import SearchForm from '@/components/SearchForm'
import PokemonCard from '@/components/PokemonCard'
import ReactLoading from 'react-loading'
import { usePokemonListStore } from '@/store/pokemonList'

const Home = () => {
  const { pokemon,fetchPokemon } = usePokemonListStore()

  return (
    <div className='w-[90%] max-w-[1100px] m-auto '>
      <div className='flex m-auto w-fit '>
        <img
          src='/images/logo.webp'
          alt=''
          className='max-h-[80px] mt-[20px]'
        />
      </div>
      <SearchForm />
      {fetchPokemon.loading ? (
        <div className='flex items-center justify-center  h-[70vh]'>
          <ReactLoading type='cubes' color='#3265AF' />
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-[20px] mt-[40px]'>
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
        </div>
      )}
    </div>
  )
}

export default Home
