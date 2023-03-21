
// let exports.totalScope = 0;
const obj = [
    ["Как переводится quantity of supply?", "Величина предложения", "Количество спроса", "Величина цены", "Количество величины спроса", 1],
    ["Как называется количество товара или услуги, которое покупатели готовы по данной цене?", "Quality of demand", "Средний спрос", "Количество спроса", "Quantity of demand", 4],
    ["Как называется зависимость между количеством товара или услуги, которое покупатели хотят и могут купить, и ценой на этот товар в определенное время в определенном месте?", "Demond", "Quantity of demond", "Спрос", "Количество предложения", 3],
    ["Выберите, как можно выразить функцию спроса из предложенных вариантов:", "Qd = Q (P)", "Pd = P (Q)","Qd = a/P", "Qd = 10 – 2p", 3]
]
let scope = 0;
let numberOfQuestion = 0;


function newQuestion(numQ){
    let endQuestion = false;
    let textPlace = document.querySelector('.textBlock');
    let block1 = document.querySelectorAll('.block')[0];
    let block2 = document.querySelectorAll('.block')[1];
    let block3 = document.querySelectorAll('.block')[2];
    let block4 = document.querySelectorAll('.block')[3];
    console.log(block1);
    let arr = [block1, block2, block3, block4];
    textPlace.textContent = obj[numQ][0];
    for(let i = 0; i<arr.length; i++){
        arr[i].textContent = `${[i+1]}. ${obj[numQ][i+1]}`;
    }
    // block1.textContent = '${obj[numOfQuestion][1]}';
    // block2.textContent = '${obj[numOfQuestion][2]}';
    // block3.textContent = '${obj[numOfQuestion][3]}';
    // block4.textContent = '${obj[numOfQuestion][4]}';

    let timeCounter = 30;
    let rightAnswer = obj[numQ][5];
    console.log(rightAnswer);
    // block1.addEventListener('click', ()=>{
    //     if(rightAnswer == 1){
    //         console.log('Верно!');
    //         block1.style.background = "#5EB97D";
    //         endQuestion = true;
    //     }else{
    //         block1.style.background = "#EB6465";
    //         endQuestion = true;
    //     }
    // })
    // block2.addEventListener('click', ()=>{
    //     if(rightAnswer == 2){
    //         console.log('Верно!');
    //         block2.style.background = "#5EB97D";
    //
    //         endQuestion = true;
    //     }else{
    //         block2.style.background = "#EB6465";
    //         endQuestion = true;
    //     }
    // })
    // block3.addEventListener('click', ()=>{
    //     if(rightAnswer == 3){
    //         console.log('Верно!');
    //         block3.style.background = "#5EB97D";
    //
    //         endQuestion = true;
    //     }else{
    //         block3.style.background = "#EB6465";
    //         endQuestion = true;
    //     }
    // })
    // block4.addEventListener('click', ()=>{
    //     if(rightAnswer == 4){
    //         console.log('Верно!');
    //         block4.style.background = "#5EB97D";
    //
    //         endQuestion = true;
    //     }else{
    //         block4.style.background = "#EB6465";
    //         endQuestion = true;
    //     }
    // })

    // for (let i = 0; i<arr.length; i++){
    //     arr[i].style.background = "#6477EB";
    // }

    // for(let i = 0; i<arr.length; i++){
    //     arr[i].addEventListener('click', ()=>{
    //         if (rightAnswer == i+1){
    //             arr[i].style.background = "#5EB97D";
    //             scope++;
    //             endQuestion = true;
    //             console.log("now scope = ", scope);
    //         }else{
    //             arr[i].style.background = "#EB6465";
    //             endQuestion = true;
    //             console.log("now scope = ", scope);
    //         }
    //
    //     })
    // }
    // let endQTime = setInterval(()=>{
    //     if (endQuestion===true){
    //         numberOfQuestion++;
    //         clearInterval(endQTime);
    //         if (numberOfQuestion>=obj.length){
    //
    //             if (scope == obj.length){
    //                 alert("Молодец!");
    //             }else{
    //                 alert(`Работать, негр! Нифига не знаешь емаеб всего ${scope} очков из ${obj.length} набрал`);
    //             }
    //             console.log("total scope = ", scope);
    //         }else{
    //             setTimeout(()=>{newQuestion(numberOfQuestion);}, 1000)
    //         }
    //
    //     }
    // }, 10)

}
newQuestion(0);

console.log('Я негр ааааааааааааааааааааа!!!!!!!!!!1');
//console.log("Рома пупс");