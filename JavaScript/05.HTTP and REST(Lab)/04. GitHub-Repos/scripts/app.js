function loadRepos() {
   const BASE_URL = 'https://api.github.com/users/testnakov/repos'
   const resultContainer = document.getElementById('res')

   fetch(BASE_URL, {method: "GET"}) // by default -> we can use method if we want to PATCH or POST
      .then((response) => response.text())
      .then((data) => {
         resultContainer.textContent = data;
      })
      .catch((error) => {
         console.error(error)
      });

}