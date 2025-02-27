import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type SortableItemProps = {
  id: number | string;
  children: React.ReactNode;
};

const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative  rounded shadow-md"
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute top-0 left-0 cursor-grab "
      >
        🟰
      </div>

      {children}
    </div>
  );
};

export default SortableItem;
