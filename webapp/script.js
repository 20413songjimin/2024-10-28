let votes = {};
let topic = '';
let previousResults = [];
let topicCount = {};

function setTopic() {
    const newTopic = document.getElementById('topic').value;
    if (newTopic) {
        if (!topicCount[newTopic]) {
            topicCount[newTopic] = 0;
        } else {
            topicCount[newTopic]++;
        }

        topic = newTopic + (topicCount[newTopic] > 0 ? ` (${topicCount[newTopic]})` : '');
        document.getElementById('displayedTopic').innerText = topic;
        document.getElementById('topicDisplay').style.display = 'flex';
        document.getElementById('endVotingButton').style.display = 'inline-block';
        document.getElementById('resetVoteButton').style.display = 'inline-block';
        document.getElementById('optionsContainer').innerHTML = '';
        document.getElementById('results').innerHTML = '';
        votes = {};
    } else {
        alert("투표 주제를 입력해주세요.");
    }
}

function addOption() {
    const option = document.getElementById('option').value.trim();
    if (option) {
        if (!votes.hasOwnProperty(option)) {
            votes[option] = 0;
            const optionElement = document.createElement('div');
            optionElement.className = 'option-container';
            optionElement.innerHTML = `
                <input type="radio" id="${option}" name="voteOption" value="${option}">
                <label for="${option}">${option}</label>
                <button class="delete-button" onclick="removeOption('${option}')">삭제</button>
            `;
            document.getElementById('optionsContainer').appendChild(optionElement);
            document.getElementById('option').value = '';
        } else {
            alert("이미 추가된 후보입니다.");
        }
    } else {
        alert("후보 선택지를 입력해주세요.");
    }
}

function removeOption(option) {
    delete votes[option];
    const optionElements = document.querySelectorAll('#optionsContainer div');
    optionElements.forEach(element => {
        if (element.querySelector('label').innerText === option) {
            element.remove();
        }
    });
}

function submitVote() {
    const selectedOption = document.querySelector('input[name="voteOption"]:checked');
    if (selectedOption) {
        votes[selectedOption.value]++;
        displayResults();
    } else {
        alert("투표할 후보를 선택해주세요.");
    }
}

function displayResults() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<h2>투표 결과</h2>';
    for (const option in votes) {
        resultsDiv.innerHTML += `<p>${option}: ${votes[option]}표</p>`;
    }
}

function endVoting() {
    if (Object.keys(votes).length === 0) {
        alert("투표가 진행되지 않았습니다.");
        return;
    }
    
    const sortedVotes = Object.entries(votes).sort((a, b) => b[1] - a[1]);
    const rankedResults = {};
    sortedVotes.forEach(([option, count], index) => {
        rankedResults[option] = { count, rank: index + 1 };
    });

    previousResults.push({ topic: topic, votes: rankedResults });
    document.getElementById('optionsContainer').innerHTML = '';
    document.getElementById('results').innerHTML = '<h2>투표가 종료되었습니다.</h2>';
    displayPreviousResults();
}

function displayPreviousResults() {
    const previousResultsDiv = document.getElementById('previousResultsContent');
    previousResultsDiv.innerHTML = '';
    previousResults.forEach((result) => {
        previousResultsDiv.innerHTML += `<h3>${result.topic}</h3>`;
        for (const option in result.votes) {
            previousResultsDiv.innerHTML += `<p>${result.votes[option].rank}위: ${option} - ${result.votes[option].count}표</p>`;
        }
    });
}

function clearPreviousResults() {
    previousResults = [];
    document.getElementById('previousResultsContent').innerHTML = '<h2>이전 결과가 지워졌습니다.</h2>';
}

function resetVote() {
    votes = {};
    document.getElementById('optionsContainer').innerHTML = '';
    document.getElementById('results').innerHTML = '';
    alert("투표가 초기화되었습니다.");
}
