const form = document.querySelector(".form");
const tentativas = 4;
let tentativaAtual = 0;
let listaValores = [];
const tableBody = document.getElementById('tableBody');
const numeroAleatorio = Math.floor(Math.random() * 361);

const tentativasDiv = form.querySelector("div");
const tabela = form.querySelector("table");

form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    let inputgrau = evento.target.querySelector("#grau");
    let grau = Number(inputgrau.value);


    if (grau < 0 || grau >= 361) {
        showToast("Por favor, insira um número entre 0 e 360!", 3000);
        return;
    }

    tentativaAtual += 1;


    tentativasDiv.textContent = `Tentativas: ${tentativaAtual}/${tentativas}`;


    if (tentativaAtual >= tentativas || numeroAleatorio == grau) {
        form.querySelector("button").disabled = true;
    }

    listaValores.push(grau);

    tableBody.innerHTML = '';


    for (let i = 0; i < listaValores.length; i++) {

        const row = document.createElement('tr');

        const cellId = document.createElement('td');
        if (i + 1 == tentativas && numeroAleatorio != listaValores[i]) {
            cellId.textContent = numeroAleatorio + '°';
        } else {
            cellId.textContent = listaValores[i] + '°';
        }
        row.appendChild(cellId);
        //ícone
        const cellSeta = document.createElement('td');
        if (i + 1 == tentativas && numeroAleatorio != listaValores[i]) {
            cellSeta.innerHTML = '❌';
            showToast('OPS 😭❌ o valor é ' + numeroAleatorio + ' 😭❌', 20000);
        } else if (numeroAleatorio > listaValores[i]) {
            cellSeta.innerHTML = '⬆️';
        } else if (numeroAleatorio < listaValores[i]) {
            cellSeta.innerHTML = '⬇️';
        } else {
            cellSeta.innerHTML = '✅';
            showToast('✅🥳' + numeroAleatorio + ' 🥳✅', 50000);
        }
        row.appendChild(cellSeta);

        let diferencaAbsoluta = Math.abs(numeroAleatorio - listaValores[i]);

        const cellTemperatura = document.createElement('td');
        const inputCampo = document.getElementById('grau');
        if (i + 1 == tentativas && numeroAleatorio != listaValores[i]) {
            cellTemperatura.textContent = '🗙';
            inputCampo.disabled = true;
        } else if (numeroAleatorio == listaValores[i]) {
            cellTemperatura.textContent = '✔';
            inputCampo.disabled = true;
        } else if (diferencaAbsoluta < 5) {
            cellTemperatura.textContent = 'Fervendo!🥵';
        } else if (diferencaAbsoluta < 10) {
            cellTemperatura.textContent = 'Quente!🔥';
        } else if (diferencaAbsoluta < 20) {
            cellTemperatura.textContent = 'Ficando quente!🌡️';
        } else if (diferencaAbsoluta < 50) {
            cellTemperatura.textContent = 'Morno!😶';
        } else if (diferencaAbsoluta < 100) {
            cellTemperatura.textContent = 'Frio!🥶';
        } else if (diferencaAbsoluta >= 100) {
            cellTemperatura.textContent = 'Congelando!❄️';
        }

        row.appendChild(cellTemperatura);

        tableBody.appendChild(row);
    }
});

let toastTimeout;

function showToast(msgToast, time) {
    const toast = document.getElementById("toast");

    if (toastTimeout) {
        clearTimeout(toastTimeout);
        toast.className = toast.className.replace("show", "");
    }

    toast.className = "toast show";
    toast.innerHTML = msgToast;

    if (time > 0) {
        toastTimeout = setTimeout(function () {
            toast.className = toast.className.replace("show", "");
        }, time);
    }
}

window.onload = function () {
    const canvas = document.getElementById('desenhoAngulo');
    const ctx = canvas.getContext('2d');
    const angleDegrees = numeroAleatorio;
    const angleRadians = angleDegrees * (Math.PI / 180);


    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const lineLength = 150;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + lineLength, centerY);
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = 2;
    ctx.stroke();

    const endX = centerX + lineLength * Math.cos(angleRadians);
    const endY = centerY - lineLength * Math.sin(angleRadians);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, 0, -angleRadians, true);
    ctx.strokeStyle = "#ffa500";
    ctx.stroke();
}
