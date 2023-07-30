import React,{useEffect,useState} from "react";
import axios from "axios";
import { DisplayPersonality } from "./DisplayPersonality";
import { DisplayHeading } from "./DisplayHeading";
import { DisplayCounter } from "./DisplayCounter";
import { AddRandomCard } from "./AddRandomCard";
import { SearchCard } from "./SearchCard";
export const App = () => {
    /*
     * 1. Pull the fetch call out into it's own function fetchCat
     * 2. Call fetchCat on initial page load as done currently
     * 3. Add a timer using useEffect that fetches a new cat every 5 seconds
     * 4. Make sure to cancel the timer when component is unmounted
     */
  
    const [data, setData] = useState([]);
    const[modal,setModal] = useState(false);
    const baseUrl = "http://localhost:3001/quote";
    const insertEverytime = "/dataEverytime";
    const remove = "/delete/";
    const searchData = "/search";

    useEffect(() => {   
  
      axios.post(baseUrl+insertEverytime).then(response => setData(response.data))
    .catch(error => console.error(error))  
  },[]);


  

   const searchQuoteByName = (name) => {
    console.log("in frontend name Status is:"+name);
    axios.post(baseUrl+searchData,{authorName:name}).then(response => setModal(response.data))
    .catch(error => console.error(error));  
   
    console.log("modal is "+modal);
  }

  const addRandomQuote = (cardStatus) => {
   

    axios.post(baseUrl+insertEverytime,{card : cardStatus}).then(response => setData(response.data))
    .catch(error => console.error(error));  
  }
    
    const deleteQuote = (id) => {

      console.log(id);
      axios
        .delete(baseUrl+remove+id)
        .then((response) => {
          console.log(response.data);
        });  
        setData(data.filter((el) => el._id !== id));       
    };

    return (
      <>
      
        <DisplayHeading heading = "General Quotes By Famous Personality"/>
        <DisplayCounter count = {data.length}/>
        <AddRandomCard  addRandomQuote = {addRandomQuote} />
        <SearchCard searchQuoteByName = {searchQuoteByName} isModal = {modal}/>
        {data.map((personality) =>  
               <DisplayPersonality
                  quote = {personality.quote}
                  source = {personality.source}
                  citation = {personality.citation}
                  image = {personality.image}
                  year = {personality.year}
                  key = {personality._id}
                  keyRemove = {personality._id} 
                  deleteQuote={deleteQuote}       
               />
           )
           }
             </>
    );
  };