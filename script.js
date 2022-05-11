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
    },
  
    init() {        
        // Create text area
        this.elements.textarea = document.createElement("textarea");
        // Setup textarea element
        this.elements.textarea.classList.add("use-keyboard-input");
        // this.elements.textarea.placeholder = 'Text';
        this.elements.textarea.autofocus = true;
        // Add teaxtarea to DOM 
        document.body.appendChild(this.elements.textarea);
    
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");
        
        // Setup main elements
        this.elements.main.classList.add("keyboard", "--keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());
    
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
    
        
        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);
    
        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
          element.addEventListener("focus", () => {
            console.log(this)
            this.open(element.value, currentValue => {
              element.value = currentValue;
            });
          });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const nkeyLayout = [
          "`","1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
          "Tab","q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]","\\","Del",
          "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l",  ";",  "'","enter",
          "Shift-L", "z", "x", "c", "v", "b", "n", "m", ",", ".", "\/","Arr-up", "Shift-R",
          "Ctrl","win","Alt", "space", "Alt", "Arr-left", "Arr-down", "Arr-right", "Ctrl"
        ];
    
        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
          return `<i class="material-icons">${icon_name}</i>`;
        };    
        
        nkeyLayout.forEach(key => {
          const keyElement = document.createElement("button");
          const insertLineBreak = ["backspace", "Del", "enter", "Shift-R",].indexOf(key) !== -1;
    
          // Add attributes/classes
          keyElement.setAttribute("type", "button");
          keyElement.classList.add("keyboard__key");
    
          switch (key) {            
            
            case "backspace":
              keyElement.classList.add("keyboard__key--wide");
              keyElement.innerHTML = createIconHTML("backspace");
    
              keyElement.addEventListener("click", () => {
                this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                this._triggerEvent("oninput");
              });
    
              break;
    
            case "caps":
              keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
              keyElement.innerHTML = createIconHTML("keyboard_capslock");
    
              keyElement.addEventListener("click", () => {
                this._toggleCapsLock();
                keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
              });
    
              break;
              
            case "enter":
              keyElement.classList.add("keyboard__key--wide");
              keyElement.innerHTML = createIconHTML("keyboard_return");
    
              keyElement.addEventListener("click", () => {
                this.properties.value += "\n";
                this._triggerEvent("oninput");
              });
    
              break;
            
            case "Shift-L":
              keyElement.classList.add("keyboard__key--wide");
              keyElement.textContent = "Shift";
              // keyElement.innerHTML = createIconHTML("keyboard_shift");
    
              keyElement.addEventListener("click", () => {
                this._toggleShift();
                // keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
              });
    
              break;
            
            case "Arr-up":
              keyElement.classList.add("keyboard__key");
                // keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
              keyElement.innerHTML = createIconHTML("arrow_upward");
      
              keyElement.addEventListener("click", () => {
                this.close();
                this._triggerEvent("onclose");
              });
      
                break;
              
            case "Shift-R":
                keyElement.classList.add("keyboard__key--wide");
                keyElement.textContent = "Shift";
                // keyElement.innerHTML = createIconHTML("keyboard_shift");
      
                keyElement.addEventListener("click", () => {
                  this._toggleShift();
                  // keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
                });
      
                break;
    
            case "space":
              keyElement.classList.add("keyboard__key--extra-wide");
              keyElement.innerHTML = createIconHTML("space_bar");
    
              keyElement.addEventListener("click", () => {
                this.properties.value += " ";
                this._triggerEvent("oninput");
              });
    
              break;
    
            case "Arr-left":
              keyElement.classList.add("keyboard__key");
              // keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
              keyElement.innerHTML = createIconHTML("arrow_back");
    
              keyElement.addEventListener("click", () => {
                this.close();
                this._triggerEvent("onclose");
              });
    
              break;
             
            case "Arr-down":
              keyElement.classList.add("keyboard__key");
              // keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
              keyElement.innerHTML = createIconHTML("arrow_downward");
    
              keyElement.addEventListener("click", () => {
                this.close();
                this._triggerEvent("onclose");
              });
    
              break;
             
              case "Arr-right":
                keyElement.classList.add("keyboard__key");
                // keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                keyElement.innerHTML = createIconHTML("arrow_forward");
      
                keyElement.addEventListener("click", () => {
                  this.close();
                  this._triggerEvent("onclose");
                });
      
                break;  
    
            default:
              keyElement.textContent = key.toLowerCase();
    
              keyElement.addEventListener("click", () => {
                // if (this.properties.value === this.properties.value +  this.properties.shift){
                //   key.toUpperCase();
                //   this._triggerEvent("oninput");
                // }
                //  key.toLowerCase();
                this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                this._triggerEvent("oninput");
              });
    
              break;
          }


    
          fragment.appendChild(keyElement);
    
          if (insertLineBreak) {
            fragment.appendChild(document.createElement("br"));
          }
        });
    
        return fragment;
    },
    
      _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
          this.eventHandlers[handlerName](this.properties.value);
        }
      },
    
      _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;   
    
        for (const key of this.elements.keys) {
          if (key.childElementCount === 0) {
            key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
          }
        }
      },
    
      _toggleShift(){    
          this.properties.shift = !this.properties.shift; 
    
        for (const key of this.elements.keys) {
          if (key.childElementCount === 0) {
            key.textContent = this.properties.shift ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
          }
        }     
      },
    
      open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
      },

      realKeyboard(e) {
        let keyPressed = document.querySelectorAll(".keyboard__key")
        // console.log(e.key)
        keyPressed.forEach((el,ind) =>{
          if(el.innerHTML === e.key){            
            el.classList.add("realKey")
            console.log(this)
            // this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
            // this._triggerEvent("oninput");
            setTimeout((()=> el.classList.remove("realKey")), 300)            
          }         
        }
            )
        
      }
};
  

  window.addEventListener("DOMContentLoaded", () => Keyboard.init())
  // console.log(keyPressed)
  window.addEventListener("keydown", (e) => {Keyboard.realKeyboard(e)})