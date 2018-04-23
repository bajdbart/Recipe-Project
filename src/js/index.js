// Global app controller
import { elements, renderLoader, clearLoader } from './views/base';
import Search from './models/Search';
import * as searchView from './views/searchView'

// Global state of the app
/*
    -Search object
    -Current recipe object
    -Shipping list object
    -liked recipes
*/

const state = {};

const controlSearch = async () => {
    // 1. Get query from the view
    const query = searchView.getIpnut();
    //console.log(query);
    if (query) {
    // 2. New Search Object and add to state
        state.search = new Search(query);
    // 3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

    //4. Search for recipes
        await state.search.getResults(); //await for Promise from getResults()
    
    //5. Render results on UI 
        clearLoader();
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault(); //aviod reloading of page
    controlSearch();
} )

// we create eventlisteners on buttons which are not exist untill the qeury submit. We use Event Delegation and closest() method

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

