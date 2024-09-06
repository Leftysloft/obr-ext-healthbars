import "./style.css";
import OBR from "@owlbear-rodeo/sdk";
import { setupContextMenu } from "./contextMenu";
import { setupSheetList } from "./sheetList";
import { ID } from "./constants";

document.querySelector("#app").innerHTML = `
  <div>
    <ul id="sheet-list"></ul>
  </div>
`;

OBR.onReady(() => {
  setupContextMenu();

  setupSheetList(document.querySelector("#sheet-list"));
  OBR.action.open();
});
