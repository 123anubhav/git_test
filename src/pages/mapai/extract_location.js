function extractLocation(userInput) {
    const regex = /\b[A-Z][a-zA-Z]+\b(?:\s+\b[A-Z][a-zA-Z]+\b)*/g; // regex pattern to match location names
    const matches = userInput.match(regex); // find all matches in the userInput
    if (matches) {
      return matches[0]; // return the first match found
    } else {
      return null; // return null if no match found
    }
  }
  