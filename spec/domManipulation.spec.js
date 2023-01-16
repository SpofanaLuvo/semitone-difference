const { JSDOM } = require("jsdom");
const fs = require("fs");
const index = fs.readFileSync("index.html", "utf-8");
const dom = new JSDOM(index);
const doc = dom.window.document;

const checkAnswerResult = require("../src/resources");
const JamBuddy = require("../src/semitone");
const buddy = new JamBuddy();

const notesDiv = doc.querySelector("#randomNotes");
const answerField = doc.querySelector("#answerField");
const checkAnswerButton = doc.querySelector("#btn-checkAnswer");
const randomNotesButton = doc.querySelector("#btn-selectNotes");
const revealButton = doc.querySelector("#btn-revealAnswer");
const explanation = doc.querySelector("#explanation");
let answer;

describe("Select notes button", () => {
  beforeEach((done) => {
    randomNotesButton.addEventListener("click", () => {
      notesDiv.textContent = buddy.selectNotes().toString();
    });
    randomNotesButton.click();
    done();
  });
  it("should update the text content of the randomNotes div after being clicked", () => {
    expect(notesDiv.textContent.length).toBeGreaterThan(0);
  });
});

describe("check answer button: Correct answer output", () => {
  beforeEach((done) => {
    buddy.selectedNotes = ["F#", "D"];
    checkAnswerButton.addEventListener("click", () => {
      answer = buddy.checkAnswer(8);
      if (answer) {
        answerField.textContent = checkAnswerResult.true;
      }
    });
    checkAnswerButton.click();
    done();
  });
  it("Should display 'Congratulations. You got it right!' when the user submits a correct answer ", () => {
    expect(answerField.textContent).toBe(checkAnswerResult.true);
  });
});

describe("check answer button: Wrong answer output", () => {
  beforeEach((done) => {
    buddy.selectedNotes = ["A", "C#"];
    checkAnswerButton.addEventListener("click", () => {
      answer = buddy.checkAnswer(8);
      if (answer === false) {
        answerField.textContent = checkAnswerResult.false;
      }
    });
    checkAnswerButton.click();
    done();
  });
  it("Should display “Wrong answer! Try again” when the user submits a wrong answer ", () => {
    expect(answerField.textContent).toBe(checkAnswerResult.false);
  });
});

describe("check answer button: wrong input output", () => {
  beforeEach((done) => {
    buddy.selectedNotes = ["D#", "A"];
    checkAnswerButton.addEventListener("click", () => {
      answer = buddy.checkAnswer();
      if (answer === checkAnswerResult.invalidInput) {
        answerField.textContent = answer.toString();
      }
    });
    checkAnswerButton.click();
    done();
  });
  it("Should display “Invalid Input” when the user submits invalid input as their answer", () => {
    expect(answerField.textContent).toBe(checkAnswerResult.invalidInput);
  });
});

describe("reveal answer button: populates the explanation field", () => {
  let highlightedNotes = "";
  const notes = buddy.selectedNotes;
  const correctAnswer = buddy.getNoteDifference();
  beforeEach((done) => {
    revealButton.addEventListener("click", () => {
      const allNotes = buddy.theNoteCircle;

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

    revealButton.click();
    done();
  });
  it("should populate the eplanation sectiion when the reveal button gets clicked", () => {
    expect(explanation.innerHTML).toBe(
      `${highlightedNotes
        .trim()
        .split(" ")
        .join(",")}<br> Correct answer is: ${correctAnswer}`
    );
  });
});
