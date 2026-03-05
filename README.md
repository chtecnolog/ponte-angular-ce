This library contains the basic scripts and functions to help connect a Chrome extension to a website using Angular.
This library also includes a minimalist extension example demonstrating its use.
To handle Angular objects, the content script must run in the "MAIN" context and not in isolation.
However, when running in the MAIN context, the popup loses visibility.
The solution is to communicate via messages using chrome.runtime.sendMessage, window.dispatchEvent, and window.addEventListener.
