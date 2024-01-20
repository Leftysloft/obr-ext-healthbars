import OBR from "@owlbear-rodeo/sdk";
import { ID } from "./constants";
import "./style.css";

export async function setupSheetList(element) {
  const renderList = async (items) => {
    
    // Get the url of any item with
    // our gsheet metadata
    const sheetItems = [];
    
    for (const item of items) {
      const metadata = item.metadata[`${ID}/metadata`];
      if (metadata) {
        sheetItems.push({         
          url: metadata.url,
          character_id: metadata.character_id,
          name: item.name,
          visible: metadata.visible,
          id: item.id
        });
      }
    }
    // Sort alphabetically
    const sortedItems = sheetItems.sort(
      (a, b) => a.name.localeCompare(b.name)
    );

    // Create new list nodes for each url item
    const nodes = [];
    for (const urlItem of sortedItems) {
      const playerRole = await OBR.player.getRole();
      if(!urlItem.visible) {
        // console.log('vis undefined');
        urlItem.visible = false;
      }

      // console.log('role-vis:'+playerRole+"-"+urlItem.visible);
      if(playerRole == "GM" || urlItem.visible) {
        const node = document.createElement("ul");
        node.setAttribute("height", 75);
        node.innerText =`${urlItem.name}`;
        // console.log(urlItem.id)

        const enode = document.createElement("img");
        enode.setAttribute("src", "fa-pen-to-square.svg");
        enode.setAttribute("title", "Click here to set your notes page (URL)");
        enode.setAttribute("width", 20);
        enode.setAttribute("height", 20);
        enode.addEventListener("click", function() {
          const url = window.prompt("Paste the link to your notebook here, then click the arrow next to your image", urlItem.url);
          if(url) {
            editSheetFunction(`${urlItem.id}`, url);
          }
        });
        node.appendChild(enode);

        
        if(playerRole == "GM") {
          
<<<<<<< HEAD
=======
           //  Display a character in an iframe (works?)
          const fnode = document.createElement("embed");
            fnode.setAttribute("width", 75);
            fnode.setAttribute("height", 75);
            fnode.setAttribute("src", "https://lefty469.pythonanywhere.com/character_server?id=" + (urlItem.character_id));

            node.appendChild(fnode);
          // Stop trying (works?)

          // Sets Character URL page and creates pen-to-square image
          const enode = document.createElement("img");
           enode.setAttribute("src", "fa-pen-to-square.svg");
           enode.setAttribute("width", 20);
           enode.setAttribute("height", 20);
           enode.addEventListener("click", function() {
             const url = window.prompt("Enter the sheet url", urlItem.url);
             if(url) {
               editSheetFunction(`${urlItem.id}`, url);
             }
           });
           node.appendChild(enode);

>>>>>>> 85146d9be937c358f8c1310b2e9a4f3e4544bfb9
           // Creates checkbox for player visibility
          const cnode = document.createElement("input");
          cnode.id = urlItem.id;
          cnode.setAttribute("type", "checkbox");
          cnode.setAttribute("title", "Enable Player View");
          if(urlItem.visible) {
            cnode.setAttribute("checked", true);
          }
          cnode.addEventListener("change", function() {
            visibileFunction(urlItem.id);
          });
          node.appendChild(cnode);
        }

          // Creates image for link to url page
          const inode = document.createElement("img");
          inode.setAttribute("src", "fa-circle-right.svg");
          inode.setAttribute("title", "View your notes page");
          inode.setAttribute("width", 20);
          inode.setAttribute("height", 20);
          inode.addEventListener("click", function() {
            sheetFunction(`${urlItem.url}`);
          });


          //  Display a character in an iframe (works?)
          const fnode = document.createElement("embed");
          fnode.setAttribute("width", 75);
          fnode.setAttribute("height", 75);
          fnode.setAttribute("src", "https://lefty469.pythonanywhere.com/character_server?id=" + (urlItem.character_id));
          node.appendChild(fnode);
          // Stop trying (works?)


          node.appendChild(inode);
          nodes.push(node);
      }
    }
    element.replaceChildren(...nodes);
  };
  OBR.scene.items.onChange(renderList);
}
// Set link (circle right) visible to players
export async function visibileFunction(uuid) {
  const vis = document.getElementById(uuid).checked;
  console.log('vis:'+vis);
  OBR.scene.items.updateItems(await OBR.scene.items.getItems([uuid]), (items) => {
    for (let item of items) {
      console.log('itemid:'+item.id);
      let meta = item.metadata[`${ID}/metadata`];
      console.log('meta vis:'+meta.visible);
      meta.visible = vis;
      item.metadata[`${ID}/metadata`] = meta;
    }
  });
}
//* Opens the Gsheet url
export function sheetFunction(url) {
  console.log(url);
  OBR.popover.open({
    id: "${ID}/healthbars",
    url: url,
    height: 800,
    width: 610,
  });
}
// Edit sheet url
export async function editSheetFunction(uuid, url) {
  OBR.scene.items.updateItems(await OBR.scene.items.getItems([uuid]), (items) => {
    for (let item of items) {
      let meta = item.metadata[`${ID}/metadata`];
      meta.url = url;
      item.metadata[`${ID}/metadata`] = meta;
    }
  });
}
