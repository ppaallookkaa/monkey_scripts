// ==UserScript==
// @name         PTP - Upload Friend Finder
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  get a little visual indicator that one of the uploads is from a pal of yours or someone whose encs you favor.
// @author       palooka
// @match        https://passthepopcorn.me/torrents.php?*
// @icon         https://passthepopcorn.me/favicon.ico
// @grant        none
// @downloadURL https://raw.githubusercontent.com/ppaallookkaa/monkey_scripts/main/upload-friend-finder.js
// @updateURL https://raw.githubusercontent.com/ppaallookkaa/monkey_scripts/main/upload-friend-finder.js
// ==/UserScript==

(function () {
  "use strict";
  function appendEmojiToTorrentInfoLink(headerId) {
    const headerRow = document.getElementById(headerId);

    if (headerRow) {
      const infoLink = headerRow.querySelector("a.torrent-info-link");

      if (infoLink) {
        // Append the emoji to the inner text of the link
        infoLink.innerText += " 🫰";
        console.log("Appended emoji to the link:", infoLink.innerText);
      } else {
        console.log("Found header row but couldn't find torrent-info-link.");
      }
    } else {
      console.log("Couldn't find header row with ID:", headerId);
    }
  }

  // Function to search for the href in the table and extract the numeric string
  function searchTableForHref(usernameToFind) {
    console.log(usernameToFind);
    const table = document.getElementById("torrent-table");
    const usernameLinks = table.querySelectorAll("a.username");
    let usernameCount = 0; // Initialize a counter for matching usernames

    for (let i = 0; i < usernameLinks.length; i++) {
      const link = usernameLinks[i];
      const href = link.getAttribute("href");
      const usernameText = link.innerText;

      // Check if the href attribute matches the given string
      if (usernameText === usernameToFind) {
        // Extract the numeric string from the parent tr's id
        const parentRow =
          link.parentElement.parentElement.parentElement.parentElement;
        console.log(parentRow);
        const rowId = parentRow.id;
        const numericString = rowId.match(/\d+/);

        if (numericString) {
          console.log("Found matching username:", usernameText);
          const headerId = `group_torrent_header_${numericString[0]}`;

          // Append emoji to the torrent-info-link in the corresponding header row
          appendEmojiToTorrentInfoLink(headerId);

          // Increment the username count
          usernameCount++;
        } else {
          console.log(
            `Found matching username, ${usernameText}, but couldn't extract numeric string from row ID.`
          );
        }
      }
    }

    // Log the total count of matching usernames
    console.log(`Total matching usernames found: ${usernameCount}`);
  }

  // Example usage
	// "username", # for each user, add their username.
  const hrefToFind = [
  ];

  for (let i = 0; i < hrefToFind.length; i++) {
    searchTableForHref(hrefToFind[i]);
  }
  // Your code here...
})();

