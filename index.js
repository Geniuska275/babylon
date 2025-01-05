
const canvas=document.querySelector('canvas');

// create an engine
const engine= new BABYLON.Engine(canvas,true);

// create a scene
function createScene(){
    const scene=new BABYLON.Scene(engine);
    // scene.clearColor=BABYLON.Color3.FromHexString('#000000');
    // const camera=new BABYLON.FreeCamera('camera',new BABYLON.Vector3(0, 0, -10),scene);
    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 4, 5, BABYLON.Vector3.Zero(), scene);
  camera.attachControl(canvas, true);
    
    // const light=new BABYLON.HemisphericLight('light',new BABYLON.Vector3(0, 1, 0),scene);
    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(1, 1, 0),
        scene
      );
    // const sphere=BABYLON.Mesh.CreateSphere('sphere',10,2,scene);
//    const box=BABYLON.MeshBuilder.CreateBox('box',{
//       size:1,
//    },scene)
//    box.rotation.x=2;

//    box.rotation.y=3;
//    const sphere=BABYLON.MeshBuilder.CreateSphere('sphere',{
//     segments:32,
//     diameter:2,
//    },scene)
//     sphere.position=new BABYLON.Vector3(3,0,0)
//     const plane=BABYLON.MeshBuilder.CreatePlane('plane',{},scene)

//     plane.position=new BABYLON.Vector3(-3,0,0)
//     // create a material
//     const material=new BABYLON.StandardMaterial('material',scene)
//     material.diffuseColor=new BABYLON.Color3(1,0,2)
//     box.material=material

//     const material2=new BABYLON.StandardMaterial('material2',scene)
//     material2.diffuseTexture=new BABYLON.Texture('https://unsplash.com/photos/a-kitchen-with-a-sink-and-a-window-myJ2CfdYmXk',scene)
//     sphere.material=material2
//     BABYLON.SceneLoader.ImportMesh(
//         "",
//         "https://models.babylonjs.com/meshes/",
//         "dummy3.babylon",
//         scene,
//         (meshes, particleSystems, skeletons) => {
//           const avatar = meshes[0];
//           avatar.position = new BABYLON.Vector3(0, 0, 0);
    
//           const skeleton = skeletons[0];
//           if (skeleton) {
//             scene.beginAnimation(skeleton, 0, 100, true);
//           }
//         }
//       );

scene.clearColor = new BABYLON.Color4(0.8, 0.9, 1, 1);

    return scene;
}

const scene=createScene();
// const box =BABYLON.Mesh.createBox('box',10,2,scene);
const createBuilding = () => {
    const floors = 5; // Number of stories
    const floorHeight = 3; // Height of each floor
    const buildingWidth = 10;
    const buildingDepth = 8;
  
    for (let i = 0; i < floors; i++) {
      // Create a floor
      const floor = BABYLON.MeshBuilder.CreateBox(
        `floor_${i}`,
        { width: buildingWidth, height: floorHeight, depth: buildingDepth },
        scene
      );
  
      floor.position.y = i * floorHeight + floorHeight / 2;
  
      // Material for floor
      const material = new BABYLON.StandardMaterial(`floorMat_${i}`, scene);
      material.diffuseColor = i % 2 === 0 ? new BABYLON.Color3(0.5, 0.5, 0.7) : new BABYLON.Color3(0.7, 0.7, 0.9);
      floor.material = material;
    }
  
    // 🛠️ Add a roof
    const roof = BABYLON.MeshBuilder.CreateBox(
      "roof",
      { width: buildingWidth + 1, height: 1, depth: buildingDepth + 1 },
      scene
    );
    roof.position.y = floors * floorHeight + 0.5;
    const roofMat = new BABYLON.StandardMaterial("roofMat", scene);
    roofMat.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    roof.material = roofMat;
  };
  
  createBuilding(scene);

  const addWindowsAndDoors = () => {
    const windowMaterial = new BABYLON.StandardMaterial("windowMat", scene);
    windowMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.7, 1);
    windowMaterial.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
  
    for (let i = 0; i < 5; i++) {
      // Add windows
      const window = BABYLON.MeshBuilder.CreatePlane(
        `window_${i}`,
        { width: 2, height: 1.5 },
        scene
      );
      window.position.set(-5.1, i * 3 + 1.5, 2);
      window.rotation.y = Math.PI / 2;
      window.material = windowMaterial;
    }
  
    // Add a door
    const door = BABYLON.MeshBuilder.CreateBox("door", { width: 2, height: 3, depth: 0.2 }, scene);
    door.position.set(0, 1.5, 4.1);
  
    const doorMaterial = new BABYLON.StandardMaterial("doorMat", scene);
    doorMaterial.diffuseColor = new BABYLON.Color3(0.4, 0.2, 0);
    door.material = doorMaterial;
  };
  
  addWindowsAndDoors(scene);
// Ground
const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 50, height: 50 }, scene);
const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
groundMat.diffuseColor = new BABYLON.Color3(0.3, 0.8, 0.3);
ground.material = groundMat;

// Add Trees
const createTree = (x, z) => {
  const trunk = BABYLON.MeshBuilder.CreateCylinder("trunk", { diameter: 0.5, height: 2 }, scene);
  trunk.position.set(x, 1, z);
  const trunkMat = new BABYLON.StandardMaterial("trunkMat", scene);
  trunkMat.diffuseColor = new BABYLON.Color3(0.5, 0.3, 0.1);
  trunk.material = trunkMat;

  const leaves = BABYLON.MeshBuilder.CreateSphere("leaves", { diameter: 2 }, scene);
  leaves.position.set(x, 2.5, z);
  const leavesMat = new BABYLON.StandardMaterial("leavesMat", scene);
  leavesMat.diffuseColor = new BABYLON.Color3(0.1, 0.6, 0.1);
  leaves.material = leavesMat;
};

// Add Multiple Trees
createTree(-10, -10);
createTree(10, 10);
createTree(-10, 5);

  
engine.runRenderLoop(function() {
    scene.render();
});

