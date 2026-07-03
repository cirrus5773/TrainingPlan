(function () {
  function createFallbackId() {
    return Date.now() + '-' + Math.random().toString(36).slice(2, 10);
  }

  function applyDialogFallbackStyles(dialog) {
    dialog.style.position = 'fixed';
    dialog.style.left = '50%';
    dialog.style.top = '50%';
    dialog.style.transform = 'translate(-50%, -50%)';
    dialog.style.zIndex = '30';
    dialog.style.display = 'block';
    dialog.style.maxHeight = 'calc(100vh - 24px)';
    dialog.style.overflow = 'auto';
  }

  function clearDialogFallbackStyles(dialog) {
    dialog.style.position = '';
    dialog.style.left = '';
    dialog.style.top = '';
    dialog.style.transform = '';
    dialog.style.zIndex = '';
    dialog.style.display = '';
    dialog.style.maxHeight = '';
    dialog.style.overflow = '';
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
          applyDialogFallbackStyles(dialog);
        };
      }
      if (typeof dialog.close !== 'function') {
        dialog.close = function () {
          dialog.removeAttribute('open');
          dialog.classList.remove('fallback-open');
          clearDialogFallbackStyles(dialog);
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
