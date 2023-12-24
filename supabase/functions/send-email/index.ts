import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

import { sendMail, IRequestBody } from "https://deno.land/x/sendgrid/mod.ts";

const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");
const TEMPLATE_ID = Deno.env.get("TEMPLATE_ID");
const corsHeaders = {
  "Access-Control-Allow-Origin": "localhost",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};
const handler = async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const body = await req.json();

  const mail: irequestbody = {
    personalizations: [
      {
        subject: body.subject,
        to: [{ email: body.to }],
        dynamic_template_data: {
          name: body.name,
          link: body.link,
        },
      },
    ],
    from: { email: body.from },

    template_id: TEMPLATE_ID,
  };

  try {
    let response = await sendMail(mail, { apiKey: SENDGRID_API_KEY });
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  }
};

serve(handler);
