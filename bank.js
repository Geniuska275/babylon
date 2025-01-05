// Initialize Babylon.js Scene
const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {
    const scene = new BABYLON.Scene(engine);

    // 🎥 CAMERA
    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 4, 20, new BABYLON.Vector3(0, 3, 0), scene);
    camera.attachControl(canvas, true);

    // 💡 LIGHT
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // 🛠️ MATERIAL FOR FLOOR
    const floorMat = new BABYLON.StandardMaterial("floorMat", scene);
    floorMat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);

    // 🏢 THICK FLOOR
    const thickFloor = BABYLON.MeshBuilder.CreateBox("thickFloor", {
        width: 20,    // Width of the floor
        height: 1,    // Thickness of the floor
        depth: 20     // Depth of the floor
    }, scene);

    thickFloor.position.y = -0.3; // Adjust Y position (half the thickness above ground level)
    thickFloor.material = floorMat;
    // const floor = BABYLON.MeshBuilder.CreateGround("floor", { width: 20, height: 20 }, scene);
    // const floorMat = new BABYLON.StandardMaterial("floorMat", scene);
    // floorMat.diffuseColor = new BABYLON.Color3(0.6, 0.6, 0.6);
    // floor.material = floorMat;
    const stepMat = new BABYLON.StandardMaterial("stepMat", scene);
    stepMat.diffuseColor = new BABYLON.Color3(0.5, 0.4, 0.3);

    const buildingMat = new BABYLON.StandardMaterial("buildingMat", scene);
    buildingMat.diffuseColor = new BABYLON.Color3(0.9, 0.8, 0.7);

    // 🏢 GROUND FLOOR
    const groundFloor = BABYLON.MeshBuilder.CreateBox("groundFloor", { width: 12, height: 4, depth: 8 }, scene);
    groundFloor.position.y = 2;
    groundFloor.material = buildingMat;

    // 🏢 FIRST FLOOR
    const firstFloor = BABYLON.MeshBuilder.CreateBox("firstFloor", { width: 12, height: 4, depth: 8 }, scene);
    firstFloor.position.y = 6;
    firstFloor.material = buildingMat;
    // 🪜 STEPS AT ENTRANCE
    const stepCount = 4;
    for (let i = 0; i < stepCount; i++) {
        const step = BABYLON.MeshBuilder.CreateBox(`step${i}`, { width: 6, height: 0.5, depth: 2 }, scene);
        step.position.set(0, 0.25 * (i + 1), -5 + i * 1.5);
        step.material = stepMat;
    }


    // 🏦 BANK BUILDING STRUCTURE
    const bankMat = new BABYLON.StandardMaterial("bankMat", scene);
    bankMat.diffuseColor = new BABYLON.Color3(0.9, 0.8, 0.7);

    const mainBuilding = BABYLON.MeshBuilder.CreateBox("mainBuilding", { width: 12, height: 10, depth: 8 }, scene);
    mainBuilding.position.y = 3;
    mainBuilding.material = bankMat;

    // 🪟 WINDOWS
    // for (let i = -4; i <= 4; i += 4) {
    //     const window = BABYLON.MeshBuilder.CreatePlane("window" + i, { width: 1.5, height: 1.5 }, scene);
    //     window.position.set(i, 4, -4.05);
    //     const windowMat = new BABYLON.StandardMaterial("windowMat", scene);
    //     windowMat.diffuseColor = new BABYLON.Color3(0.5, 0.8, 1);
    //     window.material = windowMat;
    // }

    // 🚪 ENTRY DOOR (Arch Style)
    const door = BABYLON.MeshBuilder.CreatePlane("door", { width: 2, height: 3 }, scene);
    door.position.set(0, 1.5, -4.05);
    const doorMat = new BABYLON.StandardMaterial("doorMat", scene);
    doorMat.diffuseColor = new BABYLON.Color3(0.5, 0.3, 0.1);
    door.material = doorMat;

    // const arch = BABYLON.MeshBuilder.CreateTorus("arch", { diameter: 3, thickness: 0.2, arc: Math.PI }, scene);
    // arch.position.set(0, 3, -4.05);
    // arch.rotation.z = Math.PI / 2;
    // const archMat = new BABYLON.StandardMaterial("archMat", scene);
    // archMat.diffuseColor = new BABYLON.Color3(0.7, 0.6, 0.5);
    // arch.material = archMat;

    // 🪧 BANK SIGN
    const bankSign = BABYLON.MeshBuilder.CreatePlane("bankSign", { width:8, height: 6 }, scene);
    bankSign.position.set(0, 7, -4.1);
    const signMat = new BABYLON.StandardMaterial("signMat", scene);
    signMat.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.8);
    bankSign.material = signMat;

    const bankSignTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(bankSign);
    const bankText = new BABYLON.GUI.TextBlock();
    bankText.text = "SQE HOLDINGS BANK";
    bankText.color = "white";
    bankText.fontSize = 50;
    bankSignTexture.addControl(bankText);

    // 🛋️ INTERIOR CASHIER DESK
    const desk = BABYLON.MeshBuilder.CreateBox("desk", { width: 4, height: 1, depth: 1 }, scene);
    desk.position.set(0, 0.5, 0);
    desk.material = new BABYLON.StandardMaterial("deskMat", scene);
    desk.material.diffuseColor = new BABYLON.Color3(0.4, 0.2, 0.1);

    const glass = BABYLON.MeshBuilder.CreatePlane("glass", { width: 4, height: 2 }, scene);
    glass.position.set(0, 1.5, 0.55);
    const glassMat = new BABYLON.StandardMaterial("glassMat", scene);
    glassMat.alpha = 0.4;
    glassMat.diffuseColor = new BABYLON.Color3(0.7, 0.9, 1);
    glass.material = glassMat;

    // 🏛️ PILLARS
    const pillarMat = new BABYLON.StandardMaterial("pillarMat", scene);
    pillarMat.diffuseColor = new BABYLON.Color3(0.8, 0.7, 0.6);

    const createPillar = (x, z) => {
        const pillar = BABYLON.MeshBuilder.CreateCylinder("pillar", { diameter: 1, height: 7 }, scene);
        pillar.position.set(x, 3, z);
        pillar.material = pillarMat;
    };

    // Add 4 pillars to the front of the building
    createPillar(-4, -7);
    createPillar(4, -7);
    createPillar(-2, -7);
    createPillar(2, -7);

    // 🏠 TRIANGULAR ROOF (Pyramid Shape)
const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {
    diameterTop: 0,    // Top is a point (pyramid effect)
    diameterBottom: 15, // Base of the roof
    height: 3,        // Roof height
    tessellation: 4   // Four sides (triangular-like appearance)
}, scene);

// Position the roof on top of the walls
roof.position.set(0, 9.4, 0); // Slightly above the walls

// Apply material to the roof
const roofMat = new BABYLON.StandardMaterial("roofMat", scene);
roofMat.diffuseColor = new BABYLON.Color3(0.6, 0.4, 0.2); // Brownish color
roof.material = roofMat;

// Rotate the roof to align properly
roof.rotation.y = Math.PI / 4; // Rotate to align with the walls






    
    const roofs = BABYLON.MeshBuilder.CreateBox("roof", { width: 14.5, height: 0.5, depth: 16 }, scene);
    roofs.position.y = 6.25;
    roofs.material = new BABYLON.StandardMaterial("roofMat", scene);
    roofs.material.diffuseColor = new BABYLON.Color3(0.6, 0.4, 0.2);


    // 🏠 TRIANGULAR ROOF
    // const roofMat = new BABYLON.StandardMaterial("roofMat", scene);
    // roofMat.diffuseColor = new BABYLON.Color3(0.6, 0.4, 0.2);

    // const roof = BABYLON.MeshBuilder.CreatePolygon("roof", {
    //     shape: [
    //         new BABYLON.Vector3(-6, 0, -4),
    //         new BABYLON.Vector3(6, 0, -4),
    //         new BABYLON.Vector3(0, 3, -4)
    //     ],
    //     sideOrientation: BABYLON.Mesh.DOUBLESIDE
    // }, scene);

    // roof.position.set(0, 6, 0);
    // // roof.position.y = 6.25;

    // roof.rotation.x = Math.PI / 2;
    // roof.material = roofMat;

    // // Duplicate for back side
    // const roofBack = roof.clone("roofBack");
    // roofBack.position.z = 4;
  
    return scene;
};

// Start Babylon.js Scene
const scene = createScene();
engine.runRenderLoop(() => {
    scene.render();
});

// Resize Event
window.addEventListener("resize", () => {
    engine.resize();
});
