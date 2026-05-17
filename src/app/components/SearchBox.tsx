import React from "react";
import { IoSearch } from "react-icons/io5";
import { cn } from "../utils/cn";

type Props = {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

export default function SearchBox(props: Props) {
  return (
    <form
      onSubmit={props.onSubmit}
      className={cn(
        "flex relative items-center justify-center h-10",
        props.className
      )}
    >
      <input
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search Location..."
        className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
      />

      <button
        type="submit"
        className="px-4 py-2 absolute right-0 top-0 h-full bg-blue-500 text-white rounded-full flex items-center justify-center"
      >
        <IoSearch />
      </button>
    </form>
  );
}