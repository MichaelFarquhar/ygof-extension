document.addEventListener("DOMContentLoaded", function () {
  // Generate checkboxes for each site
  const sitesContainer = document.getElementById("sitesContainer");
  sites.forEach((site, index) => {
    const div = document.createElement("div");
    div.className = "site-option";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `site${index}`;
    checkbox.checked = site.checked;

    const label = document.createElement("label");
    label.htmlFor = `site${index}`;
    label.textContent = site.name;

    div.appendChild(checkbox);
    div.appendChild(label);
    sitesContainer.appendChild(div);
  });

  // Handle search button click
  document.getElementById("searchButton").addEventListener("click", function () {
    const searchTerm = document.getElementById("searchInput").value.trim();
    if (!searchTerm) return;

    // Get all checked sites and open tabs
    sites.forEach((site, index) => {
      const checkbox = document.getElementById(`site${index}`);
      if (checkbox.checked) {
        const searchUrl = site.url.replace("{searchTerm}", encodeURIComponent(searchTerm));
        browser.tabs.create({ url: searchUrl });
      }
    });
  });
});
