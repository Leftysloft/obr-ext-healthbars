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
  setupContextMenu();
  setupSheetList(document.querySelector("#sheet-list"));
  OBR.action.open();
});

//Open Usage Guide window.
const usageGuide = document.getElementById("usageButton");
usageGuide.onclick = () => {
  onclick = window.open(
    "https://github.com/Leftysloft/obr-ext-healthbars/tree/main#readme",
    "mozillaWindow",
    "left=100,top=100,width=600,height=800"
  );
};
