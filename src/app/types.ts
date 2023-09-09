import { Edge, Node, OnConnect, OnEdgesChange, OnNodesChange } from 'reactflow'

export interface NodeInput {
    id: string
    name: string
}

export interface NodeOutput {
    id: string
    name: string
}

export interface NodeVariable {
    id: string
    displayName: string
    name: string
}

export type NodeVariableValues = {
    [key: string]: number
}

export interface NodeDefinition extends Node {
    name: string
    inputs?: NodeInput[]
    outputs?: NodeOutput[]
    variables?: NodeVariable[]
}

export type RFState = {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    getNode: (id: string) => Node
    updateValue: (node: Node) => void
    updateEdges: (node: Node) => void
    getHandleName: (io: NodeInput[] | NodeOutput[], handleId: string) => string
    setNodeValue: (node: Node) => void
    setNodeVariable: (nodeId: string, variable: { name: string, value: number }) => void
    propagateValue: (node: Node) => void
    addNode: (node: Node) => void
    onVariableChange: (nodeId: string, value: number) => void //TODO: Support other types 
};

export type ConvTransform = {
    input: number[],
    filters?: number | undefined
    kernel_size?: number | undefined
    padding?: number | undefined
    stride?: number | undefined
    dilation?: number | undefined
}

export type InputTransform = {
    width?: number | undefined
    height?: number | undefined
    channels?: number | undefined
}

export type MaxPool2DTransform = {
    input: number[]
    kernel_size?: number | undefined
    stride?: number | undefined
    padding?: number | undefined
    dilation?: number | undefined
}

export type ConcatTransform = {
    input_a: number[]
    input_b: number[]
}

export type AddTransform = {
    input_a: number[]
    input_b: number[]
}

// VALUE TRANSFORMS
export type VariableTransform = {
    value: number
}

export type MulTransform = {
    factor_a: number
    factor_b: number
}