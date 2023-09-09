import React, { ReactNode, Ref } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { AccordionItemProps } from '@radix-ui/react-accordion';
import { BsThreeDots } from 'react-icons/bs'

const AccordionVariables = ({ children, contentRef }: { children: ReactNode, contentRef: Ref<HTMLDivElement> }) => (
    <AccordionPrimitive.Root
        className="bg-background bg-node rounded-md"
        type="single"
        defaultValue="i-0"
        collapsible
    >
        <AccordionItem
            value='i-0'
        >
            <AccordionTrigger> </AccordionTrigger>
            <AccordionContent ref={contentRef}>
                {children}
            </AccordionContent>
        </AccordionItem>
    </AccordionPrimitive.Root>
);

const AccordionItem = React.forwardRef(({ children, value, ...props }: { children: ReactNode, value: string }, forwardedRef) => (
    <AccordionPrimitive.Item
        className={'mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 '}
        {...props as AccordionItemProps}
        value={value}
        ref={forwardedRef as Ref<HTMLDivElement>}
    >
        {children}
    </AccordionPrimitive.Item>
));

AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ children, ...props }: { children?: ReactNode }, forwardedRef) => (
    <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
            className='text-white h-6 group flex flex-row justify-center items-center flex-1 cursor-default bg-background bg-node text-[15px] leading-none outline-none'

            {...props}
            ref={forwardedRef as Ref<HTMLButtonElement>}
        >
            <BsThreeDots
                className="text-white ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180 cursor-pointer"
                aria-hidden
            />
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header >
));
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef(({ children, ...props }: { children: ReactNode }, forwardedRef) => (
    <AccordionPrimitive.Content
        className={'bg-background bg-node data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]'}
        {...props}
        ref={forwardedRef as Ref<HTMLDivElement>}
    >
        <div className="py-[15px]">{children}</div>
    </AccordionPrimitive.Content>
));

AccordionContent.displayName = "AccordionContent"


export default AccordionVariables;