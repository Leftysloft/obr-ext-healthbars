import OBR from "@owlbear-rodeo/sdk";
import { ID } from "./constants";
import "./style.css";

let cachedItems = [];
console.log("cached", cachedItems);
export async function setupSheetList(element) {
  const renderList = async (items) => {
    // Get the url of any item with
    // our gsheet metadata
    const sheetItems = [];
    console.log("sheetItems", sheetItems);

    for (const item of items) {
      const metadata = item.metadata[`${ID}/metadata`];
      if (metadata) {
        sheetItems.push({
          url: metadata.url,
          character_id: metadata.character_id,
          name: item.text.plainText,
          visible: metadata.visible,
          id: item.id,
        });
      }
    }
    // Sort alphabetically
    const sortedItems = sheetItems.sort((a, b) => a.name.localeCompare(b.name));
    const changedItems = [];
    sortedItems.forEach((item) => {
      const cachedItem = cachedItems.find((i) => i.id === item.id);
      if (cachedItem) {
        if (
          item.url !== cachedItem.url ||
          item.character_id !== cachedItem.character_id ||
          item.visible !== cachedItem.visible
        ) {
          changedItems.push(item);
        }
      } else {
        changedItems.push(item);
      }
    });
    // we need to remove all nodes that are no longer in the sortedItems Array
    const ids = sortedItems.map((s) => s.id);
    cachedItems.forEach((cachedItem) => {
      if (!ids.includes(cachedItem.id)) {
        const node = document.querySelector(`[data-id="${cachedItem.id}"]`);
        node.remove();
      }
    });
    cachedItems = sortedItems;

    // Create new list nodes for each url item
    const playerRole = await OBR.player.getRole();
    changedItems.forEach((urlItem) => {
      const node = document.querySelector(`[data-id="${urlItem.id}"]`);

      // if we have the node already we change it's content and don't create a new one
      if (node) {
        if (!urlItem.visible) {
          urlItem.visible = false;
          if (playerRole === "PLAYER") {
            element.removeChild(node);
          }
        }

        const embed = node.querySelector(".embed-view");
        if (embed) {
          console.log(embed);
          embed.src =
            "https://lefty469.pythonanywhere.com/character_server?id=" +
            urlItem.character_id;
        }

        // we need this to replace the eventlistener: https://stackoverflow.com/a/9251864
        const sheetLink = node.querySelector(".sheet-url");
        const newSheetLink = sheetLink.cloneNode(true);
        newSheetLink.addEventListener("click", function () {
          sheetFunction(`${urlItem.url}`);
        });
        sheetLink.parentNode.replaceChild(newSheetLink, sheetLink);
      } else {
        const newNode = document.createElement("li");
        // for new elements we create a new node
        if (playerRole === "GM" || urlItem.visible) {
          newNode.dataset.id = urlItem.id;
          newNode.textContent = urlItem.name;

          const anode = document.createElement("character-portrait");

          //  Display a character in an iframe (works?)
          const fnode = document.createElement("embed");
          fnode.classList.add("embed-view");
          fnode.setAttribute("width", 75);
          fnode.setAttribute("height", 75);
          fnode.setAttribute(
            "src",
            "https://lefty469.pythonanywhere.com/character_server?id=" +
              urlItem.character_id
          );
          anode.appendChild(fnode);

          //TODO TRY TO CREAT A SUBNODE FOR ICONS
          const bnode = document.createElement("icon");

          const enode = document.createElement("img");
          enode.setAttribute("src", "fa-pen-to-square.svg");
          enode.setAttribute(
            "title",
            "Click here to set your notes page (URL)"
          );
          enode.setAttribute("width", 20);
          enode.setAttribute("height", 30);
          enode.addEventListener("click", function () {
            const url = window.prompt(
              "Paste the link to your notebook here, then click the arrow next to your image",
              urlItem.url
            );
            if (url) {
              editSheetFunction(`${urlItem.id}`, url);
            }
          });
          bnode.appendChild(enode);

          if (playerRole == "GM") {
            // Creates checkbox for player visibility
            const cnode = document.createElement("input");
            cnode.id = urlItem.id;
            cnode.setAttribute("type", "checkbox");
            cnode.setAttribute("title", "Enable Player View");
            if (urlItem.visible) {
              cnode.setAttribute("checked", true);
            }
            cnode.addEventListener("change", function () {
              visibileFunction(urlItem.id);
            });
            bnode.appendChild(cnode);
          }

          // Creates image for link to url page
          const inode = document.createElement("img");
          inode.setAttribute("src", "fa-circle-right.svg");
          inode.classList.add("sheet-url");
          inode.setAttribute("title", "View your notes page");
          inode.setAttribute("width", 20);
          inode.setAttribute("height", 30);
          inode.addEventListener("click", function () {
            sheetFunction(`${urlItem.url}`);
          });
          bnode.appendChild(inode);

          anode.appendChild(bnode);

          newNode.appendChild(anode);

          element.appendChild(newNode);
        }
      }
    });
  };
  OBR.scene.items.onChange(renderList);
}

// Set link (circle right) visible to players
export async function visibileFunction(uuid) {
  const vis = document.getElementById(uuid).checked;
  OBR.scene.items.updateItems(
    await OBR.scene.items.getItems([uuid]),
    (items) => {
      for (let item of items) {
        let meta = item.metadata[`${ID}/metadata`];
        meta.visible = vis;
        item.metadata[`${ID}/metadata`] = meta;
      }
    }
  );
}

//opens character's notebook
export function sheetFunction(url) {
  if (url != "") {
    console.log("sheetfunction", url);
    const windowFeatures = "left=100,top=100,width=600,height=800";
    window.open(`${url}`, "mozillaWindow", windowFeatures);
  } else {
    window.confirm(
      "YOU MUST FIRST SET THE URL!!!\nPlease click on the notepad icon to set your page URL"
    );
  }
}

// Edit sheet url
export async function editSheetFunction(uuid, url) {
  OBR.scene.items.updateItems(
    await OBR.scene.items.getItems([uuid]),
    (items) => {
      for (let item of items) {
        let meta = item.metadata[`${ID}/metadata`];
        meta.url = url;
        item.metadata[`${ID}/metadata`] = meta;
      }
    }
  );
}
