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
import ValueNode from "../ValueNode";
import VariableEdge from "../VariableConnection";

const selector = (state: RFState) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
});


const edgeTypes = {
    "layer": NodeEdge,
    "value": VariableEdge
}

const nodeTypes = {
    "layer": Node,
    "value": ValueNode
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