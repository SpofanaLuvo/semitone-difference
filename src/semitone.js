class JamBuddy {
  theNoteCircle = [
    "A",
    "A#",
    "B",
    "C",
    "Db",
    "D",
    "Eb",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "Bb",
    "C#",
    "D#",
    "Gb",
    "Ab",
  ];
  selectedNotes = ["Ab", "E"];

  selectNotes() {
    this.selectedNotes.length = 0;
    this.selectedNotes[0] =
      this.theNoteCircle[Math.floor(Math.random() * this.theNoteCircle.length)];
    this.selectedNotes[1] =
      this.theNoteCircle[Math.floor(Math.random() * this.theNoteCircle.length)];
    return this.selectedNotes;
  }
  indentNotes() {
    let notesArray = this.theNoteCircle.slice(0, 12);
    for (let i = 0; i < this.selectedNotes.length; i++) {
      if (this.theNoteCircle.indexOf(this.selectedNotes[i]) == 12) {
        notesArray[1] = this.selectedNotes[i];
      }
      if (this.theNoteCircle.indexOf(this.selectedNotes[i]) == 13) {
        notesArray[4] = this.selectedNotes[i];
      }
      if (this.theNoteCircle.indexOf(this.selectedNotes[i]) == 14) {
        notesArray[6] = this.selectedNotes[i];
      }
      if (this.theNoteCircle.indexOf(this.selectedNotes[i]) == 15) {
        notesArray[9] = this.selectedNotes[i];
      }
      if (this.theNoteCircle.indexOf(this.selectedNotes[i]) == 16) {
        notesArray[11] = this.selectedNotes[i];
      }
    }
    return notesArray;
  }

  getNoteDifference() {
    const notes = this.indentNotes();
    const noteOneIndex = notes.indexOf(this.selectedNotes[0]);
    const noteTwoIndex = notes.indexOf(this.selectedNotes[1]);
    let correctAnswer;

    noteOneIndex > noteTwoIndex
      ? (correctAnswer =
          notes.slice(noteOneIndex).length +
          notes.slice(0, noteTwoIndex).length)
      : (correctAnswer = notes.slice(noteOneIndex, noteTwoIndex).length);
    return correctAnswer;
  }

  checkAnswer(answer) {
    const nonIntegers = /[^0-9]/;
    if (nonIntegers.test(answer)) {
      return "Invalid Input";
    }
    return answer === this.getNoteDifference();
  }
}

module.exports = JamBuddy;
