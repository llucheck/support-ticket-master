import React from "react";

function RollSixSidedDice() {
    document.getElementById("dice").value = Math.floor(Math.random()*6) + 1;
    document.getElementById("dicetwo").value = Math.floor(Math.random()*6) + 1;
    document.getElementById("dicethree").value = Math.floor(Math.random()*6) + 1;
    document.getElementById("dicefour").value = Math.floor(Math.random()*6) + 1;
    document.getElementById("dicefive").value = Math.floor(Math.random()*6) + 1;
}

function Yatzhee(){
  function rollDice(e){
    document.getElementById("dice").value = Math.floor(Math.random()*6) + 1;
    document.getElementById("dicetwo").value = Math.floor(Math.random()*6) + 1;
    document.getElementById("dicethree").value = Math.floor(Math.random()*6) + 1;
    document.getElementById("dicefour").value = Math.floor(Math.random()*6) + 1;
    document.getElementById("dicefive").value = Math.floor(Math.random()*6) + 1;
  }
  return (
    <>
      <div>
        <meta charSet="UTF-8" />
        <title>Yatzhee Dice Roller</title>
        <link rel="stylesheet" href="Yatzhee.css" />
        <h2>Yatzhee Dice Roller</h2>
        <p>This website is used for rolling the dice of your Yatzhee games,
        click the roll button to roll your six sided dice and wait for the numbers!</p>
        <button type="button" onClick={rollDice} autofocus>Roll Five Dice</button><br /><br />
        Dice One: <input id="dice" type="text" defaultValue="1" size={5} disabled /><br /><br />
        Dice Two: <input id="dicetwo" type="text" defaultValue="2" size={5} disabled /><br /><br />
        Dice Three: <input id="dicethree" type="text" defaultValue="3" size={5} disabled /><br /><br />
        Dice Four: <input id="dicefour" type="text" defaultValue="4" size={5} disabled /><br /><br />
        Dice Five: <input id="dicefive" type="text" defaultValue="5" size={5} disabled /><br /><br />
       </div>
    </>
    );
}

export default Yatzhee;