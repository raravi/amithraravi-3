/* eslint-disable no-underscore-dangle */
/* global window, document */
/**
 * animOnScroll.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
import imagesLoaded from 'imagesloaded';
import anime from 'animejs';
import styles from '../styles/articles.module.css';

const docElem = window.document.documentElement;

function getViewportH() {
  const client = docElem.clientHeight;
  const inner = window.innerHeight;

  if (client < inner) return inner;
  return client;
}

function scrollY() {
  return window.pageYOffset || docElem.scrollTop;
}

// http://stackoverflow.com/a/5598797/989439
function getOffset(elem) {
  let offsetTop = 0;
  let offsetLeft = 0;
  let el = elem;
  do {
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(el.offsetTop)) {
      offsetTop += el.offsetTop;
    }
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(el.offsetLeft)) {
      offsetLeft += el.offsetLeft;
    }
  // eslint-disable-next-line no-cond-assign
  } while ((el = el.offsetParent));

  return {
    top: offsetTop,
    left: offsetLeft,
  };
}

function inViewport(el, height) {
  const elH = el.offsetHeight;
  const scrolled = scrollY();
  const viewed = scrolled + getViewportH();
  const elTop = getOffset(el).top;
  const elBottom = elTop + elH;
  // if 0, the element is considered in the viewport as soon as it enters.
  // if 1, the element is considered in the viewport only when it's fully inside
  // value in percentage (1 >= h >= 0)
  const h = height || 0;

  return elTop + elH * h <= viewed && elBottom - elH * h >= scrolled;
}

function extend(a, b) {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in b) {
    // eslint-disable-next-line no-prototype-builtins
    if (b.hasOwnProperty(key)) {
      // eslint-disable-next-line no-param-reassign
      a[key] = b[key];
    }
  }
  return a;
}

function AnimOnScroll(el, classOfEl, options) {
  this.el = el;
  this.classOfEl = classOfEl;
  this.options = extend(this.defaults, options);
  this._init();
}

AnimOnScroll.prototype = {
  defaults: {
    // Minimum and a maximum duration of the animation (random value is chosen)
    minDuration: 0,
    maxDuration: 0,
    // The viewportFactor defines how much of the appearing item has to be
    // visible in order to trigger the animation
    // if we'd use a value of 0, this would mean that it would add the
    // animation class as soon as the item is in the viewport.
    // If we were to use the value of 1, the animation would only be
    // triggered when we see all of the item in the viewport (100% of it)
    viewportFactor: 0,
  },
  // eslint-disable-next-line func-names
  _init() {
    this.items = Array.prototype.slice.call(
      document.querySelectorAll(`${this.classOfEl} > article`),
    );
    this.itemsCount = this.items.length;
    this.itemsRenderedCount = 0;
    this.didScroll = false;

    const self = this;

    imagesLoaded(this.el, () => {
      // the items already shown...
      const showItems = [];
      self.items.forEach((el) => {
        if (inViewport(el)) {
          self._checkTotalRendered();
          if (el.style.display === '' || el.style.display === 'flex') {
            showItems.push(el);
          }
        }
      });

      /**
       * Animation from (https://tympanus.net/Development/GridLoadingAnimations/)
       * Uses anime.js
       */
      const animeOpts = {
        targets: showItems,
        duration: (t, i) => 1000 + i * 50,
        easing: 'easeOutExpo',
        delay: (t, i) => 50 + i * 20,
        opacity: {
          value: [0, 1],
          duration: (t, i) => 250 + i * 50,
          easing: 'linear',
        },
        translateY: [250, 0],
      };

      animeOpts.targets = [].slice.call(showItems).sort((a, b) => {
        const aBounds = a.getBoundingClientRect();
        const bBounds = b.getBoundingClientRect();

        return aBounds.left - bBounds.left || aBounds.top - bBounds.top;
      });

      anime.remove(animeOpts.targets);
      anime(animeOpts);

      // animate on scroll the items inside the viewport
      window.addEventListener(
        'scroll',
        () => {
          self._onScrollFn();
        },
        false,
      );
      window.addEventListener(
        'resize',
        () => {
          self._resizeHandler();
        },
        false,
      );
    });
  },
  _onScrollFn() {
    const self = this;
    if (!this.didScroll) {
      this.didScroll = true;
      setTimeout(() => {
        self._scrollPage();
      }, 60);
    }
  },
  _scrollPage() {
    const self = this;
    this.items.forEach((el) => {
      if (
        !el.classList.contains(styles.shown)
        && !el.classList.contains(styles.animate)
        && inViewport(el, self.options.viewportFactor)
      ) {
        setTimeout(() => {
          const perspY = scrollY() + getViewportH() / 2;
          self.el.style.WebkitPerspectiveOrigin = `50% ${perspY}px`;
          self.el.style.MozPerspectiveOrigin = `50% ${perspY}px`;
          self.el.style.perspectiveOrigin = `50% ${perspY}px`;

          self._checkTotalRendered();

          if (self.options.minDuration && self.options.maxDuration) {
            const randDuration = `${Math.random() * (self.options.maxDuration - self.options.minDuration) + self.options.minDuration}s`;
            // eslint-disable-next-line no-param-reassign
            el.style.WebkitAnimationDuration = randDuration;
            // eslint-disable-next-line no-param-reassign
            el.style.MozAnimationDuration = randDuration;
            // eslint-disable-next-line no-param-reassign
            el.style.animationDuration = randDuration;
          }

          el.classList.add(styles.animate);
        }, 25);
      }
    });
    this.didScroll = false;
  },
  _resizeHandler() {
    const self = this;
    function delayed() {
      self._scrollPage();
      self.resizeTimeout = null;
    }
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(delayed, 1000);
  },
  _checkTotalRendered() {
    this.itemsRenderedCount += 1;
    if (this.itemsRenderedCount === this.itemsCount) {
      window.removeEventListener('scroll', this._onScrollFn);
    }
  },
};

export default AnimOnScroll;
