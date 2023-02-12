#include <M5stickCPlus.h>
#include <Wifi.h>

const char* ssid = "IODATA-1ac424-2G";
const char* password = "ML1t276448355";


const int port = 3002; //サーバー側ポート
const IPAddress local_ip(192,168,0,30); //M5Stick IPAddress
const IPAddress server_ip(192,168,0,26); //PC IPAdress
const IPAddress subnet(255,255,255,0);
WiFiClient client;

float gyroX, gyroY, gyroZ;


void setup() {
  //初期化
  M5.begin();
  M5.IMU.Init(); //加速度センサ初期化
  M5.Lcd.setTextSize(1);
  M5.Lcd.print("Gitter Ver 0.5\n");

  //TCP/IP Client設定
  WiFi.softAP(ssid,password);
  delay(100);
  WiFi.softAPConfig(local_ip, local_ip, subnet);
  M5.Lcd.print("AP IP address:");
  IPAddress myIP = WiFi.softAPIP();
  M5.Lcd.println(myIP);
  
  //Wifi接続
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED){
    delay(500);
    M5.Lcd.print('.');
  }
  M5.Lcd.print("\r\nWiFi connected\r\nIP address: ");
  M5.Lcd.println(WiFi.localIP());

  //サーバー接続
  M5.Lcd.print("\r\nLocal port: ");
  M5.Lcd.println(port);
  client.connect(server_ip, port);

}

void loop() {
  M5.update();
  M5.IMU.getGyroData(&gyroX, &gyroY, &gyroZ);
  M5.Lcd.setCursor(0, 30);
  M5.Lcd.printf("\n X:%7.2f\n Y:%7.2f\n Z:%7.2f ", gyroX, gyroY, gyroZ);
  delay(500);

  char write_data[1];
  write_data[0] = 'a';
  client.write(write_data, 1);
}