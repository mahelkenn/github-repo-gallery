// variable to select the div with the class of "overview" //
const overview = document.querySelector(".overview");

// select the unordered list to display the repos list //
const reposList = document.querySelector(".repo-list");

// selects the section with a class of "repos" where all repo information appears //
const repoSection = document.querySelector(".repos");

// selects the section with a class of "repo-data" where the individual repo data will appear //
const repoData = document.querySelector(".repo-data");

// select the "Back to the Repo Gallery" button //
const viewReposButton = document.querySelector(".view-repos");

// select the "Search by Name" placeholder //
const filterInput = document.querySelector(".filter-repos");

const username = 'mahelkenn';

let searchInput = [];

// Function to fetch GitHub profile information //
const getProfile = async function() {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const profile = await res.json();
    display(profile);
};

// Function to display the fetched user information on the page //
const display = function(profile) {
    newDiv = document.createElement("div");
    newDiv.classList.add("user-info");
    newDiv.innerHTML = `
        <figure>
          <img alt="user avatar" src=${profile.avatar_url} />
        </figure>
        <div>
          <p><strong>Name:</strong> ${profile.name}</p>
          <p><strong>Bio:</strong> ${profile.bio}</p>
          <p><strong>Location:</strong> ${profile.location}</p>
          <p><strong>Number of public repos:</strong> ${profile.public_repos}</p>
        </div> `;
    overview.append(newDiv);
};

// Function to fetch the repository information from GitHub //
const getRepos = async function() {
    const repoRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await repoRes.json();
    displayRepos(repos);
};

// Function to display info about repositories //
const displayRepos = function(repos) {
    filterInput.classList.remove("hide");
    for (let repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        reposList.append(li);
    };
};

getProfile();
getRepos();

// Function to listen for click on repository name //
const repoList = reposList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoDetails(repoName);
    };
});

// Function to get specific repository details //
const getRepoDetails = async function(repoName) {
    const repoDetailRes = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await repoDetailRes.json();
    // Function to fetch languages info for specific repo //
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    const languages = [];
    for (let language in languageData) {
        languages.push(language);
    };
    displayRepoInfo(repoInfo, languages);
};

// Function to Display Specific Repo Info //
const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.svn_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(div);
    repoData.classList.remove("hide");
    repoSection.classList.add("hide");
    viewReposButton.classList.remove("hide");
};

// Function to return to list of repos from repo details //
const viewRepos = viewReposButton.addEventListener("click", function() {
    repoSection.classList.remove("hide");
    repoData.classList.add("hide");
    viewReposButton.classList.add("hide");
});

// Function to search for specific repo //
const search = filterInput.addEventListener("input", function(e) {
    const searchValue = e.data;
    const allRepos = document.querySelectorAll(".repo");
    if (e.inputType === "deleteContentBackward") {
        let removed = searchInput.pop();
        for (let oneRepo of allRepos) {
            let title = oneRepo.innerText.toLowerCase();
            let searchString = searchInput.join("");
            if (title.includes(searchString)) {
                oneRepo.classList.remove("hide")
            };
        };
    }
    else if (searchValue !== null) {
        const lowerSearchValue = searchValue.toLowerCase();
        searchInput.push(lowerSearchValue);
        for (let oneRepo of allRepos) {
            let title = oneRepo.innerText.toLowerCase();
            let searchString = searchInput.join("");
            if (!title.includes(searchString)) {
                oneRepo.classList.add("hide")
            };
        };
    };
});