import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

const doc = new jsPDF();
try {
  if (typeof doc.autoTable === 'function') {
    console.log("doc.autoTable is a function");
  } else {
    console.log("doc.autoTable is missing");
  }
} catch (e) {
  console.log("Error:", e.message);
}
