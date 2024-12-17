'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import ToolBar from '../ToolBar/ToolBar'
import Heading from '@tiptap/extension-heading'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ImageResize from 'tiptap-extension-resize-image'
import Link from '@tiptap/extension-link'
import sanitizeHtml from 'sanitize-html'
import { convert } from 'html-to-text'
import './RichTextEditor.scss'

export default function RichTextEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Heading.configure({
        levels: [1, 2, 3]
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal ml-3'
        }
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc ml-3'
        }
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            const parsedUrl = url.includes(':')
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`)
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false
            }
            const disallowedProtocols = ['ftp', 'file', 'mailto']
            const protocol = parsedUrl.protocol.replace(':', '')
            if (disallowedProtocols.includes(protocol)) {
              return false
            }
            const allowedProtocols = ctx.protocols.map(p =>
              typeof p === 'string' ? p : p.scheme
            )
            if (!allowedProtocols.includes(protocol)) {
              return false
            }
            const disallowedDomains = [
              'example-phishing.com',
              'malicious-site.net'
            ]
            const domain = parsedUrl.hostname
            if (disallowedDomains.includes(domain)) {
              return false
            }
            return true
          } catch (error) {
            return false
          }
        },
        shouldAutoLink: url => {
          try {
            const parsedUrl = url.includes(':')
              ? new URL(url)
              : new URL(`https://${url}`)
            const disallowedDomains = [
              'example-no-autolink.com',
              'another-no-autolink.com'
            ]
            const domain = parsedUrl.hostname
            return !disallowedDomains.includes(domain)
          } catch (error) {
            return false
          }
        }
      }),
      ,
      Highlight,
      Image,
      ImageResize
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'min-h-[156px] border rounded-md bg-slate-50 py-2 px-3 w-full'
      }
    },
    onUpdate: ({ editor }) => {
      const htmlContent = editor.getHTML()
      const plainTextContent = convert(htmlContent, {
        wordwrap: 130,
        selectors: [
          { selector: 'h1', options: { uppercase: false } },
          { selector: 'h2', options: { uppercase: false } },
          { selector: 'h3', options: { uppercase: false } },
          { selector: 'strong', format: 'bold' },
          { selector: 'em', format: 'italic' },
          { selector: 'u', format: 'underline' },
          { selector: 'strike', format: 'strikethrough' },
          { selector: 'a', options: { uppercase: false } },
          { selector: 'ul', options: { uppercase: false } },
          { selector: 'ol', options: { uppercase: false } },
          { selector: 'li', format: 'listItem' },
          { selector: 'img', options: { uppercase: false } },
          { selector: 'blockquote', options: { uppercase: false } },
          { selector: 'code', format: 'code' },
          { selector: 'pre', options: { uppercase: false } }
        ]
      })
      console.log(plainTextContent)
      onChange(plainTextContent)
    }
  })

  return (
    <div className='editor-container w-full'>
      <ToolBar editor={editor} />
      <EditorContent editor={editor} className='editor-content w-full' />
    </div>
  )
}
