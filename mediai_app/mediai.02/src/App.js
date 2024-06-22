import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const people = [
  { id: 1, name: 'google patents' },
  { id: 2, name: 'WIPO ' },
  { id: 3, name: 'Espace Net' },
  { id: 4, name: 'FPO' },
]

function App() {
  const [patents, setPatents] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/getPatents")
      .then((response) => setPatents(response.data))
      .catch((err) => console.log(err));
  }, []);

  const [selected, setSelected] = useState(people[0])
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  // Filter patents based on selected option
  const filteredPatents = patents.filter(patent => patent.resource === selected.name);

  return (
    <div>
      <div className="bg-black"><Navbar /></div>
      <div className="bg-[#000300]"><Hero /></div>
      <div className="bg-black text-white"> 
        <div className="flex justify-center w-full mr-90px top-16 ">
          <Combobox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                  className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  displayValue={(person) => person.name}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={React.Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery('')}
              >
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {filteredPeople.length === 0 && query !== '' ? (
                    <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredPeople.map((person) => (
                      <Combobox.Option
                        key={person.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-teal-600 text-white' : 'text-gray-900'
                          }`
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {person.name}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? 'text-white' : 'text-teal-600'
                                }`}
                              >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>

        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <table className="table table-bordered table-striped bg-black text-white">
                <thead className="thead-dark">
                  <tr>
                    <th className="bg-black text-white">Publication Number</th>
                    <th className="bg-black text-white">Title</th>
                    <th className="bg-black text-white">Abstract</th>
                    <th className="bg-black text-white">Inventors</th>
                    <th className="bg-black text-white">Publication Date</th>
                    <th className="bg-black text-white">Resource</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatents.map((patent, index) => (
                    <tr key={index}>
                      <td className="bg-black text-white">{patent.Publication_Number}</td>
                      <td className="bg-black text-white">{patent.Title}</td>
                      <td className="bg-black text-white">{patent.Abstract}</td>
                      <td className="bg-black text-white">{patent.Inventors}</td>
                      <td className="bg-black text-white">{patent.Publication_Date}</td>
                      <td className="bg-black text-white">{patent.resource}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
