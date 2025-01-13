
function waitForElements(selector, callback, timeout = 10000) {
  const startTime = Date.now();
  const interval = setInterval(() => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      clearInterval(interval);
      callback(elements);
    }
    if (Date.now() - startTime > timeout) {
      clearInterval(interval);
      console.error(`Timeout: Élément(s) "${selector}" introuvable(s).`);
    }
  }, 100);
}

waitForElements('.controls-center', (elements) => {

  elements.forEach((targetDiv) => {
    if (!targetDiv.querySelector('#save-filter-btn')) {
      const btnSearch = document.querySelector('.search-btn');
      const btnClear = document.querySelector('.clear-btn');
      const saveButton = document.createElement('button');

      btnSearch.addEventListener('click', function () {
        
        setTimeout(() => {
          const buttons = targetDiv.querySelectorAll('#save-filter-btn');
          buttons.forEach(button => button.remove());
        }, 10);

        saveButton.textContent = 'Save Filter';
        saveButton.id = 'save-filter-btn';
        saveButton.style.backgroundColor = '#357938';
        saveButton.style.color = 'white';
        saveButton.style.border = 'none';
        saveButton.style.cursor = 'pointer';
        saveButton.style.marginLeft = '10px';

        saveButton.addEventListener('mouseenter', function () {
          saveButton.style.backgroundColor = '#329b37';
        });

        saveButton.addEventListener('mouseleave', function () {
          saveButton.style.backgroundColor = '#357938';
        });
        if(!targetDiv.querySelector('#save-filter-btn')){
          targetDiv.appendChild(saveButton);
        }
      });
      saveButton.addEventListener('click', function () {
        const urlPath = window.location.href;
        console.log(urlPath);
      });

      btnClear.addEventListener('click', function () {
        saveButton.remove();
      });
    }
    const interval = setInterval(() => {
      const urlPath = window.location.pathname;
      const regex = /\/Standard\/(.+)/;

      if (regex.test(urlPath)) {
        if (!targetDiv.querySelector('#save-filter-btn')) {
          const btnClear = document.querySelector('.clear-btn');
          const saveButton = document.createElement('button');
  
          saveButton.textContent = 'Save Filter';
          saveButton.id = 'save-filter-btn';
          saveButton.style.backgroundColor = '#357938';
          saveButton.style.color = 'white';
          saveButton.style.border = 'none';
          saveButton.style.cursor = 'pointer';
          saveButton.style.marginLeft = '10px';

          saveButton.addEventListener('click', function () {
            const urlPathForSave = window.location.href;
            const urlId = Date.now();
        
            chrome.storage.sync.get(['savedUrls'], (data) => {
              const savedUrls = data.savedUrls || [];
              savedUrls.push({ id: urlId, url: urlPathForSave });
        
              chrome.storage.sync.set({ savedUrls: savedUrls }, () => { });
              alert("Filter saved. Click on the extension to view the filter.");
            });
          });
        

          saveButton.addEventListener('mouseenter', function () {
            saveButton.style.backgroundColor = '#329b37';
          });

          saveButton.addEventListener('mouseleave', function () {
            saveButton.style.backgroundColor = '#357938';
          });

          if(!targetDiv.querySelector('#save-filter-btn')){
            targetDiv.appendChild(saveButton);
          }
         
          btnClear.addEventListener('click', function () {
            saveButton.remove();
            console.log('Cleared');
          });
          
        }
        clearInterval(interval);
      } else {
        console.log("Rien après /Standard !");
        clearInterval(interval);
      }
    }, 1000);
  });

  const targetNode = document.querySelector('.search-bar.search-advanced');
  
  const observer = new MutationObserver((mutationsList, observer) => {
      for (let mutation of mutationsList) {
        const saveButton = document.getElementById('save-filter-btn');
        const btnSearch = document.querySelector('.search-btn');

        saveButton.remove();

        btnSearch.addEventListener('click', function () {

          saveButton.textContent = 'Save Filter';
          saveButton.id = 'save-filter-btn';
          saveButton.style.backgroundColor = '#357938';
          saveButton.style.color = 'white';
          saveButton.style.border = 'none';
          saveButton.style.cursor = 'pointer';
          saveButton.style.marginLeft = '10px';

          const divControlsCenter = document.querySelector('.controls-center');
          
          divControlsCenter.appendChild(saveButton);

          setTimeout(() => {
            if(!divControlsCenter.querySelector('#save-filter-btn')){
              divControlsCenter.appendChild(saveButton);
            }else{
              console.log('Save button already exists');
            }
          }, 1000);
        });
      }
  });

  
  const config = { 
      childList: true,
      subtree: true,
      attributes: true
  };


  observer.observe(targetNode, config);
});


