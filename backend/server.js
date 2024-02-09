import express from 'express';
const app = express();
import 'dotenv/config';

app.get('/',(req,res)=>{
    res.send('Server is ready');
});

//get a list of 5 jokes
app.get('/api/jokes',(req,res)=>{
   const jokes = [
    {
        id : 1,
        title : 'a joke',
        content : 'this is a joke'
    },
    {
        id : 2,
        title : 'second joke',
        content : 'this is 2 joke'
    },
    {
        id : 3,
        title : 'third joke',
        content : 'this is third joke'
    },
    {
        id : 4,
        title : 'fourth joke',
        content : 'this is fourth joke'
    },
    {
        id : 5,
        title : 'fifth joke',
        content : 'this is fifth joke'
    }
   ];

   res.send(jokes);
});

const port = process.env.PORT || 8000;

app.listen(port, ()=>{
   console.log(`Server running at http://localhost:${port}`);
});

