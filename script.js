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
    let champData = `https://ddragon.leagueoflegends.com/cdn/14.8.1/data/pt_BR/champion.json`
    const response = await fetch(champData)
    champList = await response.json()
    return champList.data
}

// Função para criar os Cards
const CreatCards = async function (champListJSON) {
    let divCard = document.getElementById('divCard')

    champListJSON.forEach(function (champion) {
        // div corpo do card
        let divCardBox = document.createElement('div')

        // elementos pai, para conter o conteúdo do card
        let nameBox = document.createElement('h1')
        let splashArtBox = document.createElement('figure')
        let titleBox = document.createElement('div')
        let nameTitleBox = document.createElement('div')

        // elementos filho 
        let textName = document.createTextNode(champion.name)
        let splashArt = document.createElement('img')
        let title = document.createTextNode(champion.title)

        //adicionando atributos no HTML
        divCardBox.setAttribute('class', 'card_box')
        nameBox.setAttribute('class', 'name_box')
        splashArtBox.setAttribute('class', 'art_box')
        titleBox.setAttribute('class', 'title_box')
        splashArt.setAttribute('src', `https://cdn.communitydragon.org/14.8.1/champion/${champion.id}/tile`)
        nameTitleBox.setAttribute('class', 'name_titleBox')


        // alocando as divs dentro das respectivas divs pai
        divCard.appendChild(divCardBox)
        divCardBox.appendChild(splashArtBox)
        splashArtBox.appendChild(splashArt)
        nameBox.appendChild(textName)
        titleBox.appendChild(title)
        nameTitleBox.appendChild(nameBox)
        nameTitleBox.appendChild(titleBox)
        divCardBox.appendChild(nameTitleBox)


        // Adicionando evento de clique a cada card
        divCardBox.addEventListener('click', function () {
            // Exibir o modal com os detalhes do campeão
            displayModal(champion)
        });
    })
}
// Função de callback para criar os cards quando a janela carregar
window.addEventListener('load', async function () {
    const champListJSON = await getChampionData()
    await CreatCards(Object.values(champListJSON))

})

// Função para exibir o modal com os detalhes do campeão
function displayModal(champion) {
    var popup = document.getElementById("popup");
    var modalContent = document.getElementById("popupContent");

    // Preencher o conteúdo do modal com os detalhes do campeão
    modalContent.innerHTML = `
        
        <img src="https://cdn.communitydragon.org/14.8.1/champion/${champion.id}/splash-art" alt="${champion.name}" >
        <div class="popupText">
        <h2>${champion.name}</h2>
        <h3>${champion.title}</h3>
        <p>${champion.blurb}</p>
        <h4>Tags: ${champion.tags.join(', ')}</h4>
        <span>Dificuldade: ${champion.info.difficulty}</span>
        </div>`;

    // Exibir o modal
    popup.style.display = "block";
}



// Função para fechar o modal quando o usuário clicar fora dele
window.onclick = function (event) {
    var popup = document.getElementById("popup");
    if (event.target == popup) {
        popup.style.display = "none";
    }
}

