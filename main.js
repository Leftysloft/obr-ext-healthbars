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

//Open Usage Guide window.
const usageGuide = document.getElementById("usageButton");
usageGuide.onclick = () => {
  onclick = window.open(
    "https://github.com/Leftysloft/obr-ext-healthbars/tree/main#readme",
    "mozillaWindow",
    "left=100,top=100,width=600,height=800"
  );
};

OBR.onReady(() => {
  //build the contect menu
  setupContextMenu();

  //Open popover menu
  const popoverBtn = document.getElementById("popoverButton");
  popoverBtn.onclick = () => {
    console.log("popoverBtn");
    OBR.popover.open({
      id: ID,
      url: "https://google.com",
      height: 400,
      width: 400,
    });
    console.log("settings");
  };

  //Set up the view
  setupSheetList(document.querySelector("#sheet-list"));
  OBR.action.open();
});
