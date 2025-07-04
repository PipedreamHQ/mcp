'use client';

import type { Attachment, UIMessage } from 'ai';
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { ChatHeader } from '@/components/chat-header';
import type { Vote } from '@/lib/db/schema';
import { fetcher, generateUUID } from '@/lib/utils';
import { Artifact } from './artifact';
import { MultimodalInput } from './multimodal-input';
import { Messages } from './messages';
import { VisibilityType } from './visibility-selector';
import { useArtifactSelector } from '@/hooks/use-artifact';
import { toast } from 'sonner';
import { SuggestedActions } from './suggested-actions';
import Link from 'next/link';
import { useEffectiveSession } from '@/hooks/use-effective-session';

export function Chat({
  id,
  initialMessages,
  selectedChatModel,
  selectedVisibilityType,
  isReadonly,
}: {
  id: string;
  initialMessages: Array<UIMessage>;
  selectedChatModel: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
}) {
  const { mutate } = useSWRConfig();
  const { data: session } = useEffectiveSession();
  const isSignedIn = !!session?.user;

  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    status,
    stop,
    reload,
  } = useChat({
    id,
    body: { id, selectedChatModel: selectedChatModel },
    initialMessages,
    experimental_throttle: 100,
    sendExtraMessageFields: true,
    generateId: generateUUID,
    onFinish: () => {
      mutate('/api/history');
    },
    onError: (error) => {
      // Check if error is a 401 unauthorized due to authentication
      if (error instanceof Error && error.message.includes('401')) {
        // This error is likely from the submitForm auth check, so we don't need to show an error
        return;
      }
      toast.error('An error occurred, please try again!');
    },
  });

  const { data: votes } = useSWR<Array<Vote>>(
    messages.length >= 2 ? `/api/vote?chatId=${id}` : null,
    fetcher,
  );

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);
  const isArtifactVisible = useArtifactSelector((state) => state.isVisible);

  // Layout adjustment for signed-out users
  if (!isSignedIn) {
    return (
      <>
        <div className="flex flex-col items-center justify-center min-w-0 h-dvh bg-background">
          <div className="flex-1 flex flex-col justify-center w-full max-w-3xl px-4">
            <div className="mb-8">
              {messages.length > 0 ? (
                <Messages
                  chatId={id}
                  status={status}
                  votes={votes}
                  messages={messages}
                  setMessages={setMessages}
                  reload={reload}
                  isReadonly={isReadonly}
                  isArtifactVisible={isArtifactVisible}
                  append={append}
                />
              ) : (
                <div className="text-center mb-4 px-4 sm:px-0">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 mb-2">
                    <h1 className="text-3xl font-bold max-w-[280px] sm:max-w-none leading-tight">Welcome to Pipedream Chat</h1>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 mt-1 sm:mt-0">
                      Alpha
                    </span>
                  </div>
                  <p 
                    className="text-muted-foreground max-w-sm mx-auto"
                  >
                    Chat directly with 2700+ APIs powered by {" "}
                    <Link
                      className="font-medium underline underline-offset-4"
                      href="https://pipedream.com/docs/connect/mcp/developers"
                      target="_blank"
                    >
                      Pipedream Connect
                    </Link>
                  </p>
                </div>
              )}
            </div>
            
            <form className="w-full bg-background mb-4">
              {!isReadonly && (
                <MultimodalInput
                  chatId={id}
                  input={input}
                  setInput={setInput}
                  handleSubmit={handleSubmit}
                  status={status}
                  stop={stop}
                  attachments={attachments}
                  setAttachments={setAttachments}
                  messages={messages}
                  setMessages={setMessages}
                  append={append}
                />
              )}
            </form>
            
            {/* Show examples below the input for signed-out users */}
            {messages.length === 0 && (
              <div className="w-full mt-6">
                <SuggestedActions append={append} chatId={id} />
              </div>
            )}
          </div>
        </div>

        <Artifact
          chatId={id}
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          status={status}
          stop={stop}
          attachments={attachments}
          setAttachments={setAttachments}
          append={append}
          messages={messages}
          setMessages={setMessages}
          reload={reload}
          votes={votes}
          isReadonly={isReadonly}
        />
      </>
    );
  }

  // Default layout for signed-in users
  return (
    <>
      <div className="flex flex-col min-w-0 h-dvh bg-background">
        <ChatHeader
          chatId={id}
          selectedModelId={selectedChatModel}
          selectedVisibilityType={selectedVisibilityType}
          isReadonly={isReadonly}
        />

        <Messages
          chatId={id}
          status={status}
          votes={votes}
          messages={messages}
          setMessages={setMessages}
          reload={reload}
          isReadonly={isReadonly}
          isArtifactVisible={isArtifactVisible}
          append={append}
        />

        <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
          {!isReadonly && (
            <MultimodalInput
              chatId={id}
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
              status={status}
              stop={stop}
              attachments={attachments}
              setAttachments={setAttachments}
              messages={messages}
              setMessages={setMessages}
              append={append}
            />
          )}
        </form>
      </div>

      <Artifact
        chatId={id}
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        status={status}
        stop={stop}
        attachments={attachments}
        setAttachments={setAttachments}
        append={append}
        messages={messages}
        setMessages={setMessages}
        reload={reload}
        votes={votes}
        isReadonly={isReadonly}
      />
    </>
  );
}
