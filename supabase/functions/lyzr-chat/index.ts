import "https://deno.land/std@0.168.0/dotenv/load.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LYZR_API_KEY = Deno.env.get('LYZR_API_KEY');
    const LYZR_AGENT_ID = Deno.env.get('LYZR_AGENT_ID');
    const LYZR_API_URL = Deno.env.get('LYZR_API_URL');

    if (!LYZR_API_KEY) throw new Error('LYZR_API_KEY is not configured');
    if (!LYZR_AGENT_ID) throw new Error('LYZR_AGENT_ID is not configured');
    if (!LYZR_API_URL) throw new Error('LYZR_API_URL is not configured');

    const { message, session_id } = await req.json();

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const response = await fetch(`${LYZR_API_URL}/chat/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': LYZR_API_KEY,
      },
      body: JSON.stringify({
        user_id: session_id || 'default_user',
        agent_id: LYZR_AGENT_ID,
        message: message,
        session_id: session_id || 'default_session',
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Lyzr API error [${response.status}]: ${errorBody}`);
      throw new Error(`Lyzr API call failed [${response.status}]`);
    }

    const data = await response.json();

    return new Response(
      JSON.stringify({ response: data.response || data.message || JSON.stringify(data) }),
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
