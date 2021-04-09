function printTopscores() {
  // get scores from localstorage or set to empty array
  var topscores = JSON.parse(window.localStorage.getItem("topscores")) || [];

  // sort topscores in descending order
  topscores.sort(function(a, b) {
    return b.score - a.score;
  });

  topscores.forEach(function(score) {
    var liTag = document.createElement("li");
    liTag.textContent = score.initials + " - " + score.score;

    // show on page
    var olEl = document.getElementById("topscores");
    olEl.appendChild(liTag);
  });
}

function clearTopscores() {
  window.localStorage.removeItem("topscores");
  window.location.reload();
}

document.getElementById("clear").onclick = clearTopscores;

// run function when page loads
printTopscores();
