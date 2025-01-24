function handleResponse(elementId, data, isError = false) {
    const responseElement = document.getElementById(elementId);
    responseElement.innerHTML = isError ? '<code>Error: ' + data + '</code>' : '<code>' + data + '</code>';
    responseElement.style.display = 'block';
}

function pingServer() {
    fetch('/ping')
        .then(response => response.text())
        .then(data => handleResponse('pingResponse', data))
        .catch(error => handleResponse('pingResponse', error, true));
}

function clearResponse() {
    const pingResponse = document.getElementById('pingResponse');
    pingResponse.innerHTML = '';
    pingResponse.style.display = 'none';
}

function addRecord() {
    const value = document.getElementById('recordInput').value;
    fetch('/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value: value })
    })
    .then(response => response.json())
    .then(data => handleResponse('addResponse', 'Added: ' + JSON.stringify(data)))
    .catch(error => handleResponse('addResponse', error, true));
}

function readRecords() {
    fetch('/read')
        .then(response => response.json())
        .then(data => handleResponse('readResponse', JSON.stringify(data, null, 2)))
        .catch(error => handleResponse('readResponse', error, true));
}
