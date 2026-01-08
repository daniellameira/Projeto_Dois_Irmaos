// ============================================
// PORTFÓLIO - FUNCIONALIDADES
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initPortfolio();
});

function initPortfolio() {
    // Elementos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const loadMoreBtn = document.getElementById('loadMore');
    const portfolioModal = document.getElementById('portfolioModal');
    const modalClose = document.querySelector('.modal-close');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalDetails = document.getElementById('modalDetails');
    
    // Variáveis
    let visibleItems = 6;
    const allItems = portfolioItems.length;
    
    // Inicializar
    showInitialItems();
    initFiltering();
    
    // Filtros
    function initFiltering() {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Atualizar botão ativo
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Obter categoria
                const filter = this.getAttribute('data-filter');
                
                // Filtrar itens
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                // Resetar contador
                visibleItems = 6;
                showInitialItems();
            });
        });
    }
    
    // Mostrar itens iniciais
    function showInitialItems() {
        let shown = 0;
        
        portfolioItems.forEach((item, index) => {
            if (item.style.display !== 'none') {
                if (shown < visibleItems) {
                    item.style.display = 'block';
                    shown++;
                } else {
                    item.style.display = 'none';
                }
            }
        });
        
        // Esconder botão se todos já estão visíveis
        if (shown >= allItems || shown >= getVisibleCount()) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
    }
    
    // Carregar mais itens
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            visibleItems += 3;
            showInitialItems();
        });
    }
    
    // Contar itens visíveis
    function getVisibleCount() {
        let count = 0;
        portfolioItems.forEach(item => {
            if (item.style.display !== 'none') {
                count++;
            }
        });
        return count;
    }
    
    // Modal - Abrir com detalhes do projeto
    portfolioItems.forEach(item => {
        const card = item.querySelector('.portfolio-card');
        const image = item.querySelector('img');
        const title = item.querySelector('.portfolio-info h3');
        const description = item.querySelector('.portfolio-info p');
        const details = item.querySelector('.portfolio-details');
        
        card.addEventListener('click', function(e) {
            if (!e.target.closest('a')) { // Evita conflito com links
                // Preencher modal
                modalImage.src = image.src;
                modalImage.alt = image.alt;
                modalTitle.textContent = title.textContent;
                modalDescription.textContent = description.textContent;
                modalDetails.innerHTML = details.innerHTML;
                
                // Mostrar modal
                portfolioModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Bloquear scroll
            }
        });
    });
    
    // Fechar modal
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            portfolioModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Fechar modal ao clicar fora
    portfolioModal.addEventListener('click', function(e) {
        if (e.target === portfolioModal) {
            portfolioModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Fechar modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && portfolioModal.classList.contains('active')) {
            portfolioModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Carregar imagens com lazy loading
    initLazyLoading();
}

// Lazy loading para imagens
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('.portfolio-image img').forEach(img => {
            imageObserver.observe(img);
        });
    }
}