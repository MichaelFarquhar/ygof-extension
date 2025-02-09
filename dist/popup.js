document.addEventListener("DOMContentLoaded", async function () {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const sitesContainer = document.getElementById("sitesContainer");

  // Load saved checkbox states
  const savedStates = await browser.storage.local.get("siteStates");
  const siteStates = savedStates.siteStates || {};

  // Generate checkboxes for each site
  sites.forEach((site, index) => {
    const div = document.createElement("div");
    div.className = "site-option";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `site${index}`;
    checkbox.checked = siteStates[`site${index}`] !== undefined ? siteStates[`site${index}`] : site.checked;

    const favicon = document.createElement("img");
    favicon.className = "site-favicon";
    favicon.src = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${site.baseUrl}&size=16`;

    const label = document.createElement("label");
    label.htmlFor = `site${index}`;
    label.textContent = site.name;

    div.appendChild(checkbox);
    div.appendChild(favicon);
    div.appendChild(label);
    sitesContainer.appendChild(div);

    checkbox.addEventListener("change", async () => {
      const states = await browser.storage.local.get("siteStates");
      const updatedStates = { ...states.siteStates };
      updatedStates[`site${index}`] = checkbox.checked;
      await browser.storage.local.set({ siteStates: updatedStates });
    });
  });

  // Handle search functionality
  const performSearch = async () => {
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) return;

    // Create array of URLs for checked sites
    const searchUrls = [];
    sites.forEach((site, index) => {
      const checkbox = document.getElementById(`site${index}`);
      if (checkbox.checked) {
        const searchUrl = site.url.replace("{searchTerm}", encodeURIComponent(searchTerm));
        searchUrls.push(searchUrl);
      }
    });

    if (searchUrls.length > 0) {
      try {
        // Create new window and capture its ID
        const newWindow = await browser.windows.create({
          url: searchUrls,
          focused: true,
        });

        // // Wait a moment for the window to fully create
        // await new Promise((resolve) => setTimeout(resolve, 100));

        // // Create remaining tabs in the new window
        // const createTabPromises = searchUrls.slice(1).map((url) =>
        //   browser.tabs.create({
        //     url: url,
        //     windowId: newWindow.id,
        //   })
        // );

        // Wait for all tabs to be created
        await Promise.all(createTabPromises);
      } catch (error) {
        console.error("Error opening tabs:", error);
      }
    }
  };

  // Handle Check / Uncheck All Buttons
  const checkAll = document.getElementById("checkAll");
  const uncheckAll = document.getElementById("uncheckAll");

  checkAll.addEventListener("click", async () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const updatedStates = {};

    checkboxes.forEach((checkbox, index) => {
      checkbox.checked = true;
      updatedStates[`site${index}`] = true;
    });

    await browser.storage.local.set({ siteStates: updatedStates });
  });

  uncheckAll.addEventListener("click", async () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const updatedStates = {};

    checkboxes.forEach((checkbox, index) => {
      checkbox.checked = false;
      updatedStates[`site${index}`] = false;
    });

    await browser.storage.local.set({ siteStates: updatedStates });
  });

  // Enable/disable search button based on input
  searchInput.addEventListener("input", () => {
    searchButton.disabled = searchInput.value.trim().length === 0;
  });

  // Initialize button state
  searchButton.disabled = true;

  // Handle button click
  searchButton.addEventListener("click", performSearch);

  // Handle enter key
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  });
});
