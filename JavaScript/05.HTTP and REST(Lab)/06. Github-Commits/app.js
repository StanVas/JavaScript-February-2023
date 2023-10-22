// function loadCommits() {
//     const username = document.getElementById('username');
//     const repo = document.getElementById('repo');
//     const commitsCont = document.getElementById('commits')

//     const BASE_URL = 'https://api.github.com/repos/';
//     let currentUrl = `${BASE_URL}${username.value}/${repo.value}/commits`;

//     fetch(currentUrl)
//         .then((res) => res.json())
//         .then((data) => {
//             data
//                 .forEach(({ commit }) => {
//                     const li = document.createElement('li');
//                     li.textContent = `${commit.author.name}: ${commit.message}`;
//                     commitsCont.appendChild(li);
//                 })
//         })
//         .catch((err) => {
//             const li = document.createElement('li');
//             li.textContent = err.message;
//             commitsCont.appendChild(li);
//         });
// }

async function loadCommits() {
    const username = document.getElementById('username');
    const repo = document.getElementById('repo');
    const commitsCont = document.getElementById('commits')

    const BASE_URL = 'https://api.github.com/repos/';
    let currentUrl = `${BASE_URL}${username.value}/${repo.value}/commits`;

    try {
        const allCommitsResponse = await fetch(currentUrl);
        const data = await allCommitsResponse.json();

        data
            .forEach(({ commit }) => {
                const li = document.createElement('li');
                li.textContent = `${commit.author.name}: ${commit.message}`;
                commitsCont.appendChild(li);
            })
    } catch(err) {
        const li = document.createElement('li');
            li.textContent = err.message;
            commitsCont.appendChild(li);
    }
}