/* ============================================
   Data Module — Models, Storage & Mock Data
   ============================================ */

const WardrobeDB = {
  STORAGE_KEY: 'wardrobe_data',
  OUTFITS_KEY: 'wardrobe_outfits',

  /* ---------- Default Wardrobe (60 Peças Masculinas · 10 por Categoria) ---------- */
  DEFAULT_ITEMS: [
    /* ==================== 1. CAMISAS (10 Opções Masculinas) ==================== */
    {
      id: 'camisa_linho_offwhite_m',
      name: 'Camisa de Linho Manga Curta Off-White',
      category: 'camisas',
      subcategory: 'Camisa de Linho',
      color: 'branco',
      season: 'verao',
      occasion: 'casual',
      brand: 'Osklen',
      price: 420,
      material: '100% Linho Puro Francês (Calor Intenso >25°C)',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=80',
      emoji: '👔',
      createdAt: '2026-03-01T10:00:00.000Z',
      timesUsed: 12
    },
    {
      id: 'tshirt_pima_preta_m',
      name: 'Camiseta Básica Algodão Pima Preto',
      category: 'camisas',
      subcategory: 'Camiseta Básica',
      color: 'preto',
      season: 'primavera',
      occasion: 'casual',
      brand: 'Reserva',
      price: 190,
      material: '100% Algodão Pima Peruano Leve (Dias Quentes)',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=80',
      emoji: '👕',
      createdAt: '2026-03-02T14:30:00.000Z',
      timesUsed: 22
    },
    {
      id: 'camisa_oxford_azul_m',
      name: 'Camisa Social Oxford Slim Azul Claro',
      category: 'camisas',
      subcategory: 'Camisa Social',
      color: 'azul',
      season: 'outono',
      occasion: 'formal',
      brand: 'Dudalina',
      price: 380,
      material: '100% Algodão Fio 80 Encorpado (Clima Ameno 16°-22°C)',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&auto=format&fit=crop&q=80',
      emoji: '👔',
      createdAt: '2026-03-03T11:00:00.000Z',
      timesUsed: 15
    },
    {
      id: 'polo_piquet_verde_m',
      name: 'Camisa Polo Piquet Masculina Verde Militar',
      category: 'camisas',
      subcategory: 'Camisa Polo',
      color: 'verde',
      season: 'primavera',
      occasion: 'casual',
      brand: 'Lacoste',
      price: 390,
      material: 'Algodão Piquet Respirável (Clima Ameno/Calor)',
      image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500&auto=format&fit=crop&q=80',
      emoji: '👔',
      createdAt: '2026-03-04T09:20:00.000Z',
      timesUsed: 9
    },
    {
      id: 'camisa_flanela_xadrez_m',
      name: 'Camisa Flanela Xadrez Manga Longa Vermelha',
      category: 'camisas',
      subcategory: 'Camisa Flanela',
      color: 'vermelho',
      season: 'inverno',
      occasion: 'casual',
      brand: 'Timberland',
      price: 410,
      material: 'Flanela Penteada Grossa (Frio 10°-18°C)',
      image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=500&auto=format&fit=crop&q=80',
      emoji: '👔',
      createdAt: '2026-03-05T16:45:00.000Z',
      timesUsed: 8
    },
    {
      id: 'camisa_jeans_western_m',
      name: 'Camisa Jeans Denim Médio Western',
      category: 'camisas',
      subcategory: 'Camisa Jeans',
      color: 'azul',
      season: 'outono',
      occasion: 'casual',
      brand: "Levi's",
      price: 430,
      material: 'Denim 100% Algodão Resistente (Meia-Estação)',
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&auto=format&fit=crop&q=80',
      emoji: '👔',
      createdAt: '2026-03-06T12:15:00.000Z',
      timesUsed: 14
    },
    {
      id: 'camisa_linho_manga_longa_bege_m',
      name: 'Camisa Linho Manga Longa Bege Areia',
      category: 'camisas',
      subcategory: 'Camisa de Linho',
      color: 'bege',
      season: 'primavera',
      occasion: 'casual',
      brand: 'Richards',
      price: 460,
      material: 'Misto Linho e Algodão Fino (Calor e Praia)',
      image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500&auto=format&fit=crop&q=80',
      emoji: '👔',
      createdAt: '2026-03-07T14:10:00.000Z',
      timesUsed: 7
    },
    {
      id: 'tshirt_branca_careca_m',
      name: 'Camiseta Algodão Egípcio Gola Careca Branca',
      category: 'camisas',
      subcategory: 'Camiseta Básica',
      color: 'branco',
      season: 'verao',
      occasion: 'casual',
      brand: 'Hering Super Cotton',
      price: 150,
      material: '100% Algodão Egípcio Extra Macio (Calor >24°C)',
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop&q=80',
      emoji: '👕',
      createdAt: '2026-03-08T08:30:00.000Z',
      timesUsed: 25
    },
    {
      id: 'camisa_social_branca_slim_m',
      name: 'Camisa Social Slim Fit Algodão Maquinetada Branca',
      category: 'camisas',
      subcategory: 'Camisa Social',
      color: 'branco',
      season: 'inverno',
      occasion: 'formal',
      brand: 'Aramis',
      price: 450,
      material: 'Algodão Nobre Fio 100 (Uso Formal e Festas)',
      image: 'https://images.unsplash.com/photo-1620012253295-c15c429fbb41?w=500&auto=format&fit=crop&q=80',
      emoji: '👔',
      createdAt: '2026-03-09T17:00:00.000Z',
      timesUsed: 11
    },
    {
      id: 'camiseta_henley_cinza_m',
      name: 'Camiseta Henley Manga Longa Cinza Mescla',
      category: 'camisas',
      subcategory: 'Camiseta Henley',
      color: 'cinza',
      season: 'outono',
      occasion: 'casual',
      brand: 'Zara Man',
      price: 220,
      material: 'Algodão e Poliéster Canelado (Ameno 15°-21°C)',
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&auto=format&fit=crop&q=80',
      emoji: '👕',
      createdAt: '2026-03-10T13:45:00.000Z',
      timesUsed: 16
    },

    /* ==================== 2. CALÇAS (10 Opções Masculinas) ==================== */
    {
      id: 'calca_jeans_raw_m',
      name: 'Calça Jeans Raw Denim Slim Azul Escuro',
      category: 'calcas',
      subcategory: 'Jeans Slim',
      color: 'azul',
      season: 'outono',
      occasion: 'casual',
      brand: "Levi's 511",
      price: 390,
      material: 'Denim 99% Algodão 1% Elastano (Meia-Estação)',
      image: 'https://images.unsplash.com/photo-1542272604-780c96856592?w=500&auto=format&fit=crop&q=80',
      emoji: '👖',
      createdAt: '2026-03-11T10:15:00.000Z',
      timesUsed: 28
    },
    {
      id: 'calca_alfaiataria_cinza_m',
      name: 'Calça Alfaiataria Slim Cinza Mescla',
      category: 'calcas',
      subcategory: 'Calça Alfaiataria',
      color: 'cinza',
      season: 'inverno',
      occasion: 'formal',
      brand: 'Zara Man',
      price: 350,
      material: 'Lã Fria Térmica e Elastano (Dias Frios e Formais)',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&auto=format&fit=crop&q=80',
      emoji: '👖',
      createdAt: '2026-03-12T09:15:00.000Z',
      timesUsed: 14
    },
    {
      id: 'calca_chino_bege_m',
      name: 'Calça Chino Sarja Acetinada Bege Khaki',
      category: 'calcas',
      subcategory: 'Calça Chino',
      color: 'bege',
      season: 'primavera',
      occasion: 'casual',
      brand: 'Dockers',
      price: 330,
      material: '98% Algodão 2% Elastano (Ameno e Trabalho)',
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&auto=format&fit=crop&q=80',
      emoji: '👖',
      createdAt: '2026-03-13T11:40:00.000Z',
      timesUsed: 19
    },
    {
      id: 'calca_chino_preta_m',
      name: 'Calça Chino Slim Preta Estruturada',
      category: 'calcas',
      subcategory: 'Calça Chino',
      color: 'preto',
      season: 'outono',
      occasion: 'formal',
      brand: 'Reserva',
      price: 360,
      material: 'Sarja Encorpada com Toque Acetinado',
      image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&auto=format&fit=crop&q=80',
      emoji: '👖',
      createdAt: '2026-03-14T15:20:00.000Z',
      timesUsed: 21
    },
    {
      id: 'calca_cargo_verde_m',
      name: 'Calça Cargo Streetwear Verde Militar',
      category: 'calcas',
      subcategory: 'Calça Cargo',
      color: 'verde',
      season: 'outono',
      occasion: 'casual',
      brand: 'Nike Sportswear',
      price: 420,
      material: 'Ripstop Reforçado com Bolsos Utilitários',
      image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=500&auto=format&fit=crop&q=80',
      emoji: '👖',
      createdAt: '2026-03-15T18:00:00.000Z',
      timesUsed: 13
    },
    {
      id: 'calca_alfaiataria_azul_marinho_m',
      name: 'Calça Alfaiataria Azul Marinho em Lã Fria',
      category: 'calcas',
      subcategory: 'Calça Alfaiataria',
      color: 'azul',
      season: 'inverno',
      occasion: 'formal',
      brand: 'Brooksfield',
      price: 480,
      material: 'Lã Super 120 Italiana (Uso Executivo)',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop&q=80',
      emoji: '👖',
      createdAt: '2026-03-16T10:30:00.000Z',
      timesUsed: 17
    },
    {
      id: 'calca_jogger_moletom_cinza_m',
      name: 'Calça Jogger Moletom Premium Cinza',
      category: 'calcas',
      subcategory: 'Calça Jogger',
      color: 'cinza',
      season: 'inverno',
      occasion: 'esportivo',
      brand: 'Adidas Originals',
      price: 290,
      material: 'Moletom Felpado Quente (Frio 8°-16°C)',
      image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=500&auto=format&fit=crop&q=80',
      emoji: '👖',
      createdAt: '2026-03-17T16:10:00.000Z',
      timesUsed: 26
    },
    {
      id: 'calca_jeans_black_stoned_m',
      name: 'Calça Jeans Black Denim Estonada',
      category: 'calcas',
      subcategory: 'Jeans Reta',
      color: 'preto',
      season: 'primavera',
      occasion: 'casual',
      brand: 'Calvin Klein',
      price: 410,
      material: 'Denim Confort com Lavagem Estonada',
      image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=500&auto=format&fit=crop&q=80',
      emoji: '👖',
      createdAt: '2026-03-18T12:00:00.000Z',
      timesUsed: 18
    },
    {
      id: 'calca_linho_offwhite_m',
      name: 'Calça em Puro Linho Casual Off-White',
      category: 'calcas',
      subcategory: 'Calça de Linho',
      color: 'branco',
      season: 'verao',
      occasion: 'casual',
      brand: 'Osklen',
      price: 490,
      material: '100% Linho Respirável (Dias Quentes >26°C)',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&auto=format&fit=crop&q=80',
      emoji: '👖',
      createdAt: '2026-03-19T09:00:00.000Z',
      timesUsed: 10
    },
    {
      id: 'calca_veludo_cotele_marrom_m',
      name: 'Calça Veludo Cotelê Marrom Caramelo',
      category: 'calcas',
      subcategory: 'Calça Veludo',
      color: 'marrom',
      season: 'inverno',
      occasion: 'casual',
      brand: 'Massimo Dutti',
      price: 450,
      material: 'Veludo Cotelê Térmico Pesado (Frio Rigoroso)',
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop&q=80',
      emoji: '👖',
      createdAt: '2026-03-20T14:50:00.000Z',
      timesUsed: 7
    },

    /* ==================== 3. CASACOS (10 Opções Masculinas) ==================== */
    {
      id: 'jaqueta_bomber_couro_m',
      name: 'Jaqueta Bomber Couro Masculina Preto',
      category: 'casacos',
      subcategory: 'Jaqueta Bomber',
      color: 'preto',
      season: 'outono',
      occasion: 'casual',
      brand: 'Massimo Dutti',
      price: 690,
      material: 'Couro Ecológico Premium (Corta-Vento Ameno 15°-20°C)',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=80',
      emoji: '🧥',
      createdAt: '2026-03-21T18:00:00.000Z',
      timesUsed: 15
    },
    {
      id: 'sobretudo_la_cinza_m',
      name: 'Sobretudo em Lã Batida Cinza Chumbo',
      category: 'casacos',
      subcategory: 'Sobretudo / Trench',
      color: 'cinza',
      season: 'inverno',
      occasion: 'formal',
      brand: 'Brooksfield',
      price: 980,
      material: 'Lã Batida Pesada c/ Forro Térmico (Frio Intenso <14°C)',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80',
      emoji: '🧥',
      createdAt: '2026-03-22T13:10:00.000Z',
      timesUsed: 8
    },
    {
      id: 'jaqueta_jeans_sherpa_m',
      name: 'Jaqueta Jeans Forrada c/ Lã Sherpa',
      category: 'casacos',
      subcategory: 'Jaqueta Jeans',
      color: 'azul',
      season: 'inverno',
      occasion: 'casual',
      brand: "Levi's",
      price: 650,
      material: 'Denim Pesado c/ Gola e Forro em Lã Térmica',
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&auto=format&fit=crop&q=80',
      emoji: '🧥',
      createdAt: '2026-03-23T11:20:00.000Z',
      timesUsed: 11
    },
    {
      id: 'blazer_alfaiataria_azul_m',
      name: 'Blazer Alfaiataria Estruturado Azul Marinho',
      category: 'casacos',
      subcategory: 'Blazer',
      color: 'azul',
      season: 'outono',
      occasion: 'formal',
      brand: 'Zara Man',
      price: 590,
      material: 'Lã Fria e Seda (Uso Formal e Trabalho)',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=80',
      emoji: '🧥',
      createdAt: '2026-03-24T17:00:00.000Z',
      timesUsed: 13
    },
    {
      id: 'jaqueta_puffer_impermeavel_m',
      name: 'Jaqueta Puffer Térmica Impermeável Preta',
      category: 'casacos',
      subcategory: 'Jaqueta Puffer',
      color: 'preto',
      season: 'inverno',
      occasion: 'esportivo',
      brand: 'The North Face',
      price: 890,
      material: 'Isolamento de Penas Sintéticas (Frio & Chuva <10°C)',
      image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=500&auto=format&fit=crop&q=80',
      emoji: '🧥',
      createdAt: '2026-03-25T14:40:00.000Z',
      timesUsed: 9
    },
    {
      id: 'trench_coat_bege_camel_m',
      name: 'Trench Coat Clássico Impermeável Bege Camel',
      category: 'casacos',
      subcategory: 'Trench Coat',
      color: 'bege',
      season: 'inverno',
      occasion: 'formal',
      brand: 'Burberry Style',
      price: 950,
      material: 'Gabardine de Algodão Impermeabilizado (Vento e Chuva)',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=80',
      emoji: '🧥',
      createdAt: '2026-03-26T09:30:00.000Z',
      timesUsed: 6
    },
    {
      id: 'sueter_trico_merino_m',
      name: 'Suéter Tricô Gola Alta Lã Merino Marrom',
      category: 'casacos',
      subcategory: 'Suéter de Lã',
      color: 'marrom',
      season: 'inverno',
      occasion: 'casual',
      brand: 'Ralph Lauren',
      price: 540,
      material: '100% Lã Merino Australiana (Frio 8°-16°C)',
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&auto=format&fit=crop&q=80',
      emoji: '🧥',
      createdAt: '2026-03-27T15:15:00.000Z',
      timesUsed: 12
    },
    {
      id: 'cardigan_botoes_cinza_m',
      name: 'Cardigan Tricô c/ Botões Cinza Escuro',
      category: 'casacos',
      subcategory: 'Cardigan',
      color: 'cinza',
      season: 'outono',
      occasion: 'casual',
      brand: 'Massimo Dutti',
      price: 380,
      material: 'Algodão e Caxemira Leve (Ameno 14°-20°C)',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&auto=format&fit=crop&q=80',
      emoji: '🧥',
      createdAt: '2026-03-28T10:50:00.000Z',
      timesUsed: 10
    },
    {
      id: 'corta_vento_running_m',
      name: 'Jaqueta Corta-Vento Esportiva Tech Preto',
      category: 'casacos',
      subcategory: 'Corta-Vento',
      color: 'preto',
      season: 'primavera',
      occasion: 'esportivo',
      brand: 'Nike Running',
      price: 380,
      material: 'Tecido Ultraleve Impermeável à Prova de Vento',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=80',
      emoji: '🧥',
      createdAt: '2026-03-29T08:15:00.000Z',
      timesUsed: 19
    },
    {
      id: 'moletom_canguru_cinza_m',
      name: 'Moletom Canguru Premium Algodão Pesado Cinza',
      category: 'casacos',
      subcategory: 'Moletom',
      color: 'cinza',
      season: 'inverno',
      occasion: 'casual',
      brand: 'Champion',
      price: 320,
      material: 'Algodão Reverse Weave com Forro Peluciado',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=80',
      emoji: '🧥',
      createdAt: '2026-03-30T16:00:00.000Z',
      timesUsed: 24
    },

    /* ==================== 4. SHORTS & BERMUDAS (10 Opções Masculinas) ==================== */
    {
      id: 'bermuda_chino_caqui_m',
      name: 'Bermuda Chino Alfaiataria Cáqui Areia',
      category: 'shorts',
      subcategory: 'Bermuda Chino',
      color: 'bege',
      season: 'verao',
      occasion: 'casual',
      brand: 'Aramis',
      price: 260,
      material: 'Sarja Acetinada com Elastano (Calor 24°-34°C)',
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&auto=format&fit=crop&q=80',
      emoji: '🩳',
      createdAt: '2026-03-01T11:00:00.000Z',
      timesUsed: 18
    },
    {
      id: 'bermuda_jeans_denim_m',
      name: 'Bermuda Jeans Denim Médio Desfiada',
      category: 'shorts',
      subcategory: 'Bermuda Jeans',
      color: 'azul',
      season: 'verao',
      occasion: 'casual',
      brand: "Levi's",
      price: 280,
      material: 'Denim 100% Algodão com Lavagem Suave',
      image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=500&auto=format&fit=crop&q=80',
      emoji: '🩳',
      createdAt: '2026-03-02T13:30:00.000Z',
      timesUsed: 22
    },
    {
      id: 'short_linho_offwhite_m',
      name: 'Short Casual 100% Linho c/ Cordão Off-White',
      category: 'shorts',
      subcategory: 'Short de Linho',
      color: 'branco',
      season: 'verao',
      occasion: 'casual',
      brand: 'Osklen',
      price: 340,
      material: 'Puro Linho com Cós Elástico (Calor Intenso >26°C)',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&auto=format&fit=crop&q=80',
      emoji: '🩳',
      createdAt: '2026-03-03T09:40:00.000Z',
      timesUsed: 15
    },
    {
      id: 'bermuda_alfaiataria_preta_m',
      name: 'Bermuda Alfaiataria Estruturada Preta',
      category: 'shorts',
      subcategory: 'Bermuda Alfaiataria',
      color: 'preto',
      season: 'primavera',
      occasion: 'formal',
      brand: 'Zara Man',
      price: 290,
      material: 'Tecido Alfaiataria Leve (Eventos e Calor Elegante)',
      image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&auto=format&fit=crop&q=80',
      emoji: '🩳',
      createdAt: '2026-03-04T16:00:00.000Z',
      timesUsed: 11
    },
    {
      id: 'short_tactel_estampado_m',
      name: 'Short Praia Secagem Rápida Azul Estampado',
      category: 'shorts',
      subcategory: 'Short Praia',
      color: 'azul',
      season: 'verao',
      occasion: 'casual',
      brand: 'Reserva',
      price: 220,
      material: 'Poliéster Hidro-repelente (Praia e Piscina)',
      image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=500&auto=format&fit=crop&q=80',
      emoji: '🩳',
      createdAt: '2026-03-05T12:20:00.000Z',
      timesUsed: 20
    },
    {
      id: 'bermuda_cargo_militar_m',
      name: 'Bermuda Cargo Sarja Reforçada Verde Militar',
      category: 'shorts',
      subcategory: 'Bermuda Cargo',
      color: 'verde',
      season: 'primavera',
      occasion: 'casual',
      brand: 'Timberland',
      price: 310,
      material: 'Sarja 100% Algodão com Bolsos Laterais Funcionais',
      image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=500&auto=format&fit=crop&q=80',
      emoji: '🩳',
      createdAt: '2026-03-06T15:10:00.000Z',
      timesUsed: 14
    },
    {
      id: 'short_running_tech_m',
      name: 'Short Esportivo Running Dupla Camada Preto',
      category: 'shorts',
      subcategory: 'Short Esportivo',
      color: 'preto',
      season: 'verao',
      occasion: 'esportivo',
      brand: 'Nike Dri-FIT',
      price: 190,
      material: 'Tecido Tecnológico Respirável com Forro de Compressão',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=80',
      emoji: '🩳',
      createdAt: '2026-03-07T08:00:00.000Z',
      timesUsed: 30
    },
    {
      id: 'bermuda_moletom_cinza_m',
      name: 'Bermuda Moletom French Terry Cinza Claro',
      category: 'shorts',
      subcategory: 'Bermuda Moletom',
      color: 'cinza',
      season: 'primavera',
      occasion: 'casual',
      brand: 'Adidas Originals',
      price: 210,
      material: 'Algodão Terry Macio com Cós em Cordão',
      image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=500&auto=format&fit=crop&q=80',
      emoji: '🩳',
      createdAt: '2026-03-08T17:30:00.000Z',
      timesUsed: 25
    },
    {
      id: 'bermuda_chino_marinho_m',
      name: 'Bermuda Chino Casual Azul Marinho',
      category: 'shorts',
      subcategory: 'Bermuda Chino',
      color: 'azul',
      season: 'verao',
      occasion: 'casual',
      brand: 'Dudalina',
      price: 270,
      material: 'Sarja Peletizada Leve (Passeios e Almoços)',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop&q=80',
      emoji: '🩳',
      createdAt: '2026-03-09T14:15:00.000Z',
      timesUsed: 16
    },
    {
      id: 'short_linho_verde_salvia_m',
      name: 'Short Linho & Algodão Verde Sálvia',
      category: 'shorts',
      subcategory: 'Short de Linho',
      color: 'verde',
      season: 'verao',
      occasion: 'casual',
      brand: 'Richards',
      price: 320,
      material: '55% Linho 45% Algodão Nobre (Fresco e Maleável)',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=80',
      emoji: '🩳',
      createdAt: '2026-03-10T11:45:00.000Z',
      timesUsed: 12
    },

    /* ==================== 5. CALÇADOS (10 Opções Masculinas) ==================== */
    {
      id: 'tenis_minimalista_branco_m',
      name: 'Tênis Casual Couro Minimalista Branco',
      category: 'calcados',
      subcategory: 'Sneaker Casual',
      color: 'branco',
      season: 'primavera',
      occasion: 'casual',
      brand: 'Veja Campo / Vert',
      price: 620,
      material: 'Couro Bovino e Borracha Amazônica (Calor & Ameno)',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=80',
      emoji: '👟',
      createdAt: '2026-03-11T09:00:00.000Z',
      timesUsed: 35
    },
    {
      id: 'bota_chelsea_nobuck_m',
      name: 'Bota Chelsea Couro Nobuck Café',
      category: 'calcados',
      subcategory: 'Bota Chelsea',
      color: 'marrom',
      season: 'inverno',
      occasion: 'casual',
      brand: 'Democrata Garage',
      price: 460,
      material: 'Couro Legítimo Nobuck Hidrofugado (Frio e Chuva)',
      image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=500&auto=format&fit=crop&q=80',
      emoji: '👞',
      createdAt: '2026-03-12T14:20:00.000Z',
      timesUsed: 18
    },
    {
      id: 'mocassim_penny_loafer_m',
      name: 'Mocassim Penny Loafer Couro Preto',
      category: 'calcados',
      subcategory: 'Loafer / Mocassim',
      color: 'preto',
      season: 'outono',
      occasion: 'formal',
      brand: 'Sergio K',
      price: 520,
      material: 'Couro Bovino com Palmilha Acolchoada (Ameno e Trabalho)',
      image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=500&auto=format&fit=crop&q=80',
      emoji: '👞',
      createdAt: '2026-03-13T16:00:00.000Z',
      timesUsed: 14
    },
    {
      id: 'sapato_social_derby_m',
      name: 'Sapato Social Derby Couro Bovino Marrom',
      category: 'calcados',
      subcategory: 'Sapato Social',
      color: 'marrom',
      season: 'inverno',
      occasion: 'formal',
      brand: 'Richards',
      price: 590,
      material: 'Couro Legítimo com Solado Costurado (Eventos Formais)',
      image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500&auto=format&fit=crop&q=80',
      emoji: '👞',
      createdAt: '2026-03-14T11:10:00.000Z',
      timesUsed: 12
    },
    {
      id: 'tenis_running_ultraboost_m',
      name: 'Tênis Running Ultraboost Preto/Branco',
      category: 'calcados',
      subcategory: 'Tênis Esportivo',
      color: 'preto',
      season: 'verao',
      occasion: 'esportivo',
      brand: 'Adidas Performance',
      price: 790,
      material: 'Primeknit Respirável e Amortecimento Boost (Corrida)',
      image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500&auto=format&fit=crop&q=80',
      emoji: '👟',
      createdAt: '2026-03-15T07:45:00.000Z',
      timesUsed: 40
    },
    {
      id: 'coturno_militar_tratorado_m',
      name: 'Coturno Militar em Couro Tratorado Preto',
      category: 'calcados',
      subcategory: 'Coturno',
      color: 'preto',
      season: 'inverno',
      occasion: 'casual',
      brand: 'Macboot',
      price: 530,
      material: 'Couro Floter Grosso c/ Solado Antiderrapante (Frio Rigoroso)',
      image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500&auto=format&fit=crop&q=80',
      emoji: '👞',
      createdAt: '2026-03-16T17:30:00.000Z',
      timesUsed: 16
    },
    {
      id: 'sandalia_birken_couro_m',
      name: 'Sandália Birkenstock Couro Legítimo Marrom',
      category: 'calcados',
      subcategory: 'Sandália',
      color: 'marrom',
      season: 'verao',
      occasion: 'casual',
      brand: 'Birkenstock Arizona',
      price: 480,
      material: 'Couro Nobuck com Palmilha Anatômica de Cortiça (Calor)',
      image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=500&auto=format&fit=crop&q=80',
      emoji: '👞',
      createdAt: '2026-03-17T12:40:00.000Z',
      timesUsed: 22
    },
    {
      id: 'tenis_retro_skate_m',
      name: 'Tênis Camurça Retrô Old Skool Preto',
      category: 'calcados',
      subcategory: 'Sneaker Skate',
      color: 'preto',
      season: 'primavera',
      occasion: 'casual',
      brand: 'Vans',
      price: 380,
      material: 'Lona Reforçada e Camurça com Sola Waffle',
      image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&auto=format&fit=crop&q=80',
      emoji: '👟',
      createdAt: '2026-03-18T15:15:00.000Z',
      timesUsed: 31
    },
    {
      id: 'slipon_couro_perfurado_m',
      name: 'Tênis Slip-On Couro Perfurado Azul Marinho',
      category: 'calcados',
      subcategory: 'Slip-On',
      color: 'azul',
      season: 'verao',
      occasion: 'casual',
      brand: 'Richards',
      price: 360,
      material: 'Couro Microperfurado Respirável sem Cadarço',
      image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&auto=format&fit=crop&q=80',
      emoji: '👟',
      createdAt: '2026-03-19T10:00:00.000Z',
      timesUsed: 19
    },
    {
      id: 'bota_hiking_timberland_m',
      name: 'Bota Hiking Impermeável Trilha Nobuck Bege',
      category: 'calcados',
      subcategory: 'Bota Trilha',
      color: 'bege',
      season: 'inverno',
      occasion: 'casual',
      brand: 'Timberland Premium',
      price: 820,
      material: 'Couro À Prova D\'Água com Isolamento PrimaLoft (Chuva & Neve)',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80',
      emoji: '👞',
      createdAt: '2026-03-20T13:50:00.000Z',
      timesUsed: 11
    },

    /* ==================== 6. ACESSÓRIOS (10 Opções Masculinas) ==================== */
    {
      id: 'mochila_couro_executiva_m',
      name: 'Mochila Executiva em Couro Legítimo Preto',
      category: 'acessorios',
      subcategory: 'Mochila',
      color: 'preto',
      season: 'outono',
      occasion: 'formal',
      brand: 'Nordweg',
      price: 790,
      material: 'Couro Legítimo com Compartimento p/ Notebook (Todas as Estações)',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80',
      emoji: '💎',
      createdAt: '2026-03-21T09:30:00.000Z',
      timesUsed: 35
    },
    {
      id: 'relogio_cronografo_aco_m',
      name: 'Relógio Cronógrafo Aço Inoxidável Prata/Preto',
      category: 'acessorios',
      subcategory: 'Relógio',
      color: 'preto',
      season: 'inverno',
      occasion: 'formal',
      brand: 'Seiko Automatic',
      price: 1250,
      material: 'Aço Inox 316L e Vidro de Safira (Resistente à Água 100m)',
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format&fit=crop&q=80',
      emoji: '💎',
      createdAt: '2026-03-22T11:00:00.000Z',
      timesUsed: 42
    },
    {
      id: 'oculos_sol_aviador_m',
      name: 'Óculos de Sol Aviador Clássico Dourado/Verde',
      category: 'acessorios',
      subcategory: 'Óculos de Sol',
      color: 'verde',
      season: 'verao',
      occasion: 'casual',
      brand: 'Ray-Ban Aviator',
      price: 680,
      material: 'Armação em Metal Dourado com Lentes G-15 UV400 (Dias de Sol)',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=80',
      emoji: '💎',
      createdAt: '2026-03-23T14:00:00.000Z',
      timesUsed: 28
    },
    {
      id: 'cinto_couro_duplaface_m',
      name: 'Cinto em Couro Legítimo Dupla Face Preto/Marrom',
      category: 'acessorios',
      subcategory: 'Cinto',
      color: 'marrom',
      season: 'outono',
      occasion: 'formal',
      brand: 'Fasolo',
      price: 180,
      material: 'Couro Bovino Genuíno com Fivela Giratória em Metal Fosco',
      image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=500&auto=format&fit=crop&q=80',
      emoji: '💎',
      createdAt: '2026-03-24T16:20:00.000Z',
      timesUsed: 31
    },
    {
      id: 'gorro_la_canelado_m',
      name: 'Gorro em Lã Merino Canelada Cinza Chumbo',
      category: 'acessorios',
      subcategory: 'Gorro de Lã',
      color: 'cinza',
      season: 'inverno',
      occasion: 'casual',
      brand: 'The North Face',
      price: 160,
      material: '100% Lã Merino Isolante Térmica (Frio Intenso <12°C)',
      image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&auto=format&fit=crop&q=80',
      emoji: '💎',
      createdAt: '2026-03-25T18:15:00.000Z',
      timesUsed: 14
    },
    {
      id: 'cachecol_xadrez_la_m',
      name: 'Cachecol em Lã e Caxemira Xadrez Tartan',
      category: 'acessorios',
      subcategory: 'Cachecol',
      color: 'bege',
      season: 'inverno',
      occasion: 'formal',
      brand: 'Burberry Pattern',
      price: 340,
      material: '90% Lã Pura 10% Caxemira Macia (Proteção no Pescoço)',
      image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500&auto=format&fit=crop&q=80',
      emoji: '💎',
      createdAt: '2026-03-26T10:45:00.000Z',
      timesUsed: 9
    },
    {
      id: 'bone_dad_hat_preto_m',
      name: 'Boné Dad Hat Algodão Estonado Preto',
      category: 'acessorios',
      subcategory: 'Boné',
      color: 'preto',
      season: 'verao',
      occasion: 'casual',
      brand: 'New Era',
      price: 150,
      material: '100% Algodão Sarja com Fecho em Fivela Metálica',
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&auto=format&fit=crop&q=80',
      emoji: '💎',
      createdAt: '2026-03-27T15:30:00.000Z',
      timesUsed: 27
    },
    {
      id: 'carteira_slim_couro_m',
      name: 'Carteira Slim com Bloqueio RFID Couro Café',
      category: 'acessorios',
      subcategory: 'Carteira',
      color: 'marrom',
      season: 'primavera',
      occasion: 'casual',
      brand: 'Nordweg',
      price: 190,
      material: 'Couro Legítimo c/ Proteção Antifurto Contactless',
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop&q=80',
      emoji: '💎',
      createdAt: '2026-03-28T12:00:00.000Z',
      timesUsed: 45
    },
    {
      id: 'mala_weekend_duffle_couro_m',
      name: 'Mala de Viagem Weekend Duffle em Couro Marrom',
      category: 'acessorios',
      subcategory: 'Mala de Viagem',
      color: 'marrom',
      season: 'inverno',
      occasion: 'casual',
      brand: 'Vittoria Leather',
      price: 890,
      material: 'Couro Legítimo Impermeabilizado com Alça Transversal',
      image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500&auto=format&fit=crop&q=80',
      emoji: '💎',
      createdAt: '2026-03-29T17:10:00.000Z',
      timesUsed: 12
    },
    {
      id: 'relogio_couro_minimalista_m',
      name: 'Relógio Minimalista Mostrador Branco Pulseira Marrom',
      category: 'acessorios',
      subcategory: 'Relógio',
      color: 'marrom',
      season: 'outono',
      occasion: 'formal',
      brand: 'Daniel Wellington',
      price: 650,
      material: 'Caixa Slim Ultrafina em Ouro Rosé e Couro Italiano',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=80',
      emoji: '💎',
      createdAt: '2026-03-30T14:40:00.000Z',
      timesUsed: 23
    }
  ],

  DEFAULT_OUTFITS: [
    {
      id: 'outfit_calor_casual',
      name: 'Look Calor & Verão Urbano',
      items: {
        top: {
          id: 'camisa_linho_offwhite_m',
          name: 'Camisa de Linho Manga Curta Off-White',
          category: 'camisas',
          color: 'branco',
          image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=80',
          brand: 'Osklen'
        },
        bottom: {
          id: 'bermuda_chino_caqui_m',
          name: 'Bermuda Chino Alfaiataria Cáqui Areia',
          category: 'shorts',
          color: 'bege',
          image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&auto=format&fit=crop&q=80',
          brand: 'Aramis'
        },
        shoes: {
          id: 'tenis_minimalista_branco_m',
          name: 'Tênis Casual Couro Minimalista Branco',
          category: 'calcados',
          color: 'branco',
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=80',
          brand: 'Veja Campo'
        },
        accessories: {
          id: 'oculos_sol_aviador_m',
          name: 'Óculos de Sol Aviador Clássico Dourado/Verde',
          category: 'acessorios',
          color: 'verde',
          image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=80',
          brand: 'Ray-Ban'
        }
      },
      createdAt: '2026-03-26T15:00:00.000Z'
    },
    {
      id: 'outfit_frio_elegante',
      name: 'Look Frio Intenso & Trabalho',
      items: {
        top: {
          id: 'sobretudo_la_cinza_m',
          name: 'Sobretudo em Lã Batida Cinza Chumbo',
          category: 'casacos',
          color: 'cinza',
          image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80',
          brand: 'Brooksfield'
        },
        bottom: {
          id: 'calca_alfaiataria_cinza_m',
          name: 'Calça Alfaiataria Slim Cinza Mescla',
          category: 'calcas',
          color: 'cinza',
          image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&auto=format&fit=crop&q=80',
          brand: 'Zara Man'
        },
        shoes: {
          id: 'bota_chelsea_nobuck_m',
          name: 'Bota Chelsea Couro Nobuck Café',
          category: 'calcados',
          color: 'marrom',
          image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=500&auto=format&fit=crop&q=80',
          brand: 'Democrata Garage'
        },
        accessories: {
          id: 'mochila_couro_executiva_m',
          name: 'Mochila Executiva em Couro Legítimo Preto',
          category: 'acessorios',
          color: 'preto',
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80',
          brand: 'Nordweg'
        }
      },
      createdAt: '2026-03-27T19:30:00.000Z'
    },
    {
      id: 'outfit_meia_estacao_urbano',
      name: 'Look Meia-Estação Urbano',
      items: {
        top: {
          id: 'jaqueta_bomber_couro_m',
          name: 'Jaqueta Bomber Couro Masculina Preto',
          category: 'casacos',
          color: 'preto',
          image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=80',
          brand: 'Massimo Dutti'
        },
        bottom: {
          id: 'calca_jeans_raw_m',
          name: 'Calça Jeans Raw Denim Slim Azul Escuro',
          category: 'calcas',
          color: 'azul',
          image: 'https://images.unsplash.com/photo-1542272604-780c96856592?w=500&auto=format&fit=crop&q=80',
          brand: "Levi's 511"
        },
        shoes: {
          id: 'tenis_minimalista_branco_m',
          name: 'Tênis Casual Couro Minimalista Branco',
          category: 'calcados',
          color: 'branco',
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=80',
          brand: 'Veja Campo'
        },
        accessories: {
          id: 'relogio_cronografo_aco_m',
          name: 'Relógio Cronógrafo Aço Inoxidável Prata/Preto',
          category: 'acessorios',
          color: 'preto',
          image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format&fit=crop&q=80',
          brand: 'Seiko'
        }
      },
      createdAt: '2026-03-28T14:00:00.000Z'
    }
  ],

  /* ---------- Data Structure ---------- */
  createItem(data) {
    return {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      name: data.name || '',
      category: data.category || '',
      subcategory: data.subcategory || '',
      color: data.color || '',
      season: data.season || '',
      occasion: data.occasion || '',
      brand: data.brand || '',
      price: Number(data.price) || 0,
      material: data.material || '',
      image: data.image || null,
      emoji: data.emoji || null,
      createdAt: new Date().toISOString(),
      timesUsed: 0
    };
  },

  createOutfit(name, items) {
    return {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      name: name || 'Outfit sem nome',
      items: { ...items },
      createdAt: new Date().toISOString()
    };
  },

  /* ---------- Storage ---------- */
  getItems() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Check if the 60 items are present; if missing, merge them!
          const existingIds = new Set(parsed.map(i => i.id));
          const missingDefaults = this.DEFAULT_ITEMS.filter(d => !existingIds.has(d.id));
          if (missingDefaults.length > 0) {
            const merged = [...parsed, ...missingDefaults];
            this.saveItems(merged);
            return merged;
          }
          return parsed;
        }
      }
      this.saveItems(this.DEFAULT_ITEMS);
      return this.DEFAULT_ITEMS;
    } catch {
      this.saveItems(this.DEFAULT_ITEMS);
      return this.DEFAULT_ITEMS;
    }
  },

  saveItems(items) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  },

  addItem(item) {
    const items = this.getItems();
    items.push(item);
    this.saveItems(items);
    return items;
  },

  updateItem(id, updates) {
    const items = this.getItems();
    const idx = items.findIndex(i => i.id === id);
    if (idx !== -1) {
      items[idx] = { ...items[idx], ...updates };
      this.saveItems(items);
    }
    return items;
  },

  deleteItem(id) {
    let items = this.getItems();
    items = items.filter(i => i.id !== id);
    this.saveItems(items);
    return items;
  },

  getItemById(id) {
    return this.getItems().find(i => i.id === id) || null;
  },

  seedDefaultData(force = false) {
    if (force || !localStorage.getItem(this.STORAGE_KEY)) {
      this.saveItems(this.DEFAULT_ITEMS);
    }
    if (force || !localStorage.getItem(this.OUTFITS_KEY)) {
      this.saveOutfits(this.DEFAULT_OUTFITS);
    }
    return {
      items: this.getItems(),
      outfits: this.getOutfits()
    };
  },

  /* ---------- Cost Helpers ---------- */
  getCPW(item) {
    const price = Number(item.price) || 0;
    if (price <= 0) return null;
    const uses = Math.max(Number(item.timesUsed) || 0, 1);
    return price / uses;
  },

  formatBRL(value) {
    return `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  },

  /* ---------- Outfits Storage ---------- */
  getOutfits() {
    try {
      const stored = localStorage.getItem(this.OUTFITS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      this.saveOutfits(this.DEFAULT_OUTFITS);
      return this.DEFAULT_OUTFITS;
    } catch {
      this.saveOutfits(this.DEFAULT_OUTFITS);
      return this.DEFAULT_OUTFITS;
    }
  },

  saveOutfits(outfits) {
    localStorage.setItem(this.OUTFITS_KEY, JSON.stringify(outfits));
  },

  addOutfit(outfit) {
    const outfits = this.getOutfits();
    outfits.push(outfit);
    this.saveOutfits(outfits);
    return outfits;
  },

  deleteOutfit(id) {
    let outfits = this.getOutfits();
    outfits = outfits.filter(o => o.id !== id);
    this.saveOutfits(outfits);
    return outfits;
  },

  /* ---------- Category Emoji Map ---------- */
  categoryEmojis: {
    camisas: '👔',
    calcas: '👖',
    shorts: '🩳',
    casacos: '🧥',
    calcados: '👞',
    sapatos: '👟',
    acessorios: '💎',
    vestidos: '👗'
  },

  categoryZone: {
    camisas: 'top',
    casacos: 'top',
    vestidos: 'top',
    calcas: 'bottom',
    shorts: 'bottom',
    sapatos: 'shoes',
    calcados: 'shoes',
    acessorios: 'accessories'
  },

  /* ---------- Color Hex Map ---------- */
  colorHex: {
    preto: '#1a1a1a',
    branco: '#f5f5f5',
    azul: '#4A6FA5',
    vermelho: '#C45B5B',
    verde: '#5A7A5A',
    bege: '#C4B59B',
    rosa: '#D4A0A0',
    cinza: '#8A8A8A',
    marrom: '#7A5A3A'
  },

  /* ---------- Category Label Map ---------- */
  categoryLabels: {
    camisas: 'Camisas',
    calcas: 'Calças',
    shorts: 'Shorts & Bermudas',
    casacos: 'Casacos',
    calcados: 'Calçados',
    sapatos: 'Sapatos',
    acessorios: 'Acessórios',
    vestidos: 'Vestidos'
  },

  colorLabels: {
    preto: 'Preto',
    branco: 'Branco',
    azul: 'Azul',
    vermelho: 'Vermelho',
    verde: 'Verde',
    bege: 'Bege',
    rosa: 'Rosa',
    cinza: 'Cinza',
    marrom: 'Marrom'
  },

  seasonLabels: {
    primavera: 'Primavera',
    verao: 'Verão',
    outono: 'Outono',
    inverno: 'Inverno'
  },

  occasionLabels: {
    casual: 'Casual',
    formal: 'Formal',
    esportivo: 'Esportivo',
    festa: 'Festa'
  }
};

/* ---------- Category-to-Zone helper ---------- */
function getCategoryZone(category) {
  return WardrobeDB.categoryZone[category] || 'accessories';
}

