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
    <h3> Health </h3>
    <ul id="sheet-list"></ul>

    <p><iframe
    width="125px"
    height="145px"
    src="http://127.0.0.1:5000/portrait?name=raine&id=108291017">
    </iframe>

    <p><iframe
    width="125px"
    height="145px"
    src="http://127.0.0.1:5000/portrait?name=rosemary&id=97082692">
    </iframe>

  
    <p><iframe
    width="125px"
    height="145px"
    src="http://127.0.0.1:5000/portrait?name=ryx&id=95195277">
    </iframe>


    <p><iframe
    width="125px"
    height="145px"
    src="http://127.0.0.1:5000/portrait?name=tobi&id=110222058">
    </iframe>

  </div>
`;

OBR.onReady(() => {
  setupContextMenu();
  setupSheetList(document.querySelector("#sheet-list"));
});
