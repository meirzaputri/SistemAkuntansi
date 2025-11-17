import { MdOutlineSearch } from "react-icons/md";

export default function SearchBar({ search, setSearch }) {
    return (
        <div className="border border-gray-300 p-2 rounded-xl shadow-sm flex items-center flex-grow">
            <input
                type="text"
                placeholder="Cari Data Transaksi..."
                className="w-full outline-none text-black pr-2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <MdOutlineSearch className="text-gray-500" size={20} />
        </div>
    );
}
