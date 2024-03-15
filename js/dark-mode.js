/* Dark Mode - https://github.com/Powza/darkmode */
(function () {
  function DarkMode(options = {}) {
    // Define defaults
    const darkMode = {
      default: options.default || "system", // system | dark | light
      selector: options.selector || ".darkmode", // Toggle selector class or id
      storageKey: options.storageKey || "darkmode-theme", // Set a localStorage key name
      type: options.type || "dropdown", // button | dropdown.
      dropdownToggleName: options.dropdownToggleName || "Theme", // Dropdown toggle name
      dynamicAdjust: options.dynamicAdjust || false, // Will override default start light then switch to dark between time. 24 hour time.
      dynamicAdjustStartHour: options.dynamicAdjustStartHour || 18, // Start dark theme at hour 18
      dynamicAdjustEndHour: options.dynamicAdjustEndHour || 6, // End dark them at hour 6
    };

    const rootElement = document.documentElement;
    let defaultThemeMode = darkMode.default;
    const localStorageKey = darkMode.storageKey;
    dynamicAdjustTheme(darkMode.dynamicAdjust);

    const theme = localStorage.getItem(localStorageKey) || defaultThemeMode;
    rootElement.setAttribute("theme", theme);

    function saveUserPreference(userPreference) {
      localStorage.setItem(localStorageKey, userPreference);
    }

    // Dynamic adjust theme based on time
    function dynamicAdjustTheme(option) {
      if (option) {
        const currentHour = new Date().getHours();
        // Check if the current hour is between 18 and 6
        defaultThemeMode =
          currentHour >= darkMode.dynamicAdjustStartHour || currentHour < darkMode.dynamicAdjustEndHour
            ? "dark"
            : "light";
      }
    }

    function getThemeMode(userPreference) {
      if (userPreference === "light") {
        return "light";
      }
      if (userPreference === "dark") {
        return "dark";
      }
      if (matchMedia("(prefers-color-scheme: light)").matches) {
        return "light";
      } else if (matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    }

    function setThemeMode(mode) {
      rootElement.setAttribute("theme-mode", mode);
    }

    function setTheme(mode) {
      rootElement.setAttribute("theme", mode);
    }

    function rotatePreferences(userPreference) {
      const nextPreference = {
        system: "light",
        light: "dark",
        dark: "light",
      };
      return nextPreference[userPreference] || "system";
    }

    let userPreference = theme;
    const systemThemeMode = getThemeMode("system");
    if (userPreference === "system") {
      userPreference = systemThemeMode;
    }
    setThemeMode(getThemeMode(userPreference));

    // Toggle dark/light mode for button
    function toggleButton() {
      let newUserPref = rotatePreferences(userPreference);
      if (userPreference === "system") {
        newUserPref = getThemeMode("system");
      }

      userPreference = newUserPref;
      saveUserPreference(newUserPref);
      setThemeMode(getThemeMode(newUserPref));
      setTheme(newUserPref);
    }

    // Toggle dark/light mode for dropdown
    function toggleDropdown(link, links) {
      const selectedTheme = link.dataset.theme; // Get the theme from the data attribute

      if (!link.classList.contains("active")) {
        links.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");

        userPreference = selectedTheme;
        saveUserPreference(selectedTheme);
        setThemeMode(getThemeMode(selectedTheme));
        setTheme(selectedTheme);
      }
    }

    // Toggle dark/light mode
    document.addEventListener("DOMContentLoaded", () => {
      const definedName = "darkmode";
      if (darkMode.type === "button") {
        const buttonTogglers = document.querySelectorAll(darkMode.selector);
        buttonTogglers.forEach((button) => {
          button.classList.add(definedName + "__toggle");
          button.onclick = toggleButton;
        });
      }

      if (darkMode.type === "dropdown") {
        const dropdownTogglers = document.querySelectorAll(darkMode.selector);
        dropdownTogglers.forEach(function (darkmodeToggle) {
          var dropdownContainer = document.createElement("div");
          dropdownContainer.classList.add(definedName, definedName + "__dropdown");

          var button = document.createElement("button");
          button.classList.add(definedName + "__toggle");
          button.innerText = darkMode.dropdownToggleName;
          button.setAttribute("aria-expanded", "false");
          dropdownContainer.appendChild(button);

          var dropdownMenu = document.createElement("ul");
          dropdownMenu.classList.add(definedName + "__dropdown--menu");

          var themes = [
            {
              className: definedName + "-light",
              text: "Light",
              theme: "light",
            },
            { className: definedName + "-dark", text: "Dark", theme: "dark" },
            {
              className: definedName + "-system",
              text: "OS System",
              theme: "system",
            },
          ];

          themes.forEach((theme) => {
            var listItem = document.createElement("li");
            var link = document.createElement("button");
            link.type = "button";
            link.classList.add(theme.className);
            link.dataset.theme = theme.theme;
            link.innerText = theme.text;
            listItem.appendChild(link);
            dropdownMenu.appendChild(listItem);
          });

          dropdownContainer.appendChild(dropdownMenu);

          darkmodeToggle.parentNode.replaceChild(dropdownContainer, darkmodeToggle);
        });

        const dropdowns = document.querySelectorAll("." + definedName + "__dropdown");
        dropdowns.forEach((dropdown) => {
          const dropdownToggle = dropdown.querySelector("." + definedName + "__toggle");
          const dropdownContent = dropdown.querySelector("." + definedName + "__dropdown--menu");
          const links = dropdownContent.querySelectorAll("button");

          // Add click event listener to the dropdown button to toggle visibility
          dropdownToggle.addEventListener("click", () => {
            // Toggle the class to open/close the dropdown content
            dropdownContent.classList.toggle(definedName + "--open");

            // Get the current state of the dropdown content
            var isOpen = dropdownContent.classList.contains(definedName + "--open");

            // Update the aria-expanded attribute accordingly
            dropdownToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
          });

          // Close the dropdown when clicking outside of it
          window.addEventListener("click", (event) => {
            if (!dropdownToggle.contains(event.target)) {
              dropdownContent.classList.remove(definedName + "--open");
              dropdownToggle.setAttribute("aria-expanded", "false");
            }
          });

          // Add event listener for pressing the Escape key
          document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
              // Check if the dropdown is open
              if (dropdownContent.classList.contains(definedName + "--open")) {
                // Close the dropdown
                dropdownContent.classList.remove(definedName + "--open");
                dropdownToggle.setAttribute("aria-expanded", "false");
              }
            }
          });

          // Add click event listener to each dropdown link
          links.forEach((link) => {
            link.addEventListener("click", (event) => {
              event.preventDefault();
              event.stopPropagation();
              toggleDropdown(link, links); // Pass links as an argument

              // Remove active class from all links within all dropdown menus
              document
                .querySelectorAll("." + definedName + "__dropdown--menu button")
                .forEach((l) => l.classList.remove("active"));

              // Add active class to the clicked link
              link.classList.add("active");

              // Update localStorage with the selected theme
              const selectedTheme = link.dataset.theme;
              localStorage.setItem(darkMode.storageKey, selectedTheme);

              // Update active class for all dropdown menus
              const allDropdownLinks = document.querySelectorAll("." + definedName + "__dropdown--menu button");
              allDropdownLinks.forEach((dropdownLink) => {
                if (dropdownLink.dataset.theme === selectedTheme) {
                  dropdownLink.classList.add("active");
                }
              });
            });
          });
        });

        // Set active class based on the currently selected theme for all dropdown menus
        let storedTheme = localStorage.getItem(darkMode.storageKey);
        if (!storedTheme) {
          storedTheme = defaultThemeMode;
        }
        document.querySelectorAll("." + definedName + "__dropdown--menu button").forEach((link) => {
          if (link.dataset.theme === storedTheme) {
            link.classList.add("active");
          }
        });
      }
    });
  }
  window.DarkMode = DarkMode;
})();
