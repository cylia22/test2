// Get the form and all relevant elements
const form = document.querySelector('form');
const handrail3D = document.getElementById('handrail3D');
const ledOptions = document.getElementById('ledOptions');
const transparentStrip = document.getElementById('transparentStrip');
const ledYes = document.getElementById('ledYes');
const ledNo = document.getElementById('ledNo');
const ledTypeSelect = document.getElementsByName('ledtype')[0];

// Create a Three.js scene
const scene = new THREE.Scene();

// Create a camera and set its position
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer and add it to the page
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
handrail3D.appendChild(renderer.domElement);

// Create a geometry for the handrail
const handrailGeometry = new THREE.BoxGeometry(2, 0.25, 0.25);

// Create a material for the handrail
const handrailMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});

// Create a mesh for the handrail and add it to the scene
const handrailMesh = new THREE.Mesh(handrailGeometry, handrailMaterial);
scene.add(handrailMesh);

// Create a geometry for the transparent strip
const stripGeometry = new THREE.BoxGeometry(1.8, 0.05, 0.1);

// Create a material for the transparent strip
const stripMaterial = new THREE.MeshBasicMaterial({transparent: true, opacity: 0.5});

// Create a mesh for the transparent strip and add it to the handrail mesh
const stripMesh = new THREE.Mesh(stripGeometry, stripMaterial);
stripMesh.position.y = -0.1;
handrailMesh.add(stripMesh);

// Create a light for the LED if it is enabled
let ledLight = null;
if (ledYes.checked) {
  ledLight = new THREE.PointLight(0xffffff, 1, 10);
  ledLight.position.y = -0.025;
  handrailMesh.add(ledLight);
}

// Function to update the LED light based on the selected LED type
function updateLedLight() {
  if (ledLight !== null) {
    switch (ledTypeSelect.value) {
      case 'basic':
        ledLight.color = new THREE.Color(0xffffff);
        break;
      case 'luxury':
        ledLight.color = new THREE.Color(0xff0000);
        break;
      case 'executive':
        ledLight.color = new THREE.Color(0x00ff00);
        break;
    }
  }
}

// Function to show or hide the LED options based on the selected LED option
function updateLedOptions() {
  if (ledYes.checked) {
    ledOptions.style.display = 'block';
    updateLedLight();
  } else {
    ledOptions.style.display = 'none';
    if (ledLight !== null) {
      handrailMesh.remove(ledLight);
      ledLight = null;
    }
  }
}

// Add event listeners to update the LED options and 3D model when the form is changed
form.addEventListener('change', (event) => {
  if (event.target === ledYes || event.target === ledNo) {
    updateLedOptions();
  } else if (event.target === ledTypeSelect) {
    updateLedLight();
  }
});

// Function to animate the 3D model
function animate() {
  requestAnimationFrame(animate);
  handrailMesh.rotation.x += 0.01;
  handrail

