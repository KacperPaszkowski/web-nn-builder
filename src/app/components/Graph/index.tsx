import ReactFlow, { Background, BackgroundVariant, ReactFlowProvider, Node as NodeType, NodeProps, applyNodeChanges, applyEdgeChanges, addEdge, OnNodesChange, OnEdgesChange, OnConnect, Edge } from "reactflow";
import 'reactflow/dist/style.css';
import Node from "../Node";
import { NodeDefinition } from "@/app/types";
import { useCallback, useState } from "react";
import NodeEdge from "../Connection";
import { shallow } from 'zustand/shallow'
import useStore from "@/app/store/store";
import { RFState } from "@/app/types";
import ToolBar from "../ToolBar";

const selector = (state: RFState) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
});

const initialNodes: NodeType[] = [
    { id: '1', type: 'layer', position: { x: 0, y: 0 }, data: { name: 'Conv2D', variables: [{ id: '1', name: 'Filters' }, { id: '2', name: 'Kernel size' }], inputs: [{ id: '1', name: 'in1' }], outputs: [{ id: '1', name: 'out1' }] } },
    { id: '2', type: 'layer', position: { x: 0, y: 0 }, data: { name: 'Conv2D', variables: [{ id: '1', name: 'Filters' }, { id: '2', name: 'Kernel size' }], inputs: [{ id: '1', name: 'in1' }], outputs: [{ id: '1', name: 'out1' }] } },
];

const edgeTypes = {
    "node": NodeEdge
}

const nodeTypes = {
    "layer": Node
}

function Graph() {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);


    return (
        <ReactFlowProvider>
            <div className="w-screen h-screen">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    proOptions={{ hideAttribution: true }}
                    nodesDraggable={true}
                    elementsSelectable={true}
                >
                    <Background variant={BackgroundVariant.Dots} gap={30} size={1} />
                    <ToolBar />
                </ReactFlow>

                {/* <ReactFlow
                    id='main'
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onEdgeUpdate={onEdgeUpdate}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    proOptions={{ hideAttribution: true }}
                >
                    
                    <Background variant={BackgroundVariant.Dots} gap={30} size={1} />
                </ReactFlow> */}
            </div>
        </ReactFlowProvider>
    );
}

export default Graph;