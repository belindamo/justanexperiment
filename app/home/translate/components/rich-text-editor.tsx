"use client";
import React from 'react';
import { useEditor, Editor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';
import { Bold, Strikethrough, Italic, List, ListOrdered } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";

const RichTextEditor = ({ value, onUpdate }: { value: string, onUpdate: (value: string) => void }) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "min-h-[80px] max-h-[180px] w-full rounded-md rounded-br-none rounded-bl-none border border-input bg-transparent px-3 py-2 border-b-0 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto",
      },
    },
    extensions: [
      // @ts-ignore
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
      }),
      // @ts-ignore
      Markdown.configure({
        html: true, // Allow HTML input/output
        tightLists: true, // No <p> inside <li> in markdown output
        tightListClass: 'tight', // Add class to <ul> allowing you to remove <p> margins when tight
        bulletListMarker: '-', // <li> prefix in markdown output
        linkify: false, // Create links from "https://..." text
        breaks: false, // New lines (\n) in markdown input are converted to <br>
        transformPastedText: true, // Allow to paste markdown text in the editor
        transformCopiedText: true, // Copied text is transformed to markdown
      }),
    ],
    content: value,
    onTransaction: () => {
      if (!editor) return;
      // @ts-ignore
      const newValue = editor.storage.markdown.getMarkdown();
      onUpdate(newValue);
    },
  });

  return (
    <>
      <EditorContent editor={editor} />
      {editor ? <RichTextEditorToolbar editor={editor} /> : null}
    </>
  );
};

const RichTextEditorToolbar = ({ editor }: { editor: Editor }) => {
  return (
    <div className="border border-input bg-transparent rounded-br-md rounded-bl-md p-1 flex flex-row items-center gap-1">
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        // @ts-ignore
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        // @ts-ignore
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        // @ts-ignore
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="w-[1px] h-8" />
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        // @ts-ignore
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        // @ts-ignore
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

export default RichTextEditor;
