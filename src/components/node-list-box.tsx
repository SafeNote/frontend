'use client';

import { Listbox, Transition } from '@headlessui/react';
import { Level } from '@tiptap/extension-heading';
import { Editor, isActive } from '@tiptap/react';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

type Node = {
    type: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    action: (editor: Editor) => void;
    name: string;
    node: 'paragraph' | 'heading';
    attributes?: {
        level: Level;
    };
};

const nodes: Node[] = [
    {
        type: 'p',
        action: editor => editor.chain().focus().setParagraph().run(),
        name: 'Paragraph',
        node: 'paragraph',
    },
    {
        type: 'h1',
        action: editor => editor.chain().focus().setHeading({ level: 1 }).run(),
        name: 'Heading 1',
        node: 'heading',
        attributes: {
            level: 1,
        },
    },
    {
        type: 'h2',
        action: editor => editor.chain().focus().setHeading({ level: 2 }).run(),
        name: 'Heading 2',
        node: 'heading',
        attributes: {
            level: 2,
        },
    },
    {
        type: 'h3',
        action: editor => editor.chain().focus().setHeading({ level: 3 }).run(),
        name: 'Heading 3',
        node: 'heading',
        attributes: {
            level: 3,
        },
    },
    {
        type: 'h4',
        action: editor => editor.chain().focus().setHeading({ level: 4 }).run(),
        name: 'Heading 4',
        node: 'heading',
        attributes: {
            level: 4,
        },
    },
    {
        type: 'h5',
        action: editor => editor.chain().focus().setHeading({ level: 5 }).run(),
        name: 'Heading 5',
        node: 'heading',
        attributes: {
            level: 5,
        },
    },
    {
        type: 'h6',
        action: editor => editor.chain().focus().setHeading({ level: 6 }).run(),
        name: 'Heading 6',
        node: 'heading',
        attributes: {
            level: 6,
        },
    },
];

export const NodeListBox = ({ editor }: { editor: Editor }) => {
    const [selectedNode, setSelectedNode] = useState<Node>(nodes.at(0)!);

    useEffect(() => {
        const setCurrentNode = () => {
            const node = nodes.find(n =>
                isActive(editor.state, n.node, n.attributes)
            );
            if (node !== undefined && node.type !== selectedNode.type) {
                setSelectedNode(node);
            }
        };
        editor.on('transaction', setCurrentNode);

        return () => {
            editor.off('transaction', setCurrentNode);
        };
    }, [editor, selectedNode.type]);

    return (
        <Listbox
            as='div'
            value={selectedNode}
            onChange={(node: Node) => {
                node.action(editor);
                setSelectedNode(node);
            }}
            className='relative z-10 inline-block text-left'>
            {({ open }) => (
                <>
                    <Listbox.Button className='inline-flex items-center justify-center gap-1 rounded bg-gray-300 px-1.5 py-1 text-sm font-medium text-gray-600'>
                        {selectedNode.name}
                        <ChevronDown
                            size={20}
                            className='transition ui-open:rotate-180'
                        />
                    </Listbox.Button>
                    <Transition
                        show={open}
                        enter='transition duration-100 ease-out'
                        enterFrom='transform scale-95 opacity-0'
                        enterTo='transform scale-100 opacity-100'
                        leave='transition duration-75 ease-out'
                        leaveFrom='transform scale-100 opacity-100'
                        leaveTo='transform scale-95 opacity-0'>
                        <Listbox.Options className='absolute inset-0 left-0 z-50 mt-2 origin-top-left cursor-pointer divide-y divide-gray-100 rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            <div className='px-1 py-1'>
                                {nodes.map(node => (
                                    <Listbox.Option
                                        key={node.type}
                                        value={node}
                                        className='group flex w-full items-center gap-1 rounded px-1.5 py-1 text-sm font-medium ui-active:bg-brand ui-active:text-white ui-not-active:bg-white ui-not-active:text-gray-700'>
                                        {node.name}
                                    </Listbox.Option>
                                ))}
                            </div>
                        </Listbox.Options>
                    </Transition>
                </>
            )}
        </Listbox>
    );
};
