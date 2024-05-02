let champList = [];

//Search bar
const search = document.getElementById("search")
search.addEventListener('keyup', (e) => {
    const searchString = e.target.value
    const filteredChampions = champList.filter((champion) => {
        return champion.name.includes(searchString)
    })
    console.log(filteredChampions)
})


// Função para consumir os dados da API 
const getChampionData = async function () {
    let champData = `https://ddragon.leagueoflegends.com/cdn/14.9.1/data/pt_BR/champion.json`
    const response = await fetch(champData)
    champList = await response.json()
    return champList.data
}

// Função para criar os Cards
const CreateCards = async function (champListJSON, searchTerm = '') {
    let divCard = document.getElementById('divCard')
    
    //propriedade para limpar a div container durante o filtro
     divCard.innerHTML = ''
    
    let filteredChampions = champListJSON
    if (searchTerm !== ''){
        filteredChampions = filterChampions(champListJSON,searchTerm)
    }

    //forEach para criação automatizada dos cards
    champListJSON.forEach(function (champion) {
        // Div corpo do card
        let divCardBox = document.createElement('div')

        // Containers
        let nameBox = document.createElement('h1')
        let splashArtBox = document.createElement('figure')
        let titleBox = document.createElement('div')
        let nameTitleBox = document.createElement('div')

        // Elementos filho 
        let textName = document.createTextNode(champion.name)
        let splashArt = document.createElement('img')
        let title = document.createTextNode(champion.title)

        //Adicionando atributos no HTML
        divCardBox.setAttribute('class', 'card_box')
        nameBox.setAttribute('class', 'name_box')
        splashArtBox.setAttribute('class', 'art_box')
        titleBox.setAttribute('class', 'title_box')
        splashArt.setAttribute('src', `https://cdn.communitydragon.org/14.8.1/champion/${champion.id}/tile`)
        nameTitleBox.setAttribute('class', 'name_titleBox')


        // Alocando as divs dentro dos respectivos containers
        divCard.appendChild(divCardBox)
        divCardBox.appendChild(splashArtBox)
        divCardBox.appendChild(nameTitleBox)
        splashArtBox.appendChild(splashArt)
        nameTitleBox.appendChild(nameBox)
        nameTitleBox.appendChild(titleBox)
        nameBox.appendChild(textName)
        titleBox.appendChild(title)


        // Adicionando evento de clique a cada card para que exiba o pop-up com detalhes
        divCardBox.addEventListener('click', function () {
            displayModal(champion)
        });
    })
}

// Função para exibir o pop-up com os detalhes do campeão
async function  displayModal(champion) {
    var popup = document.getElementById("popup");
    var modalContent = document.getElementById("popupContent");
    var background = document.getElementById("divCard");
    

    // Preencher o conteúdo do pop-up com os detalhes do campeão
    modalContent.innerHTML = `
        
        <img src="https://cdn.communitydragon.org/14.8.1/champion/${champion.id}/splash-art" alt="${champion.name}" >
        <div class="popupText">
        <h2>${champion.name}</h2>
        <h3>${champion.title}</h3>
        <p id= "lore"></p>
        <h4>Tags: ${champion.tags.join(', ')}</h4>
        <span>Dificuldade: ${champion.info.difficulty}</span>
        </div>
        `;

    // Exibir o pop-up
    popup.style.display = "block";
    // Adciona um filtro nos cards ao fundo
    background.style.filter  = "brightness(40%) blur(4px)"

    // Fetch em outra url para trazer a lore completa do campeão
    const loreUrl = `https://ddragon.leagueoflegends.com/cdn/14.8.1/data/pt_BR/champion/${champion.id}.json`;
    
        const response = await fetch(loreUrl);
        const data = await response.json();
        const lore = data.data[champion.id].lore;
        document.getElementById("lore").innerText = lore;
}

// Função para fechar o pop-up quando o usuário clicar fora dele
window.onclick = function (event) {
    var popup = document.getElementById("popup");
    var background = document.getElementById("divCard")
    if (event.target == popup) {
        popup.style.display = "none";
        
        //remove o filtro dos cards
        background.style.filter  = "brightness(100%) blur(0px)"
    }
}

// Função de callback para criar os cards quando a janela carregar
window.addEventListener('load', async function () {
    const champListJSON = await getChampionData()
    await CreateCards(Object.values(champListJSON))

    //evento de imput na barra de pesquisa
    const searchBar = document.getElementById('search');
    searchBar.addEventListener('input',function(){
        const searchTerm = searchBar.value.toLowerCase()
        const filteredChampions = Object.values(champListJSON).filter(champion => {
          return champion.name.toLowerCase().includes(searchTerm)})

        CreateCards(filteredChampions)
    })
})
