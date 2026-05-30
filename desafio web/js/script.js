document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos del DOM
    const valorInput = document.getElementById('valorInput');
    const form = document.getElementById('mainForm');
    const resultadoDiv = document.getElementById('resultado');
    const formTitle = document.getElementById('formTitle');
    const inputLabel = document.getElementById('inputLabel');
    const inputHint = document.getElementById('inputHint');
    
    let modoActual = 'fibonacci'; // fibonacci, primos, combinado
    
    // Detectar cambio de modo (radio buttons)
    const radioButtons = document.querySelectorAll('input[name="modo"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            modoActual = this.value;
            actualizarFormularioPorModo();
            resultadoDiv.innerHTML = `<div class="result-placeholder">
                <i class="fas fa-hand-peace"></i> Modo cambiado a ${getModoNombre()}. Ingresa datos y calcula.
            </div>`;
            valorInput.value = '';
        });
    });
    
    function getModoNombre() {
        switch(modoActual) {
            case 'fibonacci': return 'Ahorro Fibonacci';
            case 'primos': return 'Verificador de Primos';
            case 'combinado': return 'Fibonacci + Primos';
            default: return '';
        }
    }
    
    function actualizarFormularioPorModo() {
        switch(modoActual) {
            case 'fibonacci':
                formTitle.innerHTML = '💰 Simula tu ahorro Fibonacci';
                inputLabel.innerHTML = '<i class="fas fa-calendar-alt"></i> ¿Cuántos meses vas a ahorrar?';
                valorInput.min = '1';
                valorInput.max = '40';
                valorInput.placeholder = 'Ej: 6, 12, 24...';
                inputHint.innerHTML = '🔹 Recomendado: 6 a 24 meses';
                break;
            case 'primos':
                formTitle.innerHTML = '🔐 Verificador de Números Primos';
                inputLabel.innerHTML = '<i class="fas fa-shield-alt"></i> Ingresa un número para verificar si es primo';
                valorInput.min = '1';
                valorInput.max = '999999';
                valorInput.placeholder = 'Ej: 17, 29, 101...';
                inputHint.innerHTML = '🔹 Los números primos solo son divisibles entre 1 y sí mismos';
                break;
            case 'combinado':
                formTitle.innerHTML = '🌀 Fibonacci + Detección de Primos';
                inputLabel.innerHTML = '<i class="fas fa-star-of-life"></i> ¿Cuántos términos de Fibonacci quieres generar?';
                valorInput.min = '1';
                valorInput.max = '30';
                valorInput.placeholder = 'Ej: 10, 15, 20...';
                inputHint.innerHTML = '🔹 Se mostrará la secuencia y se resaltarán los números primos';
                break;
        }
    }
    
    // ========== FUNCIONES MATEMÁTICAS ==========
    
    // Verificar si un número es primo
    function esPrimo(num) {
        if (num <= 1) return false;
        if (num === 2) return true;
        if (num % 2 === 0) return false;
        for (let i = 3; i <= Math.sqrt(num); i += 2) {
            if (num % i === 0) return false;
        }
        return true;
    }
    
    // Generar secuencia Fibonacci
    function generarFibonacci(cantidad) {
        if (cantidad <= 0) return [];
        if (cantidad === 1) return [1];
        if (cantidad === 2) return [1, 1];
        
        let fib = [1, 1];
        for (let i = 3; i <= cantidad; i++) {
            fib.push(fib[i-2] + fib[i-3]);
        }
        return fib;
    }
    
    // Calcular ahorro Fibonacci
    function calcularAhorroFibonacci(meses) {
        const fib = generarFibonacci(meses);
        const total = fib.reduce((sum, val) => sum + val, 0);
        return { fib, total };
    }
    
    // ========== FUNCIONES DE VISUALIZACIÓN ==========
    
    function mostrarResultadoFibonacci(meses) {
        if (isNaN(meses) || meses < 1) {
            resultadoDiv.innerHTML = `<div style="text-align:center; color:#ff8888;">
                <i class="fas fa-exclamation-triangle"></i> Ingresa un número válido de meses (mínimo 1)
            </div>`;
            return;
        }
        
        if (meses > 40) {
            resultadoDiv.innerHTML = `<div style="text-align:center;">
                <i class="fas fa-info-circle"></i> Máximo 40 meses para mejor visualización
            </div>`;
            return;
        }
        
        const { fib, total } = calcularAhorroFibonacci(meses);
        
        let html = `<div style="animation: fadeInUp 0.5s ease;">`;
        html += `<i class="fas fa-chart-simple"></i> <strong>📆 Ahorro mes a mes:</strong><br><br>`;
        
        for (let i = 0; i < fib.length; i++) {
            html += `<div style="background: rgba(255,152,0,0.1); margin: 6px 0; padding: 6px 12px; border-radius: 40px; display: flex; justify-content: space-between; flex-wrap: wrap;">
                        <span>🌸 Mes ${i+1}</span>
                        <span style="font-weight: bold; color: #ffb347;">${fib[i]} Bs.</span>
                    </div>`;
        }
        
        html += `<hr style="border-color: #ff980055; margin: 18px 0;">`;
        html += `<div style="font-size: 1.2rem; text-align: center;">
                    <i class="fas fa-piggy-bank"></i> <strong>💰 Total ahorrado:</strong> 
                    <span style="font-size: 2rem; color: #ffcc00; margin-left: 8px;">${total} Bs.</span>
                </div>`;
        html += `<div style="font-size: 0.8rem; text-align: center; margin-top: 12px; opacity:0.8;">
                    ✨ Secuencia: ${fib.join(' → ')} = ${total}
                </div>`;
        html += `</div>`;
        
        resultadoDiv.innerHTML = html;
    }
    
    function mostrarResultadoPrimo(numero) {
        if (isNaN(numero) || numero < 1) {
            resultadoDiv.innerHTML = `<div style="text-align:center; color:#ff8888;">
                <i class="fas fa-exclamation-triangle"></i> Ingresa un número válido mayor o igual a 1
            </div>`;
            return;
        }
        
        const esNumeroPrimo = esPrimo(numero);
        
        let html = `<div style="animation: fadeInUp 0.5s ease; text-align: center;">`;
        html += `<div style="font-size: 3rem; margin-bottom: 15px;">🔐</div>`;
        html += `<div style="font-size: 2rem; margin-bottom: 20px;">Número evaluado: <strong>${numero}</strong></div>`;
        
        if (esNumeroPrimo) {
            html += `<div style="background: rgba(0, 188, 212, 0.2); border: 2px solid #00bcd4; border-radius: 30px; padding: 20px;">
                        <i class="fas fa-check-circle" style="font-size: 3rem; color: #00bcd4;"></i>
                        <p style="font-size: 1.5rem; margin-top: 10px;"><strong class="prime-number">✅ ¡${numero} es un número primo!</strong></p>
                        <p>Este número puede ser usado como clave de seguridad o código de acceso.</p>
                    </div>`;
        } else {
            html += `<div style="background: rgba(255, 100, 100, 0.1); border: 2px solid #ff6666; border-radius: 30px; padding: 20px;">
                        <i class="fas fa-times-circle" style="font-size: 3rem; color: #ff8888;"></i>
                        <p style="font-size: 1.5rem; margin-top: 10px;"><strong>❌ ${numero} NO es primo</strong></p>
                        <p>No es recomendable para sistemas de seguridad que requieran números primos.</p>
                    </div>`;
        }
        
        if (!esNumeroPrimo && numero > 1) {
            let divisores = [];
            for (let i = 2; i <= numero / 2; i++) {
                if (numero % i === 0) divisores.push(i);
            }
            html += `<div style="margin-top: 15px; font-size: 0.85rem; opacity: 0.7;">
                        <i class="fas fa-chart-simple"></i> Divisores: 1, ${divisores.join(', ')}, ${numero}
                    </div>`;
        }
        
        html += `</div>`;
        resultadoDiv.innerHTML = html;
    }
    
    function mostrarResultadoCombinado(cantidad) {
        if (isNaN(cantidad) || cantidad < 1) {
            resultadoDiv.innerHTML = `<div style="text-align:center; color:#ff8888;">
                <i class="fas fa-exclamation-triangle"></i> Ingresa una cantidad válida de términos
            </div>`;
            return;
        }
        
        if (cantidad > 30) {
            resultadoDiv.innerHTML = `<div style="text-align:center;">
                <i class="fas fa-info-circle"></i> Máximo 30 términos para mejor visualización
            </div>`;
            return;
        }
        
        const fib = generarFibonacci(cantidad);
        const primosEncontrados = fib.filter(n => esPrimo(n));
        
        let html = `<div style="animation: fadeInUp 0.5s ease;">`;
        html += `<i class="fas fa-star-of-life"></i> <strong>🔢 Secuencia de Fibonacci (${cantidad} términos):</strong><br><br>`;
        
        for (let i = 0; i < fib.length; i++) {
            const esPrimoNum = esPrimo(fib[i]);
            const primeBadge = esPrimoNum ? ' <span style="background: #00bcd4; border-radius: 20px; padding: 2px 10px; font-size: 0.7rem;">🔐 PRIMO</span>' : '';
            
            html += `<div style="background: rgba(255,152,0,0.1); margin: 6px 0; padding: 8px 12px; border-radius: 40px; display: flex; justify-content: space-between; flex-wrap: wrap;">
                        <span>📍 Término ${i+1}</span>
                        <span style="font-weight: bold; ${esPrimoNum ? 'color: #4dd0e1; text-shadow: 0 0 5px #00bcd4;' : 'color: #ffb347;'}">${fib[i]} ${primeBadge}</span>
                    </div>`;
        }
        
        html += `<hr style="border-color: #ff980055; margin: 18px 0;">`;
        html += `<div style="text-align: center;">
                    <i class="fas fa-chart-line"></i> <strong>📊 Resumen:</strong><br>
                    Total de términos: ${fib.length}<br>
                    Números primos encontrados: <strong class="prime-number">${primosEncontrados.length}</strong><br>
                    Primos: ${primosEncontrados.length > 0 ? primosEncontrados.join(', ') : 'Ninguno'}
                </div>`;
        html += `</div>`;
        
        resultadoDiv.innerHTML = html;
    }
    
    // Manejar el envío del formulario
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let valor = parseInt(valorInput.value);
        
        if (valorInput.value.trim() === "" || isNaN(valor)) {
            resultadoDiv.innerHTML = `<div style="color:#ffaa66;"><i class="fas fa-times-circle"></i> Ingresa un valor válido</div>`;
            return;
        }
        
        switch(modoActual) {
            case 'fibonacci':
                mostrarResultadoFibonacci(valor);
                break;
            case 'primos':
                mostrarResultadoPrimo(valor);
                break;
            case 'combinado':
                mostrarResultadoCombinado(valor);
                break;
        }
    });
    
    // Demo inicial
    mostrarResultadoFibonacci(8);
    
    // Enlaces (actualizar con tus URLs)
    const repoLink = document.getElementById('repoLink');
    const liveLink = document.getElementById('liveLink');
    
    repoLink.href = "https://github.com/tuusuario/desafio-fibonacci-primos";
    liveLink.href = "https://tuusuario.github.io/desafio-fibonacci-primos";
    
    console.log("🚀 Fibonacci + Primos - Aplicación completa cargada");
});