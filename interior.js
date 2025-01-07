// Basic Babylon.js Banking Hall Scene
// Include this script in an HTML file with Babylon.js included

// Initialize Babylon.js Scene
const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

// Camera
const camera = new BABYLON.ArcRotateCamera('camera', Math.PI / 2, Math.PI / 4, 20, BABYLON.Vector3.Zero(), scene);
camera.attachControl(canvas, true);

// Light
const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
light.intensity = 0.7;

   // Create the base of the currency counter
   const base = BABYLON.MeshBuilder.CreateBox("base", { width: 4, height: 0.5, depth: 3 }, scene);
   base.position.y = 0;
   const baseMaterial = new BABYLON.StandardMaterial("baseMaterial", scene);
   baseMaterial.diffuseColor = new BABYLON.Color3(0.6, 0.6, 0.6);
   base.material = baseMaterial;

   // Create the top section of the machine
   const tops = BABYLON.MeshBuilder.CreateBox("top", { width: 4, height: 0.5, depth: 2 }, scene);
   tops.position.y = 1.25;
   const topMaterial = new BABYLON.StandardMaterial("topMaterial", scene);
   topMaterial.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.3);
   tops.material = topMaterial;

   // Create the side panels
   const createSidePanel = (name, positionX) => {
       const sidePanel = BABYLON.MeshBuilder.CreateBox(name, { width: 0.1, height: 1.5, depth: 3 }, scene);
       sidePanel.position.set(positionX, 0.75, 0);
       sidePanel.material = topMaterial;
       return sidePanel;
   };

   createSidePanel("leftPanel", -2);
   createSidePanel("rightPanel", 2);

   // Create the currency slot
   const slot = BABYLON.MeshBuilder.CreateBox("slot", { width: 3.5, height: 0.1, depth: 0.5 }, scene);
   slot.position.set(0, 0.5, 1.25);
   const slotMaterial = new BABYLON.StandardMaterial("slotMaterial", scene);
   slotMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8);
   slot.material = slotMaterial;

   // Create a currency note
   const noteMaterial = new BABYLON.StandardMaterial("noteMaterial", scene);
   noteMaterial.diffuseColor = new BABYLON.Color3(0.4, 0.8, 0.4);

   const createCurrencyNote = (name, position) => {
       const note = BABYLON.MeshBuilder.CreatePlane(name, { width: 2, height: 1 }, scene);
       note.material = noteMaterial;
       note.rotation.x = -Math.PI / 2;
       note.position = position;
       return note;
   };

   // Stack of notes
   const notes = [];
   for (let i = 0; i < 5; i++) {
       notes.push(createCurrencyNote(`note${i}`, new BABYLON.Vector3(0, 0.05 * i + 0.5, 1.5)));
   }

   // Add animation for the notes
   const animateNotes = () => {
       notes.forEach((note, index) => {
           const animation = new BABYLON.Animation(
               `noteAnimation${index}`,
               "position.z",
               30,
               BABYLON.Animation.ANIMATIONTYPE_FLOAT,
               BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
           );

           const keys = [
               { frame: 0, value: 1.5 },
               { frame: 20, value: -1.5 },
               { frame: 40, value: 1.5 },
           ];

           animation.setKeys(keys);
           note.animations = [animation];
           scene.beginAnimation(note, 0, 40, true);
       });
   };

   animateNotes();

   // Create a counter display
   const display = BABYLON.MeshBuilder.CreatePlane("display", { width: 2, height: 1 }, scene);
   display.rotation.x = Math.PI / 2;
   display.position.set(0, 1.5, -1.5);
   const displayMaterial = new BABYLON.StandardMaterial("displayMaterial", scene);
   const displayTexture = new BABYLON.DynamicTexture("displayTexture", { width: 512, height: 256 }, scene);
   displayMaterial.diffuseTexture = displayTexture;
   display.material = displayMaterial;

   displayTexture.drawText("Count: 0", 50, 150, "bold 50px Arial", "white", "black");

   // Update the count on display
   let count = 0;
   scene.onBeforeRenderObservable.add(() => {
       count = (count + 1) % 100; // Simulate counting
       displayTexture.clear();
       displayTexture.drawText(`Count: ${count}`, 50, 150, "bold 50px Arial", "white", "black");
   });
// Floor
const floor = BABYLON.MeshBuilder.CreateGround('floor', { width: 20, height: 20 }, scene);
const floorMaterial = new BABYLON.StandardMaterial('floorMat', scene);
floorMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8);
floor.material = floorMaterial;

// Walls
const wallMaterial = new BABYLON.StandardMaterial('wallMat', scene);
wallMaterial.diffuseColor = new BABYLON.Color3(0.9, 0.9, 1);

const createWall = (name, width, height, depth, position) => {
  const wall = BABYLON.MeshBuilder.CreateBox(name, { width, height, depth }, scene);
  wall.material = wallMaterial;
  wall.position = position;
  return wall;
};

createWall('backWall', 20, 5, 0.2, new BABYLON.Vector3(0, 2.5, -10));
// createWall('frontWall', 20, 5, 0.2, new BABYLON.Vector3(0, 2.5, 10));
createWall('leftWall', 0.2, 5, 20, new BABYLON.Vector3(-10, 2.5, 0));
createWall('rightWall', 0.2, 5, 20, new BABYLON.Vector3(10, 2.5, 0));



// Create Wall with Door Opening using CSG (Constructive Solid Geometry)
const CSG = BABYLON.CSG;

// Main Wall
const wall = BABYLON.MeshBuilder.CreateBox("wall", { width: 20, height: 5, depth: 0.1 }, scene);
wall.position.set(0, 2.5, 10);
const wallMat = new BABYLON.StandardMaterial("wallMat", scene);
wallMat.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.9);
wall.material = wallMat;

// Create Door Opening in Wall
const doorOpening = BABYLON.MeshBuilder.CreateBox("doorOpening", { width: 1.2, height: 2, depth: 0.2 }, scene);
doorOpening.position.set(-2, 1, 10);

// Subtract Door Opening from Wall
const wallCSG = BABYLON.CSG.FromMesh(wall);
const doorCSG = BABYLON.CSG.FromMesh(doorOpening);
const wallWithDoor = wallCSG.subtract(doorCSG).toMesh("wallWithDoor", wallMat, scene);

// Clean up temporary meshes
wall.dispose();
doorOpening.dispose();

// 🚪 CREATE DOOR
const door = BABYLON.MeshBuilder.CreateBox("door", { width: 1.2, height: 2, depth: 0.05 }, scene);
door.position.set(-2, 1, 10); // Slight offset for depth
const doorMat = new BABYLON.StandardMaterial("doorMat", scene);
doorMat.diffuseColor = new BABYLON.Color3(0.5, 0.3, 0.1);
door.material = doorMat;

// Set door pivot (hinge)
door.setPivotMatrix(BABYLON.Matrix.Translation(-0.6, 0, 0)); // Pivot on the edge

// 🚪 DOOR ANIMATION
const doorAnimation = new BABYLON.Animation(
    "doorAnimation",
    "rotation.y",
    30,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_YOYO
);

const doorKeys = [
    { frame: 0, value: 0 },             // Closed
    { frame: 30, value: -Math.PI / 4 }  // Slightly Open (45°)
];

doorAnimation.setKeys(doorKeys);
door.animations = [doorAnimation];

// 🖱️ TOGGLE DOOR OPEN/CLOSE ON CLICK
let isDoorOpen = false;
scene.onPointerDown = () => {
    isDoorOpen = !isDoorOpen;
    scene.beginAnimation(door, 0, 30, false);
};


// Banking Counters
const counterMaterial = new BABYLON.StandardMaterial('counterMat', scene);
counterMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.3, 0.2);

const createCounter = (name, position) => {
  const counter = BABYLON.MeshBuilder.CreateBox(name, { width: 3, height: 1, depth: 1 }, scene);
  counter.material = counterMaterial;
  counter.position = position;
  return counter;
};

createCounter('counter1', new BABYLON.Vector3(-4, 0.5, -5));
createCounter('counter2', new BABYLON.Vector3(0, 0.5, -5));
createCounter('counter3', new BABYLON.Vector3(4, 0.5, -5));


 // Create a placeholder avatar
 const createAvatar = (position) => {
  // Body
  const body = BABYLON.MeshBuilder.CreateCylinder("body", { diameter: 0.5, height: 1.5 }, scene);
  body.position = position.add(new BABYLON.Vector3(0, 0.75, 0));
  const bodyMaterial = new BABYLON.StandardMaterial("bodyMaterial", scene);
  bodyMaterial.diffuseColor = new BABYLON.Color3(0.3, 0.5, 0.8);
  body.material = bodyMaterial;

  // Head
  const head = BABYLON.MeshBuilder.CreateSphere("head", { diameter: 0.5 }, scene);
  head.position = position.add(new BABYLON.Vector3(0, 1.6, 0));
  const headMaterial = new BABYLON.StandardMaterial("headMaterial", scene);
  headMaterial.diffuseColor = new BABYLON.Color3(1, 0.8, 0.6);
  head.material = headMaterial;

  // Arms
  const leftArm = BABYLON.MeshBuilder.CreateCylinder("leftArm", { diameter: 0.2, height: 1 }, scene);
  leftArm.rotation.z = Math.PI / 4;
  leftArm.position = position.add(new BABYLON.Vector3(-0.5, 1.5, 0));
  leftArm.material = bodyMaterial;

  const rightArm = BABYLON.MeshBuilder.CreateCylinder("rightArm", { diameter: 0.2, height: 1 }, scene);
  rightArm.rotation.z = -Math.PI / 4;
  rightArm.position = position.add(new BABYLON.Vector3(0.5, 1.5, 0));
  rightArm.material = bodyMaterial;

  // // Legs
  // const leftLeg = BABYLON.MeshBuilder.CreateCylinder("leftLeg", { diameter: 0.2, height: 1 }, scene);
  // leftLeg.position = position.add(new BABYLON.Vector3(-0.2, 0.5, 0));
  // leftLeg.material = bodyMaterial;

  // const rightLeg = BABYLON.MeshBuilder.CreateCylinder("rightLeg", { diameter: 0.2, height: 1 }, scene);
  // rightLeg.position = position.add(new BABYLON.Vector3(0.2, 0.5, 0));
  // rightLeg.material = bodyMaterial;
};

// Place the avatar in front of the counter
createAvatar(new BABYLON.Vector3(0, 0, 2));





// Monitors for Customer Care
const monitorMaterial = new BABYLON.StandardMaterial('monitorMat', scene);
monitorMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

const createMonitor = (name, position) => {
  const monitor = BABYLON.MeshBuilder.CreatePlane(name, { width: 1.5, height: 1 }, scene);
  monitor.material = monitorMaterial;
  monitor.position = position;
  monitor.rotation.x = Math.PI / 6;
  return monitor;
};

createMonitor('monitor1', new BABYLON.Vector3(-4, 1.5, -4.5));
createMonitor('monitor2', new BABYLON.Vector3(0, 1.5, -4.5));
createMonitor('monitor3', new BABYLON.Vector3(4, 1.5, -4.5));

// Seating Area
const chairMaterial = new BABYLON.StandardMaterial('chairMat', scene);
chairMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.5);

const createChair = (name, position) => {
  const chair = BABYLON.MeshBuilder.CreateBox(name, { width: 1, height: 0.5, depth: 1 }, scene);
  chair.material = chairMaterial;
  chair.position = position;
  return chair;
};

createChair('chair1', new BABYLON.Vector3(-6, 0.25, 4));
createChair('chair2', new BABYLON.Vector3(-2, 0.25, 4));
createChair('chair3', new BABYLON.Vector3(2, 0.25, 4));
createChair('chair4', new BABYLON.Vector3(6, 0.25, 4));



// Additional Furniture
createChair('sofa1', new BABYLON.Vector3(-8, 0.25, 6));
createChair('sofa2', new BABYLON.Vector3(8, 0.25, 6));
createCounter('table1', new BABYLON.Vector3(0, 0.5, 6));

 
// Render Loop
engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener('resize', () => {
  engine.resize();
});
