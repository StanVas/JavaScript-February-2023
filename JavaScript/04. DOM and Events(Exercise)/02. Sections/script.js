function create(words) {
   const content = document.getElementById('content');

   for (const word of words) {
      let newDiv = document.createElement('div');
      newDiv.classList.add('contentDiv')
      let newP = document.createElement('p');
      newP.textContent = word;
      newP.style.display = 'none'
      newDiv.appendChild(newP);
      content.appendChild(newDiv);
   };

   const contentDivs = Array.from(document.getElementsByClassName('contentDiv'));

   for (const div of contentDivs) {
      div.addEventListener('click', showContent);
   };

   function showContent(e) {
      let currentParagraph = e.target.children[0];
      currentParagraph.style.display = 'block';
   };
}