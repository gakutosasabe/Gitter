#include <M5stickCPlus.h>
#include <Wifi.h>

const char* ssid = "IODATA-1ac424-2G";
const char* password = "ML1t276448355";

float gyroX, gyroY, gyroZ;


void setup() {
  //初期化
  M5.begin();
  M5.IMU.Init(); //加速度センサ初期化
  M5.Lcd.setTextSize(1);
  M5.Lcd.print("Gitter Ver 0.5");
  
  //Wifi接続
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED){
    delay(500);
    M5.Lcd.print('.');
  }
  M5.Lcd.print("\r\nWiFi connected\r\nIP address: ");
  M5.Lcd.println(WiFi.localIP());

}

void loop() {
  M5.update();
  M5.IMU.getGyroData(&gyroX, &gyroY, &gyroZ);
  M5.Lcd.setCursor(0, 30);
  M5.Lcd.printf("X:%7.2f\n Y:%7.2f\n Z:%7.2f ", gyroX, gyroY, gyroZ);
  delay(500);
}