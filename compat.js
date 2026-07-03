(function () {
  function createFallbackId() {
    return Date.now() + '-' + Math.random().toString(36).slice(2, 10);
  }

  try {
    if (window.crypto && typeof window.crypto.randomUUID !== 'function') {
      Object.defineProperty(window.crypto, 'randomUUID', {
        configurable: true,
        value: createFallbackId
      });
    }
  } catch (_error) {
    window.__createFallbackId = createFallbackId;
  }

  window.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('dialog').forEach(function (dialog) {
      if (typeof dialog.showModal !== 'function') {
        dialog.showModal = function () {
          dialog.setAttribute('open', '');
          dialog.classList.add('fallback-open');
        };
      }
      if (typeof dialog.close !== 'function') {
        dialog.close = function () {
          dialog.removeAttribute('open');
          dialog.classList.remove('fallback-open');
        };
      }
    });

    document.querySelectorAll('dialog button[value="default"]').forEach(function (button) {
      button.addEventListener('click', function (event) {
        var dialog = button.closest('dialog');
        if (dialog && typeof dialog.close === 'function') {
          event.preventDefault();
          dialog.close();
        }
      });
    });
  });
})();
