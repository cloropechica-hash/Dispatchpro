/**
 * Google Apps Script Web App
 * Deploy this script sa Google Sheet mo para makatanggap ng data mula sa Dispatcher Pro app.
 * 
 * Paano i-deploy:
 * 1. Buksan ang Google Sheet mo
 * 2. Extensions > Apps Script
 * 3. I-paste itong code, i-save
 * 4. I-deploy > New deployment > Type: Web app
 * 5. Access: Anyone (o kaya Anyone with link, depende sa'yo)
 * 6. Execute as: Me
 * 7. Kopyahin ang URL at i-paste sa index.html at main.js
 */

const SPREADSHEET_ID = '12h-hFEPh1q5SxlyeDRbqv_Nu1JuAkinzWPfKUFXf1Ao';
const SHEET_NAME = 'DATABASE';

function getTargetSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  return ss.getSheetByName(SHEET_NAME);
}

function doPost(e) {
  try {
    const sheet = getTargetSheet();
    const data = JSON.parse(e.postData.contents);

    // Kung wala pang laman ang sheet, lagyan ng header row
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp',
        'Date Requested',
        'Job ID',
        'Particulars',
        'Consignee',
        'MBL',
        'HBL',
        'Container Number',
        'Total Amount (Valuation)',
        'Requested By',
        'Supplier Name',
        'Service Fee Amount'
      ];
      sheet.appendRow(headers);
    }

    // Append ang data bilang bagong row
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.date_requested || '',
      data.job_id || '',
      data.particulars || '',
      data.consignee || '',
      data.mbl || '',
      data.hbl || '',
      data.container_number || '',
      data.amount_1 || '',
      data.requested_by || '',
      data.supplier_name || '',
      data.amount_2 || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
