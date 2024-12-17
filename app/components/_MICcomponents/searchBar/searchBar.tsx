import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { FaMagnifyingGlass } from 'react-icons/fa6'
export default function SearchBar({
  value,
  onChange,
  handleSearch,
  handleClearSearch
}) {
  return (
    <div className='lg:min-w-screen relative flex hidden items-center text-slate-500 sm:flex mr-10'>
      <input
        type='text'
        placeholder='Search...'
        value={value}
        onChange={onChange}
        className='rounded-md border border-gray-200 bg-slate-300 px-4 py-2 text-base text-slate-700 focus:outline-none'
      />
      {value && (
        <IoMdClose
          onClick={handleClearSearch}
          size={22}
          className='absolute right-3 cursor-pointer'
        />
      )}
      <FaMagnifyingGlass
        onClick={handleSearch}
        size={22}
        className='absolute right-4 cursor-pointer'
      />
    </div>
  )
}
