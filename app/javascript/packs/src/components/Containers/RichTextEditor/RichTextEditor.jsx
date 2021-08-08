import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  createHistoryPlugin,
  createReactPlugin,
  createParagraphPlugin,
  createBlockquotePlugin,
  createCodeBlockPlugin,
  createHeadingPlugin,
  createBoldPlugin,
  createItalicPlugin,
  createUnderlinePlugin,
  createStrikethroughPlugin,
  createCodePlugin,
  Plate,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_PARAGRAPH,
  ELEMENT_CODE_LINE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_LINK,
  ELEMENT_BLOCKQUOTE,
  MARK_STRIKETHROUGH,
  MARK_CODE,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  createPlateComponents,
  createPlateOptions,
  withProps,
  createDeserializeHTMLPlugin,
} from "@udecode/plate";

// Use default element components (full control over component);
const components = createPlateComponents();
const options = createPlateOptions();

// const createElement = (text = "", { type = ELEMENT_PARAGRAPH, mark } = {}) => {
//   const leaf = { text };
//   if (mark) {
//     leaf[mark] = true;
//   }

//   return {
//     type,
//     children: [leaf],
//   };
// };

// const initialValueBasicElements = [
//   createElement("🧱 Elements", { type: ELEMENT_H1 }),
//   createElement("🔥 Basic Elements", { type: ELEMENT_H2 }),
//   createElement("These are the most common elements, known as blocks:"),
//   createElement("Heading 1", { type: ELEMENT_H1 }),
//   createElement("Heading 2", { type: ELEMENT_H2 }),
//   createElement("Heading 3", { type: ELEMENT_H3 }),
//   createElement("Heading 4", { type: ELEMENT_H4 }),
//   createElement("Heading 5", { type: ELEMENT_H5 }),
//   createElement("Heading 6", { type: ELEMENT_H6 }),
//   createElement("Blockquote", { type: ELEMENT_BLOCKQUOTE }),
//   {
//     type: ELEMENT_CODE_BLOCK,
//     children: [
//       {
//         type: ELEMENT_CODE_LINE,
//         children: [
//           {
//             text: "const a = 'Hello';",
//           },
//         ],
//       },
//       {
//         type: ELEMENT_CODE_LINE,
//         children: [
//           {
//             text: "const b = 'World';",
//           },
//         ],
//       },
//     ],
//   },
//   createElement("💅 Marks", { type: ELEMENT_H1 }),
//   createElement("💧 Basic Marks", { type: ELEMENT_H2 }),
//   createElement(
//     "The basic marks consist of text formatting such as bold, italic, underline, strikethrough, subscript, superscript, and code."
//   ),
//   createElement(
//     "You can customize the type, the component and the hotkey for each of these."
//   ),
//   createElement("This text is bold.", { mark: MARK_BOLD }),
//   createElement("This text is italic.", { mark: MARK_ITALIC }),
//   createElement("This text is underlined.", {
//     mark: MARK_UNDERLINE,
//   }),
//   {
//     type: ELEMENT_PARAGRAPH,
//     children: [
//       {
//         text: "This text is bold, italic and underlined.",
//         [MARK_BOLD]: true,
//         [MARK_ITALIC]: true,
//         [MARK_UNDERLINE]: true,
//       },
//     ],
//   },
//   createElement("This is a strikethrough text.", {
//     mark: MARK_STRIKETHROUGH,
//   }),
//   createElement("This is an inline code.", { mark: MARK_CODE }),
// ];

const RichTextEditor = ({ content, handleContentChange }) => {
  const plugins = useMemo(() => {
    const _plugins = [
      createReactPlugin(),
      createHistoryPlugin(),
      // elements
      createParagraphPlugin(), // paragraph element
      createBlockquotePlugin(), // blockquote element
      createCodeBlockPlugin(), // code block element
      createHeadingPlugin(), // heading elements

      // marks
      createBoldPlugin(), // bold mark
      createItalicPlugin(), // italic mark
      createUnderlinePlugin(), // underline mark
      createStrikethroughPlugin(), // strikethrough mark
      createCodePlugin(), // code mark
    ];
    _plugins.push(createDeserializeHTMLPlugin({ plugins: _plugins }));
    return _plugins;
  }, []);

  const attributes = {
    placeholder: "說點什麼吧",
    style: {
      padding: "15px",
    },
  };
  const [value, setValue] = useState(content);
  return (
    <>
      <Plate
        id="editor"
        editableProps={attributes}
        plugins={plugins}
        components={components}
        options={options}
        onChange={(value) => setValue(value)}
        initialValue={content}
      />
      <div>
      <p>{JSON.stringify(value)}</p>
      <p>{content}</p>
      </div>
    </>
  );
};

export default RichTextEditor;
