import { RFState } from '@/app/types';
import { BsGrid3X3 } from 'react-icons/bs'
import { MdOutlineInput, MdOutlinePhotoSizeSelectSmall } from 'react-icons/md'
import { TbArrowMerge } from 'react-icons/tb'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { Conv2D, Input, MaxPool2D, Concat, Add, Variable, MulOp } from '@/app/nodedef'
import { useStoreApi } from 'reactflow';
import { StoreApi, UseBoundStore } from 'zustand';
import { useContext } from 'react';
import { StoreContext } from '@/app/store/provider';

function ToolBar() {
    const apiStore = useStoreApi();

    const store = useContext(StoreContext);
    if (!store) {
        return <></>
    }

    const state: RFState = store()

    const getPosition = () => {
        const {
            height,
            width,
            transform: [transformX, transformY, zoomLevel]
        } = apiStore.getState();

        const zoomMultiplier = 1 / zoomLevel;

        const centerX = -transformX * zoomMultiplier + (width * zoomMultiplier) / 2;
        const centerY =
            -transformY * zoomMultiplier + (height * zoomMultiplier) / 2;

        return { 'x': centerX - 100, 'y': centerY - 100 }
    }

    return (
        <div
            className="flex flex-col absolute left-0 top-1/3 w-12 bg-background bg-node z-10 rounded-r-md [&>*:first-child]:rounded-tr-md [&>*:last-child]:rounded-br-md"
        >
            <div
                className="w-12 h-12 bg-background bg-node hover:bg-node-header"
                onClick={() => state.addNode(Input(getPosition()))}
            >
                <MdOutlineInput
                    className="w-full h-full p-3 text-white cursor-pointer"
                />
            </div>

            <div
                className="w-12 h-12 bg-background bg-node hover:bg-node-header"
                onClick={() => state.addNode(Conv2D(getPosition()))}
            >
                <BsGrid3X3
                    className="w-full h-full p-3 text-white cursor-pointer"
                />
            </div>

            <div
                className="w-12 h-12 bg-background bg-node hover:bg-node-header"
                onClick={() => state.addNode(MaxPool2D(getPosition()))}
            >
                <MdOutlinePhotoSizeSelectSmall
                    className="w-full h-full p-3 text-white cursor-pointer"
                />
            </div>

            <div
                className="w-12 h-12 bg-background bg-node hover:bg-node-header"
                onClick={() => state.addNode(Concat(getPosition()))}
            >
                <TbArrowMerge
                    className="w-full h-full p-3 text-white cursor-pointer"
                />
            </div>

            <div
                className="w-12 h-12 bg-background bg-node hover:bg-node-header"
                onClick={() => state.addNode(Add(getPosition()))}
            >
                <AiOutlinePlusCircle
                    className="w-full h-full p-3 text-white cursor-pointer"
                />
            </div>

            <div
                className="w-12 h-12 bg-background bg-node hover:bg-node-header"
                onClick={() => state.addNode(Variable(getPosition()))}
            >
                <AiOutlinePlusCircle
                    className="w-full h-full p-3 text-white cursor-pointer"
                />
            </div>

            <div
                className="w-12 h-12 bg-background bg-node hover:bg-node-header"
                onClick={() => state.addNode(MulOp(getPosition()))}
            >
                <AiOutlinePlusCircle
                    className="w-full h-full p-3 text-white cursor-pointer"
                />
            </div>

        </div>
    );
}

export default ToolBar;