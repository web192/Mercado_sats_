 /* app.js - lógica de MercadoKids (front) */
/* Asume backend: backend/create_invoice.php y backend/check_invoice.php (LNbits) */

/* ============================
   Catálogo (arrays front-only, listo para reemplazar por API)
   ============================ */
const products = [
  {id:1,nombre:"Pelota infantil arcoíris",categoria:"articulos",imagen:"https://images.pexels.com/photos/296301/pexels-photo-296301.jpeg",price:5.00,stock:50,descripcion:"Pelota suave y colorida para niños."},
  {id:2,nombre:"Juego didáctico 20 piezas",categoria:"articulos",imagen:"https://images.pexels.com/photos/159823/toys-children-game-child-159823.jpeg",price:15.00,stock:20,descripcion:"Juego para aprender formas y colores."},
  {id:3,nombre:"Jugo natural naranja 250ml",categoria:"bebidas",imagen:"https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg",price:1.50,stock:100,descripcion:"Jugo natural sin azúcares añadidos."},
  {id:4,nombre:"Sándwich saludable",categoria:"comida",imagen:"https://images.pexels.com/photos/1600713/pexels-photo-1600713.jpeg",price:2.50,stock:40,descripcion:"Sándwich con pan integral y vegetales."},
  {id:5,nombre:"Galletas para niños 200g",categoria:"comida",imagen:"https://images.pexels.com/photos/3996362/pexels-photo-3996362.jpeg",price:1.00,stock:200,descripcion:"Galletas suaves y sin nueces."},
  {id:6,nombre:"Muñeca articulada 30cm",categoria:"juguetes",imagen:"https://images.pexels.com/photos/3661263/pexels-photo-3661263.jpeg",price:12.00,stock:30,descripcion:"Muñeca con ropa y accesorios."},
  {id:7,nombre:"Carrito de juguete",categoria:"juguetes",imagen:"https://images.pexels.com/photos/110354/pexels-photo-110354.jpeg",price:9.50,stock:18,descripcion:"Carrito a control manual para niños."},
  {id:8,nombre:"Camiseta infantil Talla 6",categoria:"ropa",imagen:"https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg",price:6.00,stock:80,descripcion:"Camiseta cómoda algodón 100%."},
  {id:9,nombre:"Set de colores 24",categoria:"articulos",imagen:"https://images.pexels.com/photos/207983/pexels-photo-207983.jpeg",price:3.50,stock:120,descripcion:"Set de lápices y marcadores."},
  {id:10,nombre:"Puzzle 100 piezas",categoria:"articulos",imagen:"https://images.pexels.com/photos/159711/puzzle-pieces-wooden-159711.jpeg",price:7.00,stock:25,descripcion:"Puzzle educativo para niños."},
  {id:11,nombre:"Mordedor silicona",categoria:"articulos",imagen:"https://images.pexels.com/photos/3661439/pexels-photo-3661439.jpeg",price:2.50,stock:60,descripcion:"Mordedor seguro para bebés."},
  {id:12,nombre:"Set de platos infantiles",categoria:"comida",imagen:"https://images.pexels.com/photos/583821/pexels-photo-583821.jpeg",price:10.00,stock:40,descripcion:"Platos resistentes y coloridos."},
  {id:13,nombre:"Botella térmica 350ml",categoria:"bebidas",imagen:"https://images.pexels.com/photos/374139/pexels-photo-374139.jpeg",price:8.00,stock:50,descripcion:"Térmica para líquidos fríos y calientes."},
  {id:14,nombre:"Chaqueta niño 8 años",categoria:"ropa",imagen:"https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg",price:18.00,stock:12,descripcion:"Chaqueta ligera con gorro."},
  {id:15,nombre:"Rompecabezas educativo letras",categoria:"articulos",imagen:"https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg",price:4.50,stock:70,descripcion:"Aprende letras jugando."},
  {id:16,nombre:"Set de construcción 60 piezas",categoria:"articulos",imagen:"https://images.pexels.com/photos/163077/construction-kit-lego-brick-163077.jpeg",price:11.00,stock:30,descripcion:"Construye y crea figuras."},
  {id:17,nombre:"Mascarilla infantil reusable",categoria:"ropa",imagen:"https://images.pexels.com/photos/4167545/pexels-photo-4167545.jpeg",price:2.00,stock:150,descripcion:"Mascarilla colorida para niños."},
  {id:18,nombre:"Luz nocturna animalitos",categoria:"articulos",imagen:"https://images.pexels.com/photos/276294/pexels-photo-276294.jpeg",price:6.50,stock:40,descripcion:"Luz LED suave para la noche."},
  {id:19,nombre:"Almohada infantil",categoria:"articulos",imagen:"https://images.pexels.com/photos/1181422/pexels-photo-1181422.jpeg",price:9.00,stock:22,descripcion:"Almohada cómoda con funda lavable."},
  {id:20,nombre:"Cubo de aprendizaje",categoria:"articulos",imagen:"https://images.pexels.com/photos/374078/pexels-photo-374078.jpeg",price:14.00,stock:15,descripcion:"Actividades sensoriales y educativas."}
];

/* ============================
   Estado del carrito (local)
   ============================ */
let cart = {}; // { productId: qty }

/* RENDER: productos en la grilla */
function renderProducts(list){
  const container = document.getElementById('productContainer');
  container.innerHTML = '';
  list.forEach(p=>{
    const html = `
      <div class="item">
        <img src="${p.imagen}" alt="${escapeHtml(p.nombre)}">
        <div class="info">
          <h4>${escapeHtml(p.nombre)}</h4>
          <div class="price">$${p.price.toFixed(2)}</div>
          <div class="actions">
            <button class="btn" onclick="viewProduct(${p.id})">Ver</button>
            <button class="btn btn-dark" onclick="addToCart(${p.id})">Agregar</button>
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
  });
}

/* Ver detalle (usa product.html) */
function viewProduct(id){
  window.location = 'product.html?id=' + id;
}

/* Agregar al carrito */
function addToCart(id){
  cart[id] = (cart[id] || 0) + 1;
  updateCartUI();
}

/* Reducir */
function decrease(id){
  if(!cart[id]) return;
  cart[id]--;
  if(cart[id] <= 0) delete cart[id];
  updateCartUI();
}

/* Actualiza contador y modal */
function updateCartUI(){
  const count = Object.values(cart).reduce((s,n)=>s+n,0);
  document.getElementById('cart-count').innerText = count;
  renderCartItems();
}

/* Render del modal carrito */
function renderCartItems(){
  const el = document.getElementById('cart-items');
  if(!el) return;
  el.innerHTML = '';
  if(Object.keys(cart).length === 0){
    el.innerHTML = '<p>Carrito vacío</p>';
    document.getElementById('cart-total').innerText = '0.00';
    return;
  }
  let total = 0;
  Object.keys(cart).forEach(pid=>{
    const p = products.find(x=>x.id == pid);
    const qty = cart[pid];
    const sub = p.price * qty;
    total += sub;
    el.insertAdjacentHTML('beforeend', `
      <div style="display:flex;gap:10px;align-items:center;margin-bottom:8px">
        <img src="${p.imagen}" style="width:56px;height:56px;object-fit:cover;border-radius:6px">
        <div style="flex:1"><strong>${escapeHtml(p.nombre)}</strong><br>$${p.price.toFixed(2)} x ${qty} = $${sub.toFixed(2)}</div>
        <div style="display:flex;flex-direction:column;gap:4px">
          <button class="btn btn-dark" onclick="decrease(${p.id})">-</button>
          <button class="btn" onclick="addToCart(${p.id})">+</button>
        </div>
      </div>
    `);
  });
  document.getElementById('cart-total').innerText = total.toFixed(2);
}

/* ============================
   Filtros y búsqueda
   ============================ */
let currentCategory = 'todos';
document.querySelectorAll('.categories button').forEach(b=>{
  b.addEventListener('click', (e)=>{
    document.querySelectorAll('.categories button').forEach(x=>x.classList.remove('active'));
    e.target.classList.add('active');
    currentCategory = e.target.dataset.cat;
    applyFilters();
  });
});

document.getElementById('search').addEventListener('keyup', (e)=>{
  applyFilters();
});

function applyFilters(){
  const q = document.getElementById('search').value.trim().toLowerCase();
  let list = products.filter(p => (currentCategory === 'todos' || p.categoria === currentCategory));
  if(q) list = list.filter(p => p.nombre.toLowerCase().includes(q) || (p.descripcion && p.descripcion.toLowerCase().includes(q)));
  renderProducts(list);
}

/* ============================
   Modal carrito
   ============================ */
document.getElementById('open-cart').addEventListener('click', ()=>{
  document.getElementById('modal-cart').style.display = 'flex';
  renderCartItems();
});
document.getElementById('close-cart').addEventListener('click', ()=>{
  document.getElementById('modal-cart').style.display = 'none';
});

/* ============================
   Checkout Lightning (LNbits) - frontend
   ============================ */
document.getElementById('checkout-sats').addEventListener('click', async ()=>{
  const items = Object.keys(cart).map(id => {
    const p = products.find(x=>x.id==id);
    return {id: p.id, nombre: p.nombre, qty: cart[id], price: p.price};
  });
  if(items.length === 0){ alert('Carrito vacío'); return; }

  const totalUSD = items.reduce((s,i)=>s + i.price*i.qty,0);

  // Llamada al backend (backend/create_invoice.php) -> espera JSON { ok:true, payment_request, qr, invoice_id }
  try{
    const res = await fetch('backend/create_invoice.php', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({items, total_usd: totalUSD})
    });
    const json = await res.json();
    if(!json.ok){ alert('Error creando factura: ' + (json.msg || '')); return; }

    // Muestra QR y BOLT11 en modal
    document.getElementById('invoice-status').innerText = 'Escanea con tu wallet o copia el BOLT11';
    if(json.qr) { document.getElementById('invoice-qr').src = json.qr; document.getElementById('invoice-qr').style.display = 'block'; }
    else document.getElementById('invoice-qr').style.display = 'none';

    document.getElementById('invoice-bolt').innerText = json.payment_request || json.bolt11 || '';
    document.getElementById('modal-invoice').style.display = 'flex';

    pollInvoiceStatus(json.invoice_id);
  }catch(e){
    alert('Error al crear factura: ' + e.message);
  }
});

document.getElementById('close-invoice').addEventListener('click', ()=> {
  document.getElementById('modal-invoice').style.display = 'none';
});
document.getElementById('copy-bolt').addEventListener('click', ()=>{
  const txt = document.getElementById('invoice-bolt').innerText;
  if(!txt) return alert('No hay BOLT11');
  navigator.clipboard.writeText(txt).then(()=> alert('BOLT11 copiado'));
});

/* Poll para confirmar pago */
let pollTimer = null;
async function pollInvoiceStatus(invoice_id){
  if(!invoice_id) return;
  if(pollTimer) clearInterval(pollTimer);
  pollTimer = setInterval(async ()=>{
    try{
      const r = await fetch('backend/check_invoice.php?id=' + encodeURIComponent(invoice_id));
      const j = await r.json();
      if(j.ok && j.paid){
        clearInterval(pollTimer);
        alert('Pago recibido — gracias!');
        cart = {};
        updateCartUI();
        document.getElementById('modal-invoice').style.display = 'none';
        document.getElementById('modal-cart').style.display = 'none';
      }
    }catch(e){ /* ignore errors */ }
  }, 3000);
}

/* ============================
   Utilities & inicio
   ============================ */
function escapeHtml(str){
  if(!str) return '';
  return String(str).replace(/[&<>"'`=\/]/g, function(s) {
    return {
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;',"/":'&#x2F;','`':'&#x60;','=':'&#x3D;'
    }[s];
  });
}

/* Inicial */
applyFilters();
updateCartUI();
