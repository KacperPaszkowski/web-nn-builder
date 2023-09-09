import { ConvTransform, InputTransform, MaxPool2DTransform, ConcatTransform, AddTransform, VariableTransform, MulTransform } from "./types"

export const convTransform = ({ input = [NaN, NaN, NaN], filters = 1, kernel_size = 3, padding = 0, stride = 1, dilation = 1 }: ConvTransform) => {
    const hout = Math.trunc(((input[1] + (2 * padding) - (dilation * (kernel_size - 1)) - 1) / stride) + 1)
    const wout = Math.trunc(((input[2] + (2 * padding) - (dilation * (kernel_size - 1)) - 1) / stride) + 1)

    return { 'output': [filters ? filters : 1, hout, wout] }
}

export const inputTransform = ({ width, height, channels }: InputTransform) => {
    return { 'output': [channels ? channels : 1, width ? width : 128, height ? height : 128] }
}

export const maxPool2dTransform = ({ input, kernel_size = 2, stride = NaN, padding = 0, dilation = 0 }: MaxPool2DTransform) => {
    const hout = Math.trunc(((input[1] + (2 * padding) - (dilation * (kernel_size - 1)) - 1) / stride) + 1)
    const wout = Math.trunc(((input[2] + (2 * padding) - (dilation * (kernel_size - 1)) - 1) / stride) + 1)

    return { 'output': [input?.[0], hout, wout] }
}

export const concatTransform = ({ input_a, input_b }: ConcatTransform) => {
    if (input_a && input_b) {
        return { 'output': [input_a[0] + input_b[0], input_a[1], input_a[2]] }
    }
    return { 'output': [0, 0, 0] }
}

export const addTransform = ({ input_a, input_b }: AddTransform) => {
    if (input_a && input_b) {
        return { 'output': input_a }
    }
    return { 'output': [0, 0, 0] }
}

// VALUE TRANFORMS
export const variableTransform = ({ value }: VariableTransform) => {
    return value
}

export const mulTransform = ({ factor_a, factor_b }: MulTransform) => {
    return factor_a * factor_b
}