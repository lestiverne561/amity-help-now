// index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { applicantName, countryOfBirth, reasonForAsylum } = await req.json();

  if (!applicantName || !countryOfBirth || !reasonForAsylum) {
    return new Response(
      JSON.stringify({ error: "Missing required fields." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const generatedResponse = `
    Applicant: ${applicantName}
    Country of Birth: ${countryOfBirth}
    Reason for Asylum: ${reasonForAsylum}

    Thank you for providing your information. Our legal assistant AI has received your data and will now process your I-589 application for asylum. Make sure all information is correct before submitting your final form.
  `;

  return new Response(JSON.stringify({ message: generatedResponse }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
