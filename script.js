const Keyboard = {
  
    elements: {
      textarea:null,
      main: null,
      keysContainer: null,
      keys: []
    },
  
    eventHandlers: {
      oninput: null,
      onclose: null
    },
  
    properties: {
      value: "",
      capsLock: false,
      shift: false,
      lng: false
    },
  
    init() {
        console.log(this)
        // Create text area
        this.elements.textarea = document.createElement("textarea");
        // Setup textarea element
        this.elements.textarea.classList.add("use-keyboard-input");
        this.elements.textarea.placeholder = 'Click Here';
        // Add teaxtarea to DOM 
        document.body.appendChild(this.elements.textarea);
    
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");
        
        // Setup main elements
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());
    
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
    
        
        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);
    
        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
          element.addEventListener("focus", () => {
            this.open(element.value, currentValue => {
              element.value = currentValue;
            });
          });
        });
    },
  
    _createKeys() {
      
    },
  
    _lng(handlerName) {
      
    },
  
    _triggerEvent(handlerName) {
     
    },
  
    _toggleCapsLock() {
      
    },
  
    _toggleShift(){    
         
    },
  
    open(initialValue, oninput, onclose) {
     
    },
  
    close() {
      
    }
  };
  
  window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
  });