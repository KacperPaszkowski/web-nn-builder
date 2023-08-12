import { ChangeEvent, useState } from "react";
import { v4 as uuidv4 } from 'uuid'

interface InputProps {
    name: string
    value: number
    type?: string
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

function Input({ name, type = "text", onChange, value }: InputProps) {
    const [inputValue, setInputValue] = useState<string | number>(value);

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.value || /^\d+$/.test(event.target.value)) {
            setInputValue(event.target.value);
            if (!Number.isNaN(parseInt(event.target.value))) {
                onChange?.(event)
            }
        }
    }

    const id = uuidv4()

    return (
        <div
            className="rounded-lg nodrag"
        >
            <div
                className="relative bg-inherit"
            >
                <input
                    type={type}
                    id={id}
                    name="username"
                    className="peer bg-transparent h-8 w-full rounded-md text-neutral-200 placeholder-transparent ring-1 px-3 ring-neutral-700 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
                    placeholder="k"
                    onChange={handleInput}
                    value={inputValue}
                />

                <label
                    htmlFor={id}
                    className="absolute cursor-text left-1 -top-2 text-xs text-neutral-500 bg-inherit peer-placeholder-shown:text-sm peer-placeholder-shown:leading-6 peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:top-1 peer-focus:-top-2 peer-focus:text-sky-600 peer-focus:text-xs transition-all"
                >
                    <div
                        className="bg-background bg-node px-1"
                    >
                        {name}
                    </div>
                </label>
            </div>
        </div>
    );
}

export default Input;