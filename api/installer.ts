export default async function handler(_) {
  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(
        encoder.encode(
          `
          <html>
            <head>
              <title>Configurable Installer</title>
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap" rel="stylesheet">
              
              <style>
                .installer {
                  width: 677px;
                  height: 46px;
                  background-color: black;
                }
              </style>
            </head>
            
            <body>
              <div class="installer">
                npm install next react react-dom
              </div>
            </body/>
          </html>
          `,
        ),
      );

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
