const fs = require('fs')
const chalk = require('chalk')

const notesContent = () => {
    return 'Here is your notes. . .'
}

const addNotes = (title, body) => {
    const notes = loadNotes()
    const dublicateTitle = notes.filter((note) => {
        return note.title === title
    })

    if (dublicateTitle.length == 0) {
        notes.push({ title, body })
        writeNotes(notes)
        console.log(chalk.bgGreen.black('Notes added!'))
    } else {
        console.log(chalk.bgRed('Notes title taken!'))
    }
}

const removeNotes = (title) => {
    const notes = loadNotes()
    const updatedNotes = notes.filter((note) => {
        return note.title != title
    })

    if (updatedNotes.length != notes.length) {
        writeNotes(updatedNotes)
        console.log(chalk.bgGreen.black(`Notes removed with title, ${title}`))
    } else {
        console.log(chalk.bgRed(`Notes with title '${title}' not found`))
    }
}

const writeNotes = (notes) => {
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('./notes.json', notesJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('./notes.json')
        const dataJSON = dataBuffer.toString()
        const data = JSON.parse(dataJSON)
        return data
    } catch (error) {
        return []
    }
}

module.exports = {
    notesContent, addNotes, removeNotes
}