// variable to select the div with the class of "overview" //
const overview = document.querySelector(".overview");
const username = 'mahelkenn';

// Function to fetch GitHub profile information //
const getProfile = async function() {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const profile = await res.json();
    display(profile);
};

getProfile();

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