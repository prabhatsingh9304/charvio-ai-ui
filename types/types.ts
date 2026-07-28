export type Scene = {
  id: string;
  name: string;
  description: string;
  image?: string | null;
  initial_state: Record<string, unknown>;
  exit_conditions: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type SceneCreate = {
  name: string;
  description: string;
  image?: string | null;
  initial_state?: Record<string, unknown>;
  exit_conditions?: Record<string, unknown>;
};

export type SceneUpdate = {
  name?: string;
  description?: string;
  image?: string | null;
  initial_state?: Record<string, unknown>;
  exit_conditions?: Record<string, unknown>;
};

export type Character = {
  id: string;
  name: string;
  personality: string;
  background: string;
  avatar?: string | null;
  chats_example?: Record<string, unknown>[] | null;
  language_preference?: string | null;
  scene_id?: string | null;
  parent_character_id?: string | null;
  created_at: string;
  updated_at: string;
};

export type ApiResponse<T> = {
  data: T;
  error?: string;
};

// Chat-related types
export type SessionCreate = {
  character_id: string;
  scene_id?: string | null;
  conversation_id?: string;
};

export type SessionResponse = {
  session_id: string;
  conversation_id?: string | null;
  interaction_mode: string;
  characters: Record<
    string,
    {
      name: string;
      personality: string;
      background: string;
      chats_example?: Record<string, unknown>[] | null;
      image?: string | null;
      language_preference?: string | null;
    }
  >;
  scene_id?: string | null;
  scene_vars?: Record<string, unknown> | null;
  tension?: number | null;
  next_actor?: string | null;
  summary?: string;
};

export type ChatMessage = {
  speaker: string;
  message: string;
  timestamp: Date;
};

export type ChatRequest = {
  session_id: string;
  message: string;
};

export type ChatResponse = {
  session_id: string;
  messages: {
    speaker: string;
    message: string;
  }[];
  tension?: number | null;
  scene_vars?: Record<string, unknown> | null;
  next_actor?: string | null;
  summary?: string;
};

// Suggestion-related types
export type Suggestion = {
  id: string;
  text: string;
};

export type SuggestionRequest = {
  session_id: string;
  num_suggestions?: number;
};

export type SuggestionResponse = {
  session_id: string;
  suggestions: Suggestion[];
};

// Conversation-related types
export type ConversationCreate = {
  character_id: string;
  scene_id?: string | null;
  interaction_mode?: string;
  title?: string | null;
};

export type ConversationUpdate = {
  title?: string | null;
};

export type MessageResponse = {
  id: string;
  conversation_id: string;
  role: string;
  content: string;
  created_at: string;
};

export type ConversationResponse = {
  id: string;
  user_id: string;
  character_id: string;
  scene_id?: string | null;
  title?: string | null;
  interaction_mode: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  character_name?: string | null;
  character_avatar?: string | null;
  last_message?: string | null;
};

export type ConversationDetailResponse = ConversationResponse & {
  messages: MessageResponse[];
};

export type ConversationListResponse = {
  conversations: ConversationResponse[];
  total: number;
};

// Prompt-related types
export type PromptResponse = {
  name: string;
  content: string;
};

// User-related types
export type UserProfile = {
  id: string;
  firebase_uid: string;
  email: string;
  name: string | null;
  avatar: string | null;
  created_at: string;
  updated_at: string;
};

export type UserUpdate = {
  name?: string;
  avatar?: string;
};

// Credit-related types
export type CreditBalanceResponse = {
  user_id: string;
  balance: number;
  updated_at: string | null;
};

export type CreditTransactionResponse = {
  id: string;
  user_id: string;
  amount: number;
  transaction_type: string;
  source: string;
  payment_id: string | null;
  created_at: string;
};

// Payment-related types
export type PaymentOrderRequest = {
  plan_id: string;
};

export type PaymentOrderResponse = {
  order_id: string;
  amount: number;
  currency: string;
  key_id: string;
};

export type PaymentVerificationRequest = {
  order_id: string;
  payment_id: string;
  signature: string;
};

export type PaymentResponse = {
  id: string;
  user_id: string;
  provider: string;
  provider_order_id: string | null;
  provider_payment_id: string | null;
  amount: number;
  currency: string;
  payment_method: string | null;
  status: string;
  credits_added: number;
  created_at: string;
  updated_at: string;
};

// Plan-related types
export type PlanResponse = {
  id: string;
  name: string;
  price_inr: number;
  credits: number;
  active: boolean;
  created_at: string;
};

// Subscription-related types
export type SubscriptionCreateRequest = {
  plan_id: string;
  auto_renew?: boolean;
};

export type SubscriptionResponse = {
  id: string;
  user_id: string;
  plan_id: string;
  payment_id: string | null;
  status: string;
  credits_granted: number;
  started_at: string;
  expires_at: string | null;
  created_at: string;
};

export type AutoRenewRequest = {
  auto_renew: boolean;
};
