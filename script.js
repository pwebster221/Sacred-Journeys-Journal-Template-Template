document.addEventListener("DOMContentLoaded", async () => {
  const fileListElement = document.getElementById("file-list");

  // GitHub repository information
  const owner = "pwebster221"; // Replace with your GitHub username
  const repo = "Sacred-Journeys-Journal-Template-Template"; // Replace with your repository name
  const path = "dailyupload"; // Directory to list files from
  const branch = "main"; // Branch to fetch files from
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;

  try {
    // Fetch the list of files from the GitHub API
    const response = await fetch(apiUrl);

    // Handle non-200 responses
    if (!response.ok) {
      throw new Error(`Failed to fetch files: ${response.status} ${response.statusText}`);
    }

    const files = await response.json();

    // Create list items with links for each file
    files.forEach((file) => {
      if (file.type === "file") { // Ensure it's a file, not a directory
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = file.html_url; // File's GitHub URL
        link.textContent = file.name; // File name
        link.target = "_blank"; // Open link in a new tab
        listItem.appendChild(link);
        fileListElement.appendChild(listItem);
      }
    });
  } catch (error) {
    console.error("Error fetching files:", error);
    fileListElement.textContent = "Failed to load file list.";
  }
});
