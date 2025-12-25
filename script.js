const { jsPDF } = window.jspdf;

function showFileName() {
    const input = document.getElementById("docxInput");
    const fileNameDiv = document.getElementById("fileName");

    if (input.files.length > 0) {
        fileNameDiv.innerHTML = "✔️ File dipilih: <b>" + input.files[0].name + "</b>";
    } else {
        fileNameDiv.innerHTML = "";
    }
}

async function convertToPDF() {
    const input = document.getElementById("docxInput");
    const status = document.getElementById("status");

    if (!input.files.length) {
        status.innerText = "⚠️ Pilih file DOCX dulu";
        return;
    }

    status.innerText = "⏳ Mengonversi dokumen...";

    try {
        const file = input.files[0];
        const arrayBuffer = await file.arrayBuffer();

        // Ambil nama file asli (tanpa .docx)
        const originalName = file.name.replace(/\.docx$/i, "");

        // DOCX ➜ TEXT
        const result = await mammoth.extractRawText({ arrayBuffer });
        const text = result.value;

        // TEXT ➜ PDF
        const pdf = new jsPDF();
        const lines = pdf.splitTextToSize(text, 180);
        pdf.text(lines, 10, 10);

        // Simpan dengan nama yang sama
        pdf.save(originalName + ".pdf");

        status.innerText = "✅ Berhasil! Nama file tetap sama.";

    } catch (error) {
        status.innerText = "❌ Terjadi kesalahan saat konversi!";
        console.error(error);
    }
}
