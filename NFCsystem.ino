#include <Wire.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <PN532_I2C.h>
#include <PN532.h>  // Elechouse PN532 library

const char* ssid = "Za ljude u nevolji";        // Your Wi-Fi SSID
const char* password = "klaunizam123"; // Your Wi-Fi password

// Create PN532 instance using I2C
PN532_I2C pn532(Wire);
PN532 nfc(pn532);

void setup() {
  Serial.begin(115200);
  delay(1000);

  // Initialize NFC module
  nfc.begin();
  uint32_t versiondata = nfc.getFirmwareVersion();
  if (!versiondata) {
    Serial.println("Didn't find PN532 module");
    while (1);
  }

  // Configure the NFC module
  nfc.SAMConfig();
  Serial.println("Waiting for an NFC card ...");

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.print("Connected to WiFi with IP: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  uint8_t success;
  uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 }; 
  uint8_t uidLength;

  // Check if an NFC card is present
  success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength);

  if (success) {
    Serial.println("Found an NFC card!");
    String uidString = "";
    for (uint8_t i = 0; i < uidLength; i++) {
      uidString += String(uid[i], HEX);
    }
    uidString.toUpperCase();
    Serial.print("UID: ");
    Serial.println(uidString);

    // Send the UID to the server
    sendDataToServer(uidString);

    delay(3000);  // Wait for 3 seconds before scanning for the next tag
  }
}

void sendDataToServer(String uid) {
  HTTPClient http;
  WiFiClient client;

  // Use your server's local IP address and port here
  String url = "http://192.168.246.168:5000/api/nfc";  // Replace with your server's local IP and port
  http.begin(client, url);  // Use WiFiClient and the URL
  
  http.addHeader("Content-Type", "application/json");

  // Prepare JSON data with the UID
  String jsonPayload = "{\"uid\":\"" + uid + "\"}";

  // Send POST request with JSON payload
  int httpCode = http.POST(jsonPayload);

  // Check the response
  if (httpCode > 0) {
    Serial.printf("POST Response code: %d\n", httpCode);
    String payload = http.getString();
    Serial.println(payload);  // Print the response payload
  } else {
    Serial.printf("Error on sending POST request: %s\n", http.errorToString(httpCode).c_str());
  }

  // End HTTP request
  http.end();
}
