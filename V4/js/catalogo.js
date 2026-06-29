// 1. Constantes globales
const STORAGE_KEY = "destinos";

const listaPublicaEl = document.getElementById("listaPublicaDestinos");
const sinDestinosEl = document.getElementById("sinDestinos");

// 2. Funciones de utilidad
function formatearPrecio(precio) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(precio);
}

function obtenerDestinos() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// 3. Funciones de renderizado (¡Asegúrate de tener estas!)
function crearCardPublica(destino) {
  const col = document.createElement("div");
  col.className = "col-12 col-md-6 col-lg-4"; 

  col.innerHTML = `
    <div class="card destino-card h-100 shadow-sm">
      <div class="destino-img-wrapper">
        <img
          src="${destino.imagen}"
          alt="${destino.nombre}"
          class="card-img-top"
          onerror="this.src='https://placehold.co/600x300/2e6a50/ffffff?text=Destino+Colombia'"
        />
      </div>
      <div class="card-body d-flex flex-column">
        <h5 class="card-title text-navy mb-1 fw-bold">${destino.nombre}</h5>
        <p class="text-muted small mb-2"><i class="bi bi-geo-alt"></i> ${destino.region}</p>
        <span class="badge categoria-badge mb-2 align-self-start">${destino.categoria}</span>
        <p class="small text-secondary text-truncate-3">${destino.descripcion}</p>
        
        <div class="mt-auto pt-3 border-top">
          <p class="precio-tag mb-1 fw-bold text-success fs-5">${formatearPrecio(destino.precio)}</p>
          <div class="d-flex justify-content-between small text-muted mb-0">
            <span><i class="bi bi-clock"></i> ${destino.duracion}</span>
            <span><i class="bi bi-people"></i> ${destino.cupos} disponibles</span>
          </div>
        </div>
      </div>
    </div>
  `;
  return col;
}

function renderizarCatalogo() {
  const destinos = obtenerDestinos();
  listaPublicaEl.innerHTML = "";

  if (destinos.length === 0) {
    sinDestinosEl.classList.remove("d-none");
    return;
  }

  sinDestinosEl.classList.add("d-none");
  destinos.forEach((destino) => {
    listaPublicaEl.appendChild(crearCardPublica(destino));
  });
}

// 4. Inicializador (SIEMPRE AL FINAL)
document.addEventListener("DOMContentLoaded", renderizarCatalogo);