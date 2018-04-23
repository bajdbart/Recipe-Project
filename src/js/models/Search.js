import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults(query) {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = '1da34c642da8069b23c8bb8e2e00f129';
        try {
            const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`); 
            this.result = res.data.recipes
            //
            console.log(this.result);
        } catch (error){
            alert(error);
        }
        
    }
}


