const cards = document.querySelectorAll(".card");

let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipcard(e) {
    let clickedCard = e.target; //getting user clicked card
    if(clickedCard !== cardOne && !disableDeck){
        clickedCard.classList.add("flip");
        if(!cardOne){
            //return the cardOne value to ClickedCard
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector("img").src,
        cardTwoImg = cardTwo.querySelector("img").src;
        matchCards(cardOneImg,cardTwoImg);
    }
}

function matchCards(img1,img2){
    if(img1 === img2){ // if two cards img matched
        matchedCard++;
        if(matchedCard == 8){
            setTimeout(() => {
                return shuffleCard();
            },1000);
            
        }
        cardOne.removeEventListener("click",flipcard);
        cardTwo.removeEventListener("click", flipcard);
        cardOne = cardTwo = ""; // setting both card value to blank
        return disableDeck = false;
    }
    // if two card not matched
    setTimeout(() => {
        // removing both shake & flip classes from the both card after 1.2 seconds 
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    },400);
    setTimeout(() => {
        // adding shake class to both card after 1200ms
        cardOne.classList.remove("shake","flip");
        cardTwo.classList.remove("shake","flip");
        cardOne = cardTwo = ""; // setting both card value to blank
        disableDeck = false;
    },1200);
}

function shuffleCard(){
    let matchedCard = 0;
    cardOne = cardTwo = "";
    disableDeck = false;
    let arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card,index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = 'images/img-'+ arr[index] + '.png';
        card.addEventListener("click",flipcard);
    });
}

shuffleCard();

cards.forEach(card => { //adding click events to all cards
    card.addEventListener("click",flipcard);
});