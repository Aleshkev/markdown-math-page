// Based on https://github.com/remarkjs/remark-math/blob/main/packages/rehype-katex/index.js

import katex, { KatexOptions } from 'katex'
import { visit } from 'unist-util-visit'
import { removePosition } from 'unist-util-remove-position'
import { toText } from 'hast-util-to-text'
import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
import { asciimath } from './asciimath'
import { string } from 'astro/zod'

const assign = Object.assign

const parseHtml = unified().use(rehypeParse, { fragment: true })

const source = 'rehype-katex'

/**
 * Plugin to transform `<span class=math-inline>` and `<div class=math-display>`
 * with KaTeX.
 *
 */
export default function rehypeAsciimathKatex(options: Plugin<[KatexOptions?] | void[], Root>) {
    console.error("hii")
    const settings = options || {}
    const throwOnError = settings.throwOnError || false


    return (tree, file) => {
        visit(tree, 'element', (element) => {
            const classes =
                element.properties && Array.isArray(element.properties.className)
                    ? element.properties.className
                    : []
            // if (classes.length === 0) return;
            const inline = classes.includes('math-inline')
            let displayMode = classes.includes('math-display')

            if (!inline && !displayMode) {
                return
            }

            displayMode = true;  // Important.

            const value = toText(element, { whitespace: 'pre' }) as string

            const latex = asciimath.AMTparseAMtoTeX(value) as string

            let result: string

            try {
                console.log(latex);
                result = katex.renderToString(
                    latex,
                    assign({}, settings, { displayMode, throwOnError: true })
                )
            } catch (error_) {
                const error = error_ as Error
                const fn = throwOnError ? 'fail' : 'message'
                const origin = [source, error.name.toLowerCase()].join(':')

                file[fn](error.message, element.position, origin)

                result = katex.renderToString(
                    latex,
                    assign({}, settings, {
                        displayMode,
                        throwOnError: false,
                        strict: 'ignore'
                    })
                )
            }

            element.children = removePosition(parseHtml.parse(result), true).children
        })
    }
}