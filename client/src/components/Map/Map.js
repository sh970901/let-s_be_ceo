/*global kakao*/
import React, { useEffect, useState } from 'react'
import SimpleModal from './SimpleModal'


//카카오맵 정보

const Map = (props) => {

   const [isShowSimple, setIsShowSimple] = useState(false)
    function openModal() {
      setIsShowSimple(true)
    }
    function closeModal() {
      setIsShowSimple(false)
    }

  useEffect(() => {
    const customOverlay = new kakao.maps.CustomOverlay({});
    const infowindow = new kakao.maps.InfoWindow({ removable: true });
    let data = props.geojson[0].features
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.484102, 127.034369),
      level: 7,
      
    };
    const map = new kakao.maps.Map(container, options);
    let polygons = [];

    DrawPolygon()

    function DrawPolygon() {
      var name = "";
      data.forEach((coordinate) => {
        name = coordinate.name
        if (coordinate.geometry.type === "MultiPolygon") {
          displayArea(name, coordinate.geometry.coordinates, true)
        }
        else {
          displayArea(name, coordinate.geometry.coordinates, false)

        }
      })
    }
    function makePolygon(name, coordinates) {

      var polygonPath = [];
      coordinates[0].forEach((coordinate) => {
        polygonPath.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));

      });

      let polygon = new kakao.maps.Polygon({
        map: map,
        path: polygonPath, // 그려질 다각형의 좌표 배열입니다
        strokeWeight: 2, // 선의 두께입니다
        strokeColor: '#004c80', // 선의 색깔입니다
        strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'dashed', // 선의 스타일입니다
        fillColor: '#fff', // 채우기 색깔입니다
        fillOpacity: 0.6, // 채우기 불투명도 입니다
      })
      polygons.push(polygon);
      handlePolygon(name, polygon)

    }

    function makeMultiPolygon(name, coordinates) {
      var polygonPath = [];

      coordinates.forEach((multiCoordi) => {
        var coordinates2 = [];

        multiCoordi[0].forEach((coordinate) => {
          coordinates2.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
        })
        polygonPath.push(coordinates2)
      });
      let polygon = new kakao.maps.Polygon({
        map: map,
        path: polygonPath, // 그려질 다각형의 좌표 배열입니다
        strokeWeight: 2, // 선의 두께입니다
        strokeColor: '#004c80', // 선의 색깔입니다
        strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'dashed', // 선의 스타일입니다
        fillColor: '#fff', // 채우기 색깔입니다
        fillOpacity: 0.6, // 채우기 불투명도 입니다
      })
      polygons.push(polygon);
      handlePolygon(name, polygon)

    }

    function displayArea(name, coordinates, multi) {

      if (multi) {
        makeMultiPolygon(name, coordinates);

      }
      else {
        makePolygon(name, coordinates);

      }
    }
    
    function showSimpleAnalyze() {
      setIsShowSimple(true)
    }
    function handlePolygon(name, polygon) {
      kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
        polygon.setOptions({ fillColor: '#09f' });

        customOverlay.setPosition(mouseEvent.latLng);
        customOverlay.setMap(map);
      });

      // 다각형에 mousemove 이벤트를 등록하고 이벤트가 발생하면 커스텀 오버레이의 위치를 변경합니다
      kakao.maps.event.addListener(polygon, 'mousemove', function (mouseEvent) {
        customOverlay.setPosition(mouseEvent.latLng);
      });

      // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
      // 커스텀 오버레이를 지도에서 제거합니다
      kakao.maps.event.addListener(polygon, 'mouseout', function () {
        polygon.setOptions({ fillColor: '#fff' });
        customOverlay.setMap(null);
      });

      // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 다각형의 이름과 면적을 인포윈도우에 표시합니다
      kakao.maps.event.addListener(polygon, 'click', function (mouseEvent) {
        // console.log(mouseEvent.latLng)
        // console.log(name)
        props.setPlace(name)
        showSimpleAnalyze()
        
       


        // const content = <div>gg</div>

        // infowindow.setContent(content);
        // infowindow.setPosition(mouseEvent.latLng);
        // infowindow.setMap(map);
      });
    }

  }, [])

  return (
    <div>

      <h1>상권분석</h1>
      {isShowSimple ? <div className='simpleModal'>

        <SimpleModal
        place={props.place}
        openModal={openModal}
        closeModal={closeModal}>
        </SimpleModal>
      </div> : null}
      <div id="map"></div>
      
    </div>
  )
}

export default Map