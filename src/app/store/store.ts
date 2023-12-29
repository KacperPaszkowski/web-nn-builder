import { create } from 'zustand';
import { NodeInput, NodeOutput, NodeVariable, RFState } from '../types';
import {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    addEdge,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    applyNodeChanges,
    applyEdgeChanges,
    getIncomers,
    getOutgoers,
} from 'reactflow';
import { initialNodes } from '../init';


export const createStore = () => {
    return create<RFState>((set, get) => ({
        nodes: initialNodes,
        edges: [],

        propagateValue: (node: Node) => {
            // if (node.type == 'value'){
            //     const outgoers = getOutgoers(node, get().nodes, get().edges)
            //     outgoers.map((outgoer) => {
            //         get().updateValue(outgoer)
            //         get().propagateValue(outgoer)
            //     })                

            // }
            if (node.type != "value") get().updateValue(node)
            const outgoers = getOutgoers(node, get().nodes, get().edges)
            outgoers.map((outgoer) => {
                get().updateValue(outgoer)
                get().propagateValue(outgoer)
            })
        },

        setNodeVariable: (nodeId: string, variable: { name: string, value: number }) => {
            set({
                nodes: get().nodes.map((oldNode) => {
                    if (oldNode.id == nodeId) {
                        oldNode.data = {
                            ...oldNode.data,
                            variableValues: {
                                ...oldNode.data.variableValues,
                                [variable.name]: variable.value
                            }
                        }
                    }
                    return oldNode
                })
            })
            get().propagateValue(get().getNode(nodeId))
        },

        setNodeValue: (node: Node) => {
            set({
                nodes: get().nodes.map((oldNode) => {
                    if (oldNode.id == node.id) {
                        oldNode.data.values = node.data.values
                    }
                    return oldNode
                })
            })
        },

        getHandleName: (io: NodeInput[] | NodeOutput[], handleId: string) => {
            const handleName = io.filter((entry) => (
                entry.id == handleId
            ))[0].name

            return handleName
        },

        updateEdges: (node: Node) => {
            set({
                edges: get().edges.map((edge) => {
                    if (edge.source == node.id) {
                        const sourceName = get().getHandleName(node.data.outputs, edge.sourceHandle as string)
                        const sourceValue = node.data.values[sourceName]

                        edge.data = sourceValue
                    }
                    return edge
                })
            })

        },

        updateValue: (node: Node) => {
            var inputEdges = get().edges.filter((edge) => (
                edge.target == node.id
            ))

            // Ensure that edges connecting variables are not taken into consideration
            inputEdges = inputEdges.filter((edge: Edge) => (
                get().getNode(edge.source).type != 'value'
            ))

            var values = inputEdges.map((edge) => {
                const sourceNode = get().getNode(edge.source)
                const sourceName = get().getHandleName(sourceNode.data.outputs, edge.sourceHandle as string)
                const targetName = get().getHandleName(node.data.inputs, edge.targetHandle as string)

                return {
                    [targetName]: sourceNode.data.values[sourceName]
                }
            })

            var nodeInputs = values.reduce<{ [key: string]: number }>((acc, obj) => {
                return { ...acc, ...obj };
            }, {});

            var newValues = node.data.transform({ ...nodeInputs, ...node.data.variableValues })
            node.data.values = newValues
            get().setNodeValue(node)
            get().updateEdges(node)

        },

        getNode: (id: string) => {
            return get().nodes.filter((node) => (
                node.id == id
            ))[0]
        },

        addNode: (node: Node) => {
            set({
                nodes: [...get().nodes, node]
            })
        },

        onNodesChange: (changes: NodeChange[]) => {
            set({
                nodes: applyNodeChanges(changes, get().nodes),
            });
        },
        onEdgesChange: (changes: EdgeChange[]) => {
            set({
                edges: applyEdgeChanges(changes, get().edges),
            });
        },
        onConnect: (connection: Connection) => {
            var edge = (connection as Edge)
            // if (get().getNode(edge.source).type == "value") edge.type = "value"
            edge.type = get().getNode(edge.source).type

            var sourceNode = get().getNode(edge.source)

            edge.data = edge.data ?? {}
            // edge.data = sourceNode.data.values.output

            set({
                edges: addEdge(edge, get().edges),
            });

            get().propagateValue(sourceNode)
        },
        onVariableChange: (nodeId: string, value: number) => {
            const variableNode = get().nodes.filter((node: Node) => (
                node.id == nodeId
            ))[0]

            const connectedEdges = get().edges.filter((edge: Edge) => (
                edge.source == nodeId
            ))

            connectedEdges.map((edge: Edge) => {
                const connectedNode = get().nodes.filter((node: Node) => (
                    node.id == edge.target
                ))[0]

                const variable = connectedNode.data.variables.filter((variable: NodeVariable) => (
                    variable.id == edge.targetHandle
                ))[0]

                get().setNodeVariable(connectedNode.id, { name: variable.name, value: value })
            })
        },
    }))
};

// const useStore = createStore();
// const useCustomStore = createStore()

// export { useCustomStore }
// export default useStore