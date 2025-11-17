import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

export default function Pagination({ page, setPage, totalPages }) {
    return (
        <div className="flex justify-end items-center mt-4 text-sm">
            <div className="flex gap-1">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="flex items-center justify-center h-8 w-8 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                    <MdNavigateBefore />
                </button>

                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setPage(i + 1)}
                        className={`flex items-center justify-center h-8 w-8 rounded-md font-medium transition ${
                            page === i + 1
                                ? "bg-[#216eec] text-white"
                                : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="flex items-center justify-center h-8 w-8 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                    <MdNavigateNext />
                </button>
            </div>
        </div>
    );
}
