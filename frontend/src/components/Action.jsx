import React, { useRef, useEffect } from "react";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
export default function Action({ itemId, onDetail, onEdit, onDelete }) {
  return (
    <td className="py-2 px-4 text-right relative">
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={() => {
            onDetail(itemId);
          }}
          className="text-blue-600 hover:text-blue-800"
        >
          <AiOutlineEye size={20} />
        </button>

        <button
          onClick={() => {
            onEdit(itemId);
          }}
          className="text-yellow-600 hover:text-yellow-800"
        >
          <AiOutlineEdit size={20} />
        </button>

        <button
          onClick={() => {
            onDelete(itemId);
          }}
          className="text-red-600 hover:text-red-800"
        >
          <AiOutlineDelete size={20} />
        </button>
      </div>
    </td>
  );
}
