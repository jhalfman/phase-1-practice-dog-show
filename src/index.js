document.addEventListener('DOMContentLoaded', () => {
    
    fetch(`http://localhost:3000/dogs`)
    .then(resp => resp.json())
    .then(data => data.forEach(dog => {
        const tableBody = document.querySelector("#table-body");
        const newDog = document.createElement("tr");
        newDog.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button>DOG EDIT</button></td>
        `
        const editButton = newDog.querySelector("button");
        editButton.addEventListener("click", e => {
            const dogForm = document.querySelector("#dog-form");
            dogForm.name.value = dog.name;
            dogForm.breed.value = dog.breed;
            dogForm.sex.value = dog.sex;

            
            dogForm.addEventListener("submit", (e) => {
            e.preventDefault();
        
            const updateDog = {};
            updateDog.name = e.target.name.value;
            updateDog.breed = e.target.breed.value;
            updateDog.sex = e.target.sex.value;

            fetch(`http://localhost:3000/dogs/${dog.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateDog)
            })

            tableBody.innerHTML = '';
            fetch(`http://localhost:3000/dogs`)
        .then(resp => resp.json())
        .then(data => data.forEach(dog => {
        const tableBody = document.querySelector("#table-body");
        const newDog = document.createElement("tr");
        newDog.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button>DOG EDIT</button></td>
        `
        tableBody.appendChild(newDog);
        }))
            e.target.reset();
        })

        })
        tableBody.appendChild(newDog);
    }));

    
})