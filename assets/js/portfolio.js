// Portfólio Simples - JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const viewPhotoButtons = document.querySelectorAll('.view-photos-btn');
    const thumbnails = document.querySelectorAll('.project-thumbnails img');
    
    // Elementos do Modal
    const photoModal = document.querySelector('.photo-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalImage = document.querySelector('.modal-image');
    const modalTitle = document.querySelector('.modal-title');
    const modalDescription = document.querySelector('.modal-description');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const currentIndexSpan = document.querySelector('.current-index');
    const totalImagesSpan = document.querySelector('.total-images');
    
    // Variáveis de controle
    let currentImages = [];
    let currentIndex = 0;
    let currentProject = null;
    
    // ========================================
    // 1. FILTRAGEM DE PROJETOS
    // ========================================
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adiciona active no botão clicado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filtra os projetos
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // ========================================
    // 2. ABRIR GALERIA DE FOTOS
    // ========================================
    viewPhotoButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            openGallery(this.closest('.project-card'));
        });
    });
    
    // Também permite abrir a galeria clicando na imagem principal
    document.querySelectorAll('.main-image').forEach(img => {
        img.addEventListener('click', function() {
            openGallery(this.closest('.project-card'));
        });
    });
    
    // Miniaturas também abrem a galeria
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const projectCard = this.closest('.project-card');
            openGallery(projectCard);
            
            // Encontra o índice da miniatura clicada
            const thumbnailsInProject = projectCard.querySelectorAll('.project-thumbnails img');
            const clickedIndex = Array.from(thumbnailsInProject).indexOf(this);
            
            if (clickedIndex !== -1) {
                currentIndex = clickedIndex;
                updateModalImage();
            }
        });
    });
    
    // ========================================
    // 3. FUNÇÕES DO MODAL
    // ========================================
    function openGallery(projectCard) {
        currentProject = projectCard;
        
        // Coletar todas as imagens do projeto
        const mainImage = projectCard.querySelector('.main-image').src;
        const thumbnailImages = projectCard.querySelectorAll('.project-thumbnails img');
        
        currentImages = [mainImage];
        thumbnailImages.forEach(img => {
            currentImages.push(img.getAttribute('data-full'));
        });
        
        // Remover duplicados
        currentImages = [...new Set(currentImages.filter(img => img))];
        
        // Informações do projeto
        const title = projectCard.querySelector('h3').textContent;
        const description = projectCard.querySelector('p').textContent;
        
        // Atualizar modal
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        totalImagesSpan.textContent = currentImages.length;
        
        // Resetar índice
        currentIndex = 0;
        updateModalImage();
        
        // Abrir modal
        photoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function updateModalImage() {
        if (currentImages[currentIndex]) {
            modalImage.src = currentImages[currentIndex];
            currentIndexSpan.textContent = currentIndex + 1;
            
            // Atualizar estado dos botões de navegação
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            nextBtn.style.opacity = currentIndex === currentImages.length - 1 ? '0.5' : '1';
        }
    }
    
    function showPrevImage() {
        if (currentIndex > 0) {
            currentIndex--;
            updateModalImage();
        }
    }
    
    function showNextImage() {
        if (currentIndex < currentImages.length - 1) {
            currentIndex++;
            updateModalImage();
        }
    }
    
    function closeModal() {
        photoModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        currentImages = [];
        currentIndex = 0;
        currentProject = null;
    }
    
    // ========================================
    // 4. EVENT LISTENERS DO MODAL
    // ========================================
    modalClose.addEventListener('click', closeModal);
    
    photoModal.addEventListener('click', function(e) {
        if (e.target === photoModal) {
            closeModal();
        }
    });
    
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (!photoModal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });
    
    // ========================================
    // 5. INICIALIZAÇÃO
    // ========================================
    
    // Inicializa o contador total de imagens no modal
    totalImagesSpan.textContent = '0';
    
    console.log('Portfólio simples inicializado com sucesso!');
});