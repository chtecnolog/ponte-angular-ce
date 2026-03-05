//background.js
chrome.runtime.onMessage.addListener((mensagem, remetente, responder) => {
    // Encaminha a mensagem para o Content Script da aba ativa
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: (msg) => {
                    // Cria uma Promise para esperar a resposta do contexto MAIN
                    return new Promise((resolver) => {
                        const requestId = Math.random().toString(36);
                        
                        const recebedor = (evento) => {
                            if (evento.detail.id === requestId) {
                                window.removeEventListener("VEM_DA_PAGINA", recebedor);
                                resolver(evento.detail.resposta);
                            }
                        };
                        
                        window.addEventListener("VEM_DA_PAGINA", recebedor);
                        window.dispatchEvent(new CustomEvent("VEM_DO_POPUP", {
                            detail: { ...msg, id: requestId }
                        }));
                    });
                },
                args: [mensagem],
                world: "MAIN" // Garante que a execução de ponte ocorra no MAIN
            }).then(resultados => {
                responder(resultados[0].result);
            });
        }
    });
    return true; // Mantém o canal aberto para resposta assíncrona
});