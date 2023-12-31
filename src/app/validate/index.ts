import { Connection, Edge, getIncomers } from "reactflow";
import { Node } from "reactflow";
import { NodeVariable } from "../types";

const checkTypeMatch = (nodes: Node[], connection: Connection) => {
    const sourceNode = nodes.filter((node) => (
        node.id == connection.source
    ))[0]
    // var sourceVariables = sourceNode.data.variables.map((variable: NodeVariable) => (
    // variable.id
    // ))

    const isSourceVariable = sourceNode.type == "value" //sourceVariables.includes(connection.sourceHandle) ||

    const targetNode = nodes.filter((node) => (
        node.id == connection.target
    ))[0]

    var targetVariables = targetNode.data.variables.map((variable: NodeVariable) => (
        variable.id
    ))
    const isTargetVariable = targetVariables.includes(connection.targetHandle)
    console.log(isSourceVariable, isTargetVariable, sourceNode.type, targetNode.type)
    return isSourceVariable == isTargetVariable && sourceNode.type == targetNode.type
}

export const validateConnection = (nodes: Node[], edges: Edge[], connection: Connection) => {
    if (!checkTypeMatch(nodes, connection)) return false
    if (connection.source == connection.target) return false
    const targetNode = nodes.filter((node) => (
        node.id == connection.target
    ))[0]
    const incommingEdges = edges.filter((edge) => (
        edge.targetHandle == connection.targetHandle
    ))

    return incommingEdges.length == 0
}