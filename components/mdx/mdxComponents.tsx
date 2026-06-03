import type { MDXRemoteProps } from 'next-mdx-remote/rsc'
import SmartAnchor from './SmartAnchor'
import ToolsUsed from './ToolsUsed'

/**
 * Shared MDX component map for blog/guides/best-of MDX rendering.
 *
 * Currently overrides the default `a` tag with SmartAnchor so that affiliate
 * links rendered from markdown (`[text](url)`) automatically get the
 * `rel="nofollow sponsored"` and `target="_blank"` attrs required by the
 * Amazon Operating Agreement + UK ASA — without authors having to remember.
 *
 * Add other overrides here as the design system grows (e.g. styled headings,
 * MDX components, callouts).
 */
export const mdxComponents: NonNullable<MDXRemoteProps['components']> = {
  a: SmartAnchor,
  ToolsUsed,
}
