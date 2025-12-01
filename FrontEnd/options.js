const BASE_URL = "http://localhost:3000";

function downloadFile(endpoint, filename) {
    fetch(`${BASE_URL}${endpoint}`)
        .then(response => response.json())
        .then(data => {
            if (data.filePath) {
                // cria link para download
                const link = document.createElement("a");
                link.href = `${BASE_URL}/download?file=${encodeURIComponent(data.filePath)}`;
                link.download = filename;

                document.body.appendChild(link);
                link.click();
                link.remove();
            } else {
                alert("Erro ao gerar o arquivo.");
            }
        })
        .catch(err => {
            console.error(err);
            alert("Erro ao comunicar com o servidor.");
        });
}

function downloadCSV() {
    downloadFile("/export/address/csv", "enderecos.csv");
}

function downloadJSON() {
    downloadFile("/export/docs/json", "documentos.json");
}

function downloadPDF() {
    downloadFile("/export/users/pdf", "usuarios.pdf");
}
