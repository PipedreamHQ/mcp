"use client"

import { useRouter } from "next/navigation"
import { useEffectiveSession } from '@/hooks/use-effective-session'

import { ModelSelector } from "@/components/model-selector"
import { SidebarToggle } from "@/components/sidebar-toggle"
import { Button } from "@/components/ui/button"
import { InfoBanner } from "@/components/info-banner"
import { GitHubButton } from "@/components/github-button"
import { memo } from "react"
import { PlusIcon } from "./icons"
import { useSidebar } from "./ui/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { VisibilitySelector, VisibilityType } from "./visibility-selector"
import { useAuthContext } from "./session-provider"

function PureChatHeader({
  chatId,
  selectedModelId,
  selectedVisibilityType,
  isReadonly,
}: {
  chatId: string
  selectedModelId: string
  selectedVisibilityType: VisibilityType
  isReadonly: boolean
}) {
  const router = useRouter()
  const { open } = useSidebar()
  const { data: session } = useEffectiveSession()
  const { isAuthDisabled } = useAuthContext()
  const isSignedIn = !!session?.user

  // Don't render the header for signed-out users
  if (!isSignedIn) {
    return null
  }

  return (
    <header className="flex sticky top-0 bg-background py-1.5 items-start px-2 md:px-2 gap-2">
      <div className="mt-1">
        <SidebarToggle />
      </div>

      <div className="mt-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className={`order-2 md:order-1 md:px-2 px-2 md:h-fit ml-auto md:ml-0 ${
                open ? 'md:hidden' : 'flex'
              }`}
              onClick={() => {
                router.push("/")
                router.refresh()
              }}
            >
              <PlusIcon size={16} />
              <span className="md:sr-only">New Chat</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip>
      </div>

      {!isReadonly && (
        <div className="mt-1">
          <ModelSelector
            selectedModelId={selectedModelId}
            className="order-1 md:order-2"
          />
        </div>
      )}

      {!isReadonly && (
        <div className="mt-1">
          <VisibilitySelector
            chatId={chatId}
            selectedVisibilityType={selectedVisibilityType}
            className="order-1 md:order-3"
          />
        </div>
      )}

      <div className="flex-1"></div>

      <div className="mt-1">
        <GitHubButton className="hidden md:flex order-5 md:order-5 ml-auto" />
      </div>

      {/* Absolutely positioned banner to align with main content */}
      <div className="absolute inset-x-0 top-1.5 h-full flex items-start justify-center pointer-events-none">
        <div className="w-full max-w-3xl px-4">
          <div className="flex justify-center">
            <InfoBanner 
              isAuthDisabled={isAuthDisabled} 
              className="hidden lg:flex max-w-xl xl:max-w-3xl pointer-events-auto"
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return prevProps.selectedModelId === nextProps.selectedModelId
})
