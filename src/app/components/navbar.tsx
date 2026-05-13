/** @format */

import React from 'react';
import { MdWbSunny } from 'react-icons/md';
import { MdMyLocation } from 'react-icons/md';
import { MdOutlineLocationOn } from 'react-icons/md';
import SearchBox from './SearchBox';

type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-[80px] w-full flex justify-between items-center max-w-7x1 px-3 mx-auto>">
        <p className="flex items-center gap-2">
          <h2 className="text-xl font-bold">Weather</h2>
          <MdWbSunny size={32} color="#facc15" />
        </p>

        <section className="flex gap-2 items-center">
          <MdMyLocation size={24} color="#575757" />
          <MdOutlineLocationOn size={24} color="#575757" />
          <p className="text-slate-900">Philippines</p>
          <div>
            {/* SearchBox*/}</div>
            <SearchBox value={''} onChange={undefined} onSubmit={undefined} />
        </section>
      </div>
    </nav>
  );
}
