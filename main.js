import "./style.css";
import OBR from "@owlbear-rodeo/sdk";
import { setupContextMenu } from "./contextMenu";
import { setupSheetList } from "./sheetList";
import { ID } from "./constants";

OBR.onReady(() => {
  document.querySelector("#app").innerHTML = `
  <div>
    <ul id="sheet-list"></ul>
  </div>
`;
  setupContextMenu();

  setupSheetList(document.querySelector("#sheet-list"));
  OBR.action.open();
});
