const translate = require('@iamtraction/google-translate');

translate('Como estas?', { to: 'en' }).then(res => {
	  console.log(res.text); // OUTPUT: You are amazing!
}).catch(err => {
	  console.error(err);
});

translate('Thank you, are you fine?', { from: 'en', to: 'es' }).then(res => {
	  console.log(res.text); // OUTPUT: Je vous remercie
	  console.log(res.from.autoCorrected); // OUTPUT: true
	  console.log(res.from.text.value); // OUTPUT: [Thank] you
	  console.log(res.from.text.didYouMean); // OUTPUT: false
}).catch(err => {
	  console.error(err);
});
