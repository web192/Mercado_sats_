/* app.js - lógica de MercadoKids (front) */
/* Asume backend: backend/create_invoice.php y backend/check_invoice.php (LNbits) */

/* ============================
   Catálogo (arrays front-only, listo para reemplazar por API)
   ============================ */
const products = [
  {id:1,nombre:"Pelota infantil arcoíris",categoria:"articulos",imagen:"https://tse3.mm.bing.net/th/id/OIP.IJhEHITA5RRahyaOnCk2LwHaHa?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3",price:5.00,stock:50,descripcion:"Pelota suave y colorida para niños."},
  {id:2,nombre:"Juego didáctico 20 piezas",categoria:"articulos",imagen:"https://tse4.mm.bing.net/th/id/OIP.KKLWWPeW6IzNtf87m9bMKAHaHa?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3",price:15.00,stock:20,descripcion:"Juego para aprender formas y colores."},
  {id:3,nombre:"Jugo natural naranja 250ml",categoria:"bebidas",imagen:"https://th.bing.com/th/id/R.9ebdb38ef3055a12c9f0c1e13623cb92?rik=KRDiz7xmUusW1w&riu=http%3a%2f%2facdn.mitiendanube.com%2fstores%2f093%2f780%2fproducts%2f601-7783362ea31416edca16193965512256-640-0.jpeg&ehk=V9Tb12NcqbxN4%2fha19aQs5PvfglmXqPAgH04eKqMDHw%3d&risl=&pid=ImgRaw&r=0",price:1.50,stock:100,descripcion:"Jugo natural sin azúcares añadidos."},
  {id:4,nombre:"Sándwich saludable",categoria:"comida",imagen:"https://th.bing.com/th/id/R.75a3f4a83fc51e79a8316b894b88261d?rik=9RkYOFU%2fLtPHhQ&riu=http%3a%2f%2fohmybio.es%2fwp-content%2fuploads%2f2018%2f03%2fSandwich-saludable.jpg&ehk=XMyfDmecu1hFOoGP3kdWt8KqiBGK9HXmQam027knqkA%3d&risl=&pid=ImgRaw&r=0",price:2.50,stock:40,descripcion:"Sándwich con pan integral y vegetales."},
  {id:5,nombre:"Galletas para niños 200g",categoria:"comida",imagen:"https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750047802831L.jpg",price:1.00,stock:200,descripcion:"Galletas suaves y sin nueces."},
  {id:6,nombre:"Muñeca articulada 30cm",categoria:"juguetes",imagen:"https://tse2.mm.bing.net/th/id/OIP.ldM6KE2pLl85MP-TCapQKwHaHa?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3",price:12.00,stock:30,descripcion:"Muñeca con ropa y accesorios."},
  {id:7,nombre:"Carrito de juguete",categoria:"juguetes",imagen:"https://tse1.mm.bing.net/th/id/OIP.PpzO8MUa51KxFjx3KTKi0gHaHa?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3",price:9.50,stock:18,descripcion:"Carrito a control manual para niños."},
  {id:8,nombre:"Camiseta infantil Talla 6",categoria:"ropa",imagen:"https://www.calcetinesycamisetas.com/801-thickbox_default/camiseta-disney-mickey-mouse-nino.jpg",price:6.00,stock:80,descripcion:"Camiseta cómoda algodón 100%."},
  {id:9,nombre:"Set de colores 24",categoria:"articulos",imagen:"https://libreriairbe.com/wp-content/uploads/2020/04/Set-24-L%C3%A1pices-de-Colores-Maped-ColorPeps-.jpg",price:3.50,stock:120,descripcion:"Set de lápices y marcadores."},
  {id:10,nombre:"Puzzle 100 piezas",categoria:"articulos",imagen:"https://th.bing.com/th/id/OIP.50vvLczWA-N7QIlWUwecCQHaHa?o=7&cb=ucfimgc2rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",price:7.00,stock:25,descripcion:"Puzzle educativo para niños."},
  {id:11,nombre:"Mordedor silicona",categoria:"articulos",imagen:"https://tse2.mm.bing.net/th/id/OIP.h4YzUo4vFNq9ya4MPDohIQHaHa?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3",price:2.50,stock:60,descripcion:"Mordedor seguro para bebés."},
  {id:12,nombre:"Set de platos infantiles",categoria:"comida",imagen:"https://tse4.mm.bing.net/th/id/OIP.WASVo8Tv3qAEatIycwTZGQHaHa?cb=ucfimgc2&w=692&h=692&rs=1&pid=ImgDetMain&o=7&rm=3",price:10.00,stock:40,descripcion:"Platos resistentes y coloridos."},
  {id:13,nombre:"Botella térmica 350ml",categoria:"bebidas",imagen:"https://tse3.mm.bing.net/th/id/OIP.hdXvEzbzM_jYbs7GI8gzNgHaHa?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3",price:8.00,stock:50,descripcion:"Térmica para líquidos fríos y calientes."},
  {id:14,nombre:"Chaqueta niño 8 años",categoria:"ropa",imagen:"https://images.unsplash.com/photo-1542060748-10c28b62716f?w=600",price:18.00,stock:12,descripcion:"Chaqueta ligera con gorro."},
  {id:15,nombre:"Rompecabezas educativo letras",categoria:"articulos",imagen:"https://m.media-amazon.com/images/I/71P3PapTjML._AC_SL1500_.jpg",price:4.50,stock:70,descripcion:"Aprende letras jugando."},
  {id:16,nombre:"Set de construcción 60 piezas",categoria:"articulos",imagen:"https://tse1.mm.bing.net/th/id/OIP.QTlVdhMZ3B6R6Eb0gt26VAHaHa?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3",price:11.00,stock:30,descripcion:"Construye y crea figuras."},
  {id:17,nombre:"Mascarilla infantil reusable",categoria:"ropa",imagen:"https://tse2.mm.bing.net/th/id/OIP.xlkBqBdWMxeYP-NYJ9HyNwHaHa?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3",price:2.00,stock:150,descripcion:"Mascarilla colorida para niños."},
  {id:18,nombre:"Luz nocturna animalitos",categoria:"articulos",imagen:"https://m.media-amazon.com/images/I/71IGLx1AiBL._AC_SL1500_.jpg",price:6.50,stock:40,descripcion:"Luz LED suave para la noche."},
  {id:19,nombre:"Almohada infantil",categoria:"articulos",imagen:"https://tse2.mm.bing.net/th/id/OIP.cJ-3ZDM3zN58ybmf9dontQHaHa?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3",price:9.00,stock:22,descripcion:"Almohada cómoda con funda lavable."},
  {id:20,nombre:"Cubo de aprendizaje",categoria:"articulos",imagen:"https://tse1.mm.bing.net/th/id/OIP.QKPa2NEbHilrDZY3SUGbmAHaHa?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3",price:14.00,stock:15,descripcion:"Actividades sensoriales y educativas."}
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
