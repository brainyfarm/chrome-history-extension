const clearHistoryButton = document.getElementById('clear-history-button');
const timeFrameSelect = document.getElementById('time-frame');
const keywordInput = document.getElementById('keyword-input');
const statusMessage = document.getElementById('status-message');
const closeIcon = document.getElementById('close-icon');

const timeFrameInMilliseconds = () => {
  const timeFrame = timeFrameSelect.value;
  return timeFrame * 60 * 60 * 1000;
};

timeFrameSelect.addEventListener('change', () => {

  const selectedOption = timeFrameSelect.options[timeFrameSelect.selectedIndex].text;
  document.getElementById('selected-duration').innerText = selectedOption;
});


clearHistoryButton.addEventListener('click', () => {
  const keyword = keywordInput.value;

  const timeFrame = timeFrameInMilliseconds();

  chrome.history.search({
    text: keyword || '',
    startTime: Date.now() - timeFrame,
    endTime: Date.now(),
    maxResults: 0,
  }, (historyItems) => {
    const numberOfHistoryItems = historyItems.length

    historyItems.forEach(historyItem => {
      chrome.history.deleteUrl({
        url: historyItem.url
      });
    });

    statusMessage.innerHTML = numberOfHistoryItems + ' items deleted';
    statusMessage.classList.add('success');
  });
});

// Add event listener to close this chrome extension 
closeIcon.addEventListener('click', () => {
  window.close();
})

