
module.exports = function(title="default",content){

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="style.css">
        <title>${title}</title>
    </head>
    <body>
        <header>
            <h2>template header</h2>
        </header>
        <main>
            ${content}
        </main>
        <footer>
            <h4>end of page</h4>
        </footer>
        <script src="main.js"></script>
    </body>
    </html>
    `;




}