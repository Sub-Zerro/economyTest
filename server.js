const express = require("express");

const app = express();
let path = require('path');
let gg = false;
const PORT = process.env.PORT || 3000;
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// global.document = new JSDOM("http://localhost:3000/").window.document;
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({extended: false});
var fs = require('fs');
// fs.readFileSync(__dirname + "/script.js");
// app.get("/", function (res, req){
//     fs.readFile(function (error, data){
//         if (err){
//             throw err;
//         }else{
//             res.writeteHead(200, {'Content-Type' : 'text/javascript'});
//             res.write(data);
//             res.end();
//         }
//
//     })
// })
const pg = require('pg');

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;











if(gg===false){
    app.get("/", function (request, response) {
        response.sendFile(__dirname + "/index.html");
    });
}else{
    console.log("end");
}

// app.get("/", urlencodedParser, function (request, response) {
//     if(!request.body) return response.sendStatus(400);
//     console.log(request.body);
//     response.send(request.body.scope);
// });
const obj = [
    ["Как переводится quantity of supply?", "Величина предложения", "Количество спроса", "Величина цены", "Количество величины спроса", 1],
    ["Как называется количество товара или услуги, которое покупатели готовы по данной цене?", "Quality of demand", "Средний спрос", "Количество спроса", "Quantity of demand", 4],
    ["Как называется зависимость между количеством товара или услуги, которое покупатели хотят и могут купить, и ценой на этот товар в определенное время в определенном месте?", "Demond", "Quantity of demond", "Спрос", "Количество предложения", 3],
    ["Выберите, как можно выразить функцию спроса из предложенных вариантов:", "Qd = Q (P)", "Pd = P (Q)","Qd = a/P", "Qd = 10 – 2p", 3],
    ["Как называется количество товаров и услуг, которые продавец готов предложить по данной цене в определенное время в определенном месте?", "Quantity of demande", "Quantity of supply", "Supply", "Price", 2],
    ["Как называется зависимость между количеством товаров и услуг, которые продавец готов предложить по этой цене, и ценами на товар в определенное время в определенном месте?", "Price", "Demande", "Quantity", "Supply", 4],
    ["Что из перечисленных вариантов является законом спроса?", "Чем выше спрос, тем выше количество спроса", "Чем выше предложение, тем ниже спрос", "Чем выше количество, тем выше цена", "Чем выше цена, тем ниже величина спроса", 3],
    ["Что произойдет с ценой товара, если цена товара-заменителя вырастет?", "Упадет", "Вырастет", '', '', 1],
    ["Что произойдет с ценой товара, если цена дополняющего товара упадет?", "Упадет", "Вырастет", "Не изменится", "", 2],
    ["Одинаковым ли будет влияние на предложение увеличения стоимости ресурсов и улучшение технологий производства?", "Да", "Нет", "", "", 2],
    ["Что случится с предложением на товар, если цена на товар, производимый на аналогичном оборудовании, вырастет?", "Вырастет", "Уменьшится", "Не изменится", "", 2],
    ["Что произойдет со спросом на шоколад, если налоги на покупателя вырастут?", "Вырастет", "Уменьшится", "Не изменится", "", 2],
    ["В Японии в 20 веке только начинала развиваться производство автомобилей. Правительство страны снизила налоги на автомобильные фирмы и производителей железа. Уже к середине века на рынке автомобилей был обширный выбор разных производителей. Но до конца дожили не многие компании – не все из них могли позволить себе тратиться на хорошее сырье и качественные механизмы. Покупатели поняли, товары каких фирм действительно стоит покупать, что способствовало разорению некоторых производителей. Какой из ответов характеризует линию спроса на продукцию надежного производителя автомобилей в Японии в 20 веке?", "Растет, растет, падает", "Растет, падает, растет", "Падает, растет, растет", "Падает, падает, растет", 2],
    ["Укажите, как соотносятся между собой линии предложения на лапшу быстрого приготовления и дорогую итальянскую лапшу?", "Никак не соотносятся", "Прямо пропорционально", "Обратно пропорционально", "", 2],
    ["Представьте, если бы у вас была компания по производству дорогой итальянской лапши, а ваш главный покупатель – ресторан в центре города, в котором лапшу подают вместе с кусочками жареной говядины. Ваши маркетологи заметили, что себестоимость говядины выросла, нужно ли вам менять цену на лапшу для ресторана, если вы хотите продавать их в том же объеме, что и ранее?", "Надо уменьшить", "Не надо менять", "Надо увеличить", "", 1]
]
app.use(express.static(path.join(__dirname)));
let rAnswers = [];
for(let i = 0; i<obj.length; i++){
    rAnswers.push(obj[i][5]);
}

let answersArr = [];
let totalScope = 0;
let numberOfQ = 0;

app.post("/", urlencodedParser, function (request, response) {
    answersArr.push(request.body.answ);
    console.log(answersArr);
    if (answersArr.length - rAnswers.length == 1){
        console.log("Тест закончился");
        for (var i = 0; i<rAnswers.length; i++){
            if (rAnswers[i] == answersArr[i+1]){
                totalScope++;
            }
        }
        //response.end("Вы набрыли  баллов");
        response.write(`
             <!DOCTYPE html>
            <html>
            <head>
                <title>Результаты теста</title>
                <meta charset="utf-8" />
            </head>
            <body>
                <h1>Вы набрали ${totalScope} из ${rAnswers.length} возможных</h1>
            </body>
            </html>
        `);

        response.end();


        const {Pool, Client} = require('pg');

        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

        const pool = new Pool({
            host: 'db.lsqzvzhcwzpvqhgpdwbl.supabase.co',
            // Do not hard code your username and password.
            // Consider using Node environment variables.
            user: 'postgres',
            password: 'wrH_RT@easgfh',
            database: 'postgres',
            port: 5432,
            ssl: true
        })

        pool.query(`
            INSERT INTO results(name, scope)values('${answersArr[0]}', '${totalScope}')

    `, (err, res) => {
            console.log(err, res);
            pool.end();
        })


        console.log(totalScope);
    }else{
        numberOfQ++;
    }

    if(answersArr.length - rAnswers.length != 1){

        request.body.answ.innerHTML = '';
        // for(let i=0; i<answersArr.length; i++){
        //     if(answersArr[i]!=undefined){
        //
        //     }
        // }
        //response.send(`${request.body.userName} - ${request.body.userAge}`);



        if (numberOfQ>=1){
            response.write(`
        <!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Тест по экономике</title>
    <style>
        html{
            height: 100%;
            width: 100%;
        }
        body{
            height: 100%;
            width: 100%;
        }
        /*.circle{*/
        /*    width: 100%;*/
        /*    height: 10%;*/
        /*    text-align: center;*/
        /*    justify-content: center;*/
        /*    align-items: center;*/
        /*    position: absolute;*/
        /*    left: 0;*/
        /*    bottom: 0;*/
        /*    background-color: #ff7654;*/
        /*}*/
        .textBlock{
            height: 50%;
            width: 100%;
            flex-direction: column;
            position: relative;
            background-color: white;
            text-align: center;
            justify-content: center;
            align-items: center;
            font-size: 350%;
            display: flex;
        }

        .block:first-child{
            margin-top: 60%;
        }

        .block{
            display: flex;
            flex-direction: column;
            /*top: 100%;*/
            margin-left: 20%;

        }
        button{
            border: 0;
            /*border-radius: 10px;*/
            /*background: #fafafa;*/
            color: #000000;
            padding: 10px 25px;
            width: 60%;
            height: 6%;
            /*font-size: 15pt;*/
            /*display: block;*/
            /*cursor: pointer;*/
            margin-top: 7%;
            text-align: center;
            justify-content: center;
            align-items: center;
            font-size: 200%;
        }
        .forma{
            position: absolute;
            margin-top: 80%;
            margin-left: 30%;
            z-index: 1000;
        }
    </style>
</head>
<body>
<div class="forma">
    <label id="aPlace">Фамилия, имя</label><br>
    <form method="post">
    
        <input type="text" name="answ"/><br><br>
        <input type="submit" value="Отправить" />
    </form>
</div>

<script>
    function addElements(){

        // function getRandomIntInclusive(min, max) {
        //   min = Math.ceil(min);
        //   max = Math.floor(max);
        //   palitra = Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
        // }
        var body = document.querySelector('body');
        // var answer = document.getElementById('aPlace');
        // answer.innerHTML = "Ответ на вопрос(порядковый номер ответа)";

        //var colors = [["red","green","white"], ["#591D45", "#9E2A7E", "#EE8727"], ["#353030", "#FFE600", "#1947EA"]];
        //var palitra;
        //getRandomIntInclusive(0,2);
        //console.log(palitra);

        //var place = document.createElement('div');
        //place.className = "place";
        //place.style.background = colors[palitra][1];
        //body.appendChild(place);

        //document.body.style.background = colors[palitra][0];


        var textBlock = document.createElement('div');
        textBlock.className = "textBlock";
        //block.style.background = colors[palitra][2];
        body.appendChild(textBlock);

        // var circle = document.createElement('div');
        // circle.className = "circle";
        // //block.style.background = colors[palitra][2];
        // body.appendChild(circle);



        var block1 = document.createElement('button');
        block1.className = "block";
        //block1.style.background = colors[palitra][2];
        body.appendChild(block1);
        var block2 = document.createElement('button');
        block2.className = "block";
        //block2.style.background = colors[palitra][2];
        body.appendChild(block2);
        var block3 = document.createElement('button');
        block3.className = "block";
        //block3.style.background = colors[palitra][2];
        body.appendChild(block3);
        var block4 = document.createElement('button');
        block4.className = "block";
        //block4.style.background = colors[palitra][2];
        body.appendChild(block4);
    }
    addElements();
</script>
<script>

    // var exports.totalScope = 0;
        let label = document.getElementById('aPlace');
        label.textContent = "Ответ на вопрос(порядковый номер варианта ответа)"
    
        var textPlace = document.querySelector('.textBlock');
        console.log(textPlace);
        var block1 = document.querySelectorAll('.block')[0];
        console.log(block1);
        var block2 = document.querySelectorAll('.block')[1];
        var block3 = document.querySelectorAll('.block')[2];
        var block4 = document.querySelectorAll('.block')[3];
        console.log(block1);
        var arr = [block1, block2, block3, block4];
        textPlace.textContent = '${obj[numberOfQ - 1][0]}';
        block1.textContent = '${obj[numberOfQ - 1][1]}';
        block2.textContent = '${obj[numberOfQ - 1][2]}';
        block3.textContent = '${obj[numberOfQ - 1][3]}';
        block4.textContent = '${obj[numberOfQ - 1][4]}';
        


    //console.log("Рома пупс");
</script>
<!--<script type="text/javascript" src="script.js"></script>-->
</body>
</html>
    `);
        }
    }
    //if(!request.body) return response.sendStatus(400);
    console.log("arr.length = ",answersArr.length)







    // numberOfQ++;
    gg = true;

});



app.listen(PORT, ()=>console.log("Сервер запущен..."));