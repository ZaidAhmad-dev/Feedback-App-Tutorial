let feedbackHeader = document.getElementById("feedback-header");
let totalFeedbacks = document.getElementById("feedbacks");
let addFeedbackBtn = document.getElementById("add-feedback-button");
let feedbackList = document.getElementById("feedback-list")
let editBtn = document.getElementById("edit-button")
let deleteBtn = document.getElementById("delete-button")
let nameInput = document.getElementById("name")
let titleInput = document.getElementById("title")
let textareaInput = document.getElementById("text")
let addBtn = document.getElementById("add-button")
let cancelBtn = document.getElementById("cancel-button")
let modal =  document.getElementById("add-feedback-modal")

totalFeedbacks.innerHTML = localStorage.length;

let feedback = {
};

addFeedbackBtn.addEventListener("click", () => {
    modal.style.display= "block";

    feedbackHeader.style.display = "none"
    feedbackList.style.display = "none";
})

cancelBtn.addEventListener("click", () => {
    modal.style.display= "none";

    feedbackHeader.style.display = "flex"
    feedbackList.style.display = "block";
})

addBtn.addEventListener("click", () => {

    feedback.name =  nameInput.value    ;
    feedback.title = titleInput.value   ; 
    feedback.text =  textareaInput.value;

    let id =  Math.floor(Math.random() * 100);
    feedback.id = id;

    nameInput.value = "";
    titleInput.value = "";
    textareaInput.value = "";

    modal.style.display = "none";
    feedbackHeader.style.display = "flex";
    feedbackList.style.display = "block";

    localStorage.setItem(id, JSON.stringify(feedback));

    window.location.reload();

})

showFeedback();

function showFeedback(){
    let feedbacks = localStorage;

    for(let i = 0 ; i<feedbacks.length; i++){
        // getting the feedback object from local storage
        let feedback = JSON.parse(localStorage.getItem(feedbacks.key(i)));

        feedbackList.innerHTML += `
        <div class="feedback__item item-animation">
        <div class="feedback__details">
            <h4 class="feedback__name" id="feedback-name">
                ${feedback.name}
            </h4>
            <h5 class="feedback__title" id="feedback-title">
                ${feedback.title}
            </h5>
            <p class="feedback__text" id="feedback-text">
                ${feedback.text}
            </p>
        </div>

        <div class="feedback__buttons">
            <button class="feedback__button" id="edit-button" onclick="editFeedback(${feedback.id})">
                Edit
            </button>
            <button class="feedback__button" id="delete-button" onclick="deleteFeedback(${feedback.id})">
                Delete
            </button>
        </div>
    </div>
        `
    }
}


function deleteFeedback(id){
    // console.log(id)
    localStorage.removeItem(id)
    window.location.reload();
}

function editFeedback(id){
    let feedback = JSON.parse(localStorage.getItem(id));

    modal.style.display = "block";
    feedbackHeader.style.display = "none";
    feedbackList.style.display = "none";

    nameInput.value = feedback.name;
    titleInput.value = feedback.title;
    textareaInput.value = feedback.text;

    addBtn.addEventListener("click", () => {
        feedback.id = id;
        feedback.name =  nameInput.value    ;
        feedback.title = titleInput.value   ; 
        feedback.text =  textareaInput.value;
        localStorage.setItem(id, JSON.stringify(feedback));

        // making the modal disappear
        modal.style.display = "none";
        feedbackHeader.style.display = "flex";
        feedbackList.style.display = "block";

        deleteFeedback(id);
        window.location.reload();
    })
}
