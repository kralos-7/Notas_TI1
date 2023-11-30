const axios = require('axios')

const createUser = async () => {
  try {
    const res = await axios.post('http://localhost:11434/api/generate', {
      model: 'llama2',
      prompt: 'When begin the winter?'
    });
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
}

createUser();

