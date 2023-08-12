import * as React from 'react';
import { useState, useEffect } from 'react';
import { Handle, Position, Node as NodeType, NodeProps, useReactFlow } from 'reactflow';
import Input from '../Input';
import { NodeDefinition, NodeInput, NodeOutput, NodeVariable, NodeVariableValues, RFState } from '@/app/types';
import { validateConnection } from "@/app/validate";
import { v4 as uuidv4 } from 'uuid'
import useStore from '@/app/store/store';
import AccordionVariables from './variables';

type NodeData = {
    name: string
    transform?: (inputs: { [key: string]: number[] }) => number[]
    variables?: NodeVariable[]
    variableValues: NodeVariableValues
    inputs?: NodeInput[]
    outputs?: NodeOutput[]
}

function Node({ id, data }: NodeProps<NodeData>) {
    const state: RFState = useStore()

    const handleVariableChange = (event: React.ChangeEvent<HTMLInputElement>, varName: string) => {
        if (!Number.isNaN(parseInt(event.target.value))) {
            state.setNodeVariable(id, { name: varName, value: parseInt(event.target.value) })
        }
    }

    return (
        <div
            className='flex flex-col w-60 bg-background bg-node rounded-md shadow-lg [&>*:last-child]:rounded-b-md [&>*:last-child]:mb-3'
        >
            <div
                className='flex justify-center items-center w-full h-10 bg-background bg-node-header rounded-md shadow-lg font-roboto text-md text-white mb-3'
            >
                {data.name}
            </div>
            {(data.variables ?? []).length > 0 &&
                <AccordionVariables>
                    <div
                        className='flex flex-col gap-3 mb-3 w-full'
                    >
                        {data.variables?.map((variable) => (
                            <Input
                                key={variable.id}
                                name={variable.displayName}
                                value={data.variableValues[variable.name]}
                                onChange={(event) => handleVariableChange(event, variable.name)}
                            />
                        ))}
                    </div>
                </AccordionVariables>
            }
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
                        isValidConnection={validateConnection}
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
                        isValidConnection={validateConnection}

                    />
                </div>
            ))}
        </div>
    );
}

export default Node;
