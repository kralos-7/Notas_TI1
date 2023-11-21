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
	console.log('From : ',msg.from);
	console.log('Message : ',msg.body);
	if(msg.body == 'Hello'){
		msg.reply('world!!!');
	}
	if(msg.body == 'how are you?'){
		client.sendMessage(msg.from,'I am fine thank you !!! ;) ');
	}
});

client.initialize();
