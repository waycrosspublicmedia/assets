(function() {
    window.createNotification = function(message = "Mateo: You forgot about me, didn’t you?") {
        if (typeof nw !== "undefined" && nw.Window) {
            const fs = require('fs');
            const path = require('path');
            const tempDir = nw.App.dataPath;
            const filePath = path.join(tempDir, 'notification.html');

            const htmlContent = `

                <!DOCTYPE html>
                <html>
                <head>
                <meta charset="UTF-8">
                <style>
                    html, body {
                        margin: 0;padding: 0;
                        overflow: hidden;
                        background: transparent;
                    }
                    body::before {
                        content: "${message}";
                        display: block;
                        width: 100%;
                        height: 100%;
                        color: white;
                        font-family: sans-serif;
                        font-size: 16px;
                        background: #00000080;
                        padding: 15px;
                        box-sizing: border-box;
                    }
                </style>
                </head>
                <body></body>
                </html>


            `;

            fs.writeFileSync(filePath, htmlContent, 'utf8');

            nw.Window.open(filePath, {
                width: 300,
                height: 80,
                x: screen.width - 320,
                y: screen.height - 120,
                frame: false,
                transparent: true,
                always_on_top: true,
                resizable: false
            }, function(newWin) {
                setTimeout(function() {
                    newWin.close();
                    fs.unlink(filePath, (err) => { if (err) console.error(err); });
                }, 5000);
            });
        }
    }
})();
