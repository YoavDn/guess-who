'use strict'
const STORAGE_KEY = 'questsDB'
var gQuestsTree
var gCurrQuest
var gPrevQuest = null

function createQuestsTree() {
  var questTree = loadFromStorage(STORAGE_KEY)

  if (!questTree) {
    gQuestsTree = createQuest('Male?')
    gQuestsTree.yes = createQuest('Gandhi')
    gQuestsTree.no = createQuest('Rita')
    gCurrQuest = gQuestsTree
    gPrevQuest = null
  } else {
    gQuestsTree = questTree
    gCurrQuest = questTree
    gPrevQuest = null
  }
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(curr, next) {
  // TODO: update the gPrevQuest, gCurrQuest global vars
  gPrevQuest = curr
  gCurrQuest = next
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  // TODO: Create and Connect the 2 Quests to the quetsions tree
  console.log(gPrevQuest)

  gPrevQuest[lastRes] = createQuest(newQuestTxt)
  gPrevQuest[lastRes].yes = createQuest(newGuessTxt)
  gPrevQuest[lastRes].no = gCurrQuest

  _saveToStorage()
}

function getCurrQuest() {
  return gCurrQuest
}

function _saveToStorage() {
  saveToStorage(STORAGE_KEY, gQuestsTree)
}

function restartGame() {
  gCurrQuest = gQuestsTree
}
