/**
* Dark Mode For Squarespace
*/

class DarkMode {

  constructor (el) {
    this.el = el;
  
    // Get Data Attributes
    this.dataSetup = this.el.getAttribute('data-setup') || 'simple';
    this.dataSetup = this.dataSetup.toLowerCase();
    this.dataSetup = this.dataSetup.trim();
    
    this.darkTheme = this.el.getAttribute('data-theme') || 'black-bold';
    this.darkTheme = this.darkTheme.toLowerCase();
    this.darkTheme = this.darkTheme.trim();
  
    this.themeMappings = window.userThemeMappings || {};
  
    this.toggleButton = this.el.getAttribute('data-button') || 'floating';
    this.toggleButton = this.toggleButton.toLowerCase();
    this.toggleButton = this.toggleButton.trim();
  
    this.header = document.querySelector('#header');
    this.headerStyle = this.header.getAttribute('data-header-style');
    this.headerTheme = this.header.getAttribute('data-header-theme');
    this.mobileMenu = document.querySelector('.header-menu--folder-list');
    this.headerActions = document.querySelector('.header-actions-action--social');
    this.mobileHeaderActions = document.querySelector('.social-accounts');
    this.headerBurger = document.querySelector('.header-burger-btn');

    let systemPage = document.querySelector('.system-page');
    if(systemPage){
    document.querySelector('#page').classList.add('page-section');
    }
    
    this.sections = document.querySelectorAll('.page-section');
    this.siteWrapper = document.querySelector('#siteWrapper');
    this.overlayMenu = document.querySelector('.header-menu');
    this.colorThemes = ['white', 'white-bold', 'light', 'light-bold', 'bright-inverse', 'bright', 'dark', 'dark-bold', 'black', 'black-bold'];


  
    this.init();
    
  }
  
  init () {
    
    this.createButton();
  
    this.pageLoad();

    this.headerCheck();
  }

  
  createButton() {  
  
    if (this.toggleButton.includes("header")) {
  this.darkButton = `<div class="dark-button icon icon--fill  header-icon header-icon-border-shape-none header-icon-border-style-outline" href="" aria-label="Dark Mode">
                          <svg viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#444" d="M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM8 15c-3.9 0-7-3.1-7-7 0-2.4 1.2-4.6 3.2-5.9-0.1 0.6-0.2 1.3-0.2 1.9 0 4.9 4 8.9 8.9 9-1.3 1.3-3 2-4.9 2z"></path> </g></svg>
                        </div>`;
        this.headerActions.insertAdjacentHTML("beforeEnd", this.darkButton);
      this.mobileHeaderActions.insertAdjacentHTML("beforeEnd", this.darkButton);
  
        }
  
  
    if (this.toggleButton.includes("floating")) {
    this.darkButton = `<div class="dark-button floating"><svg viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#444" d="M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM8 15c-3.9 0-7-3.1-7-7 0-2.4 1.2-4.6 3.2-5.9-0.1 0.6-0.2 1.3-0.2 1.9 0 4.9 4 8.9 8.9 9-1.3 1.3-3 2-4.9 2z"></path> </g></svg></div>`;
  
    this.siteWrapper.insertAdjacentHTML("afterBegin", this.darkButton);
    }
    this.button = document.querySelector('.dark-button');
    this.mobileButton = document.querySelector('.social-accounts .dark-button');
  
     this.addClickEventListener();
  }
  
  pageLoad() {
      this.sessionData = localStorage.getItem("darkMode");
      console.log(this.sessionData);
      if (this.sessionData === "dark-mode-on") {
        this.removeColorThemes();
      const header = document.querySelector('header');
      let originalStyle = header.getAttribute('style');
      let newStyle = originalStyle += 'transition: none';

      header.setAttribute('style', newStyle);
      header.setAttribute('style', originalStyle);
        
      this.siteWrapper.classList.add('dark-mode-on');
      this.toggleColors();

   
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
        console.log(localStorage.getItem("darkMode"));
        this.removeColorThemes();
      }
  
      this.toggleColors();
  
      
    });
    
  if(this.mobileButton){
   this.mobileButton.addEventListener('click', () => {
      if (this.siteWrapper.classList.contains("dark-mode-on")) {
        this.siteWrapper.classList.remove('dark-mode-on');
        localStorage.setItem("darkMode", 'dark-mode-off');
        this.revertColorThemes();
        
      }
  
      else {
        this.siteWrapper.classList.add('dark-mode-on');
        localStorage.setItem("darkMode", 'dark-mode-on');
        console.log(localStorage.getItem("darkMode"));
  
        this.removeColorThemes();
      }
  
      this.toggleColors();
  
      
    });
  }
    
   document.addEventListener('click', (e) => {
   const isHamburger = e.target.closest('.header-burger-btn')
   if (!isHamburger) return;
  
   this.headerCheck();
})
  
    
  }
  
  
  
  removeColorThemes(){
    console.log("removing color theme classes");
    this.sections.forEach(section => {
      this.colorThemes.forEach(color => {
        section.classList.remove(color);
      });
    });
    this.colorThemes.forEach(color => {
      console.log("removing color theme");
      this.header.classList.remove(color);
      this.mobileMenu.classList.remove(color);
  
    });
  }
  
  revertColorThemes(){
    console.log("reverting color theme classes");
    this.sections.forEach(section => {
    const sectionTheme = section.getAttribute('data-section-theme');
    if (sectionTheme) {
      section.classList.add(sectionTheme);
    }
  });
    
    if (this.headerStyle == 'dynamic') {
      const headerTheme = this.sections[0].getAttribute('data-section-theme');
      // Check if headerTheme is not empty before adding the class
      if (headerTheme) {
        this.header.classList.add(headerTheme);
      }
    }
  
      if (this.headerStyle == 'theme') {
      // Check if headerTheme is not empty before adding the class
      if (this.headerTheme) {
        this.header.classList.add(this.headerTheme);
      }
    }
    
  if (this.mobileMenu) {
     const menuTheme = this.header.getAttribute('data-menu-overlay-theme');
      // Check if menuTheme is not empty before adding the class
      if (menuTheme) {
        this.mobileMenu.classList.add(menuTheme);
      }
  }
    
  }
  
  toggleColors(){
    console.log("toggling dark theme classes");
      if (this.dataSetup.includes("simple")){
      this.sections.forEach(section => {
          section.classList.toggle(this.darkTheme);
        });
      this.header.classList.toggle(this.darkTheme);
      this.mobileMenu.classList.toggle(this.darkTheme);
      }
  
       if (this.dataSetup.includes('custom')) {
         this.sections.forEach((section) => {
          const defaultTheme = section.getAttribute('data-section-theme');
          const mappedTheme = this.themeMappings[defaultTheme] || defaultTheme;
          if (mappedTheme) {
          section.classList.toggle(mappedTheme);
        }
          
        });
         this.header.classList.toggle(this.darkTheme);
          this.mobileMenu.classList.toggle(this.darkTheme);
      }
  }

  headerCheck() {
    if (this.siteWrapper.classList.contains("dark-mode-on")) {
        this.removeColorThemes();
        this.toggleColors(); 
      }

    else {
      this.colorThemes.forEach(color => {
      console.log("removing color theme");
      this.header.classList.remove(color);
  
    });
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


