document.addEventListener('DOMContentLoaded', () => {

    const savedUrlsContainer = document.getElementById('savedUrlsContainer');

    const displayUrls = (urls) => {
        savedUrlsContainer.innerHTML = '';
        if (urls && urls.length > 0) {
            urls.forEach((entry) => {
                const { id, url, description } = entry;

                const urlLabel = document.createElement('div');
                urlLabel.classList.add('url-item');

                const urlDetails = document.createElement('div');
                urlDetails.classList.add('url-details');
                urlDetails.style.display = 'flex';
                urlDetails.style.alignItems = 'center';

                const urlInput = document.createElement('input');
                urlInput.value = description || '';
                urlInput.classList.add('url-input');
                urlInput.style.display = 'none';

                const urlDescription = document.createElement('p');
                urlDescription.textContent = description || 'Edit to add a description';
                urlDescription.classList.add('url-description');
                urlDescription.style.marginRight = '10px';

                const urlLink = document.createElement('a');
                urlLink.href = url;
                urlLink.target = '_blank';
                urlLink.textContent = 'Filter link';

                urlDetails.appendChild(urlDescription);
                urlDetails.appendChild(urlInput);
                urlDetails.appendChild(urlLink);

                const urlButtons = document.createElement('div');
                urlButtons.classList.add('url-buttons');

                const editButton = document.createElement('button');
                const editIcon = document.createElement('i');
                editIcon.classList.add('fa-solid', 'fa-pen-to-square');
                editButton.appendChild(editIcon);
                editButton.classList.add('edit-button');

                const deleteButton = document.createElement('button');
                const deleteIcon = document.createElement('i');
                deleteIcon.classList.add('fa-solid', 'fa-trash');
                deleteButton.appendChild(deleteIcon);
                deleteButton.classList.add('delete-button');

                const saveButton = document.createElement('button');
                const saveIcon = document.createElement('i');
                saveIcon.classList.add('fa-solid', 'fa-floppy-disk');
                saveButton.appendChild(saveIcon);
                saveButton.classList.add('save-button');
                saveButton.style.display = 'none';

                urlButtons.appendChild(editButton);
                urlButtons.appendChild(saveButton);
                urlButtons.appendChild(deleteButton);
                

                editButton.addEventListener('click', () => {
                    urlDescription.style.display = 'none';
                    urlInput.style.display = 'inline';
                    saveButton.style.display = 'inline';
                    editButton.style.display = 'none';
                });
                deleteButton.addEventListener('click', () => {
                    const updatedUrls = urls.filter((entry) => entry.id !== id);
                    chrome.storage.sync.set({ savedUrls: updatedUrls }, () => {
                        displayUrls(updatedUrls);
                    });
                });

                saveButton.addEventListener('click', () => {
                    const newDescription = urlInput.value;
                    
                        const updatedUrls = urls.map((entry) =>
                            entry.id === id ? { ...entry, description: newDescription } : entry
                        );
                        chrome.storage.sync.set({ savedUrls: updatedUrls }, () => {
                            displayUrls(updatedUrls); 
                        });
                    
                });

                urlLabel.appendChild(urlDetails);
                urlLabel.appendChild(urlButtons);

                savedUrlsContainer.appendChild(urlLabel);
            });
        } else {
            const noUrlsMessage = document.createElement('p');
            noUrlsMessage.textContent = 'No saved URL.';
            savedUrlsContainer.appendChild(noUrlsMessage);
        }
    };

    chrome.storage.sync.get(['savedUrls'], (data) => {
        const savedUrls = data.savedUrls || [];
        displayUrls(savedUrls);
    });
});
