const express = require('express');
const path = require('path')
var cors = require('cors');
const fs = require('fs');
const app = express();
app.use(express.json()) 
app.use(cors())

app.get('/', (req,res) => 
	res.sendFile(path.resolve(__dirname,'index.html'))
)
app.get('/app.js',(req,res)=> res.sendFile(path.resolve(__dirname,'app.js')))


app.post('/handleForm',(req,res)=>{
	// read file and make object
	let content = JSON.parse(fs.readFileSync('data.json', 'utf8'));
	// edit or add property
	content.push({unit_id:content.length+1,...req.body});
	//write file
	fs.writeFileSync('data.json', JSON.stringify(content));
	res.json('successfully submitted!');
})

app.listen(8080,()=>{
	console.log('server is running!')
})