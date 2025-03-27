document.addEventListener("DOMContentLoaded", () => {
    const monsterContainer = document.getElementById("monster-container");
    const createMonsterForm = document.getElementById("create-monster-form");
    const loadMoreButton = document.getElementById("load-more");
    let page = 1;
    const limit = 50;

    // Fetch and display monsters
    function fetchMonsters(page) {
        fetch(`http://localhost:3000/monsters?_limit=${limit}&_page=${page}`)
            .then(response => response.json())
            .then(monsters => {
                monsters.forEach(monster => displayMonster(monster));
            });
    }

    // Display a single monster
    function displayMonster(monster) {
        const monsterDiv = document.createElement("div");
        monsterDiv.innerHTML = `
            <h3>${monster.name}</h3>
            <p>Age: ${monster.age}</p>
            <p>Description: ${monster.description}</p>
            <hr>
        `;
        monsterContainer.appendChild(monsterDiv);
    }

    // Handle new monster creation
    createMonsterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const description = document.getElementById("description").value;

        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ name, age: parseFloat(age), description })
        })
        .then(response => response.json())
        .then(newMonster => {
            displayMonster(newMonster);
            createMonsterForm.reset();
        });
    });

    // Load more monsters on button click
    loadMoreButton.addEventListener("click", () => {
        page++;
        fetchMonsters(page);
    });

    // Initial fetch of monsters
    fetchMonsters(page);
});
