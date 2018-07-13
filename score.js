import { MAX_SCORE_ENTRIES } from './constants.js'

const scoreEl = document.querySelector('#score')
const highestScoresContainer = document.querySelector('.score-entries')

let highestScores = []

let score = 0

const updateHighestScores = function (username) {
  let i = 0;

  while (i < MAX_SCORE_ENTRIES && highestScores[i] && highestScores[i].score > score)++i

  if (i < MAX_SCORE_ENTRIES) {
    highestScores = highestScores.slice(0, i)
      .concat([{ username, score }])
      .concat(highestScores.slice(i, MAX_SCORE_ENTRIES))
  }
}

const updateHighestScoresEl = function () {
  clearHighestScoresEl()
  highestScores.forEach(entry => {
    const newScoreEntryEl = document.createElement('h2')
    newScoreEntryEl.textContent = `${entry.username} - ${entry.score}`
    highestScoresContainer.appendChild(newScoreEntryEl)
  })
}

const clearHighestScoresEl = function () {
  while (highestScoresContainer.firstChild) {
    highestScoresContainer.removeChild(highestScoresContainer.firstChild);
  }
}

const updateScoreEl = function () {
  scoreEl.textContent = `Score: ${score}`
}

export function incrementScore() {
  ++score
  updateScoreEl()
}

export function resetScore() {
  score = 0
  updateScoreEl()
}

export function createScoreEntry(username) {
  updateHighestScores(username)
  updateHighestScoresEl()
  reset()
}

const reset = function () {
  score = 0
  updateScoreEl()
}

export function getScoreElementHeight() {
  const scoreStyle = window.getComputedStyle(scoreEl)
  return parseInt(scoreStyle.height)
}
