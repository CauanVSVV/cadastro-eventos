import { useState, useEffect } from 'react';

export function useResponsiveItems() {
  const [itemsToShow, setItemsToShow] = useState(6); // Valor padrão para desktop

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      
      if (width >= 1200) {
        setItemsToShow(6); // Desktop - mostra 6 itens
      } else if (width >= 768) {
        setItemsToShow(4); // Tablet - mostra 4 itens
      } else {
        setItemsToShow(2); // Mobile - mostra 2 itens
      }
    }

    // Executa uma vez no carregamento
    handleResize();
    
    // Adiciona o listener para redimensionamento
    window.addEventListener('resize', handleResize);
    
    // Limpa o listener quando o componente é desmontado
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return itemsToShow;
}
