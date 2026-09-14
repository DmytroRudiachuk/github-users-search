const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const query = searchInput.value.trim()
  if (query === '') {
    resultsContainer.innerHTML = ""
    const message = createTextElement("p", "Please enter a username")
    resultsContainer.append(message)
    return
  }
  getUser(query)
  searchInput.value = ""
})

async function getUser(username) {
  try {
    resultsContainer.innerHTML = ""
    const loading = createTextElement("p", "Loading...")
    resultsContainer.append(loading)

    const response = await fetch(`https://api.github.com/users/${username}`)
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("User not found")
      }
      throw new Error(`HTTP error! status: ${response.status}`)

    }
    const userData = await response.json()
    renderUser(userData)
  } catch (error) {
    console.error('Error fetching user data:', error)
    resultsContainer.innerHTML = ""
    const errorMessage = createTextElement("p", error.message)
    resultsContainer.append(errorMessage)
  }
}

function renderUser(user) {
  resultsContainer.innerHTML = ""
  const userCard = document.createElement("div")
  userCard.classList.add("user-card")
  resultsContainer.append(userCard)


  const title = document.createElement("h2")
  title.textContent = user.login
  userCard.append(title)

  const avatar = document.createElement("img")
  avatar.src = user.avatar_url
  avatar.alt = `${user.login}'s avatar`
  userCard.append(avatar)

  const name = createTextElement("p", user.name || "No name provided")
  userCard.append(name)

  const bio = createTextElement("p", user.bio || "No bio provided")
  userCard.append(bio)

  const followers = createTextElement("p", `Followers: ${user.followers}`)
  userCard.append(followers)

  const following = createTextElement("p", `Following: ${user.following}`)
  userCard.append(following)

  const publicRepos = createTextElement("p", `Public Repositories: ${user.public_repos}`)
  userCard.append(publicRepos)

  const githubLink = document.createElement("a")
  githubLink.textContent = "View GitHub Profile"
  githubLink.href = user.html_url
  githubLink.target = "_blank"
  githubLink.rel = "noopener noreferrer"
  userCard.append(githubLink)

}

function createTextElement(tag, text) {
  const element = document.createElement(tag)
  element.textContent = text
  return element
}