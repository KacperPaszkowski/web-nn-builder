import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Handle, Position, Node as NodeType, NodeProps, useReactFlow } from 'reactflow';
import Input from '../Input';
import { NodeDefinition, NodeInput, NodeOutput, NodeVariable, NodeVariableValues, RFState } from '@/app/types';
import { validateConnection } from "@/app/validate";
import { v4 as uuidv4 } from 'uuid'
import AccordionVariables from './variables';
import { StoreContext } from '@/app/store/provider';

type NodeData = {
    name: string
    transform?: (inputs: { [key: string]: number[] }) => number[]
    variables?: NodeVariable[]
    variableValues: NodeVariableValues
    inputs?: NodeInput[]
    outputs?: NodeOutput[]
}

function ValueNode({ id, selected, data }: NodeProps<NodeData>) {
    const [value, setValue] = useState<number>(data.variableValues.value);
    console.log(data)
    const store = useContext(StoreContext);
    if (!store) {
        return <></>
    }

    const state: RFState = store()

    const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!Number.isNaN(parseInt(event.target.value))) {
            state.onVariableChange(id, parseInt(event.target.value))
            state.setNodeVariable(id, { name: "value", value: parseInt(event.target.value) })
        }
    }

    return (
        <div
            className={`flex flex-col w-48 bg-background bg-node rounded-md shadow-lg [&>*:last-child]:rounded-b-md [&>*:last-child]:mb-3 ${selected ? 'ring-1' : ""}`}
        >
            <div
                className='flex justify-center items-center w-full h-10 bg-background bg-node-header rounded-md shadow-lg font-roboto text-md text-white mb-3'
            >
                {data.name}
            </div>
            {/* {(data.variables ?? []).length > 0 &&
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
            } */}

            {data.variables?.map((variable) => (
                <div
                    key={variable.id}
                    className='flex flex-row items-center w-full'
                >
                    {/* <p
                        className='text-neutral-300 text-md px-1 font-roboto uppercase'
                    >
                        {variable.name}
                    </p> */}
                    <div
                        className='flex flex-col gap-3 w-full px-3'
                    >
                        <Input
                            key={variable.id}
                            name={variable.name}
                            value={value}
                            onChange={onValueChange}
                        // onChange={(event) => handleVariableChange(event, variable.name)}
                        />
                    </div>
                    <Handle style={{
                        position: 'relative',
                        transform: 'translate(0,0)',
                        top: '0',
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#7e22ce'
                    }}
                        id={variable.id}
                        type='source'
                        position={Position.Right}
                        isValidConnection={(connection) => validateConnection(state.nodes, state.edges, connection)}

                    />
                </div>
            ))}
        </div>
    );
}

export default ValueNode;
