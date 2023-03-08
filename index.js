const result = () => {
  let points = +document.getElementById('currentPoints').value
  let goals = +document.getElementById('currentGoals').value
  let played = +document.getElementById('gamesPlayed').value
  let remain = +document.getElementById('gamesRemain').value
  let resultPoints = Math.floor(((points / played) * remain) + points);
  let resultGoals = Math.floor(((goals / played) * remain) + goals);
  let answer = `Очков: ${resultPoints}, Голов: ${resultGoals};`
  return document.querySelector("#resultData").innerHTML = (!resultPoints || !resultGoals) ? 'Введите данные' : answer;
}
const reset = () => {
  document.getElementById('currentPoints').value = ''
  document.getElementById('currentGoals').value = ''
  document.getElementById('gamesPlayed').value = ''
  document.getElementById('gamesRemain').value = ''
}