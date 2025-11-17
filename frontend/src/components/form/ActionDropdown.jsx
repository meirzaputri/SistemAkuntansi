import React, { useRef, useEffect } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';

export default function ActionDropdown({ 
    itemId, 
    openDropdown, 
    setOpenDropdown 
}) {
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpenDropdown(null);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setOpenDropdown]);

    const handleToggle = (e) => {
        e.stopPropagation();
        setOpenDropdown(openDropdown === itemId ? null : itemId);
    };

    return (
        <td className="py-2 px-4 text-right relative" ref={dropdownRef}>
            <button
                onClick={handleToggle}
                className="p-2 rounded hover:bg-gray-200 text-gray-600"
            >
                <HiDotsHorizontal size={20} />
            </button>

            {openDropdown === itemId && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-xl z-10 overflow-hidden">
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">
                        Detail
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">
                        Edit
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-600">
                        Hapus
                    </button>
                </div>
            )}
        </td>
    );
}