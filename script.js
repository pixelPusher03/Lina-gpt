document.getElementById('textForm').addEventListener('submit', function(event) {
  event.preventDefault();
  var text = document.getElementById('textInput').value;
  generateImage(text);
});

function generateImage(text) {
  var xhr = new XMLHttpRequest();
  var url = 'https://koala.sh/api/images/'; // Use the image generation endpoint
  var data = {
    prompt: text, // Change "input" to "prompt" for image generation
    n: 1, // Number of images to generate (set to 1)
    size: "1024x1024" // Optional: Specify image size
  };
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        // Access the generated image URL from the response
        var imageUrl = response.images[0].url;
        // Update the output to display the image
        var outputElement = document.getElementById('output');
        outputElement.innerHTML = ""; // Clear previous text
        var image = document.createElement('img');
        image.src = imageUrl;
        outputElement.appendChild(image);
      } else {
        document.getElementById('output').innerText = 'Failed to generate image. Status code: ' + xhr.status;
      }
    }
  };
  xhr.send(JSON.stringify(data));
}
