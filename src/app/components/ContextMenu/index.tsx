import React, { ReactNode, useContext } from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { BsDot, BsChevronRight } from 'react-icons/bs'
import { AiOutlineCheck } from 'react-icons/ai'
import { useStoreApi } from 'reactflow';
import { StoreContext } from '@/app/store/provider';
import { RFState } from '@/app/types';
import { Add, Concat, Conv2D, Input, MaxPool2D } from '@/app/nodedef';

const ContextMenu = ({ children }: { children: ReactNode }) => {
    const apiStore = useStoreApi();

    const store = useContext(StoreContext);
    if (!store) {
        return <></>
    }

    const state: RFState = store()

    const getPosition = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const {
            height,
            width,
            transform: [transformX, transformY, zoomLevel]
        } = apiStore.getState();

        const zoomMultiplier = 1 / zoomLevel;

        const centerX = -transformX * zoomMultiplier + event.clientX;
        const centerY = -transformY * zoomMultiplier + event.clientY;

        return { 'x': centerX, 'y': centerY }
    }

    return (
        <ContextMenuPrimitive.Root>
            <ContextMenuPrimitive.Trigger>
                {children}
            </ContextMenuPrimitive.Trigger>
            <ContextMenuPrimitive.Portal>
                <ContextMenuPrimitive.Content
                    className="min-w-[220px] bg-background bg-node rounded-md overflow-hidden p-[5px] shadow-md"
                >
                    <ContextMenuPrimitive.Sub>
                        <ContextMenuPrimitive.SubTrigger className="group text-[13px] leading-none text-violet1 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-violet9 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1">
                            Add layer
                        </ContextMenuPrimitive.SubTrigger>
                        <ContextMenuPrimitive.Portal>
                            <ContextMenuPrimitive.SubContent
                                className="min-w-[220px] bg-background bg-node rounded-md overflow-hidden p-[5px] shadow-md"
                                sideOffset={2}
                                alignOffset={-5}
                            >
                                <ContextMenuPrimitive.Item
                                    className="group text-[13px] leading-none text-violet1 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                                    onClick={(event) => state.addNode(Input(getPosition(event)))}
                                >
                                    Input
                                </ContextMenuPrimitive.Item>
                                <ContextMenuPrimitive.Item
                                    className="text-[13px] leading-none text-violet1 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                                    onClick={(event) => state.addNode(Conv2D(getPosition(event)))}
                                >
                                    Conv2D
                                </ContextMenuPrimitive.Item>
                                <ContextMenuPrimitive.Item
                                    className="text-[13px] leading-none text-violet1 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                                    onClick={(event) => state.addNode(MaxPool2D(getPosition(event)))}
                                >
                                    MaxPool2D
                                </ContextMenuPrimitive.Item>
                                <ContextMenuPrimitive.Item
                                    className="text-[13px] leading-none text-violet1 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                                    onClick={(event) => state.addNode(Concat(getPosition(event)))}
                                >
                                    Concat
                                </ContextMenuPrimitive.Item>
                                <ContextMenuPrimitive.Item
                                    className="text-[13px] leading-none text-violet1 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                                    onClick={(event) => state.addNode(Add(getPosition(event)))}
                                >
                                    Add
                                </ContextMenuPrimitive.Item>
                            </ContextMenuPrimitive.SubContent>
                        </ContextMenuPrimitive.Portal>
                    </ContextMenuPrimitive.Sub>
                </ContextMenuPrimitive.Content>
            </ContextMenuPrimitive.Portal>
        </ContextMenuPrimitive.Root>
    );
};

export default ContextMenu;