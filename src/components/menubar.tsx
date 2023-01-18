import { AlertType } from '@/components/alert';
import { Highlight } from '@/components/highlight';
import { MenuBarItem } from '@/components/menubar-item';
import { NodeListBox } from '@/components/node-list-box';
import { TextColor } from '@/components/text-color';
import { Editor } from '@tiptap/react';
import {
    Bold,
    Code,
    CurlyBraces,
    Italic,
    List,
    ListChecks,
    ListOrdered,
    Loader2,
    Minus,
    Quote,
    Redo,
    Save,
    Share2,
    Strikethrough,
    Trash,
    Underline as UnderlineIcon,
    Undo,
    X,
} from 'lucide-react';

export const MenuBar = ({
    editor,
    addAlert,
    saving,
    onSave,
}: {
    editor: Editor;
    addAlert: (
        message: string,
        type?: AlertType | undefined,
        dismissInMs?: number | undefined
    ) => void;
    saving: boolean;
    onSave: (data: string) => void;
}) => (
    <>
        <div className='flex flex-wrap items-center justify-center gap-4 md:justify-start md:gap-6'>
            <div className='flex items-center gap-2 md:hidden'>
                <MenuBarItem
                    onClick={() => onSave(JSON.stringify(editor.getJSON()))}
                    disabled={saving}
                    isActive={!saving}>
                    <div className='flex items-center gap-1'>
                        <span className='hidden md:inline-block'>Save</span>
                        {saving ? (
                            <Loader2 className='animate-spin' />
                        ) : (
                            <Save size={20} />
                        )}
                    </div>
                </MenuBarItem>
                <MenuBarItem
                    onClick={async () => {
                        await onSave(JSON.stringify(editor.getJSON()));
                        await navigator.clipboard.writeText(
                            window.location.href
                        );
                        addAlert('Url copied to your clipboard!', 'success');
                    }}
                    isActive>
                    <div className='flex items-center gap-1'>
                        <span className='hidden md:inline-block'>Share</span>
                        <Share2 size={20} />
                    </div>
                </MenuBarItem>
                <MenuBarItem
                    onClick={async () => {
                        addAlert('Note deleted!', 'success');
                    }}
                    isActive
                    isDanger>
                    <div className='flex items-center gap-1'>
                        <span className='hidden md:inline-block'>Delete</span>
                        <Trash size={20} />
                    </div>
                </MenuBarItem>
            </div>

            <div className='flex items-center gap-2'>
                <MenuBarItem
                    label='Undo'
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                    isActive={editor.can().chain().focus().undo().run()}>
                    <Undo size={20} />
                </MenuBarItem>
                <MenuBarItem
                    label='Redo'
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                    isActive={editor.can().chain().focus().redo().run()}>
                    <Redo size={20} />
                </MenuBarItem>
            </div>

            <div className='flex items-center gap-2'>
                <NodeListBox editor={editor} />

                <MenuBarItem
                    label='Clear Nodes'
                    onClick={() => editor.chain().focus().clearNodes().run()}>
                    <X size={20} />
                </MenuBarItem>
            </div>

            <div className='flex items-center gap-2'>
                <MenuBarItem
                    label='Bold'
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    isActive={editor.isActive('bold')}>
                    <Bold size={20} />
                </MenuBarItem>
                <MenuBarItem
                    label='Italic'
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor.can().chain().focus().toggleItalic().run()
                    }
                    isActive={editor.isActive('italic')}>
                    <Italic size={20} />
                </MenuBarItem>
                <MenuBarItem
                    label='Code'
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editor.can().chain().focus().toggleCode().run()}
                    isActive={editor.isActive('code')}>
                    <Code size={20} />
                </MenuBarItem>
                <MenuBarItem
                    label='Underline'
                    onClick={() =>
                        editor.chain().focus().toggleUnderline().run()
                    }
                    disabled={
                        !editor.can().chain().focus().toggleUnderline().run()
                    }
                    isActive={editor.isActive('underline')}>
                    <UnderlineIcon size={20} />
                </MenuBarItem>
                <MenuBarItem
                    label='Strikethrough'
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={
                        !editor.can().chain().focus().toggleStrike().run()
                    }
                    isActive={editor.isActive('strike')}>
                    <Strikethrough size={20} />
                </MenuBarItem>
                <MenuBarItem
                    label='Clear Marks'
                    onClick={() =>
                        editor.chain().focus().unsetAllMarks().run()
                    }>
                    <X size={20} />
                </MenuBarItem>
            </div>

            <div className='hidden items-center gap-2 md:flex'>
                <TextColor editor={editor} />
                <Highlight editor={editor} />
            </div>

            <div className='flex items-center gap-2'>
                <MenuBarItem
                    label='Bullet List'
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    isActive={editor.isActive('bulletList')}>
                    <List size={20} />
                </MenuBarItem>
                <MenuBarItem
                    label='Ordered List'
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    isActive={editor.isActive('orderedList')}>
                    <ListOrdered size={20} />
                </MenuBarItem>
                <MenuBarItem
                    label='Task List'
                    onClick={() =>
                        editor.chain().focus().toggleTaskList().run()
                    }
                    isActive={editor.isActive('taskList')}>
                    <ListChecks size={20} />
                </MenuBarItem>
            </div>

            <div className='hidden items-center gap-2 md:flex'>
                <MenuBarItem
                    label='Code Block'
                    onClick={() =>
                        editor.chain().focus().toggleCodeBlock().run()
                    }
                    isActive={editor.isActive('codeBlock')}>
                    <CurlyBraces size={20} />
                </MenuBarItem>
                <MenuBarItem
                    label='Blockquote'
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                    isActive={editor.isActive('blockquote')}>
                    <Quote size={20} />
                </MenuBarItem>
                <MenuBarItem
                    label='Horizontal Rule'
                    onClick={() =>
                        editor.chain().focus().setHorizontalRule().run()
                    }>
                    <Minus size={20} />
                </MenuBarItem>
            </div>
        </div>
        <div className='hidden flex-wrap items-center justify-center gap-4 md:flex md:justify-start md:gap-6'>
            <div className='flex items-center gap-2'>
                <MenuBarItem
                    onClick={() => onSave(JSON.stringify(editor.getJSON()))}
                    disabled={saving}
                    isActive={!saving}>
                    <div className='flex items-center gap-1'>
                        <span className='hidden md:inline-block'>Save</span>
                        {saving ? (
                            <Loader2 className='animate-spin' />
                        ) : (
                            <Save size={20} />
                        )}
                    </div>
                </MenuBarItem>
                <MenuBarItem
                    onClick={async () => {
                        await onSave(JSON.stringify(editor.getJSON()));
                        await navigator.clipboard.writeText(
                            window.location.href
                        );
                        addAlert('Url copied to your clipboard!', 'success');
                    }}
                    isActive>
                    <div className='flex items-center gap-1'>
                        <span className='hidden md:inline-block'>Share</span>
                        <Share2 size={20} />
                    </div>
                </MenuBarItem>
                <MenuBarItem
                    onClick={async () => {
                        addAlert('Note deleted!', 'success');
                    }}
                    isActive
                    isDanger>
                    <div className='flex items-center gap-1'>
                        <span className='hidden md:inline-block'>Delete</span>
                        <Trash size={20} />
                    </div>
                </MenuBarItem>
            </div>
        </div>
    </>
);
