import React from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
} from "@dnd-kit/sortable";
import DraggableColorBox from "./DraggableColorBox";

function DraggableColorList({ colors, removeColor, onSortEnd }) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        
        if (active.id !== over.id) {
            const oldIndex = colors.findIndex((color) => color.name === active.id);
            const newIndex = colors.findIndex((color) => color.name === over.id);
            onSortEnd({ oldIndex, newIndex });
        }
    };

    return (
        <div style={{ height: "100%" }}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={colors.map(color => color.name)}
                    strategy={rectSortingStrategy}
                >
                    {colors.map((color, i) => (
                        <DraggableColorBox
                            key={color.name}
                            id={color.name}
                            color={color.color}
                            name={color.name}
                            handleClick={() => removeColor(color.name)}
                        />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    );
}

export default DraggableColorList;