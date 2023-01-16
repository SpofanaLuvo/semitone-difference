const JamBuddy = require("../src/semitone");
const buddy = new JamBuddy();
const notes = buddy.selectNotes();

describe("selectNotes tests", () => {
  it("should return an array of 2 random notes", () => {
    expect(notes.length).toEqual(2);
  });
});

describe("checkAnswer tests", () => {
  it('should return true if the semitone difference between "C" and "D" is 2', () => {
    buddy.selectedNotes = ["C", "D"];
    expect(buddy.checkAnswer(2)).toBe(true);
  });

  it('should return false if the semitone difference between "A" and "Db" is not 4', () => {
    buddy.selectedNotes = ["A", "Db"];
    expect(buddy.checkAnswer(5)).toBe(false);
  });

  it('should return "Invalid input" if a user enters negative integers', () => {
    expect(buddy.checkAnswer(-5)).toBe("Invalid Input");
  });
});

describe("checkAnswer tests: proof that it is clockwise", () => {
  it('it should return true if the number of semitones from "F" to "F#" is equal to 1', () => {
    buddy.selectedNotes = ["F", "F#"];
    expect(buddy.checkAnswer(1)).toBe(true);
  });

  it('it should return false if the number of semitones from "Ab" to "E" is not equal to 8', () => {
    buddy.selectedNotes = ["Ab", "E"];
    expect(buddy.checkAnswer(7)).toBe(false);
  });
  it('It should return true if the number of semitones from"A#" to "Db" is 3', () => {
    buddy.selectedNotes = ["A#", "Db"];
    expect(buddy.checkAnswer(3)).toBe(true);
  });
});
