const addNoteBtn = document.querySelector('#addNoteBtn');
const mainSectionBody = document.querySelector('#main-section-body');
const saveInfo = document.querySelector('.save-info');
addNoteBtn.addEventListener('click', () => {
    addOneNote()
})

const saveAllNotes = () => {
    const allNotes = document.querySelectorAll('.note')
    let notesList = []
    allNotes.forEach((note) => {
        let noteTitle = note.querySelector('.title').value;
        let noteDescription = note.querySelector('.description').value;
        let noteObj = {
            'title': noteTitle,
            'description': noteDescription
        }
        notesList.push(noteObj)
    })
    if (notesList.length == 0) {
        localStorage.removeItem('notes');
    } else {
        localStorage.setItem('notes', JSON.stringify(notesList))
    }
}

const addOneNote = (text = [null, null]) => {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    var textTitle = "";
    var textDescription = "";
    if (text.title) {
        textTitle = text.title;
    }
    if (text.description) {
        textDescription = text.description
    }
    noteDiv.innerHTML = `
    <div class="toolbar">
        <input type="text" class="title" value="${textTitle}" placeholder="Note title...">
        <div class="options">
            <abbr title="Ctrl + s"><i class="save fa-solid fa-floppy-disk"></i></abbr>
            <i class="trash fa-solid fa-trash"></i>
        </div>
        </div>
    <textarea class="description" placeholder="Type your note here...">${textDescription}</textarea>
    `
    mainSectionBody.appendChild(noteDiv);
    noteDiv.querySelector('.trash').addEventListener('click', () => {
        noteDiv.remove();
        saveAllNotes()
    })
    noteDiv.querySelector('.save').addEventListener('click', () => {
        saveAllNotes();
    })
    noteDiv.querySelector('input').addEventListener('focusout', () => {
        saveAllNotes();
    })
    noteDiv.querySelector('textarea').addEventListener('focusout', () => {
        saveAllNotes();
    })
    saveAllNotes();
}


(
    function () {
        let lcNotes = localStorage.getItem('notes');
        if (lcNotes == null) {
            addOneNote()
        }
        else {
            lcNotes = JSON.parse(lcNotes)
            lcNotes.forEach((lcNote) => {
                addOneNote(lcNote)
            })
        }
    }
)()


// Save with keyboard
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey) && (e.key == 's')) {
        e.preventDefault();
        saveAllNotes();
    }
})

// Create a new note with keyboard
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey) && (e.key == 'n')) {
        e.preventDefault();
        addOneNote();
    }
})


