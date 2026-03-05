// ponte.js
export class PonteAngularExtensao {	
    static async enviarMensagem(acao, carga = {}) {
        return new Promise((resolver) => {
            chrome.runtime.sendMessage({ acao, carga }, (resposta) => {
                resolver(resposta);
            });
        });
    }

    static async lerQuantidadeItensDoCarrinho() {
        return await this.enviarMensagem('LER_QTD_CARRINHO');
    }
}
