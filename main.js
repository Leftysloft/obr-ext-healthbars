import "./style.css";
import OBR from "@owlbear-rodeo/sdk";
import { setupContextMenu } from "./contextMenu";
import { setupSheetList, sheetFunction } from "./sheetList";
import { isImage } from "@owlbear-rodeo/sdk";

// const characters = await OBR.scene.items.getItems(
//   (item) => item.layer === "CHARACTER" && isImage(item)
// );

document.querySelector("#app").innerHTML = `

  <div>
    <h3> Raine </h3>
    <ul id="sheet-list"></ul>

    <p><embed
    width="125px"
    height="125px"
    src="http://127.0.0.1:5000/portrait?name=raine&id=108291017">
    </embed>

    <h3> Rosy </h3>
    <p><embed
    width="125px"
    height="125px"
    src="http://127.0.0.1:5000/portrait?name=rosemary&id=97082692">
    </embed>

    <h3> Ryx </h3>
    <p><embed
    width="125px"
    height="125px"
    src="http://127.0.0.1:5000/portrait?name=ryx&id=95195277">
    </embed>

    <h3> Tobi </h3>
    <p><embed
    width="125px"
    height="125px"
    src="http://127.0.0.1:5000/portrait?name=tobi&id=110222058">
    </embed>

  </div>
`;

OBR.onReady(() => {
  setupContextMenu();
  setupSheetList(document.querySelector("#sheet-list"));
});
