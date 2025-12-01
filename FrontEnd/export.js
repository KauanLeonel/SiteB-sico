  async function exportarPDF() {
      const res = await fetch("http://localhost:3000/export/export/users/pdf");
      const data = await res.json();
      if (data.filePath)
        window.location.href = "http://localhost:3000/download/download?file=" + data.filePath;
    }

    async function exportarJSON() {
      const res = await fetch("http://localhost:3000/export/export/docs/json");
      const data = await res.json();
      if (data.filePath)
        window.location.href = "http://localhost:3000/download/download?file=" + data.filePath;
    }

    async function exportarCSV() {
      const res = await fetch("http://localhost:3000/export/export/address/csv");
      const data = await res.json();
      if (data.filePath)
        window.location.href = "http://localhost:3000/download/download?file=" + data.filePath;
    }