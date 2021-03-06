window.onload = generateColor();

let saves = [];

document.addEventListener("keydown", function (e) {
  if (e.key == " " || e.code == "Space") {
    generateColor();
  }
  if (e.key == "s" || e.code == "KeyS") {
    save();
  }
  if (e.key == "l" || e.code == "KeyL") {
    loadSaves();
  }
  if (e.key == "r" || e.code == "KeyR") {
    clearSaves();
  }
});

function generateColor() {
  var min = 0;
  var max = 255;

  var r = Math.round(Math.random() * (max - min)) + min;
  var g = Math.round(Math.random() * (max - min)) + min;
  var b = Math.round(Math.random() * (max - min)) + min;
  var rgb = "rgb(" + r + ", " + g + ", " + b + ")";

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  document.getElementById("rect").style.fill = rgb;
  document.getElementById("rgb").innerHTML = rgb;
  document.getElementById("hex").innerHTML = rgbToHex(r, g, b);
}

function copy(code) {
  document.getElementById("input").type = "text";
  document.getElementById("input").value = document.getElementById(
    code
  ).innerText;
  document.getElementById("input").focus();
  document.getElementById("input").select();
  document.execCommand("copy");
  window.getSelection().empty();
  document.getElementById("input").type = "hidden";
}

function save() {
  let color = {
    rgb: document.getElementById("rgb").innerText,
    hex: document.getElementById("hex").innerText,
  };
  if (saves.some((save) => save.rgb == color.rgb)) {
    return;
  } else {
    saves.push(color);
  }
}

function loadSaves() {
  let containerDiv = document.createElement("div");
  let bottom = document.getElementById("bottom");
  bottom.innerHTML = "";
  bottom.appendChild(containerDiv);
  saves.forEach(function (item) {
    let itemDiv = document.createElement("div");
    let rgbEl = document.createElement("p");
    let hexEl = document.createElement("p");
    itemDiv.appendChild(rgbEl).classList.add("rgb");
    itemDiv.appendChild(hexEl).classList.add("hex");
    itemDiv.style.backgroundColor = item["hex"];
    containerDiv.appendChild(itemDiv);

    hexEl.innerHTML += item["hex"];
    rgbEl.innerHTML += item["rgb"];
  });
}

function clearSaves() {
  saves = [];
  let bottom = document.getElementById("bottom");
  bottom.innerHTML = "";
}

document.getElementById("color").addEventListener("mouseover", function () {
  document.getElementById("save").classList.remove("hidden");
  document.getElementById("save").classList.add("shown");
});

document.getElementById("color").addEventListener("mouseleave", function () {
  document.getElementById("save").classList.add("hidden");
  document.getElementById("save").classList.remove("shown");
});

document.getElementById("saveclick").addEventListener("click", function () {
  save();
  loadSaves();
});

document.body.addEventListener(
  "click",
  function (e) {
    if (e.target.className == "rgb") {
      copy("rgb");
    }
    if (e.target.className == "hex") {
      copy("hex");
    }
  },
  false
);
