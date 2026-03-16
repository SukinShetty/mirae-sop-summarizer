export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
}

export const sampleQuestions = [
  "What is the SOP for processing a mutual fund redemption?",
  "What are the charges for a demat account transfer?",
  "How to handle a KYC discrepancy for an existing client?",
  "What is the turnaround time for IPO allotment?",
  "What is the process for closing a trading account?",
];

export const mockChatHistory: ChatSession[] = [
  { id: "1", title: "Mutual Fund Redemption Process", timestamp: new Date(Date.now() - 3600000) },
  { id: "2", title: "Demat Transfer Charges", timestamp: new Date(Date.now() - 86400000) },
  { id: "3", title: "KYC Update Procedure", timestamp: new Date(Date.now() - 172800000) },
];

export const mockResponse = `## Mutual Fund Redemption Process

### Steps
1. Client submits redemption request via the online portal or signed physical form.
2. Verify client identity using registered PAN and folio number.
3. Check for any lock-in period or exit load applicability.
4. Process the redemption through the RTA (Registrar and Transfer Agent).
5. Send confirmation to the client via email and SMS.

### Turnaround Time
| Fund Type | Settlement |
|-----------|-----------|
| Liquid Funds | T+1 business day |
| Equity Funds | T+3 business days |
| ELSS Funds | After 3-year lock-in |

### Charges
- **Exit Load:** 1% if redeemed within 1 year (equity funds)
- **STT:** 0.001% on equity fund redemptions
- **No exit load** on liquid fund redemptions after 7 days

### Limits
- **Minimum Redemption:** ₹500 or 50 units
- **Maximum:** No upper limit (subject to folio balance)
- **Daily Cut-off:** 3:00 PM for same-day NAV

### Important Notes
- Ensure the bank account linked to the folio is verified and active.
- Redemption proceeds are credited only to the registered bank account.
- For amounts above ₹2 lakhs, additional verification may be required.
- Contact the operations desk for any discrepancies in unit balance.`;

export async function sendMessageToAgent(message: string, sessionId?: string): Promise<string> {
  const { supabase } = await import("@/integrations/supabase/client");

  const { data, error } = await supabase.functions.invoke("lyzr-chat", {
    body: { message, session_id: sessionId || "default_session" },
  });

  if (error) {
    console.error("Edge function error:", error);
    throw new Error(error.message || "Failed to get response");
  }

  if (data?.error) {
    console.error("Lyzr API error:", data.error);
    throw new Error(data.error);
  }

  return data?.response || "No response received.";
}
