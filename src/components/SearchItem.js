import { Pill } from "./";

export const SearchItem = ({ item, onClick, selected }) => (
  <li onClick={onClick}>
    <div className="cursor-pointer w-full  justify-between border-gray-100 border-b hover:bg-teal-100">
      <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100 justify-between">
        <div className="mx-2 -mt-1 w-1/2 ">
          {item.displaySymbol}
          <div className="text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500">{item.description}</div>
        </div>
        {selected && <Pill text={"Selected"} />}
      </div>
    </div>
  </li>
);
