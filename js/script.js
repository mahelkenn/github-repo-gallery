// variable to select the div with the class of "overview" //
const overview = document.querySelector(".overview");

// select the unordered list to display the repos list //
const reposList = document.querySelector(".repo-list");

// selects the section with a class of "repos" where all repo information appears //
const repoSection = document.querySelector(".repos");

// selects the section with a class of "repo-data" where the individual repo data will appear //
const repoData = document.querySelector(".repo-data");

const username = 'mahelkenn';

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
    for (let repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        reposList.append(li);
    };
};

getProfile();
getRepos();

const repoList = reposList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        console.log(repoName);
    };
});