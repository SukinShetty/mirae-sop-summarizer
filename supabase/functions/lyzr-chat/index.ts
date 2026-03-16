import "https://deno.land/std@0.168.0/dotenv/load.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LYZR_API_KEY = Deno.env.get('LYZR_API_KEY');
    const LYZR_AGENT_ID = Deno.env.get('LYZR_AGENT_ID');
    const LYZR_API_URL = Deno.env.get('LYZR_API_URL');

    console.log('Secrets check:', {
      hasApiKey: !!LYZR_API_KEY,
      hasAgentId: !!LYZR_AGENT_ID,
      hasApiUrl: !!LYZR_API_URL,
      apiUrl: LYZR_API_URL,
      agentId: LYZR_AGENT_ID,
    });

    if (!LYZR_API_KEY) throw new Error('LYZR_API_KEY is not configured');
    if (!LYZR_AGENT_ID) throw new Error('LYZR_AGENT_ID is not configured');

    const { message, session_id } = await req.json();

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const endpoint = 'https://agent-prod.studio.lyzr.ai/v3/inference/chat/';
    const body = {
      user_id: 'demo_user',
      agent_id: LYZR_AGENT_ID,
      session_id: session_id || 'default_session',
      message: message,
    };

    console.log('Calling Lyzr:', { endpoint, body });

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': LYZR_API_KEY,
      },
      body: JSON.stringify(body),
    });

    const rawText = await response.text();
    console.log(`Lyzr response [${response.status}]:`, rawText);

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `Lyzr API error [${response.status}]: ${rawText}` }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      return new Response(
        JSON.stringify({ error: 'Failed to parse Lyzr response', raw: rawText }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const reply = data.response || data.agent_response || data.message || JSON.stringify(data);

    return new Response(
      JSON.stringify({ response: reply }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Edge function error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});