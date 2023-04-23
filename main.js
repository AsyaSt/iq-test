let menuBtn = document.querySelector('.menu-btn');
let menu = document.querySelector('.menu');
menuBtn.addEventListener('click', function(){
	menu.classList.toggle('active');
    menuBtn.classList.toggle('active');
})

let questions = [
    // {
    //     question: "Ваш пол:",
    //     choices: ["Мужчина", "Женщина"],
    //     type: 'text'
    // },
    // {
    //     question: "Укажите ваш возраст:",
    //     choices: ["До 18", "От 18 до 28", "От 29 до 35","От 36"],
    //     type: 'text'
    // },
    // {
    //     question: "Выберите лишнее:",
    //     choices: ["Дом", "Шалаш", "Бунгало", "Скамейка", "Хижина" ],
    //     type: 'text'
    // },
    // {
    //     question: "Продолжите числовой ряд: <br>18  20  24  32  ",
    //     choices: ["62", "48", "74", "57", "60", "77"],
    //     type: 'text'
    // },
    
    // {
    //     question: "Отдохните пару секунд, еще раз Выберите цвет, который сейчас наиболее Вам приятен:",
    //     choices: ["#A8A8A8", "#0000A9", "#00A701", "#F60100", "#FDFF19", "#A95403", "#000000", "#850068", "#46B3AC"],
    //     type: 'color'
    // },

    // {
    //     question: "Выберите цвет, который сейчас наиболее Вам приятен:",
    //     choices: ["#A8A8A8", "#46B3AC", "#0000A9",  "#F60100", "#FDFF19", "#A95403", "#00A701","#000000", "#850068"],
    //     type: 'color'
    // },

    // {
    //     question: "Какой из городов лишний?",
    //     choices: ["Вашингтон", "Лондон", "Париж", "Нью-Йорк", "Москва", "Оттава"],
    //     type: 'text'
    // },

    // {
    //     question: "Выберите правильную фигуру из четырёх пронумерованных.",
    //     image: './images/question.png',
    //     choices: ["1", "2", '3', '4'],
    //     type: 'picture'
    // },
    // {
    //     question: "Вам привычнее и важнее:",
    //     choices: ["Наслаждаться каждой минутой проведенного времени", "Быть устремленными мыслями в будущее", 'Учитывать в ежедневной практике прошлый опыт'],
    //     type: 'text'
    // },

    // {
    //     question: "Какое определение, по-Вашему, больше подходит к этому геометрическому изображению: ",
    //     choices: ["оно остроконечное", "оно устойчиво", "оно-находится в состоянии равновесия"],
    //     image:'./images/question3.png',
    //     type: 'text'
    // },

    {
        question: "Вставьте подходящее число",
        image: './images/question2.png',
        choices: ["34", "36", '53', '44', '66', '42'],
        type: 'picture'
    },
]

let main = document.querySelector('main');

// ! Отрисовка таблицы по запросу фетч






// ! функция для перелистывания на следующий вопрос
let currentQuestion = 0;
let addCurrentQuestion = async () => {
    if (currentQuestion < questions.length-1) {
        currentQuestion += 1;
        quiz();
        console.log(currentQuestion);
    }

    else {
        await setTimeout(() =>  window.location = 'index.html#/resultPage', 2000).then
        preloader(); 
    }
}

// ! функция отрисовки квиза на роуте 'quiz'
let quiz = () => {
    const [,route, _id] = location.hash.split('/');
    if (route === 'quiz') { 
        main.classList.add('quiz-main');
        main.innerHTML = '';
        let choicesHtml = "";

        let question = document.createElement('div');
        question.innerText = questions[currentQuestion].question;
        
// ! отрисовываем варианты ответов в зависимости от типов 
        for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
            if(questions[currentQuestion].type === 'text') {
                choicesHtml += `
                <div class="custom-radio">
                    <input type="radio" value="${questions[currentQuestion].choices[i]}" id="radio-option${i}" name="radio-group">
                    <label for="radio-option${i}">${questions[currentQuestion].choices[i]}</label>
                </div>

                `;
            }
            if (questions[currentQuestion].type === 'color') {
                choicesHtml += `
                <div class="custom-radio-color" style="background-color:${questions[currentQuestion].choices[i]}">
                    <input type="radio" value="${questions[currentQuestion].choices[i]}" id="radio-color${i}" name="radio-group">
                    <label for="radio-color${i}">
                        <div class="custom-radio-color-label"></div>
                    </label>
                </div>

                `;
            }

            if(questions[currentQuestion].type === 'picture') {
                choicesHtml += `
                <div class="custom-radio-picture">
                    <input type="radio" value="${questions[currentQuestion].choices[i]}" id="radio-option${i}" name="radio-group">
                    <label for="radio-option${i}">${questions[currentQuestion].choices[i]}</label>
                </div>

                `;
            }
        }
// ! добавить отдельно картинку в тип picture
        let pic = (questions[currentQuestion].type === 'picture') ?
         `<div>
            <img class='quiz-picture' src=${questions[currentQuestion].image}> 
        </div>
        <div class='line'></div>` 
         : 
         `<div style='display: none'></div>`;
// ! исключения - тип текст с картинкой
         let image = (questions[currentQuestion].type === 'text' && questions[currentQuestion]?.image) ?
            `<div style='margin-bottom: 16px'>
                <img class='quiz-picture' src=${questions[currentQuestion].image}> 
            </div>` 
            : 
            `<div style='display: none'></div>`;

        main.innerHTML = `
        <div class='quiz-scale'>
            <div class='quiz-scale-count' style="width: calc(${100 * (currentQuestion + 1) / questions.length }%)">
            </div>
        </div>
        
        <div class='quiz-question-main'>
            <div>
                <div class='question'>
                    ${questions[currentQuestion].question}
                </div>
                ${pic}
                ${image}
                <div class='choices-container'>${choicesHtml}</div>
            </div>
            <button  disabled class="button button-disabled quiz-button" 
                onclick={addCurrentQuestion()}> далее
            </button>
        </div>

        <script>
            ${document.addEventListener('input',(e)=>{

            if(e.target.getAttribute('name')=="radio-group"){
                let buttonQuiz = document.querySelector('.quiz-button');
                buttonQuiz.classList.remove('button-disabled');
                buttonQuiz.disabled = false;
            }
            })}
        </script>
        `
    }
}

let preloader = () => {
    main.innerHTML = `
    <div class='quiz-scale'>
            <div class='quiz-scale-count' style="width: calc(${100 * (currentQuestion + 1) / questions.length }%)">
            </div>
        </div>
    <p class='preloader-result'>Oбработка результатов</p>
    <div class="preloader"></div>
    <p class='preloader-desc'>Определение стиля мышления...........
    .... ...................................................</p>
    `;
}

let resultPage = () => {
    const [,route, _id] = location.hash.split('/');
    if (route === 'resultPage') { 
        main.innerHTML = `
        <div class='result-page'>
            <p>Ваш результат рассчитан: </p>

            <p>
            <u>Вы относитесь к 3%</u> респондентов, чей уровень интеллекта более чем на 
            15 пунктов отличается от среднего в большую или меньшую сторону! 
            </p>

            <p>Скорее получите свой результат!</p>
            <div class='security'>
                <p>
                В целях защиты персональных 
                данных результат теста, их подробная интерпретация
                и рекомендации доступны в виде голосового сообщения 
                по звонку с вашего мобильного телефона
                </p>
            </div>
            
            <div class='timer-text'>
                <p>Звоните скорее, запись доступна всего </p>
                <div class="timer"></div> минут
            </div>
            <div class='call'>
                <img src='./images/call.png'>
                <p>Позвонить и прослушать
                результат </p>
            </div>

            <table class="table"> </table>

            <div class='mini-text'>
            TERMENI SI CONDITII: ACESTA ESTE UN SERVICIU DE DIVERTISMENT. PRIN FOLOSIREA LUI DECLARATI CA AVETI 18 ANI IMPLINITI, 
            </div>

        </div>
        `;
    }
    let sec = 59;
    let min = 9;
    let ms = (sec* 1000 + min * 60 * 1000);
    setTimeout(() => { clearInterval(intervalTimer ); }, ms);

    let p = document.querySelector(".timer");
    function clock() {
        sec--;
        p.innerHTML =  min + ":" + (String(sec).length === 1 ? '0' + sec : sec); 
        if (sec <= 0) {
            sec = 60;
            min--;
        }
        if(min == 0 && sec == 0) {
            window.clearInterval(clock);
        }
    };
    let intervalTimer = window.setInterval(clock,1000);

    let callFetch = document.querySelector('.call');
    callFetch.addEventListener('click', (e) => {recFetch('https://swapi.py4e.com/api/people/1/')});
    
}


window.onhashchange = () => {
    const [, route, _id] = location.hash.split('/')
    console.log(route);

    const routes = {
        quiz,
        preloader, 
        resultPage
    }
    if (route in routes) {
        routes[route]();
    }
}


window.onhashchange();



let  recFetch = (url) =>{
    fetch(url)
    .then(res => res.json())
    .then((luke) => {
        console.log(luke)
        drowTable(luke);
        return luke;
        });
}

let  createButton = (nameButton) => {
    let button = document.createElement('button');
    button.innerText = nameButton.slice(27);
    button.type = 'button';
    button.onclick = () => {
        let table = document.querySelector(".table");
        table.innerHTML = '';
        recFetch (nameButton);
    }
    return button;
}

let drowTable  = (json) => {
    let table = document.querySelector(".table");
    for (let [key, value] of Object.entries(json)) {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');

        if(Array.isArray(value)) {
            td1.innerText = key;
            for (let [key1, innerValue] of Object.entries(value)) {
                if (innerValue.indexOf('https://swapi.py4e.com/api/') > -1) {
                    let button = createButton(innerValue);
                    td2.appendChild(button);
                } else{
                    td2.innerText = value;
                }
            }
        } else {
            td1.innerText = key;
            if (typeof value === 'string' && (value.indexOf('https://swapi.py4e.com/api/') > -1)) {
                let button = createButton(value);
                td2.appendChild(button);
            } else{
                td2.innerText = value;
            }
        }
        
        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);
        
    }
    return table;
}
