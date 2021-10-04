
// fetch('https://pixabay.com/api/?key=23504636-68b1663b5a089ae14fcc5b717&q=yellow+flowers&image_type=photo&pretty=true')
// .then((response) => response.json())
// .then((data) => console.log('data', data));
let debounce = require('lodash.debounce');
import {alert, success, error} from '@pnotify/core';
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/Material.css";
import "@pnotify/core/dist/Angeler.css";
import "@pnotify/core/dist/BrightTheme.css";
import * as basicLightbox from 'basiclightbox';
export default class Gallery {
    constructor(API_KEY, galleryTemplate) {
        // this.uri = uri;
        this.API_KEY = API_KEY;
        this.form = document.querySelector('.search-form');
        this.input = document.querySelector('input[name="query"]');
        this.listGallery = document.querySelector('.gallery');
        this.loadDiv = document.querySelector('.loadMore');
        this.loadMoreBtn = document.querySelector(".js-load");
        this.resetBtn = document.querySelector('.js-reset');
        this.currentPage = '';
        this.inputValue = "";
        this.galleryTemplate = galleryTemplate;

    }
    
    formRequest = () => {
        let query = `${this.inputValue}`
        let url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&page=${this.currentPage}&per_page=12&key=${this.API_KEY}`;
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if(data.hits.length === 0) {
                console.log('data length', data.hits.length);
                this.loadDiv.classList.add('hidden');
                this.resetBtn.classList.add('hidden');
                new error({
                    title: `Err!`,
                    delay: 2000
                });    
            }
            console.log('work', data.hits);
            new success({
                title: `Success!`,
                delay: 2000
            });
            this.listGallery.insertAdjacentHTML(
                "beforeend",
                this.galleryTemplate(data.hits)
            );
            
            this.eventListeners();
        });
    }
    submitForm = (event) => {
        event.preventDefault();
        let query = event.target.elements.query.value;
        let lowerRes = this.inputValue = query.toLowerCase();
        console.log('submit', lowerRes);
        this.currentPage = 1;
        console.log('page', this.currentPage);
        this.loadDiv.classList.toggle('hidden');
        this.resetBtn.classList.toggle('hidden');
        this.formRequest();

    }
    resetPageNum = () => {
        console.log(object);
    }
    loadMore = (event) => {
        event.preventDefault();
        let newPage = this.currentPage += 1;
        console.log('loaded', newPage);
        this.formRequest();
    }
    resetForm = () => {
        this.listGallery.innerHTML = "";
        this.currentPage = "";
        this.input.value = "";
        this.loadDiv.classList.toggle('hidden');
        this.resetBtn.classList.toggle('hidden');
        console.log('reset');
    }
    eventListeners = () => {
        console.log('event');
        this.form.addEventListener("submit", this.submitForm);
        this.loadMoreBtn.addEventListener("click", this.loadMore);
        this.resetBtn.addEventListener('click', this.resetForm);
        console.log('eventEnd');
    }
}
