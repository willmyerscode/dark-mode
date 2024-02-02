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

    this.toggleButton = this.el.getAttribute('data-button') || 'floating';
    this.toggleButton = this.toggleButton.toLowerCase();
    this.toggleButton = this.toggleButton.trim();

    this.darkTheme = this.el.getAttribute('data-theme') || 'black-bold';
    this.darkTheme = this.darkTheme.toLowerCase();
    this.darkTheme = this.darkTheme.trim();

    this.themeMappings = window.userThemeMappings || {};

    this.header = document.querySelector('#header');
    this.headerStyle = this.header.getAttribute('data-header-style');

    this.headerActions = document.querySelector('.header-actions-action--social');
    this.mobileHeaderActions = document.querySelector('.social-accounts');

    this.mobileMenu = document.querySelector('.header-menu--folder-list');

    let systemPage = document.querySelector('.system-page');
    if(systemPage){
    document.querySelector('#page').classList.add('page-section');
    }

    this.sections = document.querySelectorAll('.page-section');

    this.siteWrapper = document.querySelector('#siteWrapper');

    this.colorThemes = ['white', 'white-bold', 'light', 'light-bold', 'bright-inverse', 'bright', 'dark', 'dark-bold', 'black', 'black-bold'];

  
    this.init();
    
  }
  
  init () {
    this.sectionSettings();
    this.headerSettings();
    this.pageLoad();
    this.createButton();
    this.headerCheck();
  }

  sectionSettings() {
    if (!document.querySelector('.system-page')) {
      // Get Original Colors
      this.sections.forEach(section => {
        let originalColor = 'white';
        this.colorThemes.forEach(color => {
          if (section.classList.contains(color)) {
            originalColor = color;
          }
        });
        section.setAttribute('data-original-theme', originalColor);
      });
  
       // Set Dark Theme Attribute
      if (this.dataSetup.includes('custom')) {
        this.sections.forEach((section, index) => {
            const defaultTheme = section.getAttribute('data-original-theme');
            const mappedTheme = this.themeMappings[defaultTheme] || defaultTheme;
    
            // Set the data attribute 'dark theme' for each section
            section.setAttribute('data-dark-theme', mappedTheme);    
        });
      }
    }
    
  }

  headerSettings(){
      // Original Header
      this.colorThemes.forEach(color => {
        if (this.header.classList.contains(color)) {
          this.originalHeaderColor = color;
          this.header.setAttribute('data-original-header-theme', this.originalHeaderColor);
        }
      });

      // Original Overlay menu
      this.colorThemes.forEach(color => {
        if (this.mobileMenu.classList.contains(color)) {
          this.originalOverlayColor = color;
          this.mobileMenu.setAttribute('data-original-overlay-theme', this.originalOverlayColor);
        }
      });

  
       // Set Dark Theme Attribute
      if (this.dataSetup.includes('custom')) {
        this.menuOverlayTheme = this.header.getAttribute('data-menu-overlay-theme');

        this.mappedOverlayColor = this.themeMappings[this.menuOverlayTheme] || this.menuOverlayTheme;
      }

        if (this.dataSetup.includes('custom') && this.headerStyle.includes('theme')) {
          // Map the original header color using themeMappings
          this.mappedHeaderColor = this.themeMappings[this.originalHeaderColor] || this.originalHeaderColor;
      }
    }
  
  pageLoad(){
    this.sessionData = localStorage.getItem("darkMode");
    if (this.sessionData === "dark-mode-on") {
      this.siteWrapper.classList.add('dark-mode-on');
      this.turnDarkModeOn();
    }
    else {
      this.siteWrapper.classList.add('dark-mode-off');
      this.turnDarkModeOff();
    }
  }
  
  createButton(){
    if (this.toggleButton.includes("header")) {
      this.darkButton = `<div class="dark-button icon icon--fill  header-icon header-icon-border-shape-none header-icon-border-style-outline" href="" aria-label="Dark Mode">
                          <svg viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#444" d="M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM8 15c-3.9 0-7-3.1-7-7 0-2.4 1.2-4.6 3.2-5.9-0.1 0.6-0.2 1.3-0.2 1.9 0 4.9 4 8.9 8.9 9-1.3 1.3-3 2-4.9 2z"></path> </g></svg>
                        </div>`;
      this.headerActions.insertAdjacentHTML("beforeEnd", this.darkButton);
      this.mobileHeaderActions.insertAdjacentHTML("beforeEnd", this.darkButton);
    }
      
    else if (this.toggleButton.includes("floating")) {
      this.darkButton = `<div class="dark-button floating"><svg viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#444" d="M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM8 15c-3.9 0-7-3.1-7-7 0-2.4 1.2-4.6 3.2-5.9-0.1 0.6-0.2 1.3-0.2 1.9 0 4.9 4 8.9 8.9 9-1.3 1.3-3 2-4.9 2z"></path> </g></svg></div>`;
  
      this.siteWrapper.insertAdjacentHTML("afterBegin", this.darkButton);
    }
      
    else {
      console.log("button needs to either be set to header or floating");
    }

    this.button = document.querySelector('.dark-button');
    this.mobileButton = document.querySelector('.social-accounts .dark-button');

    this.addClickEventListener();
  
  }

  addClickEventListener() {
    this.button.addEventListener('click', () => {
      if (this.siteWrapper.classList.contains("dark-mode-on")) {
         this.turnDarkModeOff();
       }
      else {
        this.turnDarkModeOn();
      }
    });
    
    if(this.mobileButton){
      this.mobileButton.addEventListener('click', () => {
        if (this.siteWrapper.classList.contains("dark-mode-on")) {
          this.turnDarkModeOff();
        }
        else {
          this.turnDarkModeOn();
        }
      });
    }

    document.addEventListener('click', (e) => {
      const isHamburger = e.target.closest('.header-burger-btn')
      if (!isHamburger) return;
        this.headerCheck();
    })
  }

  removeColorThemes() {
    this.sections.forEach(section => {
      this.colorThemes.forEach(color => {
        section.classList.remove(color);
      });
    });
    
    if (!document.querySelector('.system-page')) {
      this.colorThemes.forEach(color => {
        this.header.classList.remove(color);
        this.mobileMenu.classList.remove(color);
        
      });
    }
  }

  turnDarkModeOn(){
    localStorage.setItem("darkMode", 'dark-mode-on');
    this.siteWrapper.classList.add('dark-mode-on');
    this.siteWrapper.classList.remove('dark-mode-off');

    if (document.querySelector('.system-page')) {
      this.header.classList.add(this.darkTheme);
      this.mobileMenu.classList.add(this.darkTheme);
      this.sections.forEach(section => {
        section.classList.add(this.darkTheme);
      });
    }
    
    if (!document.querySelector('.system-page')) {
      this.removeColorThemes();
  
      if (this.dataSetup.includes('custom')) {
        this.sections.forEach(section => {
          this.darkTheme = section.getAttribute('data-dark-theme');
          section.classList.add(this.darkTheme);
        });
      }

    if (this.dataSetup.includes('simple')) {
        this.sections.forEach(section => {
          section.classList.add(this.darkTheme);
        });
      }
  
      if (this.dataSetup.includes('simple') && this.headerStyle.includes('theme')) {
        this.header.classList.add(this.darkTheme);
        this.mobileMenu.classList.add(this.darkTheme);
      }
  
      if (this.dataSetup.includes('custom') && this.headerStyle.includes('theme')) {
        this.header.classList.add(this.mappedHeaderColor);
        this.mobileMenu.classList.add(this.mappedOverlayColor);
        
      }
  
      if (this.dataSetup.includes('simple') && this.headerStyle.includes('dynamic')) {
        this.header.classList.add(this.darkTheme);
        this.mobileMenu.classList.add(this.darkTheme);
      }
  
      if (this.dataSetup.includes('custom') && this.headerStyle.includes('dynamic')) {
        const firstSection = this.sections[0];
        const headerDarkTheme = firstSection.getAttribute('data-dark-theme');
        this.header.classList.add(headerDarkTheme);
        this.mobileMenu.classList.add(this.mappedOverlayColor);
        
      }
    }
    
     
  }

  turnDarkModeOff(){
    localStorage.setItem("darkMode", 'dark-mode-off');
    this.siteWrapper.classList.remove('dark-mode-on');
    this.siteWrapper.classList.add('dark-mode-off');

    if (document.querySelector('.system-page')) {
      this.header.classList.remove(this.darkTheme);
      this.mobileMenu.classList.remove(this.darkTheme);
      this.sections.forEach(section => {
        section.classList.remove(this.darkTheme);
      });
    }
    
    if (!document.querySelector('.system-page')) {
      this.removeColorThemes();
      this.header.classList.add(this.originalHeaderColor);
      this.mobileMenu.classList.add(this.originalOverlayColor);
      this.sections.forEach(section => {
        this.originalTheme = section.getAttribute('data-original-theme');
        section.classList.add(this.originalTheme);
      });
    }
  }
  
  headerCheck() {
    if (this.siteWrapper.classList.contains("dark-mode-on")) {
      this.turnDarkModeOn();
    }
    else {
      this.turnDarkModeOff();
    }
  }
  
}
  

(function(){
  // Find All Instances
  let allInstances = document.querySelectorAll('[data-wm-plugin="dark-mode"]');
  
  // Loop Through All Instances
  for (let instance of allInstances) {
    new DarkMode(instance);
  }
}())


