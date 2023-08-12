import { v4 as uuidv4 } from 'uuid'
import { addTransform, concatTransform, convTransform, inputTransform, maxPool2dTransform } from './transforms'

export const Conv2D = () => ({
    "id": uuidv4(),
    "type": "layer",
    "position": {
        "x": 0,
        "y": 0
    },
    "data": {
        "name": "Conv2D",
        "variables": [
            {
                "id": uuidv4(),
                "name": "filters",
                "displayName": "Filters"
            },
            {
                "id": uuidv4(),
                "name": "kernel_size",
                "displayName": "Kernel size"
            },
            {
                "id": uuidv4(),
                "name": "padding",
                "displayName": "Padding"
            },
            {
                "id": uuidv4(),
                "name": "stride",
                "displayName": "Stride"
            },
            {
                "id": uuidv4(),
                "name": "dilation",
                "displayName": "Dilation"
            }
        ],
        "variableValues": {
            "filters": 1,
            "kernel_size": 3,
            "stride": 1,
            "padding": 1,
            "dilation": 1
        },
        "inputs": [
            {
                "id": uuidv4(),
                "name": "input"
            }
        ],
        "outputs": [
            {
                "id": uuidv4(),
                "name": "output"
            }
        ],
        "transform": convTransform
    }
})

export const Input = () => ({
    "id": uuidv4(),
    "type": "layer",
    "position": {
        "x": 0,
        "y": 0
    },
    "data": {
        "name": "Input",
        "variables": [
            {
                "id": uuidv4(),
                "name": "width",
                "displayName": "Width"
            },
            {
                "id": uuidv4(),
                "name": "height",
                "displayName": "Height"
            },
            {
                "id": uuidv4(),
                "name": "channels",
                "displayName": "Channels"
            }
        ],
        "variableValues": {
            "width": 128,
            "height": 128,
            "channels": 1,
        },
        "outputs": [
            {
                "id": uuidv4(),
                "name": "output"
            }
        ],
        "values": {
            "output": [
                1,
                128,
                128
            ]
        },
        "transform": inputTransform
    }
})

export const MaxPool2D = () => ({
    "id": uuidv4(),
    "type": "layer",
    "position": {
        "x": 0,
        "y": 0
    },
    "data": {
        "name": "MaxPool2D",
        "variables": [
            {
                "id": uuidv4(),
                "name": "kernel_size",
                "displayName": "Kernel size"
            },
            {
                "id": uuidv4(),
                "name": "stride",
                "displayName": "Stride"
            },
            {
                "id": uuidv4(),
                "name": "padding",
                "displayName": "Padding"
            },
            {
                "id": uuidv4(),
                "name": "dilation",
                "displayName": "Dilation"
            }
        ],
        "variableValues": {
            "kernel_size": 3,
            "stride": 1,
            "padding": 1,
            "dilation": 1
        },
        "inputs": [
            {
                "id": uuidv4(),
                "name": "input"
            }
        ],
        "outputs": [
            {
                "id": uuidv4(),
                "name": "output"
            }
        ],
        "transform": maxPool2dTransform
    }
})

export const Concat = () => ({
    "id": uuidv4(),
    "type": "layer",
    "position": {
        "x": 0,
        "y": 0
    },
    "data": {
        "name": "Concat",
        "variables": [
        ],
        "variableValues": {
        },
        "inputs": [
            {
                "id": uuidv4(),
                "name": "input_a"
            },
            {
                "id": uuidv4(),
                "name": "input_b"
            }
        ],
        "outputs": [
            {
                "id": uuidv4(),
                "name": "output"
            }
        ],
        "transform": concatTransform
    }
})

export const Add = () => ({
    "id": uuidv4(),
    "type": "layer",
    "position": {
        "x": 0,
        "y": 0
    },
    "data": {
        "name": "Add",
        "variables": [
        ],
        "variableValues": {
        },
        "inputs": [
            {
                "id": uuidv4(),
                "name": "input_a"
            },
            {
                "id": uuidv4(),
                "name": "input_b"
            }
        ],
        "outputs": [
            {
                "id": uuidv4(),
                "name": "output"
            }
        ],
        "transform": addTransform
    }
})