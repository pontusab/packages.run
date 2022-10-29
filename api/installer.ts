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
              <link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&display=swap" rel="stylesheet">
              
              <style>
                body {
                  margin: 0;
                }

                .container {
                  max-width: 677px;
                  width: 100%;
                }

                .installer {
                  margin-top: 10px;
                  position: relative;
                  padding: 0 13px;
                  box-sizing: border-box;
                  width: 100%;
                  height: 46px;
                  background-color: black;
                  color: white;
                  font-family: 'Inconsolata', monospace;
                  font-size: 15px;
                  -webkit-font-smoothing: antialiased;
                  line-height: 46px;
                  height: 46px;
                  font-weight: 700;
                }
                
                .copy {
                  position: absolute;
                  right: 13px;
                  top: 11px;
                }

                p:before {
                  content: "$ ";
                }

                .dropdown 
                  font-style: normal;
                  font-weight: 400;
                }
              </style>
            </head>
            
            <body>
              <div class="container">
                <span class="dropdown">npm <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <rect width="13" height="12" fill="url(#pattern0)"/>
                <defs>
                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#image0_1_8" transform="translate(-0.0169231) scale(0.0184615 0.02)"/>
                </pattern>
                <image id="image0_1_8" width="56" height="50" xlink:href="data:image/png;base64,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"/>
                </defs>
                </svg>
                </span>
                <div class="installer">
                  <p>npm install next react react-dom</p>

                  <div class="copy">
                    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 11H9.75M6 14H9.75M6 17H9.75M12.75 17.75H15C15.5967 17.75 16.169 17.5129 16.591 17.091C17.0129 16.669 17.25 16.0967 17.25 15.5V5.108C17.25 3.973 16.405 3.01 15.274 2.916C14.9 2.88498 14.5256 2.85831 14.151 2.836M8.35 2.836C8.285 3.046 8.25 3.269 8.25 3.5C8.25 3.914 8.586 4.25 9 4.25H13.5C13.6989 4.25 13.8897 4.17098 14.0303 4.03033C14.171 3.88968 14.25 3.69891 14.25 3.5C14.2501 3.27491 14.2164 3.05109 14.15 2.836M8.35 2.836C8.49203 2.3767 8.77738 1.97493 9.16426 1.68954C9.55115 1.40414 10.0192 1.25011 10.5 1.25H12C13.012 1.25 13.867 1.918 14.15 2.836M8.35 2.836C7.974 2.859 7.6 2.886 7.226 2.916C6.095 3.01 5.25 3.973 5.25 5.108V7.25M5.25 7.25H1.875C1.254 7.25 0.75 7.754 0.75 8.375V19.625C0.75 20.246 1.254 20.75 1.875 20.75H11.625C12.246 20.75 12.75 20.246 12.75 19.625V8.375C12.75 7.754 12.246 7.25 11.625 7.25H5.25ZM3.75 11H3.758V11.008H3.75V11ZM3.75 14H3.758V14.008H3.75V14ZM3.75 17H3.758V17.008H3.75V17Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>
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
