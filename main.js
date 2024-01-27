import "./style.css";
import OBR from "@owlbear-rodeo/sdk";
import { setupContextMenu } from "./contextMenu";
import { setupSheetList, sheetFunction } from "./sheetList";
import { isImage } from "@owlbear-rodeo/sdk";

//
// const characters = await OBR.scene.items.getItems(
//   (item) => item.layer === "CHARACTER" && isImage(item)
// );
//

document.querySelector("#app").innerHTML = `

  <div>
    <ul id="sheet-list"></ul>
  </div>
`;

OBR.onReady(() => {
  setupContextMenu();
  setupSheetList(document.querySelector("#sheet-list"));
});
