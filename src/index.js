import './scss/main.scss'
let debounce = require('lodash.debounce');
import galleryTemplate from './templates/galleryList.hbs'
import Gallery from './js/gallery.js';

let API_KEY = '23504636-68b1663b5a089ae14fcc5b717';


new Gallery(API_KEY, galleryTemplate).eventListeners();