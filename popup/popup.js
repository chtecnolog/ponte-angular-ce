//<script src="popup.js" type="module"></script>
//usar modulo no html para poder importar a ponte OU copiar o conteúdo do arquivo ponte.js
import {PonteAngularExtensao} from "../ponte.js";
// Inicialização e UI
document.addEventListener('DOMContentLoaded', () => {
    const btnLer = document.getElementById('btnLer');
    const display = document.getElementById('resultado');

    btnLer.addEventListener('click', async () => {
        const res = await PonteAngularExtensao.lerQuantidadeItensDoCarrinho();
        display.innerText = `Total: ${res.qtdCarrinho}`;
    });
});