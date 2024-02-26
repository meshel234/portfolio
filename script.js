// Function to copy text
function copyText(elementId) {
    var textArea = document.getElementById(elementId);
    textArea.select();
    document.execCommand("copy");
    alert("Copied to clipboard!");
  }
  // Function to speak text with responsive speech rate
  function toSpeechText(elementId) {
    var text = document.getElementById(elementId).value;
    var speech = new SpeechSynthesisUtterance(text);
    
    // Calculate speech rate based on text length
    var length = text.split(" ").length; // Split text into words and count them
    var rate = 1; // Default rate
    if (length > 50) {
      rate = 0.7; // Slow speech rate for longer texts
    } else if (length < 10) {
      rate = 1.5; // Fast speech rate for shorter texts
    }
    
    speech.rate = rate; // Set speech rate
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  }
  // Function to share text
  function shareText(elementId) {
    var text = document.getElementById(elementId).value;
    // Check if the Web Share API is supported
    if (navigator.share) {
      navigator.share({
        title: 'Shared Text',
        text: text
      }).then(() => {
        alert('Text shared successfully!');
      }).catch((error) => {
        console.error('Error sharing text:', error);
        alert('Failed to share text.');
      });
    } else {
      // Fallback for browsers that do not support the Web Share API
      alert('Web Share API is not supported in this browser.');
    }
  }
  // Function to save text
  function saveText(elementId) {
    var text = document.getElementById(elementId).value;
    var list = document.getElementById('savedList');
    var listItem = document.createElement('li');
    listItem.textContent = text;
    list.appendChild(listItem);
    alert("Translation saved!");
  }
  // Function to show translation history
  function showHistory() {
    var history = ['Translation 1', 'Translation 2', 'Translation 3']; // Example history data
    var list = document.getElementById('historyList');
    list.innerHTML = ''; // Clear existing list
    history.forEach(function(item) {
      var listItem = document.createElement('li');
      listItem.textContent = item;
      list.appendChild(listItem);
    });
  }
  // Function to save translation history
  function saveHistory() {
    var history = ['Translation 1', 'Translation 2', 'Translation 3']; // Example history data
    var list = document.getElementById('savedList');
    history.forEach(function(item) {
      var listItem = document.createElement('li');
      listItem.textContent = item;
      list.appendChild(listItem);
    });
    alert("History saved!");
  }
  function toggleMode() {
    document.body.classList.toggle('dark-mode');
  }
  // Function to translate text using MyMemory Translation API
  async function translateInput() {
    const inputText = document.getElementById('inputText').value;
    const translatedText = await translateText(inputText, 'en', 'ko');
    document.getElementById('outputText').value = translatedText;
  }
  // Function to translate text using MyMemory Translation API
  async function translateText(text, translateFrom, translateTo) {
    const apiUrl = https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${translateFrom}|${translateTo};
    
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (data.responseStatus === 200) {
        return data.responseData.translatedText;
      } else {
        throw new Error(data.responseDetails);
      }
    } catch (error) {
      console.error('Translation error:', error);
      return 'Translation failed. Please try again later.';
    }
  }