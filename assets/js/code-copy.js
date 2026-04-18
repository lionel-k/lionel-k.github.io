/**
 * Adds a copy-to-clipboard control to fenced code blocks in posts and pages.
 * Targets .post-content and .page-content only — no per-post markup required.
 */
(function () {
  'use strict';

  var SELECTOR_ROOT = '.post-content, .page-content';
  var ATTR_BOUND = 'data-code-copy-bound';

  var COPY_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';

  var CHECK_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>';

  function getCodeText(pre) {
    var code = pre.querySelector('code');
    return code ? code.innerText : pre.innerText;
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try {
        if (document.execCommand('copy')) {
          resolve();
        } else {
          reject(new Error('copy failed'));
        }
      } finally {
        document.body.removeChild(ta);
      }
    });
  }

  function attachButton(wrapper, pre) {
    if (wrapper.getAttribute(ATTR_BOUND) === '1') {
      return;
    }
    wrapper.setAttribute(ATTR_BOUND, '1');
    wrapper.classList.add('code-block--copyable');

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'code-copy-button';
    btn.setAttribute('aria-label', 'Copy code to clipboard');
    btn.setAttribute('title', 'Copy');
    btn.innerHTML = COPY_SVG;

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var text = getCodeText(pre);
      copyToClipboard(text)
        .then(function () {
          btn.classList.add('code-copy-button--copied');
          btn.setAttribute('aria-label', 'Copied');
          btn.setAttribute('title', 'Copied');
          btn.innerHTML = CHECK_SVG;
          window.clearTimeout(btn._resetTimer);
          btn._resetTimer = window.setTimeout(function () {
            btn.classList.remove('code-copy-button--copied');
            btn.setAttribute('aria-label', 'Copy code to clipboard');
            btn.setAttribute('title', 'Copy');
            btn.innerHTML = COPY_SVG;
          }, 2000);
        })
        .catch(function () {
          btn.setAttribute('aria-label', 'Copy failed');
        });
    });

    wrapper.appendChild(btn);
  }

  function init() {
    var roots = document.querySelectorAll(SELECTOR_ROOT);
    if (!roots.length) {
      return;
    }

    roots.forEach(function (root) {
      root.querySelectorAll('.highlighter-rouge').forEach(function (wrapper) {
        var pre = wrapper.querySelector('pre.highlight');
        if (pre) {
          attachButton(wrapper, pre);
        }
      });

      root.querySelectorAll('pre:not(.highlight)').forEach(function (pre) {
        if (pre.closest('.highlighter-rouge')) {
          return;
        }
        if (pre.closest('.code-block--copyable')) {
          return;
        }
        var wrap = document.createElement('div');
        wrap.className = 'code-block--wrap-plain';
        pre.parentNode.insertBefore(wrap, pre);
        wrap.appendChild(pre);
        attachButton(wrap, pre);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
