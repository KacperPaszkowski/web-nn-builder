import ReactFlow, { Background, BackgroundVariant, ReactFlowProvider, Node as NodeType, NodeProps, applyNodeChanges, applyEdgeChanges, addEdge, OnNodesChange, OnEdgesChange, OnConnect, Edge } from "reactflow";
import 'reactflow/dist/style.css';
import Node from "../Node";
import { v4 as uuidv4 } from 'uuid'
import { NodeDefinition } from "@/app/types";
import { useCallback, useContext, useState } from "react";
import NodeEdge from "../Connection";
import { shallow } from 'zustand/shallow'
import { RFState } from "@/app/types";
import ToolBar from "../ToolBar";
import { StoreApi, UseBoundStore } from "zustand";
import { StoreContext } from "@/app/store/provider";
import ContextMenu from "../ContextMenu";

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
    const store = useContext(StoreContext);
    if (!store) {
        return <></>
    }
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = store(selector, shallow);


    return (
        <ReactFlowProvider>
            <div className="w-screen h-screen">
                <ContextMenu>
                    <ReactFlow
                        id={uuidv4()}
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
                        multiSelectionKeyCode="Control"
                    >
                        <Background variant={BackgroundVariant.Dots} gap={30} size={1} />
                        <ToolBar />
                    </ReactFlow>
                </ContextMenu>
            </div>
        </ReactFlowProvider>
    );
}

export default Graph;