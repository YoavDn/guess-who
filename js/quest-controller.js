'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

$(document).ready(init)
$('.btn-start').click(onStartGuessing)
$('.btn-yes').click({ ans: 'yes' }, onUserResponse)
$('.btn-no').click({ ans: 'no' }, onUserResponse)
$('.btn-add-guess').click(onAddGuess)
$('.new-game-btn').on('click', onRestartGame)

function init() {
  console.log('Started...')
  createQuestsTree()
}

function onStartGuessing() {
  // TODO: hide the game-start section
  $('.game-start').hide()

  renderQuest()

  // TODO: show the quest section
  $('.quest').fadeIn('fast')
}

function renderQuest() {
  // TODO: select the <h2> inside quest and update
  // its text by the currQuest text
  const currQuest = getCurrQuest().txt
  $('.quest h2').text(currQuest)
}

function onUserResponse(ev) {
  // console.log('ev', ev)
  var res = ev.data.ans
  // If this node has no children

  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      // TODO: improve UX
      $('.quest').hide()
      $('.win-container').show()
      ChangeColorWhenWin(true)
    } else {
      // TODO: hide and show new-quest section
      $('.quest').hide()
      $('.new-quest').show()
    }
  } else {
    // TODO: update the lastRes global var

    const nextQuest = getCurrQuest()[res]
    const currQuest = getCurrQuest()
    gLastRes = res

    // $('.quest h2').text(nextQuest)

    moveToNextQuest(currQuest, nextQuest)
    renderQuest()
  }
}

function onAddGuess(ev) {
  ev.preventDefault()

  var newGuess = $('#newGuess').val()
  var newQuest = $('#newQuest').val()

  if (!newGuess || !newQuest) {
    alert('Not valid Input !')
    return
  }

  // TODO: Get the inputs' values
  console.log(newGuess, newQuest)
  // console.log(getCurrQuest())
  const lastRes = gLastRes
  console.log(gLastRes)

  // TODO: Call the service addGuess
  addGuess(newQuest, newGuess, lastRes)

  onRestartGame()
}

function onRestartGame() {
  $('.new-quest').hide()
  $('.win-container').hide()
  $('.game-start').show()
  ChangeColorWhenWin()
  gLastRes = null
  restartGame()
}

function ChangeColorWhenWin(isWin = false) {
  if (isWin) {
    $('h1').css('color', 'var(--purple)')
    $('footer').css('color', 'var(--purple)')
  } else {
    $('h1').css('color', 'var(--orange)')
    $('footer').css('color', 'var(--orange)')
  }
}

$('button').on('click', e => {
  console.log(e.target)
  $(e.target).addClass('btn-clicked')
  setTimeout(() => $(e.target).removeClass('btn-clicked'), 300)
})
