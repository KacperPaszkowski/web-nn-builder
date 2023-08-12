import useStore from '@/app/store/store';
import { RFState } from '@/app/types';
import { BsGrid3X3 } from 'react-icons/bs'
import { MdOutlineInput, MdOutlinePhotoSizeSelectSmall } from 'react-icons/md'
import { TbArrowMerge } from 'react-icons/tb'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { Conv2D, Input, MaxPool2D, Concat, Add } from '@/app/nodedef'

function ToolBar() {
    const state: RFState = useStore()

    return (
        <div
            className="flex flex-col absolute left-0 top-1/3 w-12 bg-background bg-node z-10 rounded-r-md [&>*:first-child]:rounded-tr-md [&>*:last-child]:rounded-br-md"
        >
            <div
                className="w-12 h-12 bg-background bg-node hover:bg-node-header"
                onClick={() => state.addNode(Input())}
            >
                <MdOutlineInput
                    className="w-full h-full p-3 text-white cursor-pointer"
                />
            </div>

            <div
                className="w-12 h-12 bg-background bg-node hover:bg-node-header"
                onClick={() => state.addNode(Conv2D())}
            >
                <BsGrid3X3
                    className="w-full h-full p-3 text-white cursor-pointer"
                />
            </div>

            <div
                className="w-12 h-12 bg-background bg-node hover:bg-node-header"
                onClick={() => state.addNode(MaxPool2D())}
            >
                <MdOutlinePhotoSizeSelectSmall
                    className="w-full h-full p-3 text-white cursor-pointer"
                />
            </div>

            <div
                className="w-12 h-12 bg-background bg-node hover:bg-node-header"
                onClick={() => state.addNode(Concat())}
            >
                <TbArrowMerge
                    className="w-full h-full p-3 text-white cursor-pointer"
                />
            </div>

            <div
                className="w-12 h-12 bg-background bg-node hover:bg-node-header"
                onClick={() => state.addNode(Add())}
            >
                <AiOutlinePlusCircle
                    className="w-full h-full p-3 text-white cursor-pointer"
                />
            </div>

        </div>
    );
}

export default ToolBar;