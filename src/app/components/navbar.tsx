/** @format */

import React from "react";
import { MdWbSunny, MdMyLocation, MdOutlineLocationOn } from "react-icons/md";
import SearchBox from "./SearchBox";

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

export default function Navbar(props: Props) {
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-4 mx-auto">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-blue-600">Weather App</h2>
          <MdWbSunny size={32} color="#facc15" />
        </div>

        {/* Right Side */}
        <section className="flex gap-4 items-center">
          <div className="flex items-center gap-1">
            <MdMyLocation size={22} color="#575757" />
            <MdOutlineLocationOn size={22} color="#575757" />
            <p className="text-slate-900 font-medium">Philippines</p>
          </div>

          <SearchBox
            value={props.value}
            onChange={props.onChange}
            onSubmit={props.onSubmit}
          />
        </section>
      </div>
    </nav>
  );
}