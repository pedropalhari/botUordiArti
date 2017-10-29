process.env.NTBA_FIX_319 = 1;

const TelegramBot = require('node-telegram-bot-api');
const HTMLtoImage = require('./htmltoimage');

// replace the value below with the Telegram token you receive from @BotFather
const token = require('./environment');

// Create a bot that uses 'polling' to fetch new updates
var bot = new TelegramBot(token, { polling: true });

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    //Daqui pra baixo eu pego o texto, troco todos seus \n por <br> (html)
    //E vejo qual a largura/altura da página web
    var txt = "";
    txt = msg.text;
    txt = txt.split('\n');    
    var height = txt.length;
    var biggest = '';
    txt.map((txts) => {
        if(txts.length > biggest.length)
            biggest = txts;
    });
    var width = biggest.length;


    //Magia, mas dá certo, o primeiro /span fecha o span
    //que já veio com o código html, o segundo inicia o span pra fechar com o ultimo
    //****magia****
    txt = txt.join('</span><br><span class="text">');

    console.log(txt)

    if(width > 30 || height > 6){
        bot.sendMessage(chatId, "Menos letras, seu cabaço");
        return;
    }

    bot.sendMessage(chatId, "Processando imagem, aguarde um pouco");

    //Chama a função, como callback envia a imagem pro cara
    HTMLtoImage(txt, "wordart rainbow", height, width).then(() => {
        // send a message to the chat acknowledging receipt of their message
        bot.sendPhoto(chatId, __dirname + '/teste.png');
    });


});

