export default async function handler(req) {
  const commands = new URLSearchParams(new URL(req.url).search);
  const selectedCommand = commands.keys().next().value;

  const encoder = new TextEncoder();

  const generateDropdown = () => {
    let options = "";

    commands.forEach((value, key) => {
      options += `<option value="${value}">${key}</option>`;
    });

    return options;
  };

  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(
        encoder.encode(
          `
          <html>
            <head>
              <meta name="color-scheme" content="dark light">
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&display=swap" rel="stylesheet">
              
              <style>
                body {
                  margin: 0;
                  --text-color: #000;
                }

                button {
                  cursor: pointer;
                  background: none;
                  border: none;
                  transition: opacity .15s ease;
                }

                button:hover {
                  opacity: .5;
                }

                ::selection {
                  color: black;
                  background: #5eead4;
                }

                @media (prefers-color-scheme: dark) {
                  body {
                    --text-color: #fff;
                  }
                }

                .container {
                  padding: 15px;
                  max-width: 677px;
                  width: 100%;
                }

                .installer {
                  margin-top: 10px;
                  position: relative;
                  padding: 13px 30px 0 13px;
                  box-sizing: border-box;
                  width: 100%;
                  height: 46px;
                  background-color: black;
                  height: 46px;
                  font-weight: 700;
                }
                
                pre {
                  overflow-y: auto;
                  -webkit-overflow-scrolling: touch;
                  color: white;
                  font-family: 'Inconsolata', monospace;
                  font-size: 15px;
                  -webkit-font-smoothing: antialiased;
                  margin: 0;
                }

                .copy {
                  position: absolute;
                  right: 13px;
                  top: 11px;
                }

                p:before {
                  content: "$ ";
                }

                .dropdown {
                  color: var(--text-color);
                  font-style: normal;
                  font-weight: 400;
                }
              </style>
            </head>
            
            <body>
              <div class="container">
                <select class="commands" name="commands">
                  ${generateDropdown()}
                </select>

                <div class="installer">
                  <pre>${commands.get(selectedCommand)}</pre>

                  <button class="copy" onClick="copyToClipboard()" type="button">
                    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 11H9.75M6 14H9.75M6 17H9.75M12.75 17.75H15C15.5967 17.75 16.169 17.5129 16.591 17.091C17.0129 16.669 17.25 16.0967 17.25 15.5V5.108C17.25 3.973 16.405 3.01 15.274 2.916C14.9 2.88498 14.5256 2.85831 14.151 2.836M8.35 2.836C8.285 3.046 8.25 3.269 8.25 3.5C8.25 3.914 8.586 4.25 9 4.25H13.5C13.6989 4.25 13.8897 4.17098 14.0303 4.03033C14.171 3.88968 14.25 3.69891 14.25 3.5C14.2501 3.27491 14.2164 3.05109 14.15 2.836M8.35 2.836C8.49203 2.3767 8.77738 1.97493 9.16426 1.68954C9.55115 1.40414 10.0192 1.25011 10.5 1.25H12C13.012 1.25 13.867 1.918 14.15 2.836M8.35 2.836C7.974 2.859 7.6 2.886 7.226 2.916C6.095 3.01 5.25 3.973 5.25 5.108V7.25M5.25 7.25H1.875C1.254 7.25 0.75 7.754 0.75 8.375V19.625C0.75 20.246 1.254 20.75 1.875 20.75H11.625C12.246 20.75 12.75 20.246 12.75 19.625V8.375C12.75 7.754 12.246 7.25 11.625 7.25H5.25ZM3.75 11H3.758V11.008H3.75V11ZM3.75 14H3.758V14.008H3.75V14ZM3.75 17H3.758V17.008H3.75V17Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              <script>
                const dropdown = document.querySelector('.commands');

                if(dropdown) {
                  dropdown.addEventListener('change', (evt) => {
                    const command = document.querySelector('pre');
                    command.textContent = evt.target.value
                  });
                }

                const copyToClipboard = () =>{
                  const command = document.querySelector('pre').innerHTML;
                  navigator.clipboard.writeText(command).then(() => {
                    // TODO: Show tooltip
                  });
                }
              </script>
            </body/>
          </html>
          `
        )
      );

      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export const config = {
  runtime: "experimental-edge",
};
