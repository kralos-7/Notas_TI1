const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const cwsp = require('./src/conex_swp');

cwsp.conex();

const envioMsg = async (req, res) => {
	const { numero, mensaje } = req.body;

	console.log("Preparando envio: ",numero," - ",mensaje);
	
	try{
		const respuesta = await cwsp.enviar(numero,mensaje);
	    if (respuesta) {
			await console.log("Enviando ... ");
			res.send({ mensaje: 'Mensaje enviado' });
		} else {
			res.send({ mensaje: 'Mensaje no enviado' });
		}
	} catch (error) {
		const errorController = `Error al enviar mensaje a ${numero}`;
		console.error(errorController, error);
		res.status(500).send({ mensaje: errorController });
	}
}

const apirest = express();
const router = express.Router();
const port = process.env.PORT || 8484;

apirest.use(bodyParser.urlencoded({ extended: true }));
apirest.use(bodyParser.json());
apirest.use(cors());

apirest.use('/', router);

router.route('/').get((req,res)=>{
	res.json("Nuesta API esta Funcionando")
});

router.route('/envio').post(envioMsg);

apirest.listen(port);
console.log("Inicio en el puerto " + port);
