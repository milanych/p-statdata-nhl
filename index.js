const text = {
  'ru': {
    'h1': "Статистика игрока",
    'desc': "Сколько очков и голов игрок может заработать при текущих показателях.",
    'howManyPoints': 'Сколько сейчас очков',
    'howManyGoals': 'Сколько сейчас голов',
    'howManyGames': 'Игр сыграно игроком',
    'gamesRemain': 'Игр осталось в сезоне',
    'chooseTeam': 'Выберите команду',
    'button': 'Результат',
    'endOfSeason': 'В конце сезона будет...',
    'howMany': 'Сколько?'
  },
  'en': {
    'h1': "Player's Statistics",
    'desc': "How many points and goals a player can score, and his current performance.",
    'howManyPoints': 'How many points now',
    'howManyGoals': 'How many goals now',
    'howManyGames': 'How many games played by player',
    'gamesRemain': 'Games remaining',
    'chooseTeam': 'Choose the team',
    'button': 'Result',
    'endOfSeason': 'At the end will be...',
    'howMany': 'How many?'

  }
}


const defaultValues = () => {
  document.querySelector("body > div.data-container > div.container-center > h1").innerHTML = text.en.h1;
  document.querySelector("body > div.data-container > div.container-center > p").innerHTML = text.en.desc
  document.querySelector("#currentPoints").placeholder = text.en.howManyPoints;
  document.querySelector("body > div.data-container > div.container-center > div.buttons > button.buttons-result").innerHTML = text.en.button;
  document.querySelector("#currentGoals").placeholder = text.en.howManyGoals;
  document.querySelector("#gamesPlayed").placeholder = text.en.howManyGames;
  document.querySelector("#gamesRemain").placeholder = text.en.gamesRemain;
  document.querySelector("#statData").firstChild.innerHTML = text.en.chooseTeam;
  document.querySelector("body > div.data-container > div.container-center > span.result").innerHTML = text.en.endOfSeason;
  document.querySelector("#resultData").innerHTML = text.en.howMany;
}
defaultValues()

//Change the language
let ru = document.querySelector("#lang_ru");
let en = document.querySelector("#lang_en");

ru.addEventListener("click", function () {
  change(ru, en)
})
en.addEventListener("click", function () {
  change(en, ru)
})

const change = (current, off) => {
  if (!current.classList.contains("active")) {
    current.classList.add("active")
    off.classList.remove("active")
  }
  if (en.classList.contains('active')) {
    defaultValues()
  } else {
    document.querySelector("body > div.data-container > div.container-center > h1").innerHTML = text.ru.h1;
    document.querySelector("body > div.data-container > div.container-center > p").innerHTML = text.ru.desc
    document.querySelector("#currentPoints").placeholder = text.ru.howManyPoints;
    document.querySelector("body > div.data-container > div.container-center > div.buttons > button.buttons-result").innerHTML = text.ru.button
    document.querySelector("#currentGoals").placeholder = text.ru.howManyGoals;
    document.querySelector("#gamesPlayed").placeholder = text.ru.howManyGames;
    document.querySelector("#gamesRemain").placeholder = text.ru.gamesRemain;
    document.querySelector("#statData").firstChild.innerHTML = text.ru.chooseTeam;
    document.querySelector("body > div.data-container > div.container-center > span.result").innerHTML = text.ru.endOfSeason;
    document.querySelector("#resultData").innerHTML = text.ru.howMany;
  }
}

//Calculations
const result = () => {
  let points = +document.getElementById('currentPoints').value
  let goals = +document.getElementById('currentGoals').value
  let played = +document.getElementById('gamesPlayed').value
  let remain = +document.getElementById('gamesRemain').value
  let resultPoints = Math.floor(((points / played) * remain) + points);
  let resultGoals = Math.floor(((goals / played) * remain) + goals);
  if (ru.classList.contains('active')) {
    let answer = `Очков: ${resultPoints}, Голов: ${resultGoals};`
    document.querySelector("#resultData").innerHTML = (!resultPoints || !resultGoals) ? 'Введите данные' : answer;
  } else {
    let answer = `Points: ${resultPoints}, Goals: ${resultGoals};`
    document.querySelector("#resultData").innerHTML = (!resultPoints || !resultGoals) ? 'Enter the data' : answer;
  }
}

let urlData = 'leaders.json'
let numberOfGames = 82
//Current games played
async function getData() {
  await fetch(urlData)
    .then(response => response.json())
    .then(data => data.conferences
      .map(div => div.divisions
        .map(division => division.teams
          .map((team) => {
            let name = `${team.market} ${team.name}`;
            let played = team.games_played;
            let option = `<option>${name}, ${played}</option>`
            document.querySelector("#statData").innerHTML += option;
          })
        )
      )
    )
};

getData()

const selectElement = document.querySelector(".statData");
selectElement.addEventListener("change", (event) => {
  document.getElementById('gamesRemain').value = (numberOfGames - event.target.value.slice(-2));
});

//Reset button
const reset = () => {
  document.getElementById('currentPoints').value = ''
  document.getElementById('currentGoals').value = ''
  document.getElementById('gamesPlayed').value = ''
  document.getElementById('gamesRemain').value = ''
}