function solve() {
  const output = document.getElementById('output');
  const textInput = document.getElementById('input');
  const sentences = textInput.value.split('.');
  sentences.pop()
  console.log(sentences)
  while (sentences.length > 0) {
    let paragraphSentences = sentences.splice(0, 3)
    // we delete max to 3 elements and return them in new element
    // even if we don't have 3 elements it will take whatever there is
    const newP = document.createElement('p');
    newP.textContent = paragraphSentences.join('.') + '.'
    output.appendChild(newP)
  };
}
