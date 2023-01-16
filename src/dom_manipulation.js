const buddy = new JamBuddy();
const checkAnswerButton = document.getElementById("btn-checkAnswer");
const answerField = document.getElementById("answerField");
const selectNotesButton = document.getElementById("btn-selectNotes");
const randomNotes = document.getElementById("randomNotes");
const revealButton = document.getElementById("btn-revealAnswer");
const explanation = document.getElementById("explanation");
const streak = document.getElementById("streak");
let streakCount = 0;
streak.textContent = `Streak: ${streakCount}`;

window.onload = () => {
  const notes = buddy.selectNotes().toString();
  randomNotes.innerText = notes;
  explanation.innerText = "";
};

selectNotesButton.addEventListener("click", () => {
  explanation.innerText = "";
  answerField.innerText = "";
  const notes = buddy.selectNotes().toString();
  randomNotes.innerText = notes;
});

revealButton.addEventListener("click", () => {
  const notes = buddy.selectedNotes;
  const correctAnswer = buddy.getNoteDifference();

  const allNotes = buddy.theNoteCircle;
  let highlightedNotes = "";
  for (let j = 0; j < allNotes.length; j++) {
    if (allNotes[j] === notes[0] || allNotes[j] === notes[1]) {
      highlightedNotes += `<strong>${allNotes[j]}</strong>` + " ";
    } else {
      highlightedNotes += allNotes[j] + " ";
    }
  }

  explanation.innerHTML = `${highlightedNotes.trim().split(" ").join(",")}`;
  explanation.innerHTML += `<br> Correct answer is: ${correctAnswer}`;
});

checkAnswerButton.addEventListener("click", () => {
  const userAnswer = document.getElementById("userAnswer").value;
  const answer = buddy.checkAnswer(parseFloat(userAnswer));
  if (answer === true) {
    streakCount++;
    streak.textContent = `Streak: ${streakCount}`;
    answerField.innerText = "Congratulations. You got it right!";
  } else if (!answer) {
    streakCount = 0;
    streak.textContent = `Streak: ${streakCount}`;
    answerField.innerText = "Wrong answer! Try again";
  } else {
    answerField.innerText = answer.toString();
  }
});
  