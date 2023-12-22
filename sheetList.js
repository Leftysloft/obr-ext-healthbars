import OBR from "@owlbear-rodeo/sdk";
import { ID } from "./constants";
import "./style.css";
import { isImage } from "@owlbear-rodeo/sdk";

// const characters = await OBR.scene.items.getItems(
//   (item) => item.layer === "CHARACTER" && isImage(item)
// );


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
        const node = document.createElement("li");
        node.innerText = `${urlItem.name}`;
        if(playerRole == "GM") {
          
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

          //  //  Display a character in an iframe (works?)
          //  //
          //  //
          //  const fnode = document.createElement("iframe");
          //   fnode.setAttribute("width", 200);
          //   fnode.setAttribute("height", 150);
          //   fnode.setAttribute("src", "http://127.0.0.1:5000/portrait?name=rhose&id=57582811");
          //   fnode.addEventListener("click", function() {
          //     const url1 = window.prompt("Enter the sheet url", urlItem.url1);
          //     if(url) {
          //       editSheetFunction(`${urlItem.id}`, url1);
          //     }
          //   });
          //   node.appendChild(fnode);
          // //
          // //
          // // Stop trying (works?)



           // Creates checkbox for player visibility
          const cnode = document.createElement("input");
          cnode.id = urlItem.id;
          cnode.setAttribute("type", "checkbox");
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
        inode.setAttribute("width", 20);
        inode.setAttribute("height", 20);
        inode.addEventListener("click", function() {
          sheetFunction(`${urlItem.url}`);
        });
        node.appendChild(inode);
        nodes.push(node);
      }
    }

    element.replaceChildren(...nodes);

  
  };
  OBR.scene.items.onChange(renderList);
  
}

   /* document.querySelector("#app").innerHTML = `

    <div>
    <p><iframe
    width="125px"
    src="http://127.0.0.1:5000/portrait?name=rhose&id=57582811">
    </iframe>
    </div>
    `;
    */


// Set link (circle right) visible to players
export async function visibileFunction(uuid) {
  const vis = document.getElementById(uuid).checked;
  // console.log('vis:'+vis);
  OBR.scene.items.updateItems(await OBR.scene.items.getItems([uuid]), (items) => {
    for (let item of items) {
      // console.log('itemid:'+item.id);
      let meta = item.metadata[`${ID}/metadata`];
      // console.log('meta vis:'+meta.visible);
      meta.visible = vis;
      item.metadata[`${ID}/metadata`] = meta;
    }
  });
}
//* Opens the Gsheet url
export function sheetFunction(url) {
  // console.log(url);
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
