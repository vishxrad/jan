const OPENUI_FENCE_RE =
  /```(?:openui|openui-lang|openuilang|genui|ui)\s*\n?([\s\S]*?)```/i

const ROOT_ASSIGNMENT_RE = /^root\s*=/m
const COMPONENT_CALL_RE = /\b[A-Z][A-Za-z0-9_]*\s*\(/

export function extractOpenUIResponse(content: string): string | null {
  const fenced = OPENUI_FENCE_RE.exec(content)
  if (fenced?.[1]) {
    const candidate = fenced[1].trim()
    return isLikelyOpenUILang(candidate) ? candidate : null
  }

  const trimmed = content.trim()
  const rootIndex = trimmed.search(ROOT_ASSIGNMENT_RE)
  if (rootIndex === -1) return null

  const candidate = trimmed.slice(rootIndex).trim()
  return isLikelyOpenUILang(candidate) ? candidate : null
}

export function isLikelyOpenUILang(content: string) {
  return ROOT_ASSIGNMENT_RE.test(content) && COMPONENT_CALL_RE.test(content)
}
