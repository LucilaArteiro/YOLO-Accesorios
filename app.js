/* =========================================
   YOLO! ACCESORIOS
   Desarrollado por Lucila Studio
   Maqueta web interactiva
========================================= */

'use strict'

/* =========================================
   FUNCIONES GENERALES
========================================= */

const $ = id => document.getElementById(id)

const $$ = selector => [...document.querySelectorAll(selector)]

const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 9)

const money = value =>
  Number(value || 0).toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  })

const escapeHTML = value =>
  String(value ?? '').replace(
    /[&<>"']/g,
    char =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[char])
  )

const text = escapeHTML

const value = id => $(id).value.trim()

const number = id => Math.max(0, Number($(id).value) || 0)

const checked = id => $(id).checked

const on = (id, event, callback) => {
  $(id)?.addEventListener(event, callback)
}

const setText = (id, content) => {
  if ($(id)) $(id).textContent = content
}

const STORAGE_KEY = 'yolo_maqueta_v1'

/* =========================================
   IMÁGENES PROVISORIAS
========================================= */

function placeholder (name = 'YOLO!', color = '#8611a5') {
  const svg = `
        <svg xmlns="http://www.w3.org/2000/svg"
             width="600" height="650"
             viewBox="0 0 600 650">

            <rect width="600" height="650" fill="#f4edf8"/>

            <circle cx="480" cy="100" r="150"
                    fill="#ffdf00" opacity=".65"/>

            <circle cx="100" cy="560" r="180"
                    fill="#00cde5" opacity=".35"/>

            <rect x="190" y="90" width="220" height="390"
                  rx="38" fill="${color}"/>

            <rect x="210" y="110" width="75" height="85"
                  rx="18" fill="#ffffff" opacity=".8"/>

            <circle cx="232" cy="134" r="13" fill="#333"/>

            <circle cx="262" cy="165" r="13" fill="#333"/>

            <text x="300" y="320"
                  text-anchor="middle"
                  fill="#ffffff"
                  font-family="Arial"
                  font-size="44"
                  font-weight="bold">YOLO!</text>

            <text x="300" y="550"
                  text-anchor="middle"
                  font-family="Arial"
                  font-size="23"
                  font-weight="bold"
                  fill="#46105f">${text(name)}</text>

        </svg>
    `

  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg)
}

function safeImage (src, name = 'YOLO!') {
  if (
    typeof src === 'string' &&
    /^(data:image\/|assets\/|https:\/\/)/i.test(src)
  ) {
    return src
  }

  return placeholder(name)
}

function imageHTML (src, name, className = '') {
  return `
        <img
            src="${text(safeImage(src, name))}"
            alt="${text(name)}"
            class="${text(className)}"
            loading="lazy"
            data-fallback="${text(name)}"
        >
    `
}

document.addEventListener(
  'error',
  event => {
    const img = event.target

    if (img.tagName === 'IMG' && !img.dataset.failed) {
      img.dataset.failed = 'true'

      img.src = placeholder(img.dataset.fallback || img.alt || 'YOLO!')
    }
  },
  true
)

/* =========================================
   DATOS DE DEMOSTRACIÓN
========================================= */

const initialData = {
  categories: [
    {
      id: 'cat1',
      name: 'Fundas',
      icon: 'fa-mobile-screen-button',
      parent: '',
      image: ''
    },

    {
      id: 'cat2',
      name: 'Cargadores',
      icon: 'fa-plug',
      parent: '',
      image: ''
    },

    {
      id: 'cat3',
      name: 'Auriculares',
      icon: 'fa-headphones',
      parent: '',
      image: ''
    },

    {
      id: 'cat4',
      name: 'Cables',
      icon: 'fa-bolt',
      parent: '',
      image: ''
    },

    {
      id: 'cat5',
      name: 'Protectores',
      icon: 'fa-shield-halved',
      parent: '',
      image: ''
    },

    {
      id: 'cat6',
      name: 'Accesorios',
      icon: 'fa-star',
      parent: '',
      image: ''
    }
  ],

  brands: [
    { id: 'b1', name: 'Apple' },
    { id: 'b2', name: 'Samsung' },
    { id: 'b3', name: 'Motorola' },
    { id: 'b4', name: 'Xiaomi' }
  ],

  models: [
    { id: 'm1', brand: 'b1', name: 'iPhone 13' },
    { id: 'm2', brand: 'b1', name: 'iPhone 14' },
    { id: 'm3', brand: 'b1', name: 'iPhone 15' },
    { id: 'm4', brand: 'b1', name: 'iPhone 16' },

    { id: 'm5', brand: 'b2', name: 'Galaxy A55' },
    { id: 'm6', brand: 'b2', name: 'Galaxy S24' },
    { id: 'm7', brand: 'b2', name: 'Galaxy S25' },

    { id: 'm8', brand: 'b3', name: 'Moto G54' },
    { id: 'm9', brand: 'b3', name: 'Moto G84' },

    { id: 'm10', brand: 'b4', name: 'Redmi Note 13' }
  ],

  products: [
    {
      id: 'p1',
      name: 'Funda MagSafe transparente',
      description:
        'Funda transparente con protección reforzada y anillo magnético.',
      sku: 'YOLO-001',
      category: 'cat1',
      brand: 'b1',
      model: 'm3',
      price: 18000,
      salePrice: 15000,
      stock: 15,
      featured: true,
      status: 'published',
      images: ['assets/productos/funda-magsafe.jpg'],
      variants: [],
      created: 1
    },

    {
      id: 'p2',
      name: 'Funda silicona rosa',
      description: 'Funda suave al tacto, liviana y resistente.',
      sku: 'YOLO-002',
      category: 'cat1',
      brand: 'b1',
      model: 'm4',
      price: 12500,
      salePrice: 0,
      stock: 20,
      featured: true,
      status: 'published',
      images: ['assets/productos/funda-rosa.jpg'],
      variants: [
        { color: 'Rosa', model: 'iPhone 16', stock: 12 },
        { color: 'Violeta', model: 'iPhone 16', stock: 8 }
      ],
      created: 2
    },

    {
      id: 'p3',
      name: 'Cargador rápido USB-C',
      description: 'Cargador compacto para dispositivos compatibles.',
      sku: 'YOLO-003',
      category: 'cat2',
      brand: '',
      model: '',
      price: 18500,
      salePrice: 0,
      stock: 4,
      featured: true,
      status: 'published',
      images: ['assets/productos/cargador.jpg'],
      variants: [],
      created: 3
    },

    {
      id: 'p4',
      name: 'Auriculares Bluetooth',
      description: 'Auriculares inalámbricos con estuche de carga.',
      sku: 'YOLO-004',
      category: 'cat3',
      brand: '',
      model: '',
      price: 29000,
      salePrice: 25000,
      stock: 12,
      featured: true,
      status: 'published',
      images: ['assets/productos/auriculares.jpg'],
      variants: [],
      created: 4
    },

    {
      id: 'p5',
      name: 'Cable USB-C reforzado',
      description: 'Cable resistente para carga y transferencia de datos.',
      sku: 'YOLO-005',
      category: 'cat4',
      brand: '',
      model: '',
      price: 8500,
      salePrice: 0,
      stock: 30,
      featured: false,
      status: 'published',
      images: ['assets/productos/cable.jpg'],
      variants: [],
      created: 5
    },

    {
      id: 'p6',
      name: 'Vidrio templado',
      description: 'Protector de pantalla para Samsung Galaxy A55.',
      sku: 'YOLO-006',
      category: 'cat5',
      brand: 'b2',
      model: 'm5',
      price: 6500,
      salePrice: 0,
      stock: 3,
      featured: false,
      status: 'published',
      images: ['assets/productos/vidrio.jpg'],
      variants: [],
      created: 6
    },

    {
      id: 'p7',
      name: 'Soporte para celular',
      description: 'Soporte práctico para escritorio.',
      sku: 'YOLO-007',
      category: 'cat6',
      brand: '',
      model: '',
      price: 9500,
      salePrice: 0,
      stock: 0,
      featured: false,
      status: 'published',
      images: ['assets/productos/soporte.jpg'],
      variants: [],
      created: 7
    },

    {
      id: 'p8',
      name: 'Funda antigolpes',
      description: 'Funda con bordes reforzados.',
      sku: 'YOLO-008',
      category: 'cat1',
      brand: 'b2',
      model: 'm7',
      price: 16000,
      salePrice: 0,
      stock: 10,
      featured: false,
      status: 'published',
      images: ['assets/productos/funda-antigolpes.jpg'],
      variants: [],
      created: 8
    },

    {
      id: 'p9',
      name: 'Nueva funda con diseño',
      description: 'Producto pendiente de publicación.',
      sku: 'YOLO-009',
      category: 'cat1',
      brand: 'b1',
      model: 'm4',
      price: 14500,
      salePrice: 0,
      stock: 8,
      featured: false,
      status: 'draft',
      images: [],
      variants: [],
      created: 9
    }
  ],

  promotions: [
    {
      id: 'promo1',
      title: '¡Ofertas en fundas!',
      description: 'Renová el estilo de tu celular.',
      discount: 15,
      start: '',
      end: '',
      products: ['p1'],
      image: '',
      active: true
    },

    {
      id: 'promo2',
      title: 'Especial tecnología',
      description: 'Descubrí accesorios seleccionados.',
      discount: 10,
      start: '',
      end: '',
      products: ['p4'],
      image: '',
      active: true
    }
  ],

  branches: [
    {
      id: 'branch1',
      name: 'Sucursal de demostración 1',
      address: 'Dirección a confirmar',
      hours: 'Horarios a confirmar',
      phone: '',
      map: '',
      image: ''
    },

    {
      id: 'branch2',
      name: 'Sucursal de demostración 2',
      address: 'Dirección a confirmar',
      hours: 'Horarios a confirmar',
      phone: '',
      map: '',
      image: ''
    }
  ],

  customization: {
    logo: '',
    primary: '#8611a5',
    secondary: '#f500a1',
    accent: '#ffdf00',

    heroImage: 'assets/portadas/hero.png',

    heroTitle: 'Tu celular. Tu estilo.',

    heroDescription:
      'Descubrí fundas, accesorios y tecnología para acompañarte todos los días.',

    announcement: '¡Encontrá los mejores accesorios para tu celular!',

    sections: {
      benefits: true,
      categories: true,
      featured: true,
      promotions: true,
      branches: true
    },

    order: [
      'benefits',
      'categories',
      'featured',
      'promotions',
      'catalog',
      'branches'
    ]
  },

  settings: {
    name: 'YOLO! Accesorios',
    email: '',
    whatsapp: '',
    instagram: 'https://www.instagram.com/yolo_accesorios_cel/',
    orderMessage:
      '¡Hola YOLO! Me gustaría consultar por los siguientes productos:',
    stockLimit: 5,
    showStock: true,
    hideEmpty: false
  },

  cart: []
}

/* =========================================
   ALMACENAMIENTO LOCAL
========================================= */

function clone (data) {
  return JSON.parse(JSON.stringify(data))
}

function loadData () {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (saved) {
      const parsed = JSON.parse(saved)

      return {
        ...clone(initialData),
        ...parsed
      }
    }
  } catch (error) {
    console.warn('No se pudieron cargar los datos.', error)
  }

  return clone(initialData)
}

let db = loadData()

function saveData () {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db))

    return true
  } catch (error) {
    toast('No hay espacio suficiente para guardar los cambios.', 'error')

    return false
  }
}

function commit (message) {
  if (!saveData()) {
    db = loadData()
    renderAll()

    return false
  }

  renderAll()

  if (message) toast(message)

  return true
}

/* =========================================
   NOTIFICACIONES
========================================= */

function toast (message, type = 'success') {
  const container = $('toast-container')

  const item = document.createElement('div')

  item.className = `toast ${type}`

  const icons = {
    success: 'fa-circle-check',
    error: 'fa-circle-xmark',
    warning: 'fa-triangle-exclamation',
    info: 'fa-circle-info'
  }

  item.innerHTML = `
        <i class="fa-solid ${icons[type] || icons.info}"></i>
        <span>${text(message)}</span>
    `

  container.appendChild(item)

  setTimeout(() => item.remove(), 3500)
}

/* =========================================
   CONFIRMACIÓN DE ACCIONES
========================================= */

let confirmAction = null

function confirmDialog (message, callback) {
  setText('confirm-message', message)

  confirmAction = callback

  $('confirm-modal').showModal()
}

on('confirm-cancel', 'click', () => {
  confirmAction = null

  $('confirm-modal').close()
})

on('confirm-accept', 'click', () => {
  const action = confirmAction

  confirmAction = null

  $('confirm-modal').close()

  if (action) action()
})

/* =========================================
   NAVEGACIÓN TIENDA / PANEL
========================================= */

function openAdmin () {
  closeCart()

  $('store-navigation').classList.remove('open')

  $('store-view').hidden = true

  $('admin-view').hidden = false

  showAdminSection('dashboard')

  window.scrollTo(0, 0)
}

function openStore () {
  closeAdminMenu()

  $('admin-view').hidden = true

  $('store-view').hidden = false

  renderAll()

  window.scrollTo(0, 0)
}

function showAdminSection (section) {
  const target = $(`admin-${section}`)

  if (!target) return

  $$('.admin-section').forEach(item => {
    item.hidden = item !== target
  })

  $$('.admin-nav-btn').forEach(button => {
    button.classList.toggle('active', button.dataset.section === section)
  })

  closeAdminMenu()

  window.scrollTo(0, 0)
}

function closeAdminMenu () {
  $('admin-sidebar').classList.remove('open')

  $('admin-menu-overlay').hidden = true

  document.body.classList.remove('menu-open')
}

on('open-admin-btn', 'click', openAdmin)

on('back-store-btn', 'click', openStore)

on('sidebar-back-store', 'click', openStore)

on('mobile-menu-btn', 'click', () => {
  $('store-navigation').classList.toggle('open')
})

on('admin-menu-btn', 'click', () => {
  $('admin-sidebar').classList.add('open')

  $('admin-menu-overlay').hidden = false

  document.body.classList.add('menu-open')
})

on('admin-menu-overlay', 'click', closeAdminMenu)

$$('.store-navigation a').forEach(link => {
  link.addEventListener('click', () => {
    $('store-navigation').classList.remove('open')
  })
})

$$('.admin-nav-btn').forEach(button => {
  button.addEventListener('click', () => {
    if (button.dataset.section === 'add-product') {
      resetProductForm()
    }

    showAdminSection(button.dataset.section)
  })
})

$$('[data-go]').forEach(button => {
  button.addEventListener('click', () => {
    if (button.dataset.go === 'add-product') {
      resetProductForm()
    }

    showAdminSection(button.dataset.go)
  })
})

/* =========================================
   FUNCIONES DE PRODUCTOS
========================================= */

function getProduct (id) {
  return db.products.find(product => product.id === id)
}

function categoryName (id) {
  return db.categories.find(item => item.id === id)?.name || 'Sin categoría'
}

function brandName (id) {
  return db.brands.find(item => item.id === id)?.name || 'Universal'
}

function modelName (id) {
  return db.models.find(item => item.id === id)?.name || 'Universal'
}

function productStock (product) {
  if (product.variants?.length) {
    return product.variants.reduce(
      (total, variant) => total + Number(variant.stock || 0),
      0
    )
  }

  return Number(product.stock || 0)
}

function stockType (product) {
  const stock = productStock(product)

  if (stock === 0) return 'empty'

  if (stock <= db.settings.stockLimit) return 'low'

  return 'available'
}

function stockBadge (product) {
  const stock = productStock(product)

  const type = stockType(product)

  if (type === 'empty') {
    return `<span class="stock-status stock-empty">Agotado</span>`
  }

  if (type === 'low') {
    return `<span class="stock-status stock-low">Últimas unidades (${stock})</span>`
  }

  return `<span class="stock-status">Disponible</span>`
}

function activePromotions () {
  const now = new Date()

  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0')
  ].join('-')

  return db.promotions.filter(promo => {
    return (
      promo.active &&
      (!promo.start || promo.start <= today) &&
      (!promo.end || promo.end >= today)
    )
  })
}

function productPrice (product) {
  let price = Number(product.price || 0)

  if (product.salePrice > 0 && product.salePrice < price) {
    price = product.salePrice
  }

  activePromotions().forEach(promo => {
    if (promo.products.includes(product.id)) {
      const discounted = product.price * (1 - promo.discount / 100)

      price = Math.min(price, discounted)
    }
  })

  return Math.max(0, Math.round(price))
}

function publicProducts () {
  return db.products.filter(product => {
    if (product.status !== 'published') return false

    if (db.settings.hideEmpty && productStock(product) === 0) return false

    return true
  })
}

/* =========================================
   RENDERIZAR CATEGORÍAS
========================================= */

function renderCategories () {
  $('category-grid').innerHTML = db.categories

    .filter(category => !category.parent)

    .map(category => {
      const count = publicProducts().filter(product => {
        const child = db.categories.find(item => item.id === product.category)

        return product.category === category.id || child?.parent === category.id
      }).length

      return `
                <button type="button"
                        class="category-card"
                        data-action="filter-category"
                        data-id="${text(category.id)}">

                    <div class="category-icon">

                        ${
                          category.image
                            ? imageHTML(category.image, category.name)
                            : `<i class="fa-solid ${text(
                                category.icon || 'fa-layer-group'
                              )}"></i>`
                        }

                    </div>

                    <h3>${text(category.name)}</h3>

                    <p>${count} productos</p>

                </button>
            `
    })
    .join('')
}

/* =========================================
   TARJETAS DE PRODUCTOS
========================================= */

function productCard (product) {
  const price = productPrice(product)

  const hasDiscount = price < product.price

  const discount = hasDiscount
    ? Math.round((1 - price / product.price) * 100)
    : 0

  return `

        <article class="product-card">

            <div class="product-image"
                 data-action="detail"
                 data-id="${text(product.id)}">

                ${
                  hasDiscount
                    ? `<span class="sale-badge">-${discount}%</span>`
                    : ''
                }

                ${imageHTML(product.images[0], product.name)}

            </div>

            <div class="product-info">

                <span class="product-category">
                    ${text(categoryName(product.category))}
                </span>

                <h3>${text(product.name)}</h3>

                <p class="product-model">
                    ${text(brandName(product.brand))}
                    ${product.model ? text(modelName(product.model)) : ''}
                </p>

                <div class="product-prices">

                    <strong class="product-price">
                        ${money(price)}
                    </strong>

                    ${
                      hasDiscount
                        ? `<span class="old-price">${money(
                            product.price
                          )}</span>`
                        : ''
                    }

                </div>

                ${db.settings.showStock ? stockBadge(product) : ''}

                <div class="product-actions">

                    <button type="button"
                            class="secondary-button"
                            data-action="detail"
                            data-id="${text(product.id)}">

                        Ver producto

                    </button>

                    <button type="button"
                            class="add-to-cart-btn"
                            data-action="add-cart"
                            data-id="${text(product.id)}"
                            ${productStock(product) === 0 ? 'disabled' : ''}>

                        <i class="fa-solid fa-bag-shopping"></i>

                        ${
                          productStock(product) === 0
                            ? 'Sin stock'
                            : 'Agregar al carrito'
                        }

                    </button>

                </div>

            </div>

        </article>

    `
}

/* =========================================
   CATÁLOGO Y FILTROS
========================================= */

function renderCatalog () {
  let products = publicProducts()

  const search = value('store-search').toLowerCase()

  const category = value('filter-category')

  const brand = value('filter-brand')

  const model = value('filter-model')

  const color = value('filter-color')

  const order = value('filter-price')

  products = products.filter(product => {
    const searchable = [
      product.name,
      product.description,
      product.sku,
      categoryName(product.category),
      brandName(product.brand),
      modelName(product.model),
      ...product.variants.map(v => v.color)
    ]
      .join(' ')
      .toLowerCase()

    const productCategory = db.categories.find(
      item => item.id === product.category
    )

    return (
      (!search || searchable.includes(search)) &&
      (!category ||
        product.category === category ||
        productCategory?.parent === category) &&
      (!brand || product.brand === brand) &&
      (!model ||
        product.model === model ||
        product.variants.some(v => v.model === modelName(model))) &&
      (!color || product.variants.some(variant => variant.color === color))
    )
  })

  if (order === 'low') {
    products.sort((a, b) => productPrice(a) - productPrice(b))
  }

  if (order === 'high') {
    products.sort((a, b) => productPrice(b) - productPrice(a))
  }

  if (order === 'new') {
    products.sort((a, b) => b.created - a.created)
  }

  setText('product-results', `${products.length} productos encontrados`)

  $('product-grid').innerHTML = products.length
    ? products.map(productCard).join('')
    : emptyState('No encontramos productos.')

  const featured = publicProducts().filter(product => product.featured)

  $('featured-products').innerHTML = featured.length
    ? featured.map(productCard).join('')
    : emptyState('No hay productos destacados.')
}

function emptyState (message) {
  return `
        <div class="empty-state">

            <i class="fa-solid fa-box-open"></i>

            <p>${text(message)}</p>

        </div>
    `
}

function clearFilters () {
  ;[
    'store-search',
    'filter-category',
    'filter-brand',
    'filter-model',
    'filter-color',
    'filter-price'
  ].forEach(id => ($(id).value = ''))

  renderSelects()

  renderCatalog()
}

on('store-search', 'input', renderCatalog)
;['filter-category', 'filter-model', 'filter-color', 'filter-price'].forEach(
  id => on(id, 'change', renderCatalog)
)

on('filter-brand', 'change', () => {
  $('filter-model').value = ''

  renderSelects()

  renderCatalog()
})

on('clear-filters-btn', 'click', clearFilters)

/* =========================================
   SELECTORES DINÁMICOS
========================================= */

function fillSelect (id, items, firstOption) {
  const select = $(id)

  if (!select) return

  const previous = [...select.selectedOptions].map(option => option.value)

  select.innerHTML =
    firstOption !== null ? `<option value="">${text(firstOption)}</option>` : ''

  select.innerHTML += items
    .map(
      item => `

        <option value="${text(item.id)}">
            ${text(item.name)}
        </option>

    `
    )
    .join('')
  ;[...select.options].forEach(option => {
    option.selected = previous.includes(option.value)
  })

  if (!select.multiple && select.selectedIndex === -1) {
    select.selectedIndex = 0
  }
}

function renderSelects () {
  fillSelect('filter-category', db.categories, 'Todas las categorías')

  fillSelect('product-category', db.categories, 'Seleccionar categoría')

  fillSelect('published-category', db.categories, 'Todas las categorías')

  fillSelect(
    'category-parent',
    db.categories.filter(
      item => item.id !== value('category-id') && !item.parent
    ),
    'Sin categoría principal'
  )

  fillSelect('filter-brand', db.brands, 'Todas las marcas')

  fillSelect('product-brand', db.brands, 'Universal')

  fillSelect('model-brand', db.brands, 'Seleccionar marca')

  fillSelect(
    'filter-model',

    db.models.filter(model => {
      return !value('filter-brand') || model.brand === value('filter-brand')
    }),

    'Todos los modelos'
  )

  fillSelect(
    'product-model',

    db.models.filter(model => {
      return model.brand === value('product-brand')
    }),

    'Universal'
  )

  const colors = [
    ...new Set(
      publicProducts()
        .flatMap(product => product.variants.map(variant => variant.color))
        .filter(Boolean)
    )
  ]

  fillSelect(
    'filter-color',

    colors.map(color => ({ id: color, name: color })),

    'Todos los colores'
  )

  fillSelect(
    'promotion-products',

    db.products.filter(product => product.status === 'published'),

    null
  )
}

on('product-brand', 'change', () => {
  $('product-model').value = ''

  renderSelects()
})

/* =========================================
   DETALLE DEL PRODUCTO
========================================= */

function openProductDetail (id) {
  const product = getProduct(id)

  if (!product || product.status !== 'published') return

  const images = product.images.length
    ? product.images
    : [placeholder(product.name)]

  $('product-detail-content').innerHTML = `

        <div class="product-detail">

            <div>

                <div class="product-detail-image">

                    <img id="detail-main-image"
                         src="${text(safeImage(images[0], product.name))}"
                         alt="${text(product.name)}">

                </div>

                <div class="product-thumbnails">

                    ${images
                      .map(
                        (src, index) => `

                        <button type="button"
                                data-action="detail-image"
                                data-id="${text(id)}"
                                data-index="${index}">

                            ${imageHTML(src, product.name)}

                        </button>

                    `
                      )
                      .join('')}

                </div>

            </div>

            <div class="product-detail-info">

                <span class="product-category">
                    ${text(categoryName(product.category))}
                </span>

                <h2>${text(product.name)}</h2>

                <p>${text(product.description)}</p>

                <p>
                    Compatibilidad:
                    ${text(brandName(product.brand))}
                    ${product.model ? text(modelName(product.model)) : ''}
                </p>

                <strong class="product-price">
                    ${money(productPrice(product))}
                </strong>

                ${stockBadge(product)}

                ${
                  product.variants.length
                    ? `

                    <div class="form-group">

                        <label for="detail-variant">
                            Elegí una variante
                        </label>

                        <select id="detail-variant">

                            ${product.variants
                              .map(
                                (variant, index) => `

                                <option value="${index}"
                                        ${
                                          variant.stock === 0 ? 'disabled' : ''
                                        }>

                                    ${text(variant.color)}
                                    ${text(variant.model)}
                                    (${variant.stock} disponibles)

                                </option>

                            `
                              )
                              .join('')}

                        </select>

                    </div>

                `
                    : ''
                }

                <div class="form-group">

                    <label for="detail-quantity">Cantidad</label>

                    <input type="number"
                           id="detail-quantity"
                           min="1"
                           max="${Math.max(1, productStock(product))}"
                           value="1">

                </div>

                <button type="button"
                        class="primary-button"
                        data-action="detail-add"
                        data-id="${text(id)}"
                        ${productStock(product) === 0 ? 'disabled' : ''}>

                    <i class="fa-solid fa-bag-shopping"></i>
                    Agregar al carrito

                </button>

            </div>

        </div>

    `

  if (!$('product-modal').open) {
    $('product-modal').showModal()
  }
}

on('close-product-modal', 'click', () => {
  $('product-modal').close()
})

/* =========================================
   CARRITO DE COMPRAS
========================================= */

function availableStock (product, variantIndex) {
  if (product.variants.length) {
    return Number(product.variants[variantIndex]?.stock || 0)
  }

  return productStock(product)
}

function addToCart (id, quantity = 1, variantIndex = null) {
  const product = getProduct(id)

  if (!product || product.status !== 'published') return false

  if (product.variants.length && variantIndex === null) {
    openProductDetail(id)

    return false
  }

  quantity = Math.max(1, Math.floor(Number(quantity) || 1))

  const stock = availableStock(product, variantIndex)

  const existing = db.cart.find(item => {
    return item.productId === id && item.variantIndex === variantIndex
  })

  if ((existing?.quantity || 0) + quantity > stock) {
    toast('No hay suficiente stock disponible.', 'warning')

    return false
  }

  if (existing) {
    existing.quantity += quantity
  } else {
    db.cart.push({
      id: uid(),

      productId: id,

      variantIndex,

      quantity
    })
  }

  if (!commit('Producto agregado al carrito.')) return false

  return true
}

function openCart () {
  renderCart()

  $('cart-overlay').hidden = false

  $('cart-drawer').hidden = false

  document.body.classList.add('cart-open')
}

function closeCart () {
  $('cart-overlay').hidden = true

  $('cart-drawer').hidden = true

  document.body.classList.remove('cart-open')
}

function normalizeCart () {
  db.cart = db.cart.filter(item => {
    const product = getProduct(item.productId)

    if (!product || product.status !== 'published') return false

    const stock = availableStock(product, item.variantIndex)

    item.quantity = Math.min(item.quantity, stock)

    return item.quantity > 0
  })
}

function renderCart () {
  normalizeCart()

  let total = 0

  let count = 0

  $('cart-items').innerHTML =
    db.cart
      .map(item => {
        const product = getProduct(item.productId)

        const subtotal = productPrice(product) * item.quantity

        total += subtotal

        count += item.quantity

        const variant = product.variants[item.variantIndex]

        return `

            <article class="cart-item">

                ${imageHTML(product.images[0], product.name)}

                <div class="cart-item-info">

                    <h3>${text(product.name)}</h3>

                    ${
                      variant
                        ? `<p>${text(variant.color)} ${text(variant.model)}</p>`
                        : ''
                    }

                    <strong class="cart-item-price">
                        ${money(subtotal)}
                    </strong>

                    <div class="quantity-control">

                        <button type="button"
                                data-action="cart-minus"
                                data-id="${text(item.id)}">−</button>

                        <span>${item.quantity}</span>

                        <button type="button"
                                data-action="cart-plus"
                                data-id="${text(item.id)}">+</button>

                    </div>

                </div>

                <button type="button"
                        class="remove-cart-item"
                        data-action="cart-remove"
                        data-id="${text(item.id)}"
                        aria-label="Eliminar producto">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </article>

        `
      })
      .join('') || emptyState('Tu carrito está vacío.')

  setText('cart-count', count)

  setText('cart-total', money(total))

  $('checkout-btn').disabled = !db.cart.length
}

function changeCartQuantity (id, amount) {
  const item = db.cart.find(item => item.id === id)

  if (!item) return

  const product = getProduct(item.productId)

  const stock = availableStock(product, item.variantIndex)

  if (item.quantity + amount > stock) {
    toast('Alcanzaste el stock disponible.', 'warning')

    return
  }

  item.quantity += amount

  db.cart = db.cart.filter(item => item.quantity > 0)

  commit()
}

on('open-cart-btn', 'click', openCart)

on('close-cart-btn', 'click', closeCart)

on('cart-overlay', 'click', closeCart)

on('continue-shopping-btn', 'click', closeCart)

/* =========================================
   PEDIDOS Y CONTACTO
========================================= */

function openWhatsApp (message) {
  // En la maqueta no se envían pedidos reales.

  toast('Modo demostración: aquí se abriría WhatsApp.', 'info')

  console.log('Mensaje de demostración:', message)
}

on('checkout-btn', 'click', () => {
  if (!db.cart.length) return

  let message = db.settings.orderMessage + '\n\n'

  let total = 0

  db.cart.forEach(item => {
    const product = getProduct(item.productId)

    const variant = product.variants[item.variantIndex]

    const subtotal = productPrice(product) * item.quantity

    total += subtotal

    message += `• ${product.name}`

    if (variant) {
      message += ` - ${variant.color} ${variant.model}`
    }

    message += ` x${item.quantity}: ${money(subtotal)}\n`
  })

  message += `\nTotal: ${money(total)}`

  openWhatsApp(message)
})

on('contact-whatsapp', 'click', () => {
  openWhatsApp('¡Hola YOLO! Quisiera realizar una consulta.')
})

on('floating-whatsapp', 'click', () => {
  openWhatsApp('¡Hola YOLO! Quisiera realizar una consulta.')
})

/* =========================================
   PROMOCIONES PÚBLICAS
========================================= */

function renderPromotions () {
  $('promotion-grid').innerHTML =
    activePromotions()
      .map(
        promo => `

            <article class="promotion-card">

                ${promo.image ? imageHTML(promo.image, promo.title) : ''}

                ${
                  promo.discount
                    ? `<span class="promotion-discount">${promo.discount}% OFF</span>`
                    : ''
                }

                <h3>${text(promo.title)}</h3>

                <p>${text(promo.description)}</p>

                <button type="button"
                        class="primary-button"
                        data-action="view-promotion"
                        data-id="${text(promo.id)}">

                    Ver promoción

                </button>

            </article>

        `
      )
      .join('') || emptyState('Próximamente nuevas promociones.')
}

/* =========================================
   SUCURSALES PÚBLICAS
========================================= */

function validURL (url) {
  try {
    const parsed = new URL(url)

    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
  } catch {
    return false
  }
}

function renderBranches () {
  $('branches-grid').innerHTML =
    db.branches
      .map(
        branch => `

        <article class="branch-card">

            ${branch.image ? imageHTML(branch.image, branch.name) : ''}

            <h3>${text(branch.name)}</h3>

            <p>
                <i class="fa-solid fa-location-dot"></i>
                ${text(branch.address)}
            </p>

            <p>
                <i class="fa-solid fa-clock"></i>
                ${text(branch.hours)}
            </p>

            ${
              branch.phone
                ? `

                <p>
                    <i class="fa-solid fa-phone"></i>
                    ${text(branch.phone)}
                </p>

            `
                : ''
            }

            ${
              validURL(branch.map)
                ? `

                <a href="${text(branch.map)}"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="secondary-button">

                    Cómo llegar

                </a>

            `
                : ''
            }

        </article>

    `
      )
      .join('') || emptyState('No hay sucursales cargadas.')
}

/* =========================================
   DASHBOARD ADMINISTRATIVO
========================================= */

function renderDashboard () {
  const published = db.products.filter(
    product => product.status === 'published'
  )

  const drafts = db.products.filter(product => product.status === 'draft')

  const low = published.filter(product => stockType(product) === 'low')

  const empty = published.filter(product => stockType(product) === 'empty')

  setText('stat-published', published.length)

  setText('stat-drafts', drafts.length)

  setText('stat-low-stock', low.length)

  setText('stat-out-stock', empty.length)

  setText('stat-categories', db.categories.length)

  setText('stat-promotions', activePromotions().length)

  $('dashboard-stock-alerts').innerHTML =
    [...empty, ...low]
      .map(
        product => `

            <div class="stock-alert">

                <div>

                    <strong>${text(product.name)}</strong>

                    <p>${productStock(product)} unidades</p>

                </div>

                ${stockBadge(product)}

            </div>

        `
      )
      .join('') || emptyState('No hay alertas de stock.')

  $('recent-products').innerHTML =
    [...db.products]

      .sort((a, b) => b.created - a.created)

      .slice(0, 5)

      .map(
        product => `

                <div class="recent-product">

                    <div>

                        <strong>${text(product.name)}</strong>

                        <p>${text(categoryName(product.category))}</p>

                    </div>

                    <span class="status-badge ${
                      product.status === 'draft' ? 'status-draft' : ''
                    }">

                        ${product.status === 'draft' ? 'Borrador' : 'Publicado'}

                    </span>

                </div>

            `
      )
      .join('') || emptyState('No hay productos.')
}

/* =========================================
   CARGA DE ARCHIVOS E IMÁGENES
========================================= */

function readImage (file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve('')

      return
    }

    if (!file.type.startsWith('image/')) {
      reject(new Error('Seleccioná una imagen válida.'))

      return
    }

    if (file.size > 10 * 1024 * 1024) {
      reject(new Error('La imagen supera los 10 MB.'))

      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      const img = new Image()

      img.onload = () => {
        const canvas = document.createElement('canvas')

        const scale = Math.min(1, 1000 / Math.max(img.width, img.height))

        canvas.width = Math.max(1, Math.round(img.width * scale))

        canvas.height = Math.max(1, Math.round(img.height * scale))

        const ctx = canvas.getContext('2d')

        ctx.fillStyle = '#ffffff'

        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        resolve(canvas.toDataURL('image/jpeg', 0.75))
      }

      img.onerror = () => reject(new Error('No se pudo procesar la imagen.'))

      img.src = reader.result
    }

    reader.onerror = () => reject(new Error('No se pudo leer el archivo.'))

    reader.readAsDataURL(file)
  })
}

async function fileImage (id, previous = '') {
  const file = $(id).files[0]

  return file ? await readImage(file) : previous
}

/* =========================================
   FORMULARIO DE PRODUCTOS
========================================= */

let productImages = []

function renderImagePreview () {
  $('image-preview').innerHTML = productImages
    .map(
      (src, index) => `

            <div class="preview-item">

                ${imageHTML(src, 'Fotografía del producto')}

                <button type="button"
                        data-action="remove-image"
                        data-index="${index}"
                        aria-label="Eliminar fotografía">

                    <i class="fa-solid fa-xmark"></i>

                </button>

            </div>

        `
    )
    .join('')
}

on('product-images', 'change', async event => {
  const files = [...event.target.files]

  const available = Math.max(0, 4 - productImages.length)

  if (files.length > available) {
    toast('Podés cargar hasta cuatro fotografías.', 'warning')
  }

  try {
    const images = await Promise.all(files.slice(0, available).map(readImage))

    productImages.push(...images)

    renderImagePreview()
  } catch (error) {
    toast(error.message, 'error')
  }

  event.target.value = ''
})

function addVariant (variant = {}) {
  const row = document.createElement('div')

  row.className = 'variant-row'

  row.innerHTML = `

        <div class="form-group">

            <label>Color</label>

            <input type="text"
                   class="variant-color"
                   value="${text(variant.color || '')}"
                   placeholder="Ej. Rosa">

        </div>

        <div class="form-group">

            <label>Modelo</label>

            <input type="text"
                   class="variant-model"
                   value="${text(variant.model || '')}"
                   placeholder="Ej. iPhone 16">

        </div>

        <div class="form-group">

            <label>Stock</label>

            <input type="number"
                   class="variant-stock"
                   min="0"
                   value="${Number(variant.stock || 0)}">

        </div>

        <button type="button"
                class="remove-variant"
                data-action="remove-variant"
                aria-label="Eliminar variante">

            <i class="fa-solid fa-trash"></i>

        </button>

    `

  $('variants-container').appendChild(row)
}

on('add-variant-btn', 'click', () => addVariant())

function resetProductForm () {
  $('product-form').reset()

  $('product-id').value = ''

  $('variants-container').innerHTML = ''

  productImages = []

  renderImagePreview()

  setText('product-form-title', 'Agregar producto')

  renderSelects()
}

function editProduct (id) {
  const product = getProduct(id)

  if (!product) return

  resetProductForm()

  $('product-id').value = product.id

  $('product-name').value = product.name

  $('product-description').value = product.description

  $('product-sku').value = product.sku

  $('product-category').value = product.category

  $('product-brand').value = product.brand

  renderSelects()

  $('product-model').value = product.model

  $('product-price').value = product.price

  $('product-sale-price').value = product.salePrice || ''

  $('product-stock').value = product.stock

  $('product-featured').checked = product.featured

  productImages = [...product.images]

  renderImagePreview()

  product.variants.forEach(addVariant)

  setText('product-form-title', 'Editar producto')

  showAdminSection('add-product')
}

function validateProduct (product) {
  if (!product.name.trim()) {
    toast('Ingresá el nombre del producto.', 'warning')

    return false
  }

  if (!product.category || product.price <= 0) {
    toast('Completá la categoría y un precio válido.', 'warning')

    return false
  }

  if (product.salePrice > 0 && product.salePrice >= product.price) {
    toast('El precio promocional debe ser menor al original.', 'warning')

    return false
  }

  return true
}

on('product-form', 'submit', event => {
  event.preventDefault()

  const status = event.submitter?.value || 'published'

  const id = value('product-id') || uid()

  const previous = getProduct(id)

  const variants = $$('#variants-container .variant-row')
    .map(row => ({
      color: row.querySelector('.variant-color').value.trim(),

      model: row.querySelector('.variant-model').value.trim(),

      stock: Math.max(
        0,
        Math.floor(Number(row.querySelector('.variant-stock').value) || 0)
      )
    }))

    .filter(variant => variant.color || variant.model)

  const product = {
    id,

    name: value('product-name'),

    description: value('product-description'),

    sku: value('product-sku'),

    category: value('product-category'),

    brand: value('product-brand'),

    model: value('product-model'),

    price: number('product-price'),

    salePrice: number('product-sale-price'),

    stock: variants.length
      ? variants.reduce((total, v) => total + v.stock, 0)
      : Math.floor(number('product-stock')),

    featured: checked('product-featured'),

    status,

    images: [...productImages],

    variants,

    created: previous?.created || Date.now()
  }

  if (status === 'published' && !validateProduct(product)) {
    return
  }

  if (!product.name) product.name = 'Borrador sin título'

  if (previous) {
    // Evita conservar variantes incorrectas en el carrito
    // cuando se modifica un producto.

    db.cart = db.cart.filter(item => item.productId !== id)

    db.products = db.products.map(item => (item.id === id ? product : item))
  } else {
    db.products.push(product)
  }

  if (
    !commit(
      status === 'draft'
        ? 'Borrador guardado correctamente.'
        : 'Producto publicado correctamente.'
    )
  )
    return

  resetProductForm()

  showAdminSection(status === 'draft' ? 'drafts' : 'published')
})

on('cancel-product-btn', 'click', () => {
  resetProductForm()

  showAdminSection('published')
})

/* =========================================
   PRODUCTOS PUBLICADOS Y BORRADORES
========================================= */

function adminProductCard (product) {
  return `

        <article class="admin-product-card">

            ${imageHTML(product.images[0], product.name)}

            <div class="admin-product-info">

                <h3>${text(product.name)}</h3>

                <p>
                    ${text(categoryName(product.category))}
                    · ${text(product.sku)}
                </p>

                <p>
                    ${money(productPrice(product))}
                    · Stock: ${productStock(product)}
                </p>

                <span class="status-badge ${
                  product.status === 'draft' ? 'status-draft' : ''
                }">

                    ${product.status === 'draft' ? 'Borrador' : 'Publicado'}

                </span>

            </div>

            <div class="admin-product-actions">

                <button type="button"
                        class="edit-btn"
                        data-action="edit-product"
                        data-id="${text(product.id)}">

                    <i class="fa-solid fa-pen"></i>
                    Editar

                </button>

                <button type="button"
                        class="${
                          product.status === 'draft'
                            ? 'publish-btn'
                            : 'draft-btn'
                        }"
                        data-action="toggle-product"
                        data-id="${text(product.id)}">

                    ${
                      product.status === 'draft'
                        ? 'Publicar'
                        : 'Pasar a borrador'
                    }

                </button>

                <button type="button"
                        class="delete-btn"
                        data-action="delete-product"
                        data-id="${text(product.id)}">

                    <i class="fa-solid fa-trash"></i>
                    Eliminar

                </button>

            </div>

        </article>

    `
}

function renderAdminProducts () {
  const search = value('published-search').toLowerCase()

  const draftSearch = value('draft-search').toLowerCase()

  const category = value('published-category')

  const published = db.products.filter(product => {
    return (
      product.status === 'published' &&
      (!category || product.category === category) &&
      `${product.name} ${product.sku}`.toLowerCase().includes(search)
    )
  })

  const drafts = db.products.filter(product => {
    return (
      product.status === 'draft' &&
      product.name.toLowerCase().includes(draftSearch)
    )
  })

  $('published-products').innerHTML =
    published.map(adminProductCard).join('') ||
    emptyState('No hay productos publicados.')

  $('draft-products').innerHTML =
    drafts.map(adminProductCard).join('') || emptyState('No hay borradores.')
}

function toggleProduct (id) {
  const product = getProduct(id)

  if (!product) return

  if (product.status === 'draft') {
    if (!validateProduct(product)) {
      editProduct(id)

      return
    }

    product.status = 'published'
  } else {
    product.status = 'draft'
  }

  commit('Estado del producto actualizado.')
}

function deleteProduct (id) {
  const product = getProduct(id)

  if (!product) return

  confirmDialog(
    `¿Querés eliminar "${product.name}"?`,

    () => {
      db.products = db.products.filter(item => item.id !== id)

      db.cart = db.cart.filter(item => item.productId !== id)

      db.promotions.forEach(promo => {
        promo.products = promo.products.filter(productId => productId !== id)
      })

      commit('Producto eliminado.')
    }
  )
}

on('published-search', 'input', renderAdminProducts)

on('published-category', 'change', renderAdminProducts)

on('draft-search', 'input', renderAdminProducts)

/* =========================================
   CONTROL DE STOCK
========================================= */

function renderStock () {
  const products = db.products.filter(product => product.status === 'published')

  setText(
    'stock-total',

    products.reduce((total, product) => total + productStock(product), 0)
  )

  setText(
    'stock-low',

    products.filter(product => stockType(product) === 'low').length
  )

  setText(
    'stock-empty',

    products.filter(product => stockType(product) === 'empty').length
  )

  const search = value('stock-search').toLowerCase()

  const filter = value('stock-filter')

  $('stock-list').innerHTML =
    products
      .filter(product => {
        return (
          `${product.name} ${product.sku}`.toLowerCase().includes(search) &&
          (!filter || stockType(product) === filter)
        )
      })
      .map(
        product => `

        <article class="stock-row">

            <div>

                <h3>${text(product.name)}</h3>

                <p>${text(product.sku)}</p>

                ${stockBadge(product)}

            </div>

            <div class="stock-controls">

                ${
                  product.variants.length
                    ? `

                    ${product.variants
                      .map(
                        (variant, index) => `

                        <div class="form-group">

                            <label>
                                ${text(variant.color)}
                                ${text(variant.model)}
                            </label>

                            <input type="number"
                                   class="stock-input"
                                   id="stock-${text(product.id)}-${index}"
                                   min="0"
                                   value="${variant.stock}">

                        </div>

                    `
                      )
                      .join('')}

                `
                    : `

                    <input type="number"
                           id="stock-${text(product.id)}"
                           class="stock-input"
                           min="0"
                           value="${product.stock}">

                `
                }

            </div>

            <button type="button"
                    class="primary-button"
                    data-action="save-stock"
                    data-id="${text(product.id)}">

                Guardar

            </button>

        </article>

    `
      )
      .join('') || emptyState('No hay productos para mostrar.')
}

function updateStock (id) {
  const product = getProduct(id)

  if (!product) return

  if (product.variants.length) {
    product.variants.forEach((variant, index) => {
      variant.stock = Math.floor(number(`stock-${id}-${index}`))
    })

    product.stock = productStock(product)
  } else {
    product.stock = Math.floor(number(`stock-${id}`))
  }

  commit('Stock actualizado correctamente.')
}

on('stock-search', 'input', renderStock)

on('stock-filter', 'change', renderStock)

/* =========================================
   BOTONES ADMINISTRATIVOS REUTILIZABLES
========================================= */

function itemButtons (type, id) {
  return `

        <div class="item-actions">

            <button type="button"
                    class="edit-btn"
                    data-action="edit-${text(type)}"
                    data-id="${text(id)}">

                <i class="fa-solid fa-pen"></i>
                Editar

            </button>

            <button type="button"
                    class="delete-btn"
                    data-action="delete-${text(type)}"
                    data-id="${text(id)}">

                <i class="fa-solid fa-trash"></i>
                Eliminar

            </button>

        </div>

    `
}

function upsert (collection, item) {
  const index = db[collection].findIndex(current => current.id === item.id)

  if (index >= 0) {
    db[collection][index] = item
  } else {
    db[collection].push(item)
  }
}

/* =========================================
   GESTIÓN DE CATEGORÍAS
========================================= */

function renderAdminCategories () {
  $('admin-category-list').innerHTML =
    db.categories
      .map(
        category => `

            <div class="category-row">

                <div>

                    <strong>${text(category.name)}</strong>

                    ${
                      category.parent
                        ? `<p>Subcategoría de ${text(
                            categoryName(category.parent)
                          )}</p>`
                        : ''
                    }

                    <p>

                        ${
                          db.products.filter(
                            product => product.category === category.id
                          ).length
                        } productos

                    </p>

                </div>

                ${itemButtons('category', category.id)}

            </div>

        `
      )
      .join('') || emptyState('No hay categorías.')
}

on('category-form', 'submit', async event => {
  event.preventDefault()

  const id = value('category-id') || uid()

  const previous = db.categories.find(item => item.id === id)

  const parent = value('category-parent')

  if (parent === id) {
    toast('La categoría no puede depender de sí misma.', 'warning')

    return
  }

  if (parent && db.categories.some(item => item.parent === id)) {
    toast('Esta categoría tiene subcategorías asociadas.', 'warning')

    return
  }

  try {
    upsert('categories', {
      id,

      name: value('category-name'),

      parent,

      icon: previous?.icon || 'fa-layer-group',

      image: await fileImage('category-image', previous?.image || '')
    })

    if (commit('Categoría guardada.')) {
      $('category-form').reset()

      $('category-id').value = ''

      renderSelects()
    }
  } catch (error) {
    toast(error.message, 'error')
  }
})

function editCategory (id) {
  const item = db.categories.find(item => item.id === id)

  if (!item) return

  $('category-id').value = id

  $('category-name').value = item.name

  renderSelects()

  $('category-parent').value = item.parent

  showAdminSection('categories')
}

function deleteCategory (id) {
  if (
    db.products.some(product => product.category === id) ||
    db.categories.some(category => category.parent === id)
  ) {
    toast(
      'Primero reasigná los productos o subcategorías asociados.',
      'warning'
    )

    return
  }

  confirmDialog('¿Eliminar esta categoría?', () => {
    db.categories = db.categories.filter(item => item.id !== id)

    commit('Categoría eliminada.')
  })
}

/* =========================================
   MARCAS Y MODELOS
========================================= */

function renderBrandsModels () {
  $('brand-list').innerHTML = db.brands
    .map(
      brand => `

        <div class="brand-row">

            <strong>${text(brand.name)}</strong>

            ${itemButtons('brand', brand.id)}

        </div>

    `
    )
    .join('')

  $('model-list').innerHTML = db.models
    .map(
      model => `

        <div class="model-row">

            <div>

                <strong>${text(model.name)}</strong>

                <p>${text(brandName(model.brand))}</p>

            </div>

            ${itemButtons('model', model.id)}

        </div>

    `
    )
    .join('')
}

on('brand-form', 'submit', event => {
  event.preventDefault()

  upsert('brands', {
    id: value('brand-id') || uid(),

    name: value('brand-name')
  })

  if (commit('Marca guardada.')) {
    $('brand-form').reset()

    $('brand-id').value = ''
  }
})

on('model-form', 'submit', event => {
  event.preventDefault()

  const id = value('model-id') || uid()

  const brand = value('model-brand')

  if (
    db.products.some(product => product.model === id && product.brand !== brand)
  ) {
    toast(
      'No se puede cambiar la marca de un modelo asociado a productos.',
      'warning'
    )

    return
  }

  upsert('models', {
    id,

    brand,

    name: value('model-name')
  })

  if (commit('Modelo guardado.')) {
    $('model-form').reset()

    $('model-id').value = ''
  }
})

function editBrand (id) {
  const item = db.brands.find(item => item.id === id)

  if (!item) return

  $('brand-id').value = id

  $('brand-name').value = item.name
}

function editModel (id) {
  const item = db.models.find(item => item.id === id)

  if (!item) return

  $('model-id').value = id

  $('model-brand').value = item.brand

  $('model-name').value = item.name
}

function deleteBrand (id) {
  if (
    db.models.some(model => model.brand === id) ||
    db.products.some(product => product.brand === id)
  ) {
    toast('La marca tiene modelos o productos asociados.', 'warning')

    return
  }

  confirmDialog('¿Eliminar esta marca?', () => {
    db.brands = db.brands.filter(item => item.id !== id)

    commit('Marca eliminada.')
  })
}

function deleteModel (id) {
  if (db.products.some(product => product.model === id)) {
    toast('El modelo tiene productos asociados.', 'warning')

    return
  }

  confirmDialog('¿Eliminar este modelo?', () => {
    db.models = db.models.filter(item => item.id !== id)

    commit('Modelo eliminado.')
  })
}

/* =========================================
   GESTIÓN DE PROMOCIONES
========================================= */

function renderAdminPromotions () {
  $('admin-promotion-list').innerHTML =
    db.promotions
      .map(
        promo => `

            <div class="admin-promotion-item">

                <div>

                    <h3>${text(promo.title)}</h3>

                    <p>${promo.discount}% de descuento</p>

                    <p>${promo.products.length} productos asociados</p>

                    <span class="status-badge ${
                      promo.active ? '' : 'status-draft'
                    }">

                        ${promo.active ? 'Habilitada' : 'Desactivada'}

                    </span>

                </div>

                <div class="item-actions">

                    <button type="button"
                            class="secondary-button"
                            data-action="toggle-promotion"
                            data-id="${text(promo.id)}">

                        ${promo.active ? 'Desactivar' : 'Activar'}

                    </button>

                    ${itemButtons('promotion', promo.id)}

                </div>

            </div>

        `
      )
      .join('') || emptyState('No hay promociones.')
}

on('promotion-form', 'submit', async event => {
  event.preventDefault()

  const id = value('promotion-id') || uid()

  const previous = db.promotions.find(item => item.id === id)

  const start = value('promotion-start')

  const end = value('promotion-end')

  if (start && end && end < start) {
    toast('La fecha final debe ser posterior a la inicial.', 'warning')

    return
  }

  try {
    upsert('promotions', {
      id,

      title: value('promotion-title'),

      description: value('promotion-description'),

      discount: Math.min(100, number('promotion-discount')),

      start,

      end,

      products: [...$('promotion-products').selectedOptions].map(
        option => option.value
      ),

      image: await fileImage('promotion-image', previous?.image || ''),

      active: checked('promotion-active')
    })

    if (commit('Promoción guardada correctamente.')) {
      $('promotion-form').reset()

      $('promotion-id').value = ''
    }
  } catch (error) {
    toast(error.message, 'error')
  }
})

function editPromotion (id) {
  const promo = db.promotions.find(item => item.id === id)

  if (!promo) return

  $('promotion-id').value = id

  $('promotion-title').value = promo.title

  $('promotion-description').value = promo.description

  $('promotion-discount').value = promo.discount

  $('promotion-start').value = promo.start

  $('promotion-end').value = promo.end

  $('promotion-active').checked = promo.active
  ;[...$('promotion-products').options].forEach(option => {
    option.selected = promo.products.includes(option.value)
  })

  showAdminSection('promotions')
}

function togglePromotion (id) {
  const promo = db.promotions.find(item => item.id === id)

  if (!promo) return

  promo.active = !promo.active

  commit('Promoción actualizada.')
}

function deletePromotion (id) {
  confirmDialog('¿Eliminar esta promoción?', () => {
    db.promotions = db.promotions.filter(item => item.id !== id)

    commit('Promoción eliminada.')
  })
}

/* =========================================
   PERSONALIZACIÓN DE LA TIENDA
========================================= */

const sectionSelectors = {
  benefits: '.benefits-section',

  categories: '#categorias',

  featured: '#destacados',

  promotions: '#promociones',

  catalog: '#productos',

  branches: '#sucursales'
}

const sectionNames = {
  benefits: 'Beneficios',

  categories: 'Categorías',

  featured: 'Productos destacados',

  promotions: 'Promociones',

  catalog: 'Catálogo',

  branches: 'Sucursales'
}

function applyCustomization () {
  const custom = db.customization

  const root = document.documentElement

  root.style.setProperty('--primary', custom.primary)

  root.style.setProperty('--secondary', custom.secondary)

  root.style.setProperty('--accent', custom.accent)

  root.style.setProperty(
    '--primary-dark',

    `color-mix(in srgb, ${custom.primary} 70%, black)`
  )

  setText('hero-title', custom.heroTitle)

  setText('hero-description', custom.heroDescription)

  $('hero-image').src = safeImage(custom.heroImage, 'Accesorios YOLO!')

  $('hero-image').removeAttribute('data-failed')

  document.querySelector('.announcement-bar p').innerHTML = `

        <i class="fa-solid fa-bolt"></i>

        ${text(custom.announcement)}

    `

  const brand = document.querySelector('.brand-logo')

  brand.innerHTML = custom.logo
    ? imageHTML(custom.logo, 'YOLO! Accesorios')
    : `
            <span class="logo-text">YOLO!</span>
            <span class="logo-subtitle">ACCESORIOS</span>
        `

  Object.entries(custom.sections).forEach(([key, visible]) => {
    const section = document.querySelector(sectionSelectors[key])

    if (section) section.hidden = !visible
  })

  const contact = $('contacto')

  const main = contact.parentElement

  custom.order.forEach(key => {
    const section = document.querySelector(sectionSelectors[key])

    if (section) main.insertBefore(section, contact)
  })
}

function loadCustomizationForm () {
  const custom = db.customization

  $('custom-primary').value = custom.primary

  $('custom-secondary').value = custom.secondary

  $('custom-accent').value = custom.accent

  $('custom-hero-title').value = custom.heroTitle

  $('custom-hero-description').value = custom.heroDescription

  $('custom-announcement').value = custom.announcement

  Object.entries(custom.sections).forEach(([key, visible]) => {
    if ($(`show-${key}`)) {
      $(`show-${key}`).checked = visible
    }
  })

  renderSectionOrder()
}

let sectionOrder = [...db.customization.order]

function renderSectionOrder () {
  $('section-order-list').innerHTML = sectionOrder
    .map(
      (key, index) => `

            <div class="section-order-item">

                <span>${text(sectionNames[key])}</span>

                <div class="item-actions">

                    <button type="button"
                            data-action="section-up"
                            data-index="${index}"
                            ${index === 0 ? 'disabled' : ''}
                            aria-label="Subir sección">

                        <i class="fa-solid fa-arrow-up"></i>

                    </button>

                    <button type="button"
                            data-action="section-down"
                            data-index="${index}"
                            ${
                              index === sectionOrder.length - 1
                                ? 'disabled'
                                : ''
                            }
                            aria-label="Bajar sección">

                        <i class="fa-solid fa-arrow-down"></i>

                    </button>

                </div>

            </div>

        `
    )
    .join('')
}

function moveSection (index, direction) {
  const next = index + direction

  if (next < 0 || next >= sectionOrder.length) return
  ;[sectionOrder[index], sectionOrder[next]] = [
    sectionOrder[next],
    sectionOrder[index]
  ]

  renderSectionOrder()
}

on('customization-form', 'submit', async event => {
  event.preventDefault()

  try {
    const custom = db.customization

    const logo = await fileImage('custom-logo', custom.logo)

    const heroImage = await fileImage('custom-hero-image', custom.heroImage)

    db.customization = {
      logo,

      primary: value('custom-primary'),

      secondary: value('custom-secondary'),

      accent: value('custom-accent'),

      heroImage,

      heroTitle: value('custom-hero-title'),

      heroDescription: value('custom-hero-description'),

      announcement: value('custom-announcement'),

      sections: {
        benefits: checked('show-benefits'),

        categories: checked('show-categories'),

        featured: checked('show-featured'),

        promotions: checked('show-promotions'),

        branches: checked('show-branches')
      },

      order: [...sectionOrder]
    }

    if (commit('Diseño de la tienda actualizado.')) {
      $('custom-logo').value = ''

      $('custom-hero-image').value = ''
    }
  } catch (error) {
    toast(error.message, 'error')
  }
})

on('reset-customization', 'click', () => {
  confirmDialog('¿Restaurar el diseño original de YOLO!?', () => {
    db.customization = clone(initialData.customization)

    sectionOrder = [...db.customization.order]

    commit('Diseño original restaurado.')

    loadCustomizationForm()

    $('custom-logo').value = ''

    $('custom-hero-image').value = ''
  })
})

/* =========================================
   GESTIÓN DE SUCURSALES
========================================= */

function renderAdminBranches () {
  $('admin-branch-list').innerHTML =
    db.branches
      .map(
        branch => `

        <div class="admin-branch-item">

            <div>

                <h3>${text(branch.name)}</h3>

                <p>${text(branch.address)}</p>

                <p>${text(branch.hours)}</p>

            </div>

            ${itemButtons('branch', branch.id)}

        </div>

    `
      )
      .join('') || emptyState('No hay sucursales.')
}

on('branch-form', 'submit', async event => {
  event.preventDefault()

  const id = value('branch-id') || uid()

  const previous = db.branches.find(item => item.id === id)

  const map = value('branch-map')

  if (map && !validURL(map)) {
    toast('Ingresá un enlace válido.', 'warning')

    return
  }

  try {
    upsert('branches', {
      id,

      name: value('branch-name'),

      address: value('branch-address'),

      hours: value('branch-hours'),

      phone: value('branch-phone'),

      map,

      image: await fileImage('branch-image', previous?.image || '')
    })

    if (commit('Sucursal guardada.')) {
      $('branch-form').reset()

      $('branch-id').value = ''
    }
  } catch (error) {
    toast(error.message, 'error')
  }
})

function editBranch (id) {
  const branch = db.branches.find(item => item.id === id)

  if (!branch) return

  $('branch-id').value = id

  $('branch-name').value = branch.name

  $('branch-address').value = branch.address

  $('branch-hours').value = branch.hours

  $('branch-phone').value = branch.phone

  $('branch-map').value = branch.map

  showAdminSection('branches')
}

function deleteBranch (id) {
  confirmDialog('¿Eliminar esta sucursal?', () => {
    db.branches = db.branches.filter(item => item.id !== id)

    commit('Sucursal eliminada.')
  })
}

/* =========================================
   CONFIGURACIÓN GENERAL
========================================= */

function loadSettingsForm () {
  const settings = db.settings

  $('settings-name').value = settings.name

  $('settings-email').value = settings.email

  $('settings-whatsapp').value = settings.whatsapp

  $('settings-instagram').value = settings.instagram

  $('settings-order-message').value = settings.orderMessage

  $('settings-stock-limit').value = settings.stockLimit

  $('settings-show-stock').checked = settings.showStock

  $('settings-hide-empty').checked = settings.hideEmpty
}

function applySettings () {
  document.title = `${db.settings.name} | Tienda Web`

  const instagram = $('contact-instagram')

  instagram.href = validURL(db.settings.instagram)
    ? db.settings.instagram
    : '#contacto'

  instagram.target = '_blank'

  instagram.rel = 'noopener noreferrer'
}

on('settings-form', 'submit', event => {
  event.preventDefault()

  const instagram = value('settings-instagram')

  if (instagram && !validURL(instagram)) {
    toast('Ingresá un enlace de Instagram válido.', 'warning')

    return
  }

  db.settings = {
    name: value('settings-name'),

    email: value('settings-email'),

    whatsapp: value('settings-whatsapp'),

    instagram,

    orderMessage: value('settings-order-message'),

    stockLimit: Math.max(1, Math.floor(number('settings-stock-limit'))),

    showStock: checked('settings-show-stock'),

    hideEmpty: checked('settings-hide-empty')
  }

  commit('Configuración guardada correctamente.')
})

/* =========================================
   ACCIONES DINÁMICAS
========================================= */

document.addEventListener('click', event => {
  const button = event.target.closest('[data-action]')

  if (!button || button.disabled) return

  const action = button.dataset.action

  const id = button.dataset.id

  const index = Number(button.dataset.index)

  switch (action) {
    case 'filter-category':
      clearFilters()

      $('filter-category').value = id

      renderCatalog()

      $('productos').scrollIntoView()

      break

    case 'detail':
      openProductDetail(id)

      break

    case 'detail-image': {
      const product = getProduct(id)

      if (product?.images[index]) {
        $('detail-main-image').src = safeImage(
          product.images[index],
          product.name
        )
      }

      break
    }

    case 'add-cart':
      addToCart(id)

      break

    case 'detail-add': {
      const variant = $('detail-variant')
        ? Number($('detail-variant').value)
        : null

      const success = addToCart(
        id,

        number('detail-quantity'),

        variant
      )

      if (success) $('product-modal').close()

      break
    }

    case 'cart-minus':
      changeCartQuantity(id, -1)

      break

    case 'cart-plus':
      changeCartQuantity(id, 1)

      break

    case 'cart-remove':
      db.cart = db.cart.filter(item => item.id !== id)

      commit('Producto eliminado del carrito.')

      break

    case 'remove-image':
      productImages.splice(index, 1)

      renderImagePreview()

      break

    case 'remove-variant':
      button.closest('.variant-row')?.remove()

      break

    case 'edit-product':
      editProduct(id)

      break

    case 'toggle-product':
      toggleProduct(id)

      break

    case 'delete-product':
      deleteProduct(id)

      break

    case 'save-stock':
      updateStock(id)

      break

    case 'edit-category':
      editCategory(id)

      break

    case 'delete-category':
      deleteCategory(id)

      break

    case 'edit-brand':
      editBrand(id)

      break

    case 'delete-brand':
      deleteBrand(id)

      break

    case 'edit-model':
      editModel(id)

      break

    case 'delete-model':
      deleteModel(id)

      break

    case 'edit-promotion':
      editPromotion(id)

      break

    case 'toggle-promotion':
      togglePromotion(id)

      break

    case 'delete-promotion':
      deletePromotion(id)

      break

    case 'view-promotion': {
      const promo = activePromotions().find(item => item.id === id)

      if (!promo) break

      clearFilters()

      const products = publicProducts().filter(product =>
        promo.products.includes(product.id)
      )

      $('product-grid').innerHTML =
        products.map(productCard).join('') ||
        emptyState('No hay productos asociados.')

      setText('product-results', `${products.length} productos en promoción`)

      $('productos').scrollIntoView()

      break
    }

    case 'section-up':
      moveSection(index, -1)

      break

    case 'section-down':
      moveSection(index, 1)

      break

    case 'edit-branch':
      editBranch(id)

      break

    case 'delete-branch':
      deleteBranch(id)

      break
  }
})

/* =========================================
   TECLADO Y CAMBIOS DE PANTALLA
========================================= */

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeCart()

    closeAdminMenu()

    $('store-navigation').classList.remove('open')
  }
})

window.addEventListener('resize', () => {
  if (window.innerWidth > 1024) {
    closeAdminMenu()
  }

  if (window.innerWidth > 768) {
    $('store-navigation').classList.remove('open')
  }
})

/* =========================================
   ACTUALIZAR TODA LA MAQUETA
========================================= */

function renderAll () {
  renderSelects()

  renderCategories()

  renderCatalog()

  renderPromotions()

  renderBranches()

  renderDashboard()

  renderAdminProducts()

  renderStock()

  renderAdminCategories()

  renderBrandsModels()

  renderAdminPromotions()

  renderAdminBranches()

  renderCart()

  applyCustomization()

  applySettings()
}

/* =========================================
   INICIALIZACIÓN
========================================= */

function init () {
  $('store-view').hidden = false

  $('admin-view').hidden = true

  loadCustomizationForm()

  loadSettingsForm()

  renderAll()

  console.log('YOLO! Accesorios | Maqueta web de Lucila Studio')
}

init()
