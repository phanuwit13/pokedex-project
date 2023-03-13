import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { generationList } from '@/utils/optionList'
import { pokemonListServices, pokemonDetailServices } from '@/service'
import { IPokemonDetailResponse } from '@/interface/pokemonDetail'
import { usePokemonListStore } from '@/store/pokemonList'

const useSearchForm = () => {
  const { register, watch } = useForm({
    defaultValues: {
      type: 'all types',
      generation: 0,
      keyword: '',
      sort: 'id',
    },
  })

  const { setFetchPokemonList, setPokemonList, pokemon, fetchPokemon } =
    usePokemonListStore()

  const watchType = watch('type')
  const watchGeneration = watch('generation')
  const watchKeyword = watch('keyword')
  const watchSort = (watch('sort') as 'id') || 'name'

  const fetchPokemonList = async (filter: {
    name: string
    limit: number
    offset: number
  }) => {
    let pokemonList = []
    setFetchPokemonList({
      ...pokemon,
      loading: true,
    })
    const response = await pokemonListServices.getPokemonList(
      filter.limit,
      filter.offset
    )
    if (response.status === 200) {
      const pokemonResults = response.data?.results || []
      for (let pokemon of pokemonResults) {
        const response = await pokemonDetailServices.getPokemonDetail(
          pokemon?.name
        )
        const monster = await response?.data
        await pokemonList.push({ ...monster, score: 0 })
      }
      const results = pokemonList.map((item) => ({
        ...item,
        image: item?.sprites?.other?.dream_world?.front_default || item?.sprites?.other?.['official-artwork']?.front_default,
      })) as unknown as IPokemonDetailResponse[]
      setFetchPokemonList({
        ...pokemon,
        data: results,
        loading: false,
      })
    }
  }

  const filterPokemon = (keyword: string, type: string, key: 'id' | 'name') => {
    const filterKeyword = (data: IPokemonDetailResponse[]) => {
      return data.filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
      )
    }

    const result = filterKeyword(
      type.toLowerCase() !== 'all types'
        ? fetchPokemon.data.filter((item) =>
            item.types.find((v) =>
              v.type.name.toLowerCase().includes(type.toLowerCase())
            )
          )
        : [...fetchPokemon.data]
    )

    const dataResponse = sortBy(result, key)

    setPokemonList({ ...pokemon, data: dataResponse, loading: false })
  }

  const sortBy = (data: IPokemonDetailResponse[], key: 'id' | 'name') => {
    switch (key) {
      case 'id':
        return data.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))

      case 'name':
        return data.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        )

      default:
        return data.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))
    }
  }

  useEffect(() => {
    filterPokemon(watchKeyword, watchType, watchSort)
  }, [watchType, watchKeyword, watchSort])

  useEffect(() => {
    if (watchGeneration !== undefined) {
      fetchPokemonList(generationList[watchGeneration])
    }
  }, [watchGeneration])

  return {
    fieldType: register('type'),
    fieldGeneration: register('generation'),
    fieldKeyword: register('keyword'),
    fieldSort: register('sort'),
  }
}

export { useSearchForm }
