/**
 * Validiert, ob die verschlüsselten Daten das richtige Format haben
 */
export function validateEncryptedData(encryptedData) {
  if (!encryptedData) {
    throw new Error('Verschlüsselte Daten fehlen');
  }

  if (!encryptedData.ciphertext || !encryptedData.nonce) {
    throw new Error('Ungültiges Verschlüsselungsformat. Benötigt: ciphertext, nonce');
  }
  // Optional: Validiere Base64-Format
  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;

  if (!base64Regex.test(encryptedData.ciphertext) || !base64Regex.test(encryptedData.nonce)) {
    throw new Error('Ungültiges Base64-Format');
  }

  return true;
}
/**
 * Bereitet verschlüsselte Daten für die Datenbank vor
 * Der Server kann diese Daten NICHT entschlüsseln
 */
export function prepareForStorage(encryptedData) {
  validateEncryptedData(encryptedData);

  return {
    ciphertext: encryptedData.ciphertext,
    nonce: encryptedData.nonce,

    // NICHT verschlüsselte Metadaten
    encrypted_at: new Date().toISOString(),
    encryption_version: 'libsodium-v1',
  };
}
/**
 * Bereitet verschlüsselte Daten aus der Datenbank
 * für die Rückgabe an den Client vor
 */
export function prepareForClient(storedData) {
  return {
    ciphertext: storedData.ciphertext,
    nonce: storedData.nonce,
    encrypted_at: storedData.encrypted_at,
    encryption_version: storedData.encryption_version,
  };
}
/**
 * WICHTIG:
 * ❌ KEINE decrypt-Funktion
 * ❌ KEIN Zugriff auf Schlüssel
 *
 * Das ist der Kern echter E2E-Verschlüsselung
 */
