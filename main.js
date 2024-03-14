import "./style.css";
import OBR from "@owlbear-rodeo/sdk";
import { setupContextMenu } from "./contextMenu";
import { setupSheetList } from "./sheetList";

document.querySelector("#app").innerHTML = `

  <div>
    <ul id="sheet-list"></ul>
  </div>
`;

OBR.onReady(() => {
  OBR.action.open();
  setupContextMenu();
  setupSheetList(document.querySelector("#sheet-list"));
});
