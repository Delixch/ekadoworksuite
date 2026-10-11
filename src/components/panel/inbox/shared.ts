import type { commonT } from "@/i18n/panel/common";
import type { inboxT } from "@/i18n/panel/inbox";
import type { ConversationStatus } from "@/lib/panel/types";
import type { Tone } from "../ui";

export type InboxText = (typeof inboxT)["tr"];
export type CommonText = (typeof commonT)["tr"];

export const statusTone: Record<ConversationStatus, Tone> = {
  ai: "primary",
  human: "success",
  waiting: "danger",
  closed: "neutral",
};
