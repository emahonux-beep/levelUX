(function () {
  const STORAGE_KEY = 'levelux-figma-actually-progress';
  const TOTAL = 10;
  const currentLesson = Number(document.currentScript.dataset.lessonIndex);

  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }

  function saveProgress(completed) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(completed)); } catch {}
  }

  function updateUI(completed) {
    const count = completed.length;
    document.getElementById('progress-count').textContent = count + ' / ' + TOTAL;
    document.getElementById('progress-fill').style.width = Math.round((count / TOTAL) * 100) + '%';

    for (let i = 0; i < TOTAL; i++) {
      const cb = document.getElementById('complete-' + i);
      const label = document.getElementById('complete-' + i + '-label');
      const check = document.getElementById('check-' + i);
      const lesson = document.querySelector('[data-lesson="' + i + '"]');
      const done = completed.includes(i);
      if (cb) cb.checked = done;
      if (label) label.classList.toggle('done', done);
      if (done) {
        if (check) check.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
        if (lesson) lesson.classList.add('completed');
      } else {
        if (check) check.innerHTML = '';
        if (lesson) lesson.classList.remove('completed');
      }
    }
  }

  window.markComplete = function (index) {
    let completed = loadProgress();
    const cb = document.getElementById('complete-' + index);
    if (cb && cb.checked) {
      if (!completed.includes(index)) completed.push(index);
    } else {
      completed = completed.filter(i => i !== index);
    }
    saveProgress(completed);
    updateUI(completed);
  };

  window.resetProgress = function () {
    saveProgress([]);
    updateUI([]);
  };

  updateUI(loadProgress());
})();
