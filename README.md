# 20230923_Excursion_route
MapLibre GL JSを活用して，巡検用地図を作成できないかと模索．練習ファイル

### 参考
asahina氏(asahina820)
[FOSS4G-2023-Japan-HandsOn](https://github.com/asahina820/FOSS4G-2023-Japan-HandsOn/tree/master)


### map_switchingについて(2023/09/24)

Shirado氏(office_shirado)よりアドバイスをいただき，
[今ここ何番地？](https://office-shirado.com/imakoko/)
こちらのサイトのソースコードを参考に対応．


function SelectMap()
というものを定義して，地図切り替え機能を試みるも，

const map
と
function SelectMap()

の読み込みタイミングの差で，うまくいかないのではないかと想像しています．
