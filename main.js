const map = new maplibregl.Map({
  container: 'map',
  center: [139.744806, 35.753748], // 中心座標
  zoom: 15, // ズームレベル
  style: {
    // スタイル仕様のバージョン番号。8を指定する
    version: 8,
    // データソース
    sources: {
      // 地理院地図淡色地図
      'gsi-tile': {
        // ソースの種類。vector、raster、raster-dem、geojson、image、video のいずれか
        type: 'raster',
        // タイルソースのURL 今回は地理院の淡色地図タイル
        tiles: ['https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png'],
        // タイルの解像度。単位はピクセル、デフォルトは512
        tileSize: 256,
        // データの帰属
        attribution: "地図の出典：<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>",
      },
      //巡検ルート
      route: {
        type: 'geojson',
        data: './data/01_route.geojson',

      },
      //解説ポイント
      explanation_spot: {
        type: 'geojson',
        data: './data/02_point.geojson',
      }
    },
    // 表示するレイヤ
    layers: [
      // 背景地図として地理院地図淡色地図のラスタタイルを追加
      {
        // 一意のレイヤID
        id: 'gsi-layer',
        // レイヤの種類。background、fill、line、symbol、raster、circle、fill-extrusion、heatmap、hillshade のいずれか
        type: 'raster',
        // データソースの指定
        source: 'gsi-tile',
      },
      {
        id: 'route_layer',
        type: 'line',
        source: 'route',
        paint: {
          // ラインの色
          'line-color': '#ff0000',
          // ラインの幅
          'line-width': 5,
        }
      },
      {
        id: 'point_layer',
        type: 'circle',
        source: 'explanation_spot',
        paint: {
          // 丸の半径。単位はピクセル。
          'circle-radius': 10,
          // 丸の色
          'circle-color': '#3887be',
        },


      },
    ],
  },
});


map.on('click', 'point_layer', function (e) {
  var coordinates = e.features[0].geometry.coordinates.slice();
  var name = e.features[0].properties.name;

  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }
  // ポップアップを表示する
  new maplibregl.Popup({
    offset: 10, // ポップアップの位置
    closeButton: false, // 閉じるボタンの表示
  })
    .setLngLat(coordinates)
    .setHTML(name)
    .addTo(map);
});

document.getElementById('map').style.visibility = 'vissible';