import "./style.css";
import OBR from "@owlbear-rodeo/sdk";
import { setupContextMenu } from "./contextMenu";
import { setupSheetList, sheetFunction } from "./sheetList";

document.querySelector("#app").innerHTML = `

  <div>
    <ul id="sheet-list"></ul>
  </div>
`;

OBR.onReady(() => {
  setupContextMenu();
  setupSheetList(document.querySelector("#sheet-list"));
});
