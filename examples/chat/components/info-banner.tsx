'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Info, ExternalLink } from 'lucide-react';

interface InfoBannerProps {
  isAuthDisabled: boolean;
  isPersistenceDisabled?: boolean;
  className?: string;
}

export function InfoBanner({ isAuthDisabled: isAuthDisabledMode, isPersistenceDisabled = false, className = "" }: InfoBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isPersistenceDismissed, setIsPersistenceDismissed] = useState(false);

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  const handlePersistenceDismiss = () => {
    setIsPersistenceDismissed(true);
  };

  if (isDismissed && (!isPersistenceDisabled || isPersistenceDismissed)) {
    return null;
  }

  const showPersistenceWarning = isPersistenceDisabled && !isPersistenceDismissed;
  const showMainBanner = !isDismissed;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {showMainBanner && (
        <div className={`flex items-start gap-2 sm:gap-3 p-2 sm:px-3 rounded-md border text-sm font-medium ${
          isAuthDisabledMode 
            ? 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-200' 
            : 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200'
        }`}>
          <Info className={`size-4 shrink-0 mt-px ${
            isAuthDisabledMode 
              ? 'text-amber-600 dark:text-amber-400' 
              : 'text-blue-600 dark:text-blue-400'
          }`} />
          <div className="flex-1 min-w-0 leading-relaxed">
            {isAuthDisabledMode ? (
              <span>User sign-in is currently disabled, make sure to enable before shipping to production.</span>
            ) : (
              <span>
                This demo app showcases how you can integrate Pipedream&apos;s MCP server into your AI app.{' '}
                <a 
                  href="https://pipedream.com/docs/connect/mcp/developers" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:underline hover:text-blue-600 dark:hover:text-blue-400 font-semibold"
                >
                  Check out our docs
                </a>
                {' '} to get started.
              </span>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDismiss}
            className="size-6 text-muted-foreground hover:text-foreground shrink-0 mt-px"
          >
            <X className="size-3" />
            <span className="sr-only">Dismiss</span>
          </Button>
        </div>
      )}

      {showPersistenceWarning && (
        <div className="flex items-start gap-2 sm:gap-3 p-2 sm:px-3 rounded-md border text-sm font-medium bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-200">
          <Info className="size-4 shrink-0 mt-px text-amber-600 dark:text-amber-400" />
          <div className="flex-1 min-w-0 leading-relaxed">
            <span>Chat storage is currently disabled. Your conversations will not be saved.</span>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePersistenceDismiss}
            className="size-6 text-muted-foreground hover:text-foreground shrink-0 mt-px"
          >
            <X className="size-3" />
            <span className="sr-only">Dismiss</span>
          </Button>
        </div>
      )}
    </div>
  );
}