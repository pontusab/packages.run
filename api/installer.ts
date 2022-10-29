export default async function handler(_) {
  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(
        encoder.encode(
          '<html><head><title>Vercel Edge Functions + Streaming</title></head><body>',
        ),
      );
      controller.enqueue(encoder.encode('Vercel Edge Functions + Streaming'));
      controller.enqueue(encoder.encode('</body></html>'));
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export const config = {
  runtime: 'experimental-edge',
};
