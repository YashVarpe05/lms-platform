"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Menubar } from "./Menubar";
import TextAlign from "@tiptap/extension-text-align";
export function RichTextEditor({ field }: { field: any }) {
	// immediatelyRender: false avoids SSR/hydration mismatches by deferring
	// editor initial render until client hydration.
	const editor = useEditor({
		extensions: [
			StarterKit,
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
		],
		editorProps: {
			attributes: {
				class:
					"min-h-[300px] p-4 focus:outline-none prose prose-sm smL:prose lg:prose-lg xl:prose-xl  dark:prose-invert  !w-full !max-w-none",
			},
		},
		onUpdate: ({ editor }) => {
			field.onChange(JSON.stringify(editor.getJSON()));
		},
		content: field.value ? JSON.parse(field.value) : "<p>Hello world</p>",
		immediatelyRender: false,
	});

	return (
		<div className="w-full border border-input rounded-lg overflow-hidden dark:bg-input/30">
			<Menubar editor={editor} />
			<EditorContent editor={editor} />
			{/* Render EditorContent only on the client when editor is ready */}
			{editor ? (
				<div className="mt-2">
					<EditorContent editor={editor} />
				</div>
			) : null}
		</div>
	);
}
