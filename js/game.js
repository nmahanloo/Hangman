// Global variables
var category = localStorage.getItem("cat");
var vocabs = [];
var vocab = "";
var word = "";
var attempt = 0;

// Initializing the game
setTitle();
readDatabase();
selectRandomVocab();
setupWord();
displayWord();
displayLength();
setupBackground();
getInput();

// Functions

// Set the title of the game on header
function setTitle() {
  document.querySelector("#categoryTitle").innerHTML = category;
  category = category.toLowerCase();
}

// Set the vocabulary list
function readDatabase() {
  if (category == "fruits") {
    vocabs = ["apple", "banana", "orange", "grape", "strawberry", "pineapple", "watermelon", "mango", "kiwi", "lemon", "lime", "avocado", "coconut", "papaya", "peach", "pear", "plum", "pomegranate", "raspberry", "blackberry", "blueberry", "cantaloupe", "cherry", "clementine", "date", "fig", "grapefruit", "honeydew", "jackfruit", "kiwifruit", "lemon", "lime", "mango", "melon", "mulberry", "nectarine"];
  }
  else if (category == "animals"){
    vocabs = ["dog", "cat", "bird", "fish", "rabbit", "snake", "lizard", "turtle", "tortoise", "shark", "whale", "dolphin", "fish", "lion", "wolf", "eagle", "bear", "tiger", "gorilla", "elephant", "hippo", "kangaroo", "panda", "koala", "kangaroo", "giraffe", "elephant", "zebra", "giraffe", "horse", "donkey", "pig", "cow", "sheep", "goat", "buffalo", "deer"];
  }
  else if (category == "countries"){
    vocabs = ["iran", "india", "china", "japan", "mexico", "brazil", "canada", "united states", "united kingdom", "australia", "france", "spain", "italy", "germany", "norway", "portugal", "argentina", "ukraine", "russia", "belarus", "kazakhstan", "turkey", "ukraine", "mongolia", "nepal", "pakistan", "afghanistan", "sri lanka", "thailand", "indonesia", "malaysia", "philippines", "singapore", "vietnam", "indonesia"];
  }
  else if (category == "artists"){
    vocabs = ["freddie mercury", "michael jackson", "james hetfield", "tony iommi", "kirk hammett", "tony martin", "ricky martin", "leonardo da vinci", "vincent van gogh", "pablo picasso", "michaiel angelo", "bethoven", "klaus meine", "slash's snakepit", "tom hanks", "alfred hitchcock", "clint eastwood"];
  }
  else if (category == "scientists"){
    vocabs = ["albert einstein", "isaac newton", "thomas edison", "nikola tesla", "joseph rutherford", "alexander graham bell", "razi", "piere curie", "marie curie", "joseph platon", "isaac newton", "khwarizmi", "johannes kepler"];
  }
  else if (category == "figures"){
    vocabs = ["adolf hitler", "cyrus the great", "john f. kennedy", "abraham lincoln", "george washington", "john adams", "shah of iran", "saddam hussein", "winston churchill", "franklin roosevelt", "joseph stalin", "george w. bush", "xerxes the great"];
  }
}

// Select a random vocabulary from the list
function selectRandomVocab() {
  var random = Math.floor(Math.random() * vocabs.length);
  vocab = vocabs[random];
  console.log("Random vocab is " + vocab);
}

// Setup the vocabulary to show
function setupWord() {
  for (var i = 0; i < vocab.length; i++) {
    if (vocab[i] == " ") {
      word = word + " ";
    }
    else if (vocab[i] == "-") {
      word = word + "-";
    }
    else if (vocab[i] == "'") {
      word = word + vocab[i];
    }
    else if (vocab[i] == ".") {
      word = word + ".";
    }
    else {
      word = word + "?";
    }
  }
}

// Display the vocabulary on screen
function displayWord() {
  document.querySelector("#display_word").innerHTML = word;
}

// Display length of the selected vocabulary
function displayLength() {
  var lengthInfo = String(vocab.length) + " characters";
  document.querySelector("#inputFeedback").className = "orange";
  document.querySelector("#inputFeedback").innerHTML = lengthInfo;
}

// Setup the inintial game picture
function setupBackground() {
  document.querySelector("#hanging").innerHTML = "<img src='img/p0.png' alt='Hangman Img'>";
}

// Handle game buttons
function getInput() {
  // Game event listener
  document.querySelector("#letterSubmit").addEventListener("click", letterCheck);
  document.querySelector("#wordSubmit").addEventListener("click", wordCheck);
}

// Validate user letter
function isCharValid(letter) {
  var valid = true;
  if ((letter.length < 1) || (letter.length > 1)) {
    valid = false;
  }
  else if ((letter.charCodeAt(0) < 97) || (letter.charCodeAt(0) > 122)) {
    valid = false;
  }
  return valid;
}

// Validate user word
function isWordValid(inputWord) {
  var valid = true;
  if (inputWord.length < 1) {
    valid = false;
  }
  else {
    for (var i = 0; i < inputWord.length; i++) {
      if ((inputWord.charCodeAt(i) < 97) || (inputWord.charCodeAt(i) > 122)) {
        if ((inputWord[i] != " ")&&(inputWord[i] != ".")&&(inputWord[i] != "'")&&(inputWord[i] != "-")) {
          valid = false;
        }
      }
    }
  }
  return valid;
}

// Analyze the user letter
function letterCheck() {
  var correct = false;
  var letter = document.querySelector("#letter").value.toLowerCase();
  if (isCharValid(letter)) {
    console.log("Input letter is " + letter);
    for (var i = 0; i < vocab.length; i++) {
      if (vocab[i] == letter) {
        if (word[i] != letter) {
            word = word.substring(0, i) + letter + word.substring(i + 1, word.length);
            correct = true;
            break;
        }
      }
    }
    if (correct) {
      document.querySelector("#inputFeedback").className = "success";
      if (word == vocab) {
        console.log("Win!");
        console.log("Game Over!");
        document.querySelector("#inputFeedback").innerHTML = "Win!";
        document.querySelector("#letterSubmit").disabled = true;
        document.querySelector("#wordSubmit").disabled = true;
        document.querySelector("#hanging").innerHTML = "<img src='img/p5.png' alt='Hangman Img'>";
      }
      else {
        console.log("Correct!");
        document.querySelector("#inputFeedback").innerHTML = "Correct!";
        document.querySelector("#letter").value = "";
      }
      console.log("Display is " + word);
      displayWord();
    }
    else {
      attempt++;
      console.log("Incorrect!");
      document.querySelector("#inputFeedback").className = "danger";
      if (attempt < 4) {
        document.querySelector("#inputFeedback").innerHTML = "Incorrect!";
        document.querySelector("#letter").value = "";
      }
      else {
        console.log("Lose!");
        console.log("Game Over!");
        document.querySelector("#inputFeedback").innerHTML = "Lose!";
        document.querySelector("#letterSubmit").disabled = true;
        document.querySelector("#wordSubmit").disabled = true;
        word = vocab;
        displayWord();
      }
      var pic = "";
      if (attempt == 1) {
        pic = "<img src='img/p1.png' 'alt='Hangman Img'>"; 
      }
      else if (attempt == 2) {
        pic = "<img src='img/p2.png' 'alt='Hangman Img'>";  
      }
      else if (attempt == 3) {
        pic = "<img src='img/p3.png' 'alt='Hangman Img'>";  
      }
      else if (attempt == 4) {
        pic = "<img src='img/p4.png' 'alt='Hangman Img'>";  
      }
      document.querySelector("#hanging").innerHTML = pic;
    }
  }
  else {
    console.log("Invalid letter!");
    document.querySelector("#inputFeedback").className = "danger";
    document.querySelector("#inputFeedback").innerHTML = "Invalid input!";
    document.querySelector("#letter").value = "";
  }
}

// Analyze the user word
function wordCheck() {
  var inputWord = document.querySelector("#word").value.toLowerCase();
  if (isWordValid(inputWord) == true) {
    console.log("Input word is " + inputWord);
    if (inputWord == vocab) {
      console.log("Win!");
      console.log("Game Over!");
      document.querySelector("#inputFeedback").className = "success";
      document.querySelector("#inputFeedback").innerHTML = "Win!";
      document.querySelector("#hanging").innerHTML = "<img src='img/p5.png' alt='Hangman Img'>";
    }
    else {
      console.log("Lose!");
      console.log("Game Over!");
      document.querySelector("#inputFeedback").className = "danger";
      document.querySelector("#inputFeedback").innerHTML = "Lose!";
      document.querySelector("#hanging").innerHTML = "<img src='img/p4.png' alt='Hangman Img'>";
    }
    document.querySelector("#letterSubmit").disabled = true;
    document.querySelector("#wordSubmit").disabled = true;
    word = vocab;
    displayWord();
  }
  else {
    console.log("Invalid word!");
    document.querySelector("#inputFeedback").className = "danger";
    document.querySelector("#inputFeedback").innerHTML = "Invalid input!";
    document.querySelector("#word").value = "";
  }
}
