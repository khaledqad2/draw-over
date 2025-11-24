import html2canvas from "html2canvas";
import DrawOver from "./DrawOver";

//Save the content as an image
const saveImage = async () => {
  const element = document.body; // or a specific container

  const canvas = await html2canvas(element, {
    allowTaint: true,
    useCORS: true,
  });

  const dataURL = canvas.toDataURL("image/png");

  // Download
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "drawing_snapshot.png";
  link.click();
};

//Inject the html tags inside the main page function
const injectDrawOverUI = () => {
  // 1. Create UI container and insert into <body>
  const container = document.createElement("div");
  container.innerHTML = `
  <div id="tool-container" style="position: absolute;z-index: 9999;">
    <button id="activate">Activate Drawing</button>
    <button id="deactivate">Deactivate</button>
    <button id="clear">Clear All</button>
    <button id="pencil">Pencil Tool</button>
    <button id="line">Line Tool</button>
    <button id="arrow">Arrow Tool</button>
    <button id="drumstick">Drumstick Tool</button>
    <button id="rectangle">Rectangle Tool</button>
    <button id="black-color">Color to black</button>
    <button id="save" style="background-color: chocolate;">Save Snapshot</button>
  </div>
  `;
  setTimeout(() => {
    document.body.prepend(container);

    // deferred to next tick to ensure DOM exists
    //   setTimeout(async () => {
    //     const { DrawOver } = await import("./index");

    const drawer = new DrawOver({ strokeColor: "red", strokeWidth: 3 });

    document.getElementById("activate")!.onclick = () => {
      drawer.activate();
      drawer.setTool("line");
    };
    document.getElementById("deactivate")!.onclick = () => drawer.deactivate();
    document.getElementById("clear")!.onclick = () => drawer.clear();
    document.getElementById("pencil")!.onclick = () => drawer.setTool("pencil");
    document.getElementById("line")!.onclick = () => drawer.setTool("line");
    document.getElementById("arrow")!.onclick = () => drawer.setTool("arrow");
    document.getElementById("drumstick")!.onclick = () =>
      drawer.setTool("drumstick");
    document.getElementById("rectangle")!.onclick = () =>
      drawer.setTool("rectangle");
    document.getElementById("save")!.onclick = () => saveImage();
    document.getElementById("black-color")!.onclick = () =>
      drawer.setOptions({ strokeColor: "black" });
    //   });
  }, 3000);
};

export { saveImage, injectDrawOverUI };
