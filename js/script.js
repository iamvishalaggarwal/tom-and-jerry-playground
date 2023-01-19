let isActive = false;

window.onload = (event) => {
  document.onkeydown = function (event) {
    if (event.key === " " && !isActive) {
      startTheGame();
    }
  };
};

const startTheGame = () => {
  isActive = true;
  let score = 0;
  let cross = true;
  let isPlaying = true;
  let minWidthOfWindow = window.innerWidth - 500;

  // for hiding & showing play button
  play = document.querySelector(".playGame");
  play.classList.remove("gameStartDiv");
  play.style.display = "none";

  // for hiding and showing score box
  scoreCount = document.querySelector(".scoreCount");
  scoreCount.style.visibility = "visible";

  document.onkeydown = function (event) {
    if (isPlaying) {
      let player = document.querySelector(".player"); //returns the very first element which has this class
      let playerXAxis = parseInt(
        window.getComputedStyle(player, null).getPropertyValue("left")
      );
      if (event.key === "ArrowUp" || event.key === " ") {
        player.classList.add("animatedPlayer");
        // Here, we are removing this class after a particular time interval
        setTimeout(() => {
          player.classList.remove("animatedPlayer");
        }, 700);
      }

      if (event.key === "ArrowLeft") {
        player.style.left =
          playerXAxis !== 52 ? playerXAxis - 112 + "px" : playerXAxis;
      }
      if (event.key === "ArrowRight") {
        player.style.left =
          playerXAxis < minWidthOfWindow ? playerXAxis + 112 + "px" : "35px";
      }
    } else {
      window.location.replace("/tom-and-jerry-playground");
    }
  };

  const intervalHandler = setInterval(() => {
    let player = document.querySelector(".player");
    let obstacle = document.querySelector(".obstacle");
    let gameOver = document.querySelector(".gameOver");
    let replay = document.querySelector(".replay");

    // for animation in obstacle
    obstacle.classList.add("animatedObstacle");
    let playerXAxis = parseInt(
      window.getComputedStyle(player, null).getPropertyValue("left")
    );
    let playerYAxis = parseInt(
      window.getComputedStyle(player, null).getPropertyValue("bottom")
    );
    let obstacleXAxis = parseInt(
      window.getComputedStyle(obstacle, null).getPropertyValue("left")
    );
    let obstacleYAxis = parseInt(
      window.getComputedStyle(obstacle, null).getPropertyValue("bottom")
    );
    offsetXCollisonValue = Math.abs(playerXAxis - obstacleXAxis);
    offsetYCollisonValue = Math.abs(playerYAxis - obstacleYAxis);
    // collision condition
    if (offsetXCollisonValue < 120 && offsetYCollisonValue < 150) {
      isActive = false;
      player.style.animation = "rotateOutDownLeft";
      player.style.animationDuration = "1s";
      isPlaying = false;
      gameOver.style.animation = "bounceIn";
      gameOver.style.animationDuration = "1.25s";
      gameOver.innerHTML = "Game Over !";

      // for adding replay link tag (button)
      var replayTag = document.createElement("a");
      replayTag.setAttribute("href", "/tom-and-jerry-playground");
      replayTag.innerText = "Play Again :)";
      replay.appendChild(replayTag);

      // for removing animation of obstacle
      obstacle.classList.remove("animatedObstacle"); // obstacle.style.animation = "none";
      stopTheGame();
    }
    // without collision condition
    else if (offsetXCollisonValue < 145 && cross) {
      score += 50;
      updateScore(score);
      cross = false;
      setTimeout(() => {
        cross = true;
      }, 1000);
      // speed of obstacle increases with the increase in score
      // use timeout to prevent lagging in movement
      setTimeout(() => {
        aniDur = parseFloat(
          window
            .getComputedStyle(obstacle, null)
            .getPropertyValue("animation-duration")
        );
        if (aniDur > 2) {
          newDur = aniDur - 0.25;
          obstacle.style.animationDuration = newDur + "s";
        }
      }, 500);
    }
  }, 10);

  const updateScore = (score) => {
    let scoreElement = document.querySelector(".win");
    scoreElement.innerHTML = score;
  };
  const stopTheGame = () => {
    clearInterval(intervalHandler);
  };
};
