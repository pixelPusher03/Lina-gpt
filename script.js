        document.getElementById('textForm').addEventListener('submit', function(event) {
            event.preventDefault();
            var text = document.getElementById('textInput').value;
            generateText(text);
        });

        function generateText(text) {
            var xhr = new XMLHttpRequest();
            var url = 'https://koala.sh/api/gpt/';
            var data = {
                input: '/dream ' + text,
                inputHistory: [],
                outputHistory: [],
                model: 'gpt-3.5-turbo'
            };
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        document.getElementById('output').innerText = xhr.responseText;
                    } else {
                        document.getElementById('output').innerText = 'Failed to get result. Status code: ' + xhr.status;
                    }
                }
            };
            xhr.send(JSON.stringify(data));
        }