import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center w-48 h-screen overflow-hidden text-gray-700 bg-gray-100">
      <button
        className="mt-3 text-lg font-bold"
        onClick={() => router.push("/")}
      >
        Rick And Morty
      </button>
      <div className="w-full px-2">
        <div className="flex flex-col items-center w-full mt-3 border-t border-gray-300">
          <button
            className=" mt-3 text-md font-medium"
            onClick={() => {
              router.push("/contact");
            }}
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}
