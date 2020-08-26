'use strict';

import galleryItems from '../gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const lightboxImageRef = document.querySelector('.lightbox__image');
const lightboxCloseBtnRef = document.querySelector('.lightbox__button[data-action="close-lightbox"]');
const lightboxOverlayRef = document.querySelector('.lightbox__content');

let dataIndex = null;

galleryRef.addEventListener('click', galleryOpenHendler);


function galleryOpenHendler(e) {
  e.preventDefault();

  if(e.target.nodeName !== 'IMG') {
    return;
  }

  const img = e.target;
  const sourceImg = img.dataset.source;
  dataIndex = Number(img.dataset.index);

  lightboxRef.classList.add('is-open');
  lightboxImageRef.src = sourceImg;

  lightboxCloseBtnRef.addEventListener('click', closeModalHendler);
  lightboxOverlayRef.addEventListener('click', closeModalOverlayHendler);
  window.addEventListener('keydown', modalKeydown);
}

function closeModalHendler() {
  lightboxImageRef.src = "";
  lightboxRef.classList.remove('is-open');
  lightboxCloseBtnRef.removeEventListener('click', closeModalHendler);
  lightboxOverlayRef.removeEventListener('click', closeModalOverlayHendler);
  window.removeEventListener('keydown', modalKeydown);
}

function closeModalOverlayHendler(e) {
  if(e.target !== e.currentTarget) {
    return;
  }
  closeModalHendler();
}

function modalKeydown(e) {
  if (e.code === 'Escape') {
    closeModalHendler();
  }

  modalArrowHendler(e);
  
}

function modalArrowHendler(e) {

  if(dataIndex === null) {
    return;
  }
  

  if (e.code === 'ArrowLeft') {
    if (dataIndex > 0) {
      dataIndex -= 1;
      lightboxImageRef.src = galleryItems[dataIndex].original;
    }
    
  }

  if (e.code === 'ArrowRight') {
    if (dataIndex < galleryItems.length - 1) {
      dataIndex += 1;
      lightboxImageRef.src = galleryItems[dataIndex].original;
    }
  }

}




const galleryItemsStr = galleryItems.reduce((acc, {original, preview, description}, idx) => {
  return acc += `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
      data-index="${idx}"
    />
  </a>
</li>`;
}, ''); 

galleryRef.insertAdjacentHTML('beforeend', galleryItemsStr);


