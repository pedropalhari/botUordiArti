const phantom = require('phantom');
var fs = require('fs');

function HTMLtoImage(message, type = "wordart blues", height, width) {

    return new Promise((resolve, reject) => {

        //O phantomJS tem um problema de quebra de página, ele come em cima, precisa
        //de uma quantidade de <br>s para deixar o texto meio que centralizado.
        //Supus 1 por linha de texto nova que vem
        let brs = "";
        for (var i = 1; i < height; i++)
            brs += "<br>";

        //Html básico
        var html = `<html>
                    <head>
                        <meta charset="UTF-8">
                    </head> 
                    <link rel="stylesheet" type="text/css" href="wordart.css">    
                    <body>
                        ${brs}
                        <div class="${type}">
                            <span class="text">${message}</span>
                        </div>
                    </body>
                    
                    </html>`;


        //Escreve em um arquivo HTML que o phantomJS vai ler
        fs.writeFile("C:/users/pedro/desktop/amon/index.html",
            html,
            async function (err) {
                if (err) {
                    return console.log(err);
                }

                console.log("The file was saved! \n");

                //Chama a função com o PhantomJS
                var msg = await renderPage(height, width);

                resolve(msg);
            });
    });
}


async function renderPage(height, width) {
    //Cria todas as instancias
    const instance = await phantom.create();
    const page = await instance.createPage();

    //Calcula +/- o tamanho da página baseado na quantidade de linhas/caracteres máximos em uma linha
    var pageWidth = 45 * width;
    var pageHeight = 130 * height;
    page.property('viewportSize', { width: pageWidth, height: pageHeight });
    page.property('clipRect', { top: 0, left: 0, width: pageWidth, height: pageHeight });

    //Abre e tira a foto
    const status = await page.open('./index.html');
    var base64 = await page.render('teste.png');

    instance.exit();
    
    //Essa parte aqui é caso eu vá retornar em base64 no futuro utilizando outra função do PhantomJS
    return base64;
}

module.exports = HTMLtoImage;