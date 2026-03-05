// popup.js
class AngularExtensionBridge {
    static async enviarMensagem(acao, payload = {}) {
        return new Promise((resolve) => {
            chrome.runtime.sendMessage({ acao, payload }, (response) => {
                resolve(response);
            });
        });
    }

    static async lerQuantidadeItens() {
        return await this.enviarMensagem('LER_QUANTIDADE');
    }

    static async definirPreco(valor) {
        return await this.enviarMensagem('DEFINIR_PRECO', { valor });
    }
}

// Inicialização e UI
document.addEventListener('DOMContentLoaded', () => {
    const btnLer = document.getElementById('btnLer');
    const display = document.getElementById('resultado');

    btnLer.addEventListener('click', async () => {
        const res = await AngularExtensionBridge.lerQuantidadeItens();
        display.innerText = `Itens: ${res.total}`;
    });
});