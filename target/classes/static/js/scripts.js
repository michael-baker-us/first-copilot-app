function pingServer() {
    fetch('/ping')
        .then(response => response.text())
        .then(data => {
            const pingResponse = document.getElementById('pingResponse');
            pingResponse.innerHTML = '<code>' + data + '</code>';
            pingResponse.style.display = 'block';
        })
        .catch(error => {
            const pingResponse = document.getElementById('pingResponse');
            pingResponse.innerHTML = '<code>Error: ' + error + '</code>';
            pingResponse.style.display = 'block';
        });
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
    .then(data => {
        const addResponse = document.getElementById('addResponse');
        addResponse.innerHTML = '<code>Added: ' + JSON.stringify(data) + '</code>';
        addResponse.style.display = 'block';
    })
    .catch(error => {
        const addResponse = document.getElementById('addResponse');
        addResponse.innerHTML = '<code>Error: ' + error + '</code>';
        addResponse.style.display = 'block';
    });
}

function readRecords() {
    fetch('/read')
        .then(response => response.json())
        .then(data => {
            const readResponse = document.getElementById('readResponse');
            readResponse.innerHTML = '<code>' + JSON.stringify(data, null, 2) + '</code>';
            readResponse.style.display = 'block';
        })
        .catch(error => {
            const readResponse = document.getElementById('readResponse');
            readResponse.innerHTML = '<code>Error: ' + error + '</code>';
            readResponse.style.display = 'block';
        });
}
