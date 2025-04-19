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
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
} from "@dnd-kit/sortable";
import DraggableColorBox from "./DraggableColorBox";

function DraggableColorList({ colors, removeColor, onSortEnd }) {
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        
        if (active && over && active.id !== over.id) {
            const oldIndex = colors.findIndex((color) => color.name === active.id);
            const newIndex = colors.findIndex((color) => color.name === over.id);
            if (oldIndex !== -1 && newIndex !== -1) {
                onSortEnd({ oldIndex, newIndex });
            }
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
                    <div style={{ height: "100%" }}>
                        {colors.map((color) => (
                            <DraggableColorBox
                                key={color.name}
                                id={color.name}
                                color={color.color}
                                name={color.name}
                                handleClick={() => removeColor(color.name)}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}

export default DraggableColorList;