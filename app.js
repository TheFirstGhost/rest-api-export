import express from "express"

var msg = 'Start';
console.log(msg);

const axios1 = require('axios');
const axios2 = require('axios');
//const { resolve } = require('path');

const router = express.Router();

var id;
var value;

function postExport(){
    return new Promise(resolve => {
        resolve("post");
        axios1
            .post("http://127.0.0.1:3080/api/appengine/tests/current/exports", {
                "type": "channel",
                "inputChannel": "Zwick.Channel.Ztl.CyclesNumberMsr"
            })
            .then(res => {
                console.log(`statusCode: ${res.status}`);
                console.log(res.data);
                id = res.data.id;
                console.log(id);
            })
            .catch(error => console.error(error))
    })
}

function getExport(){
    return new Promise(resolve => {
        setTimeout(function() {
            resolve("get");
            console.log(id);
            axios2
                .get(`http://127.0.0.1:3080/api/appengine/tests/current/exports/${id}/data`)
                .then(res => {
                    console.log(`statusCode: ${res.status}`);
                    //console.log(res.data.values);
                    var arr = res.data.values;
                    value = arr[arr.length-1];
                    console.log(value);
                })
                .catch(error => {
                    console.error(error);
                })
        }, 50)
        
    })
}

async function getValue(){
    const task1 = await postExport();
    console.log(task1);

    const task2 = await getExport();
    console.log(task2);
}

router.get('/exports/', (req, res) => {
    await getValue();
    res.send(value);
});

//getValue();
/*console.log(id);
console.log(`http://127.0.0.1:3080/api/appengine/tests/current/exports/${id}/data`);
getExport();
console.log(`http://127.0.0.1:3080/api/appengine/tests/current/exports/${id}/data`);*/



