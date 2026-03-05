// script_angular.js
/**
 * BIBLIOTECA: Gerencia a interação direta com o Angular
 */
const BIBLIOTECA = {
    _escopo: null,

    get escopo() {
        if (!this._escopo) {
            // Seletor genérico, ajuste para o seletor do seu app
            const elemento = document.querySelector('[ng-app]') || document.body;
            this._escopo = window.angular?.element(elemento).scope();
        }
        return this._escopo;
    },

    executarAcao(data) {
        const { acao, payload } = data;
        
        switch (acao) {
            case 'LER_QUANTIDADE':
                return { total: this.escopo?.listaItens?.length || 0 };
            case 'DEFINIR_PRECO':
                // Exemplo de manipulação e trigger de digest cycle
                this.escopo.$apply(() => {
                    this.escopo.preco = payload.valor;
                });
                return { status: 'sucesso' };
            default:
                return { erro: "Ação não reconhecida" };
        }
    }
};

/**
 * Listener de Mensagens (via CustomEvents)
 */
window.addEventListener("FROM_EXTENSION_POPUP", (event) => {
    const resposta = BIBLIOTECA.executarAcao(event.detail);
    
    // Devolve o resultado despachando outro evento
    window.dispatchEvent(new CustomEvent("FROM_PAGE_CONTEXT", {
        detail: { id: event.detail.id, response: resposta }
    }));
});