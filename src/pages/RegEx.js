import React from "react";

function RegEx(){
  function ValidateRegExp(){
      const regex = RegExp(document.getElementById("regEx").value);
      const str = document.getElementById("testPh").value;
      document.getElementById("regResults").value = regex.test(str);
  }
  return (
    <>
      <div>
  	<title>Reg Expression Validator</title>
  	<meta charSet="utf-8" /> 
  	<h2>Regular Expression Validator</h2>
  	<p>Put your regular expression into the regular expression box without the forward slashes</p>
  	<p>Then put your test phrase into the Test Phrase and click the button to test it</p>
  	Regular Expression: <input id="regEx" type="text" defaultValue={1} size={20} /><br />
  	Test Phrase: <input id="testPh" type="text" defaultValue={1} size={20} /><br />
  	<button type="button" onClick={ValidateRegExp}>Validate Phrase</button><br /><br />
  	Results:<input id="regResults" type="text" defaultValue="n/a" size={5} /><br />
      </div>
    </>
    );
}

export default RegEx;