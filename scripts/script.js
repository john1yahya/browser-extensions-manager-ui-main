import {tools} from '../data/data.js';

let toolscpy = tools;

let current = toolscpy;
let filterState = 'all';

const extensions = document.querySelector('.tools');


function render(current){

    let extensionsHTML = '';
    
      current.forEach((extension) => {
        extensionsHTML += `
          <div class="extensions-container">
            <div class="icon-content">
              <img src="${extension.logo}">
            <div class="content">
              <h2>${extension.name}</h2>
              <p>${extension.description}</p>
            </div> 
          </div>
          <div class="remove-active">
            <button class="rm-btn" data-name="${extension.name}">Remove</button>
            <div class="toggle ${extension.isActive ? 'active' : ''}" data-state="${extension.isActive}">
            <div class="togglediv ${extension.isActive ? 'activeInner' : 'inactive'}"></div>
          </div>
        </div>
      </div>
    ` ;
  });
  extensions.innerHTML = extensionsHTML;
};

render(current);

extensions.addEventListener('click', (event) => {
  remove(event);
  toggeHundel(event)
})

function toggeHundel(event){
  
  const toggleButton  = event.target.closest('.toggle');
  const container = toggleButton.closest('.extensions-container');
  const toolsName = container.querySelector('.rm-btn').dataset.name;

  let tool = toolscpy.find(t => t.name === toolsName);
  if(tool){
    tool.isActive = !tool.isActive;

      if(filterState === 'active'){
        current = toolscpy.filter(t => t.isActive === true);
      }else if(filterState === 'inactive'){
        current = toolscpy.filter(t => t.isActive === false);
      }else{
        current = toolscpy;
      }
      render(current);
      

  }
  console.log(toggleButton);
  
}


// remove fucntion
function remove(event){
  const removeButton = event.target.closest('.rm-btn');
  if(removeButton){
    const nameToRemove = removeButton.dataset.name;
    toolscpy = toolscpy.filter(extension => extension.name !== nameToRemove)
    render(toolscpy);
  }
}


const activeExtensions  = document.querySelector('.active');
activeExtensions.addEventListener('click', () => {
  let current = toolscpy.filter(t => t.isActive === true);
  filterState = 'active';
  render(current)
  
})
const InactiveExtensions  = document.querySelector('.Inactive');
InactiveExtensions.addEventListener('click', () => {
  let current = toolscpy.filter(t => t.isActive === false);
  filterState = 'inactive'
  render(current)
  
})



const allExtensions = document.querySelector('.all');
  allExtensions.addEventListener('click', () => {
  filterState = 'all';
  render(toolscpy)
})

let modeState = 'light';

let mode = document.querySelector(".toggle-mode");
mode.addEventListener('click', () => {
  if (modeState === 'light'){
    document.body.classList.add('darkMode');
      mode.innerHTML = `<img src="assets/images/icon-sun.svg" alt="sun-svg">`
      modeState = 'dark'
  }else if(modeState ='dark'){
      document.body.classList.remove('darkMode');
      mode.innerHTML = `<img src="assets/images/icon-moon.svg" alt="sun-svg">`
      modeState = 'light'
  }

})