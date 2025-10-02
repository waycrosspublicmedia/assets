function showMysteriousImage() {
  console.log("showMysteriousImage function triggered");  // Debug message
  // Rest of the function code
}

function showMysteriousImage() {
  nw.Window.open('https://www.example.com', {
    position: 'center',
    width: 300,
    height: 300
  });
}


  // Create a new window with NW.js
  nw.Window.open('img/pictures/mysterious_girl.html', {
    position: 'center',
    width: 200,
    height: 200,
    frame: false,
    transparent: true
  }, (newWin) => {
    // Set up initial position off-screen
    newWin.moveTo(-300, 200);  // Adjust -300 to start it off the visible screen

    // Animate the window to move into the game window
    setTimeout(() => {
      newWin.moveTo(400, 200);  // Adjust this position to where you want it to end
    }, 500);  // Adjust timing as needed

    // Optional: Close the window after the animation
    setTimeout(() => {
      newWin.close();
    }, 3000);
  });
}
