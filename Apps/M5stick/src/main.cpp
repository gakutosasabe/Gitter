#include <M5stickCPlus.h>
#include <Wifi.h>
#include <Kalman.h>
//#include <time.h>
//#define JST     3600* 9


//自宅
const char* ssid = "IODATA-1ac424-2G";
const char* password = "ML1t276448355";
//らぼ
//const char* ssid = "ailabnet_2G";
//const char* password = "letsgettogether";

const int port = 3002; //サーバー側ポート
const IPAddress local_ip(192,168,0,15); //M5Stick IPAddress
const IPAddress server_ip(192,168,0,31); //PC IPAdress
const IPAddress subnet(255,255,255,0);
WiFiClient client;

//加速度センサー・ジャイロセンサーの値(x,y,zの順番)
float acc[3];
float gyro[3];

//カルマンフィルター後の角度情報等
float kal_angle_x;
float kal_angle_y;

Kalman kalmanX;
Kalman kalmanY;

long lastMs = 0;
long tick = 0;

//Guitter検出情報
bool guiterDetect = false; // 0がOFF,1がON
bool lastGuiterDetect = false; //前回のギター検出情報

//時刻取得関係
//time_t t;
//struct tm *tm;

//IMUからデータ取得
void readGyro(){
  M5.IMU.getGyroData(&gyro[0], &gyro[1], &gyro[2]);
  M5.IMU.getAccelData(&acc[0], &acc[1], &acc[2]);
}

float getRoll(){
  return atan2(acc[1], acc[2]) * RAD_TO_DEG;
}

float getPitch(){
  return atan(-acc[0] / sqrt(acc[1]*acc[1] + acc[2]*acc[2])) * RAD_TO_DEG;
}

//角度を描画
void draw(){
  M5.Lcd.setCursor(0, 90);
  M5.Lcd.printf("%7.2f %7.2f", kal_angle_x, kal_angle_y);
  M5.Lcd.setCursor(140, 90);
  M5.Lcd.print("deg\n");
  if(guiterDetect == false){
    M5.Lcd.print("Guiter_OFF  ");
  }else if(guiterDetect == true){
    M5.Lcd.print("Guiter_ON  ");
  }
}

//ギター検知
bool detectGuiter(float angle){
  if( -45.0f <= angle && angle <= 45.0f){
    return false;
  }else if( 45.0f < angle && angle <= 90.0f){
    return true;
  }
  
}

//現在時刻取得
//String timeGet(){
//  t = time(NULL);
//  tm = localtime(&t);
//  String yyyy = String(tm->tm_year+1900);
//  String mm = String(tm->tm_mon+1);
//  String dd = String(tm->tm_mday);
//  String hh = String(tm->tm_hour);
//  String min = String(tm->tm_min);
//  String ss = String(tm->tm_sec);
//  String time = String(yyyy + "/" + mm + "/" + dd + " " + hh +":" + min + ":" + ss);
//  return time;
//}

//送信データ作成
String dataCreate(bool detect_guiter){
  if(detect_guiter == false){
    return String("START");
  }else{
    return String("END");
  }
}

void setup() {
  //初期化
  M5.begin();
  M5.IMU.Init(); //加速度センサ初期化
  M5.Lcd.setTextSize(1);
  M5.Lcd.print("Gitter Ver 0.5\n");
  readGyro();
  kalmanX.setAngle(getRoll());
  kalmanY.setAngle(getPitch());
  
  lastMs = micros();

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

  //時刻同期の設定
  //configTime( JST, 0, "ntp.nict.jp", "ntp.jst.mfeed.ad.jp");

  //サーバー接続
  M5.Lcd.print("\r\nLocal port: ");
  M5.Lcd.println(port);
  client.connect(server_ip, port);

}

void loop() {
  M5.update();
  readGyro();
  float dt = (micros() - lastMs) / 1000000.0;
  lastMs = micros();

  float roll = getRoll();
  float pitch = getPitch();

  kal_angle_x = kalmanX.getAngle(roll, gyro[0], dt);
  kal_angle_y = kalmanY.getAngle(pitch, gyro[1], dt);
  
  guiterDetect = detectGuiter(kal_angle_y);
  
  //20回に一回だけ描画
  tick++;
  if(tick % 20 == 0){
    tick = 0;
    draw();
  }

  if(guiterDetect != lastGuiterDetect){
    //送信データ作成
    String data = dataCreate(guiterDetect);
    int len = data.length() + 1;
    char tcpdata[len];
    data.toCharArray(tcpdata,len); //dataをtcpdataにchar型でコピー
    client.write(tcpdata,len); //データをTCP/IP通信で送信
    Serial.println(tcpdata);
  }
  
  //Expressサーバーとの通信が切れてたらもう一度つなぎにいく
  if(!client.connect(server_ip, port)){
    client.connect(server_ip, port);
  } 
  




  //ギター検出情報を更新
  lastGuiterDetect = guiterDetect;

  delay(2);
}

