import { Connection, Edge, getIncomers } from "reactflow";
import { Node } from "reactflow";

export const validateConnection = (nodes: Node[], edges: Edge[], connection: Connection) => {
    if (connection.source == connection.target) return false
    const targetNode = nodes.filter((node) => (
        node.id == connection.target
    ))[0]
    const incommingEdges = edges.filter((edge) => (
        edge.targetHandle == connection.targetHandle
    ))

    return incommingEdges.length == 0
}