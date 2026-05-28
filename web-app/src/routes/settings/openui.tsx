import { createFileRoute } from '@tanstack/react-router'
import { route } from '@/constants/routes'
import HeaderPage from '@/containers/HeaderPage'
import SettingsMenu from '@/containers/SettingsMenu'
import { Card, CardItem } from '@/containers/Card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  useOpenUISettings,
  type OpenUIComponentLibrary,
} from '@/hooks/useOpenUISettings'
import { getOpenUISystemPrompt } from '@/lib/openui'
import { useTranslation } from '@/i18n/react-i18next-compat'
import { toast } from 'sonner'
import { Copy } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Route = createFileRoute(route.settings.openui as any)({
  component: OpenUIIntegration,
})

const libraryOptions: Array<{
  label: string
  value: OpenUIComponentLibrary
  description: string
}> = [
  {
    label: 'Chat',
    value: 'chat',
    description: 'Optimized for inline conversational UI.',
  },
  {
    label: 'Standard',
    value: 'standard',
    description: 'Fuller component set for richer generated UI.',
  },
]

function OpenUIIntegration() {
  const { t } = useTranslation()
  const enabled = useOpenUISettings((state) => state.enabled)
  const componentLibrary = useOpenUISettings((state) => state.componentLibrary)
  const setEnabled = useOpenUISettings((state) => state.setEnabled)
  const setComponentLibrary = useOpenUISettings(
    (state) => state.setComponentLibrary
  )

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(getOpenUISystemPrompt(componentLibrary))
    toast.success('OpenUI prompt copied')
  }

  return (
    <div className="flex flex-col h-svh w-full">
      <HeaderPage>
        <div className="flex items-center gap-2 w-full">
          <span className="font-medium text-base font-studio">
            {t('common:settings')}
          </span>
        </div>
      </HeaderPage>
      <div className="flex h-[calc(100%-60px)]">
        <SettingsMenu />
        <div className="p-4 pt-0 w-full overflow-y-auto">
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
            <Card
              header={
                <div className="mb-3 flex w-full items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-md border border-border/50 bg-background text-foreground">
                    <img
                      src="/images/openui.svg"
                      alt=""
                      className="size-11 shrink-0 dark:invert"
                    />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-foreground font-studio font-medium text-base">
                      OpenUI
                    </h1>
                    <p className="text-muted-foreground leading-normal">
                      Generate interactive assistant responses from OpenUI Lang.
                    </p>
                  </div>
                </div>
              }
            >
              <CardItem
                title="Enable OpenUI rendering"
                description="Add OpenUI prompt guidance to chat requests and render OpenUI Lang responses as interactive UI."
                align="start"
                actions={
                  <Switch checked={enabled} onCheckedChange={setEnabled} />
                }
              />
              <CardItem
                title="Component library"
                description="Choose the OpenUI component library used by the renderer and prompt."
                align="start"
                actions={
                  <div className="flex gap-1 rounded-md bg-secondary p-1">
                    {libraryOptions.map((option) => (
                      <Button
                        key={option.value}
                        size="sm"
                        variant={
                          componentLibrary === option.value
                            ? 'default'
                            : 'ghost'
                        }
                        className="h-7 px-3"
                        onClick={() => setComponentLibrary(option.value)}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                }
              />
              <CardItem
                title="System prompt"
                description="Copy the generated OpenUI prompt if you want to use it in an assistant or another client."
                align="start"
                actions={
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5"
                    onClick={copyPrompt}
                  >
                    <Copy size={14} />
                    Copy
                  </Button>
                }
              />
            </Card>

            <Card title="About OpenUI">
              <p className="text-muted-foreground leading-normal">
                OpenUI lets the model describe interface elements in OpenUI Lang
                so Jan can render responses as interactive components instead
                of plain markdown. When enabled, Jan adds the OpenUI guidance to
                chat requests and routes actions from generated controls back
                into the conversation.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
