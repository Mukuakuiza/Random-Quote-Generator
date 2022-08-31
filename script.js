const newQuoteButten = document.querySelector('#new-quote');
const cubeloader = document.querySelector('.sk-cube-grid');
const tweetBtn = document.querySelector('#tweet');

//getting the quotes from the API
const endpoint = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random';

const getQuote = async()=>{
    
    
    cubeloader.classList.remove('hidden');
    newQuoteButten.disabled = true;

    try {
        const reponse = await fetch(endpoint)

        if(!reponse.ok){
            throw new Error(reponse.statusText);
        }
        
        const json = await reponse.json();
        displayQuote(json.message);
        settweetBtn(json.message);
    } catch (error) {
        //throw error message in case it does not get the information from API
        console.log(error);
        alert('Failed to fetch new quote')
    }finally{
        newQuoteButten.disabled = false;
        cubeloader.classList.add('hidden')
    }
}

const Quotebtn = ()=>{
    newQuoteButten.addEventListener('click', getQuote);
}
Quotebtn();

//display quote in the quote text area
const displayQuote = (quote)=>{
    const quotetxt = document.querySelector('#quote-text');
    quotetxt.textContent = quote;
}

//share on twitter 
const settweetBtn = (quote)=>{
    tweetBtn.setAttribute('href', `https://twitter.com/share?text=${quote} - Donald Trump`);
}