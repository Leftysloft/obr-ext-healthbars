import "./style.css";
import OBR from "@owlbear-rodeo/sdk";
import { setupContextMenu } from "./contextMenu";
import { setupSheetList, sheetFunction } from "./sheetList";
import { isImage } from "@owlbear-rodeo/sdk";


//TO BE DELETED
// const characters = await OBR.scene.items.getItems(
//   (item) => item.layer === "CHARACTER" && isImage(item)
// );


document.querySelector("#app").innerHTML = `

  <div>
    <ul id="sheet-list"></ul>
  </div>
`;


//TO BE DELETED
//This gets characters without clicking add to sheet.  TO BE DELETED!
// document.querySelector("#app").innerHTML = `

//   <div>
// <h3> Raine </h3>

// <p><embed
// width="125px"
// height="125px"
// src="https://lefty469.pythonanywhere.com/portrait?name=raine&id=108291017">
// </embed>

// <h3> Rosy </h3>
// <p><embed
// width="125px"
// height="125px"
// src="https://lefty469.pythonanywhere.com/portrait?name=rosemary&id=97082692">
// </embed>

// <h3> Ryx </h3>
// <p><embed
// width="125px"
// height="125px"
// src="https://lefty469.pythonanywhere.com/portrait?name=ryx&id=95195277">
// </embed>

// <h3> Tobi </h3>
// <p><embed
// width="125px"
// height="125px"
// src="https://lefty469.pythonanywhere.com//portrait?name=tobi&id=110222058">
// </embed>
// </div>
// `;


OBR.onReady(() => {
  setupContextMenu();
  setupSheetList(document.querySelector("#sheet-list"));
});
