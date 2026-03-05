//background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Encaminha a mensagem para o Content Script da aba ativa
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: (msg) => {
                    // Cria uma Promise para esperar a resposta do contexto MAIN
                    return new Promise((resolve) => {
                        const requestId = Math.random().toString(36);
                        
                        const handler = (e) => {
                            if (e.detail.id === requestId) {
                                window.removeEventListener("FROM_PAGE_CONTEXT", handler);
                                resolve(e.detail.response);
                            }
                        };
                        
                        window.addEventListener("FROM_PAGE_CONTEXT", handler);
                        window.dispatchEvent(new CustomEvent("FROM_EXTENSION_POPUP", {
                            detail: { ...msg, id: requestId }
                        }));
                    });
                },
                args: [message],
                world: "MAIN" // Garante que a execução de ponte ocorra no MAIN
            }).then(results => {
                sendResponse(results[0].result);
            });
        }
    });
    return true; // Mantém o canal aberto para resposta assíncrona
});