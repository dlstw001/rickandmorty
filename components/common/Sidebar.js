import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="flex flex-col items-center w-48 h-screen overflow-hidden text-gray-700 bg-gray-100">
      <button className="mt-3 text-lg font-bold">
        <Link href={"/"}>Rick And Morty</Link>
      </button>
      <div className="w-full px-2">
        <div className="flex flex-col items-center w-full mt-3 border-t border-gray-300">
          <button className=" mt-3 text-md font-medium">
            <Link href={"/contact"}>Contact</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
