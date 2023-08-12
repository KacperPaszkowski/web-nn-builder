import React from 'react';
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath } from 'reactflow';

type EdgeData = number[]

export default function NodeEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    source,
    target,
    data,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
}: EdgeProps<EdgeData>) {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        fontSize: 12,
                        // everything inside EdgeLabelRenderer has no pointer events by default
                        // if you have an interactive element, set pointer-events: all
                        pointerEvents: 'all',
                    }}
                    className="nodrag nopan"
                >
                    <div
                        className='flex justify-center items-center h-8 rounded-full bg-blue-600 px-3'
                    >
                        <p
                            className='text-white font-bold'
                        >
                            {data?.join(", ")}
                        </p>
                    </div>
                </div>
            </EdgeLabelRenderer>
        </>
    );
}