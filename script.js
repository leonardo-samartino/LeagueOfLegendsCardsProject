// Função para consumir os dados da API 
const getChampionData = async function () {
    let champData = `https://ddragon.leagueoflegends.com/cdn/14.8.1/data/pt_BR/champion.json`
    const response = await fetch(champData)
    const champList = await response.json()
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
        let loreBox = document.createElement('p')
        let classBox = document.createElement('h3')
        let diffBox = document.createElement('span')

        // elementos filho 
        let textName = document.createTextNode(champion.name)
        let splashArt = document.createElement('img')
        let title = document.createTextNode(champion.title)
        let lore = document.createTextNode(champion.blurb)
        let classeTag = document.createTextNode(champion.tags)
        let difficulty = document.createTextNode(champion.info.difficulty)

        //adicionando atributos no HTML
        divCardBox.setAttribute('class', 'card_box')
        nameBox.setAttribute('class', 'name_box')
        splashArtBox.setAttribute('class', 'art_box')
        titleBox.setAttribute('class', 'title_box')
        loreBox.setAttribute('class', 'lore_box')
        splashArt.setAttribute('src', `https://cdn.communitydragon.org/14.8.1/champion/${champion.id}/splash-art`)
        classBox.setAttribute('class', 'class_box')
        diffBox.setAttribute('class', 'diff_box')


        // alocando as divs dentro das respectivas divs pai
        divCard.appendChild(divCardBox)
        divCardBox.appendChild(splashArtBox)
        splashArtBox.appendChild(splashArt)
        divCardBox.appendChild(diffBox)
        // diffBox.appendChild(difficulty)
        divCardBox.appendChild(classBox)
        //classBox.appendChild(classeTag)
        // divCardBox.appendChild(loreBox)
        // loreBox.appendChild(lore)
        divCardBox.appendChild(nameBox)
        nameBox.appendChild(textName)
        titleBox.appendChild(title)
        divCardBox.appendChild(titleBox)

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
        
        <img style= width: fit-content src="https://cdn.communitydragon.org/14.8.1/champion/${champion.id}/splash-art" alt="${champion.name}" >
        <h2>${champion.name}</h2>
        <h3>${champion.title}</h3>
        <p>${champion.blurb}</p>
        <h4>Tags: ${champion.tags.join(', ')}</h4>
        <span>Dificuldade: ${champion.info.difficulty}</span>`;

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


