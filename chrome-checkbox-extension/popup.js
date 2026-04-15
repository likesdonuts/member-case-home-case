function setStatus(msg) {
  document.getElementById('status').textContent = msg;
}

async function runOnPage(fn, args) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const results = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: fn,
    args: args,
  });
  return results[0]?.result;
}

document.getElementById('checkAll').addEventListener('click', async () => {
  setStatus('Working…');
  const count = await runOnPage((checked) => {
    const boxes = document.querySelectorAll('input[type="checkbox"]');
    boxes.forEach((cb) => {
      if (cb.checked !== checked) {
        cb.click();
      }
    });
    return boxes.length;
  }, [true]);
  setStatus(count !== undefined ? `Checked ${count} checkbox(es).` : 'Done.');
});

document.getElementById('uncheckAll').addEventListener('click', async () => {
  setStatus('Working…');
  const count = await runOnPage((checked) => {
    const boxes = document.querySelectorAll('input[type="checkbox"]');
    boxes.forEach((cb) => {
      if (cb.checked !== checked) {
        cb.click();
      }
    });
    return boxes.length;
  }, [false]);
  setStatus(count !== undefined ? `Unchecked ${count} checkbox(es).` : 'Done.');
});
