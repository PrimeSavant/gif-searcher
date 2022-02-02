import React from 'react'


/**
 * Search Field component
 */
export default function Search({
  query = "",
  onChange = (value: any) => {},
}) {
  return (
    <input
      value={query}
      type="search"
      className="bg-white outline-none my-5 text-lg rounded-md p-3 w-6/12 m-auto mb-9 block"
      placeholder="Search..."
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
