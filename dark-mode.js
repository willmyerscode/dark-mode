/**
* Dark Mode For Squarespace
*/

class DarkMode {

constructor (el) {
  this.el = el;

  // Get Data Attributes
  this.darkTheme = this.el.getAttribute('data-theme') || 'black-bold';
  this.darkTheme = this.darkTheme.toLowerCase();
  this.darkTheme = this.darkTheme.trim();

  this.header = document.querySelector('#header');
  this.headerStyle = this.header.getAttribute('data-header-style');
  this.mobileMenu = document.querySelector('.header-menu--folder-list');
  this.headerBurger = document.querySelector('.header-burger');
  this.sections = document.querySelectorAll('.page-section');
  this.overlayMenu = document.querySelector('.header-menu');
  this.colorThemes = ['white', 'white-bold', 'light', 'light-bold', 'bright-inverse', 'bright', 'dark', 'dark-bold', 'black', 'black-bold'];

  this.sessionData = localStorage.getItem("darkMode");
  
  this.init();
  
}

init () {

  this.createButton();

  this.addClickEventListener();

  this.pageLoad();

}
  
createButton() {  
  this.darkButton = `<div class="dark-button"><svg viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#444" d="M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM8 15c-3.9 0-7-3.1-7-7 0-2.4 1.2-4.6 3.2-5.9-0.1 0.6-0.2 1.3-0.2 1.9 0 4.9 4 8.9 8.9 9-1.3 1.3-3 2-4.9 2z"></path> </g></svg></div>`;
  this.siteWrapper = document.querySelector('#siteWrapper');
  this.siteWrapper.insertAdjacentHTML("afterBegin", this.darkButton);
  this.button = document.querySelector('.dark-button');
}

pageLoad() {
  console.log('page change');
  console.log(this.sessionData);
    if (this.sessionData === "dark-mode-on") {
    this.button.click();
  }
}
  
addClickEventListener(){
  this.button.addEventListener('click', () => {
    if (this.siteWrapper.classList.contains("dark-mode-on")) {
      this.siteWrapper.classList.remove('dark-mode-on');
      localStorage.setItem("darkMode", 'dark-mode-off');
      this.revertColorThemes();
      
    }

    else {
      this.siteWrapper.classList.add('dark-mode-on');
      localStorage.setItem("darkMode", 'dark-mode-on');
      console.log(this.sessionData);

      this.removeColorThemes();
    }
      this.sections.forEach(section => {
        section.classList.toggle(this.darkTheme);
      });
    this.header.classList.toggle(this.darkTheme);
    this.mobileMenu.classList.add(this.darkTheme);
    
  });
}


removeColorThemes(){
  this.sections.forEach(section => {
    this.colorThemes.forEach(color => {
      section.classList.remove(color);
    });
  });
  this.colorThemes.forEach(color => {
      this.header.classList.remove(color);
    this.mobileMenu.classList.remove(color);

  });
}

revertColorThemes(){
  this.sections.forEach(section => {
      console.log(section.getAttribute('data-section-theme'));
    section.classList.add(section.getAttribute('data-section-theme'));
    
  });
  
  if (this.headerStyle == 'dynamic') {
    this.header.classList.add(this.sections[0].getAttribute('data-section-theme'));
  }
  
if (this.mobileMenu) {
  this.mobileMenu.classList.add(this.header.getAttribute('data-menu-overlay-theme'));
}
  
}
  
}
  

(function(){
  // Find All Instances
  let allInstances = document.querySelectorAll('[data-tool="dark-mode"]');
  
  // Loop Through All Instances
  for (let instance of allInstances) {
    new DarkMode(instance);
  }
}())

