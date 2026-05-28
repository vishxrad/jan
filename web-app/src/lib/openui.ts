import type { OpenUIComponentLibrary } from '@/hooks/useOpenUISettings'
import {
  openuiChatLibrary,
  openuiChatPromptOptions,
  openuiLibrary,
  openuiPromptOptions,
} from '@openuidev/react-ui/genui-lib'

export function getOpenUILibrary(componentLibrary: OpenUIComponentLibrary) {
  return componentLibrary === 'standard' ? openuiLibrary : openuiChatLibrary
}

export function getOpenUISystemPrompt(
  componentLibrary: OpenUIComponentLibrary
) {
  const library =
    componentLibrary === 'standard' ? openuiLibrary : openuiChatLibrary
  const promptOptions =
    componentLibrary === 'standard'
      ? openuiPromptOptions
      : openuiChatPromptOptions

  return `${library.prompt(promptOptions)}

Jan OpenUI integration rules:
- Prefer the ${componentLibrary} component library and do not invent component names.
- Do not use Query() or Mutation() for external data access unless the user explicitly asks for a data-driven UI.
- Prefer Button and FollowUpBlock for chat CTAs. If you use ListItem as a CTA, include an Action with a ToAssistant step so Jan can submit it when clicked.
- Keep responses compact enough to fit comfortably inside a chat message.`
}
