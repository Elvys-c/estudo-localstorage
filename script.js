//indice para cada objeto gravado em disco
var key = localStorage.length;

//variavel de controle para registrar quando o localStorage é limpo 
var locaStorageIsNotEmpty =  (key === false) ? false : localStorage.length;

//objeto animal a ser gravado no disco
var animalObj = { tipo: '',
                  nome: '',
                  porte: ''
};

function showAllData(){
    
    //verifica se existe algum dado ha ser exibido, se existir recupera-os e mostra-os um por um
    if(locaStorageIsNotEmpty){
        for (let i = 0; i < localStorage.length; i++) {
            var tmpAnimal = JSON.parse(localStorage.getItem(i));
            console.log(tmpAnimal);
        }
    }else{
        console.log("Não há dados cadastrados!");
    }
}

function sendInputValue(){
    //pega o formulario e seus inputs
    var inputValue = document.querySelector('#formDados');
    
    //verifica se todos os campos do formulario foram preenchidos
    if (inputValue.inputTipoAnimal.value == '' ||
        inputValue.inputNome.value == '' ||
        inputValue.inputPorte.value == '') {
        
            alert("Por favor preencha todos os campos.");
    }else{
        
        //atribui o valor de cada input a um atributo do objeto animalObj
        animalObj.tipo = inputValue.inputTipoAnimal.value;
        animalObj.nome = inputValue.inputNome.value;
        animalObj.porte = inputValue.inputPorte.value;

        addToAnimalList(animalObj);

        //grava os dados no disco local
        localStorage.setItem(key++, JSON.stringify(animalObj));
        locaStorageIsNotEmpty = true;

        //limpa os inputs deixando-os em branco
        inputValue.inputTipoAnimal.value = '';
        inputValue.inputNome.value = '';
        document.querySelector('#'+inputValue.inputPorte.value.toLowerCase()).checked = false;
    }
}

function clearAllData(){
    
    //verifica se há dados para ser excluído
    if(locaStorageIsNotEmpty){

        clearAnimalList();
        localStorage.clear();
        locaStorageIsNotEmpty = false;
        console.log("Dados locais excluídos com sucesso!");
    
    }else{
        console.log("Não há dados para excluír.");
    }


}

function addToAnimalList(animal){
    
    // pego cada coluna e seus respectivos filhos
    var colunaTipo = document.querySelector('#coluna-tipo');
    var colunaNome = document.querySelector('#coluna-nome');
    var colunaPorte = document.querySelector('#coluna-porte');
    
    // cria novas divs há serem acrescentadas nas colunas já existentes
    var divTipo = document.createElement("div");
    var divNome = document.createElement("div");
    var divPorte = document.createElement("div");

    // preencho o interior das novas divs com os dados recebidos dos inputs
    divTipo.innerHTML = animal.tipo;
    divNome.innerHTML = animal.nome;
    divPorte.innerHTML = animal.porte;

    // acrescenta cada div nova no HTML da coluna a direita
    colunaTipo.appendChild(divTipo);
    colunaNome.appendChild(divNome);
    colunaPorte.appendChild(divPorte);
}

function clearAnimalList(){

    // Remove todas as divs filhas
    var divTipo = document.querySelector('#coluna-tipo');
    var divNome = document.querySelector('#coluna-nome');
    var divPorte = document.querySelector('#coluna-porte');
    
    while (divTipo.firstChild) {
        divTipo.removeChild(divTipo.firstChild);
        divNome.removeChild(divNome.firstChild);
        divPorte.removeChild(divPorte.firstChild);
    }
}

function feedColumns(){

    // se houver algo no localStorage preenche as colunas quando termina de carregar a pagina
    if(locaStorageIsNotEmpty){
        for (let i = 0; i < localStorage.length; i++) {
            var animal = JSON.parse(localStorage.getItem(i));
            addToAnimalList(animal);
        }
    }
}