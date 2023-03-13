import { useSearchForm } from '@/components/SearchForm'
import { typesList, generationList, sortList } from '@/utils/optionList'

const SearchForm = () => {
  const { fieldType, fieldGeneration, fieldKeyword, fieldSort } =
    useSearchForm()

  return (
    <form className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4   gap-[20px] mt-[20px]'>
      <div>
        <label
          htmlFor='generation'
          className='block mb-2 text-md font-semibold  dark:text-white'
        >
          Generation
        </label>
        <select
          id='generation'
          {...fieldGeneration}
          className='bg-[#253641] border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        >
          {generationList.map((item, index) => {
            return (
              <option
                key={`generation-${item.name}`}
                className='capitalize'
                value={index}
              >
                {item.name}
              </option>
            )
          })}
        </select>
      </div>
      <div>
        <label
          htmlFor='type'
          className='block mb-2 text-md font-semibold  dark:text-white'
        >
          Type
        </label>
        <select
          {...fieldType}
          id='type'
          className='capitalize bg-[#253641] border border-gray-30 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        >
          {typesList.map((item, index) => {
            return (
              <option key={`type-${item}`} className='capitalize' value={item}>
                {item}
              </option>
            )
          })}
        </select>
      </div>
      <div>
        <label
          htmlFor='sort by'
          className='block mb-2 text-md font-semibold  dark:text-white'
        >
          Sort By
        </label>
        <select
          id='sort by'
          {...fieldSort}
          className='capitalize bg-[#253641] border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        >
          {sortList.map((item) => {
            return (
              <option key={`sort-${item}`} className='capitalize' value={item}>
                {item}
              </option>
            )
          })}
        </select>
      </div>
      <div>
        <div className='mb-6'>
          <label
            htmlFor='search'
            className='block mb-2 text-md font-semibold  dark:text-white'
          >
            Search
          </label>
          <input
            {...fieldKeyword}
            type='text'
            id='search'
            className='bg-[#253641] border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Search'
            required
          />
        </div>
      </div>
    </form>
  )
}

export default SearchForm
