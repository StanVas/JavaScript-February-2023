function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);
   const tableRowContent = Array.from(document.querySelectorAll('tbody > tr'));
   const searchInput = document.getElementById('searchField')

   function onClick() {
      const searchedWord = searchInput.value
      for (const row of tableRowContent) {
         let trimmedText = row.textContent.trim(); //removes spaces(start,end)
         // .innerText
         if (row.classList.contains('select')) {
            row.classList.remove('select');
         };

         if (trimmedText.includes(searchedWord)) {
            row.classList.add('select');
         };

         searchInput.value = '';
      };
   };
}