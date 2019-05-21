const ipValidator = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
const subnet = /\d/;
const tableRef = document.getElementById('table');
var clase, mascara, ipBinario, numRed, numHost, Subredes, broadcast;

function calculate() {
  const table = document.getElementById('tableBody');
  table.innerHTML = '';
  const ip = document.getElementById('txtIp').value;
  const ipSeparate = ip.split('/');
  if (ipSeparate.length === 2) {
    if (ipValidator.exec(ipSeparate[0])) {
      if (subnet.exec(ipSeparate[1])) {
        const netWork = ipSeparate[0].split('.');
        if (netWork[0] >= 0 && netWork[0] <= 127) {
          clase = 'A';
          mascara = '255.0.0.0';
          numRed = `${netWork[0]}.0.0.0`;
          calculateSubRed(ipSeparate[1], clase);
          calculateSubNet(netWork);
        } else if (netWork[0] >= 128 && netWork[0] <= 191) {
          clase = 'B';
          mascara = '255.255.0.0';
          numRed = `${netWork[0]}.${netWork[1]}.0.0`;
          calculateSubRed(ipSeparate[1], clase);
          calculateSubNet(netWork);
        } else if (netWork[0] >= 192 && netWork[0] <= 223) {
          clase = 'C';
          mascara = '255.255.255.0';
          numRed = `${netWork[0]}.${netWork[1]}.${netWork[2]}.0`;
          calculateSubRed(ipSeparate[1], clase);
          calculateSubNet(netWork);
        } else if (netWork[0] >= 224 && netWork[0] <= 239) {
          clase = 'D';
          mascara = '255.255.255.255';
          numRed = `${netWork[0]}.${netWork[1]}.${netWork[2]}.0`;
          calculateSubRed(ipSeparate[1], clase);
          calculateSubNet(netWork);
        } else if (netWork[0] >= 240 && netWork[0] <= 255) {
          clase = 'E';
          mascara = '255.255.255.255';
          numRed = `${netWork[0]}.${netWork[1]}.${netWork[2]}.0`;
          calculateSubRed(ipSeparate[1], clase);
          calculateSubNet(netWork);
        } else {
          alerts(
            'El formato que ha proporcionado no es válido, verifíquelo por favor1',
            'error'
          );
        }
        console.log(clase);
      } else {
        alerts(
          'El formato que ha proporcionado no es válido, verifíquelo por favor2',
          'error'
        );
      }
    } else {
      alerts(
        'El formato que ha proporcionado no es válido, verifíquelo por favor3',
        'error'
      );
    }
  } else {
    alerts(
      'El formato que ha proporcionado no es válido, verifíquelo por favor4',
      'error'
    );
  }
}

function calculateSubRed(ipSeparate, clase) {
  const subN = parseInt(ipSeparate);
  switch (clase) {
    case 'A':
      const subA = (parseInt(8) - parseInt(subN)).toString(2);
      const lengSnA = subA.split('1');
      const lengHA = subA.split('0');
      Subredes = lengSnA * 8;
      numHost = lengHA * 8;
      break;
    case 'B':
      const subB = (parseInt(16) - parseInt(subN)).toString(2);
      const lengSnB = subB.split('1');
      const lengHB = subB.split('0');
      Subredes = lengSnB * 8;
      numHost = lengHB * 8;
      break;
    default:
      const subC = (parseInt(24) - parseInt(subN)).toString(2);
      const lengSnC = subC.split('1');
      const lengHC = subC.split('0');
      Subredes = lengSnC * 8;
      numHost = lengHC * 8;
      break;
  }
}

function calculateSubNet(netWork) {
  ipBinario = `${parseInt(netWork[0]).toString(2)}
    .${parseInt(netWork[1]).toString(2)}
    .${parseInt(netWork[2]).toString(2)}
    .${parseInt(netWork[3]).toString(2)}`;
  const info = {
    clase,
    mascara,
    ipBinario,
    numRed,
    numHost,
    Subredes,
    broadcast
  };
  var tableR = tableRef.getElementsByTagName('tbody')[0];
  var newRow = tableR.insertRow(tableR.rows.length);
  var newCells = [newRow.insertCell(0), newRow.insertCell(1)];

  var newText = [
    document.createTextNode('Clase'),
    document.createTextNode(info.clase)
  ];
  newCells[0].appendChild(newText[0]);
  newCells[1].appendChild(newText[1]);

  newRow = tableR.insertRow(tableR.rows.length);
  newCells = [newRow.insertCell(0), newRow.insertCell(1)];

  var newText = [
    document.createTextNode('Mácara'),
    document.createTextNode(info.mascara)
  ];
  newCells[0].appendChild(newText[0]);
  newCells[1].appendChild(newText[1]);

  newRow = tableR.insertRow(tableR.rows.length);
  newCells = [newRow.insertCell(0), newRow.insertCell(1)];

  var newText = [
    document.createTextNode('ip binario'),
    document.createTextNode(info.ipBinario)
  ];
  newCells[0].appendChild(newText[0]);
  newCells[1].appendChild(newText[1]);

  newRow = tableR.insertRow(tableR.rows.length);
  newCells = [newRow.insertCell(0), newRow.insertCell(1)];

  var newText = [
    document.createTextNode('Dirección de red'),
    document.createTextNode(info.numRed)
  ];
  newCells[0].appendChild(newText[0]);
  newCells[1].appendChild(newText[1]);

  newRow = tableR.insertRow(tableR.rows.length);
  newCells = [newRow.insertCell(0), newRow.insertCell(1)];

  var newText = [
    document.createTextNode('numero de host'),
    document.createTextNode(info.numHost)
  ];
  newCells[0].appendChild(newText[0]);
  newCells[1].appendChild(newText[1]);

  newRow = tableR.insertRow(tableR.rows.length);
  newCells = [newRow.insertCell(0), newRow.insertCell(1)];

  var newText = [
    document.createTextNode('Subredes'),
    document.createTextNode(info.Subredes)
  ];
  newCells[0].appendChild(newText[0]);
  newCells[1].appendChild(newText[1]);

  newRow = tableR.insertRow(tableR.rows.length);
  newCells = [newRow.insertCell(0), newRow.insertCell(1)];

  var newText = [
    document.createTextNode('Broadcast'),
    document.createTextNode(info.broadcast)
  ];
  newCells[0].appendChild(newText[0]);
  newCells[1].appendChild(newText[1]);
}

function alerts(message, type) {
  switch (type) {
    case 'error':
      Swal.fire({
        type: 'error',
        title: 'Algo ha salido mal',
        text: message
      });
      break;
    case 'loader':
      let timerInterval;
      Swal.fire({
        title: '<strong>Cargando...</strong>',
        html: message,
        timer: 1000,
        onBeforeOpen: () => {
          Swal.showLoading();
          timerInterval = setInterval(() => {}, 100);
        },
        onClose: () => {
          clearInterval(timerInterval);
        }
      });
      break;
  }
}
