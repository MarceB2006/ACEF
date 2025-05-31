function crearFilaAprendices(tbody, index) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${index}</td>
    <td><input type="text"></td>
    <td><input type="text"></td>
    <td><input type="text"></td>
    <td><input type="text"></td>
    <td><input type="text"></td>
  `;
  tbody.appendChild(row);

  // Agregar listener a inputs para verificar última fila
  const inputs = row.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('input', () => verificarUltimaFila(input, tbody.id));
  });
}

function crearFilaEvaluacion(tbody) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><input type="text"/></td>
    <td contenteditable="true"></td>
    <td><input type="text"/></td>
    <td><input type="text"/></td>
    <td><input type="text"/></td>
  `;
  tbody.appendChild(row);

  const inputs = row.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('input', () => verificarUltimaFila(input, tbody.id));
  });
}

function verificarUltimaFila(input, tablaId) {
  const tbody = document.getElementById(tablaId);
  const filas = tbody.getElementsByTagName('tr');
  const ultimaFila = filas[filas.length - 1];
  if (ultimaFila.contains(input)) {
    if (tablaId === 'evaluacion') {
      crearFilaEvaluacion(tbody);
    } else {
      crearFilaAprendices(tbody, filas.length + 1);
    }
  }
}