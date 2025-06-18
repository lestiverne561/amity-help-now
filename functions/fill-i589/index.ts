import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { PDFDocument } from "https://esm.sh/pdf-lib";

serve(async (req) => {
  const data = await req.json();

  const formUrl = "https://your-supabase-url.storage/v1/object/public/forms/I-589_Fillable_Template_for_PDFLib.pdf";
  const existingPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const form = pdfDoc.getForm();

  form.getTextField("PtAILine1_ANumber").setText(data.a_number || "");
  form.getTextField("PtAILine5_FirstName").setText(data.first_name || "");
  form.getTextField("PtAILine4_LastName").setText(data.last_name || "");
  form.getTextField("PtAILine8_City").setText(data.city || "");
  form.getTextField("PtAILine8_State").setText(data.state || "");

  const pdfBytes = await pdfDoc.save();
  const base64 = btoa(String.fromCharCode(...new Uint8Array(pdfBytes)));

  return new Response(JSON.stringify({
    file: `data:application/pdf;base64,${base64}`
  }), {
    headers: { "Content-Type": "application/json" }
  });
});
