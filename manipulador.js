// script_angular.js
/**
 * ManipuladorAngular: Gerencia a interação direta com o Angular
 */
const ManipuladorAngular = {
	seletorElementoAngularHTML: '[ui-view="page-content"].ng-scope',
    _escopo: null,

    get escopo() {
        if (!this._escopo) {
            // Seletor genérico, ajuste para o seletor do seu app
            const elementoDoAngular = document.querySelector(this.seletorElementoAngularHTML);
            this._escopo = window.angular?.element(elementoDoAngular).scope();
        }
        return this._escopo;
    },
}
/**
 * FUNC_LIB: Exemplo de como usar funções personalizadas para lidar com o angular
 */
const FUNC_LIB = {
    executarAcao(dados) {
        const { acao, carga } = dados;
        
		if(!this[acao](carga)) {
			return { erro: 'Ação não reconhecida' };
		};
        return this[acao](carga);
    },
	
	LER_QTD_CARRINHO() {
		return { qtdCarrinho: ManipuladorAngular.escopo?.qtdApostasCarrinho || 0 };
	},
	
};

/**
 * Listener de Mensagens (via CustomEvents)
 */
window.addEventListener("VEM_DO_POPUP", (evento) => {
    window.dispatchEvent(new CustomEvent("VEM_DA_PAGINA", {
        detail: { id: evento.detail.id, resposta: FUNC_LIB.executarAcao(evento.detail) }
    }));
});