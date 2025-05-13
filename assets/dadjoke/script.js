// Initialize local storage for votes if it doesn't exist
if (!localStorage.getItem("jokeVotes")) {
  localStorage.setItem("jokeVotes", JSON.stringify({}));
}

// DOM Elements
const jokeLead = document.getElementById("joke-lead");
const jokePunchline = document.getElementById("joke-punchline");
const thumbsUpBtn = document.getElementById("thumbs-up");
const thumbsDownBtn = document.getElementById("thumbs-down");
const leaderboardBtn = document.getElementById("leaderboard-btn");
const voteCount = document.getElementById("vote-count");
const leaderboardModal = document.getElementById("leaderboard-modal");
const leaderboardList = document.getElementById("leaderboard-list");
const closeBtn = document.querySelector(".close");
const container = document.querySelector(".container");

// Current joke state
let currentJoke = {
  lead: "",
  punchline: "",
  votes: 0,
};

// Load joke from the server
async function loadJoke() {
  try {
    const response = await fetch("https://yewjin.com/assets/html/joke.html");
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");

    // Extract background image
    const styleContent = doc.querySelector("style").textContent;
    console.log("Style content:", styleContent);

    // More flexible regex pattern
    const backgroundImageMatch = styleContent.match(/background-image:\s*url\s*\(\s*['"]?data:image\/jpeg;base64,([^'")\s]+)['"]?\s*\)/i);
    console.log("Match result:", backgroundImageMatch);

    currentJoke.lead = doc.querySelector("h1").textContent;
    currentJoke.punchline = doc.querySelector(".punchline").textContent;

    jokeLead.textContent = currentJoke.lead;
    jokePunchline.textContent = currentJoke.punchline;

    if (backgroundImageMatch && backgroundImageMatch[1]) {
      container.style.backgroundImage = `url('data:image/jpeg;base64,${backgroundImageMatch[1]}')`;
    }

    // Load votes for current joke
    const votesData = JSON.parse(localStorage.getItem("jokeVotes"));
    // Retrieve the joke object from localStorage using punchline as key
    const storedJoke = votesData[currentJoke.punchline];
    currentJoke.votes = storedJoke ? storedJoke.votes : 0;
    updateVoteDisplay();
  } catch (error) {
    console.error("Error loading joke:", error);
    jokeLead.textContent = "Error loading joke";
    jokePunchline.textContent = "Please try again later";
  }
}

// Update vote display
function updateVoteDisplay() {
  voteCount.textContent = `Votes: ${currentJoke.votes}`;
}

// Handle voting
function handleVote(vote) {
  const votesData = JSON.parse(localStorage.getItem("jokeVotes"));

  // Ensure the current joke exists in localStorage
  if (!votesData[currentJoke.punchline]) {
    votesData[currentJoke.punchline] = {
      lead: currentJoke.lead,
      punchline: currentJoke.punchline,
      votes: 0,
    };
  }

  votesData[currentJoke.punchline].votes += vote;
  localStorage.setItem("jokeVotes", JSON.stringify(votesData));
  currentJoke.votes = votesData[currentJoke.punchline].votes;
  updateVoteDisplay();
}

// Show leaderboard
function showLeaderboard() {
  const votesData = JSON.parse(localStorage.getItem("jokeVotes"));
  // Convert the object of jokes into an array of [punchline, jokeObject]
  const sortedJokes = Object.entries(votesData)
    .map(([, jokeObj]) => jokeObj) // Get only the joke objects
    .sort((a, b) => b.votes - a.votes) // Sort by votes in descending order
    .slice(0, 10); // Get top 10

  leaderboardList.innerHTML = sortedJokes
    .map(
      (joke, index) => `
            <div class="leaderboard-item">
                <strong>#${index + 1}</strong> (${joke.votes} votes)<br>
                <span class="leaderboard-joke-lead">${joke.lead}</span><br>
                <span class="leaderboard-joke-punchline">${joke.punchline}</span>
            </div>
        `
    )
    .join("");

  leaderboardModal.style.display = "block";
}

// Event Listeners
thumbsUpBtn.addEventListener("click", () => handleVote(1));
thumbsDownBtn.addEventListener("click", () => handleVote(-1));
leaderboardBtn.addEventListener("click", showLeaderboard);
closeBtn.addEventListener("click", () => {
  leaderboardModal.style.display = "none";
});

// Close modal when clicking outside
window.addEventListener("click", (event) => {
  if (event.target === leaderboardModal) {
    leaderboardModal.style.display = "none";
  }
});

// Load initial joke
loadJoke();

// Refresh joke every hour
setInterval(loadJoke, 60 * 60 * 1000);
