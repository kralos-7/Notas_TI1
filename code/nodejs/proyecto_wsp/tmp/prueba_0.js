const qrcode = require('qrcode-terminal');
const {Client} = require('whatsapp-web.js');

const client = new Client();

client.on('qr', qr => {
	qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
	console.log("Phone ready ... :D");
});

client.on('message', msg => {
	let msgs = msg.body;
	console.log('From : ',msg.from);
	console.log('Message : ',msgs);

	if(msg.body === 'Hello'){

		msg.reply('world!!!');
	}
	if(msg.body === 'Hola'){
		console.log("Enviando a: ",msg.from);
		client.sendMessage(msg.from , "Buuuu!!!");
	}
});

client.initialize();
