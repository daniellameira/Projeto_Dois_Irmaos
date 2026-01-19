// Portfólio Simples - JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // 1. FILTRAGEM DE PROJETOS
    // ========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
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
    // 2. GALERIA DE FOTOS
    // ========================================
    const viewPhotoButtons = document.querySelectorAll('.view-photos-btn');
    const thumbnails = document.querySelectorAll('.project-thumbnails img');
    const mainImages = document.querySelectorAll('.main-image');
    
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
    
    // Função para abrir galeria
    function openGallery(projectCard) {
        currentProject = projectCard;
        
        // Coletar todas as imagens do projeto
        const mainImage = projectCard.querySelector('.main-image').src;
        const thumbnailImages = projectCard.querySelectorAll('.project-thumbnails img');
        
        currentImages = [mainImage];
        thumbnailImages.forEach(img => {
            const fullImage = img.getAttribute('data-full');
            if (fullImage && !currentImages.includes(fullImage)) {
                currentImages.push(fullImage);
            }
        });
        
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
    
    // Abrir galeria ao clicar no botão
    viewPhotoButtons.forEach(button => {
        button.addEventListener('click', function() {
            openGallery(this.closest('.project-card'));
        });
    });
    
    // Abrir galeria ao clicar na imagem principal
    mainImages.forEach(img => {
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
                currentIndex = clickedIndex + 1; // +1 porque a primeira imagem é a principal
                updateModalImage();
            }
        });
    });
    
    // Funções do modal
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
    
    // Event listeners do modal
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
    // 3. FUNCIONALIDADE EXTRAS
    // ========================================
    
    // Tooltip simples para os botões do YouTube
    const youtubeButtons = document.querySelectorAll('.youtube-btn, .youtube-link-btn');
    
    youtubeButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            // Adiciona uma classe para efeito
            this.classList.add('hover-effect');
        });
        
        btn.addEventListener('mouseleave', function() {
            this.classList.remove('hover-effect');
        });
    });
    
    console.log('Portfólio simples inicializado com sucesso!');
});