let currentNoteView = document.getElementById("currentNoteView");
let affichage = document.createElement("affichage");
currentNoteView.appendChild(affichage);

function Note(t, c){
    this.titre = t;
    this.contenu = c;
    let date = new Date();
    this.date_creation = "" + date.getDate() + "/" + date.getMonth()+1 + "/" + date.getFullYear();
}
Note.prototype.setTitre = (t) => {
    this.titre = t;
}

Note.prototype.setContenu = (c) =>{
    this.contenu = c;
}

let noteFormView = {
    display : function(){
        document.getElementById("noteForm").style.display = "flex";
    },
    hide : function(){
        document.getElementById("noteForm").style.display = "none";
    },
    validate : function(){
        let titre = document.getElementById("form_add_note_title").value;
        let contenu = document.getElementById("form_add_note_text").value;
        note = new Note(titre,contenu);
        noteView.afficher(note);
    }
}

let noteView = {
    convert(markdownText) {
        let concat = "# "+ markdownText.titre + "\n\n" + markdownText.date_creation + "\n\n" + markdownText.contenu
        let conv = new showdown.Converter();
        let htmlText = conv.makeHtml(concat);
        return htmlText;
    },
    afficher(txt){
        let texte = this.convert(txt);
        affichage.innerHTML = texte;
        currentNoteView.replaceChild(affichage, affichage);
    }
}

let mainMenuView = {
    addHandler(){
        noteFormView.display();
    },
    init(){
        let boutonAdd = document.getElementById("add").addEventListener("click",mainMenuView.addHandler);
        // a supprimer TEST
        let boutonValide = document.getElementById("form_add_note_valid").addEventListener("click",noteFormView.validate)
    }
}

function NoteList(){
    this.list = [];
}

NoteList.prototype.addNote = (note) => {
    this.list.push(note);
    return this.list.length-1;
}

NoteList.prototype.get = (n) => {
    return this.list[n];
}

NoteList.prototype.getList = () => {
    return this.list;
}

let NoteListView = {
    displayItem(note) {
        let nlv = document.getElementById("noteListView");

        let elem = document.createElement("div")
        elem.setAttribute("class", "note_list_item");

        let text = document.createTextNode(note.titre + " " + note.date_creation);
        elem.appendChild(text);
        nlv.appendChild(elem);
    }
}



var note;

window.addEventListener('load', (event) => {
    mainMenuView.init();
});