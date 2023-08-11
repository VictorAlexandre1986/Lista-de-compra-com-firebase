import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings={
    databaseURL:"https://carrinho-de-compra-cbb58-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itensInDB = ref(database, "itens")

console.log(app);

const inputElemento = document.querySelector('#input_field');
const buttonElemento = document.querySelector('#add_button');
const listElemento = document.querySelector('#carrinho-list');

buttonElemento.addEventListener('click',()=>{
    let inputValue = inputElemento.value;
    
    push(itensInDB, inputValue);
     
    //Limpando o input
    clearInput();

})

//Essa função é executada sempre que tem uma mudança no banco de dados
onValue(itensInDB, (snapshot)=>{

    //É necessário verificar se o banco não está vazio
    if(snapshot.exists()){
    //Convertendo objetos em um array somente com valores
    let itensArray = Object.entries(snapshot.val());

     
    limparLista();
    
    //Limpando o input
    clearInput();

    itensArray.forEach((item)=>{
        //Inserindo na lista html
        inserirConteudo(item);
    })
    }else{
        //Caso esteja vazio exibe essa mensagem
        listElemento.innerHTML="A lista está vazia";
    }

})



function limparLista(){
  //Limpando para não duplicar em caso de alteração de dados
  listElemento.innerHTML = ""
}

function clearInput(){
    inputElemento.value = "";
}

function inserirConteudo(inputValue){

    let indice = inputValue[0];
    let valor = inputValue[1];
    
    let novoElemento = document.createElement("li");

    novoElemento.textContent = valor

    listElemento.appendChild(novoElemento)

    novoElemento.addEventListener('dblclick',()=>{
        let localizacaoItemNoBanco = ref(database, `itens/${indice}`);

        remove(localizacaoItemNoBanco);
    })
}