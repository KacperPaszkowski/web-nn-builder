import * as React from 'react';
import { useState, useEffect, useContext, useRef } from 'react';
import { Handle, Position, Node as NodeType, NodeProps, useReactFlow, Connection } from 'reactflow';
import Input from '../Input';
import { NodeDefinition, NodeInput, NodeOutput, NodeVariable, NodeVariableValues, RFState } from '@/app/types';
import { validateConnection } from "@/app/validate";
import { v4 as uuidv4 } from 'uuid'
import AccordionVariables from './variables';
import { StoreContext } from '@/app/store/provider';
import { useUpdateNodeInternals } from 'reactflow';

type NodeData = {
    name: string
    transform?: (inputs: { [key: string]: number[] }) => number[]
    variables?: NodeVariable[]
    variableValues: NodeVariableValues
    inputs?: NodeInput[]
    outputs?: NodeOutput[]
}

function Node({ id, selected, data }: NodeProps<NodeData>) {
    const [hidden, setHidden] = useState(false);
    const updateNodeInternals = useUpdateNodeInternals();
    const accordionRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        if (accordionRef.current?.clientHeight as number < 50) {
            setHidden(true)
        }
        else {
            setHidden(false)
        }
        updateNodeInternals(id)
    }, [accordionRef.current?.clientHeight, id, updateNodeInternals])

    const store = useContext(StoreContext);
    if (!store) {
        return <></>
    }

    const state: RFState = store()

    const handleVariableChange = (event: React.ChangeEvent<HTMLInputElement>, varName: string) => {
        if (!Number.isNaN(parseInt(event.target.value))) {
            state.setNodeVariable(id, { name: varName, value: parseInt(event.target.value) })
        }
    }

    // const onStateChange = (nodeState: number) => {
    //     state.setNodeVariable(id, {name: "isHidden", value: nodeState})
    // }

    return (
        <div
            className={`flex flex-col w-60 bg-background bg-node rounded-md shadow-lg [&>*:last-child]:rounded-b-md [&>*:last-child]:mb-3 ${selected ? 'ring-1' : ""}`}
        >
            <div
                className={`flex flex-col gap-3 py-[15px] justify-start items-center z-20 top-16 -left-[4px] absolute overflow-y-hidden overflow-x-hidden`}
                style={{
                    height: accordionRef.current?.clientHeight + "px",
                    opacity: accordionRef.current?.clientHeight ?? 0,
                }}
            >
                {data.variables?.map((variable) => (
                    <div
                        key={variable.id}
                        className={`h-8 ${hidden ? 'absolute' : 'relative'} flex flex-row justify-center items-center`}
                    >
                        <Handle style={{
                            position: 'relative',
                            transform: `${hidden ? 'translate(100%,-200%)' : 'translate(50%,0)'}`,
                            top: '0',
                            width: '8px',
                            height: '8px',
                            backgroundColor: '#7e22ce'
                        }}
                            id={variable.id}
                            type='target'
                            position={Position.Left}
                            isValidConnection={(connection) => validateConnection(state.nodes, state.edges, connection)}
                        />
                    </div>

                ))}
            </div>
            <div
                className='flex justify-center items-center w-full h-10 bg-background bg-node-header rounded-md shadow-lg font-roboto text-md text-white'
            >
                {data.name}
            </div>
            {(data.variables ?? []).length > 0 &&
                <AccordionVariables
                    contentRef={accordionRef}
                >
                    <div
                        className='flex flex-col gap-3 mb-3 w-full'
                    >
                        {data.variables?.map((variable) => (
                            <div
                                key={variable.id}
                                className='flex flex-row'
                            >
                                <div
                                    className='px-3'
                                >

                                    <Input
                                        name={variable.displayName}
                                        value={data.variableValues[variable.name]}
                                        onChange={(event) => handleVariableChange(event, variable.name)}
                                    />
                                </div>
                            </div>

                        ))}
                    </div>
                </AccordionVariables>

            }
            {!data.inputs && <Handle style={{
                position: 'relative',
                transform: 'translate(0,0)',
                opacity: `${!hidden ? '0' : '1'}`,
                top: '11px',
                width: '8px',
                height: '8px',
                backgroundColor: '#7e22ce'
            }}
                id={"dummy"}
                type='target'
                position={Position.Left}
                isValidConnection={(connection) => validateConnection(state.nodes, state.edges, connection)}
            />}
            {data.inputs?.map((input) => (
                <div
                    key={input.id}
                    className='flex flex-row justify-start items-center w-full h-8 hover:bg-background hover:bg-node-header'
                >
                    <Handle style={{
                        position: 'relative',
                        transform: 'translate(0,0)',
                        top: '0',
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#3b82f6'
                    }}
                        id={input.id}
                        type='target'
                        position={Position.Left}
                        isValidConnection={(connection) => validateConnection(state.nodes, state.edges, connection)}
                    />
                    <p
                        className='text-neutral-300 text-md px-1 font-roboto uppercase'
                    >
                        {input.name}
                    </p>
                </div>
            ))}

            {data.outputs?.map((output) => (
                <div
                    key={output.id}
                    className='flex flex-row justify-end items-center w-full h-8 hover:bg-background hover:bg-node-header'
                >
                    <p
                        className='text-neutral-300 text-md px-1 font-roboto uppercase'
                    >
                        {output.name}
                    </p>
                    <Handle style={{
                        position: 'relative',
                        transform: 'translate(0,0)',
                        top: '0',
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#2563eb'
                    }}
                        id={output.id}
                        type='source'
                        position={Position.Right}
                        isValidConnection={(connection) => validateConnection(state.nodes, state.edges, connection)}

                    />
                </div>
            ))}
        </div>
    );
}

export default Node;
