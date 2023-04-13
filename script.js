// identify relevant HTML elements
const transparentStrip = document.getElementById("transparent-strip");
const lightSource = document.getElementById("light-source");

// set default values
let lightType = "basic"; // default to basic lighting
let lightColor = "white"; // default to white lighting

// function to update lighting based on user's choices
function updateLighting(type, color) {
  // update light type
  lightType = type;
  
  // update light color
  lightColor = color;
  
  // update transparent strip color
  transparentStrip.style.backgroundColor = color;
  
  // update light source based on light type
  switch (type) {
    case "basic":
      lightSource.style.backgroundImage = "url('path/to/basic-light.png')";
      break;
    case "luxury":
      lightSource.style.backgroundImage = "url('path/to/luxury-light.png')";
      break;
    case "executive":
      lightSource.style.backgroundImage = "url('path/to/executive-light.png')";
      break;
    default:
      lightSource.style.backgroundImage = "none";
      break;
  }
}

// call updateLighting function when user selects LED lighting
document.getElementById("led-option").addEventListener("change", function() {
  if (this.checked) {
    // show transparent strip and light source
    transparentStrip.style.display = "block";
    lightSource.style.display = "block";
    
    // update lighting based on user's choices
    updateLighting(document.querySelector('input[name="light-type"]:checked').value, document.querySelector('input[name="light-color"]:checked').value);
  } else {
    // hide transparent strip and light source
    transparentStrip.style.display = "none";
    lightSource.style.display = "none";
  }
});

// call updateLighting function when user selects a different light type or color
document.querySelectorAll('input[name="light-type"], input[name="light-color"]').forEach(function(el) {
  el.addEventListener("change", function() {
    if (document.getElementById("led-option").checked) {
      // update lighting based on user's choices
      updateLighting(document.querySelector('input[name="light-type"]:checked').value, document.querySelector('input[name="light-color"]:checked').value);
    }
  });
});
