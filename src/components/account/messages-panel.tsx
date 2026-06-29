"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare, Paperclip } from "lucide-react";
import { toast } from "sonner";

import { AccountEmptyState } from "@/components/account/account-empty-state";
import { AccountSectionCard } from "@/components/account/account-section-card";
import {
  MessageBubble,
  SystemMessageBubble,
} from "@/components/account/message-bubble";
import {
  SUPPORT_TOPICS,
  SupportTopicSelector,
  type SupportTopic,
} from "@/components/account/support-topic-selector";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  body: string;
  fromAdmin: boolean;
  createdAt: string;
}

export function MessagesPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState<SupportTopic | "">("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [mobileView, setMobileView] = useState<"topics" | "thread">("thread");
  const [composerFocused, setComposerFocused] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLTextAreaElement>(null);

  async function loadMessages() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/messages");
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error ?? "Unable to load messages");
        return;
      }

      setMessages(data.messages);
    } catch {
      toast.error("Unable to load messages");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function getTopicLabel(value: SupportTopic) {
    return SUPPORT_TOPICS.find((item) => item.value === value)?.label ?? value;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!body.trim() || !topic) return;

    setIsSending(true);

    const topicLabel = getTopicLabel(topic);
    const messageBody = `[${topicLabel}] ${body.trim()}`;

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: messageBody }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error ?? "Unable to send message");
        return;
      }

      setBody("");
      setMessages((current) => [...current, data.message]);
      setMobileView("thread");
      toast.success("Message sent");
    } catch {
      toast.error("Unable to send message");
    } finally {
      setIsSending(false);
    }
  }

  const showEmptyComposer =
    !isLoading && messages.length === 0 && !composerFocused;

  return (
    <div className="max-w-4xl">
      <AccountSectionCard contentClassName="p-0">
        <div className="grid min-h-[520px] md:grid-cols-[280px_1fr]">
          <aside
            className={cn(
              "border-b border-go-border p-4 md:border-b-0 md:border-r",
              mobileView === "thread" && "hidden md:block"
            )}
          >
            <h2 className="text-body-sm font-semibold text-go-ink">
              Support topics
            </h2>
            <ul className="mt-3 space-y-1">
              {SUPPORT_TOPICS.map((item) => (
                <li key={item.value}>
                  <button
                    type="button"
                    onClick={() => {
                      setTopic(item.value);
                      setMobileView("thread");
                      composerRef.current?.focus();
                    }}
                    className={cn(
                      "w-full rounded-lg px-3 py-2 text-left text-body-sm transition-colors hover:bg-go-muted-light",
                      topic === item.value
                        ? "bg-go-gold/15 font-medium text-go-ink"
                        : "text-go-muted"
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4 w-full md:hidden"
              onClick={() => setMobileView("thread")}
            >
              Open conversation
            </Button>
          </aside>

          <div
            className={cn(
              "flex flex-col",
              mobileView === "topics" && "hidden md:flex"
            )}
          >
            <div className="border-b border-go-border px-4 py-3 md:px-6">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-heading-sm font-bold text-go-ink">
                    Conversation
                  </h2>
                  <p className="text-body-sm text-go-muted">
                    Contact the Go team about pickups, changes, or support.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="md:hidden"
                  onClick={() => setMobileView("topics")}
                >
                  Topics
                </Button>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 md:px-6">
              {isLoading ? (
                <p className="text-body-sm text-go-muted">Loading messages...</p>
              ) : showEmptyComposer ? (
                <AccountEmptyState
                  icon={<MessageSquare className="size-6" aria-hidden="true" />}
                  title="No messages yet"
                  description="Start a conversation if you need help with a booking, pickup, delivery, payment, or account question."
                  primaryAction={{
                    label: "Start a message",
                    onClick: () => {
                      setComposerFocused(true);
                      composerRef.current?.focus();
                    },
                  }}
                  className="py-8"
                />
              ) : (
                <>
                  <SystemMessageBubble />
                  {messages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      body={message.body}
                      createdAt={message.createdAt}
                      fromAdmin={message.fromAdmin}
                    />
                  ))}
                </>
              )}
              <div ref={bottomRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-go-border px-4 py-4 md:px-6"
            >
              <div className="space-y-4">
                <SupportTopicSelector value={topic} onChange={setTopic} />

                <div className="space-y-2">
                  <Label htmlFor="related-trip">Related trip (optional)</Label>
                  <Select disabled>
                    <SelectTrigger id="related-trip">
                      <SelectValue placeholder="No trips available" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No trip selected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Textarea
                  ref={composerRef}
                  id="message-body"
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  onFocus={() => setComposerFocused(true)}
                  placeholder="Tell us how we can help..."
                  rows={4}
                  aria-label="Message"
                  className="min-h-[100px]"
                />

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled
                    className="justify-start"
                  >
                    <Paperclip className="size-4" aria-hidden="true" />
                    Attach file
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSending || !body.trim() || !topic}
                    loading={isSending}
                    className="w-full sm:w-auto"
                  >
                    {isSending ? "Sending..." : "Send message"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </AccountSectionCard>
    </div>
  );
}
