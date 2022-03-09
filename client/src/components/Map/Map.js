/*global kakao*/
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
//카카오맵 정보
const infowindow = new kakao.maps.InfoWindow({ removable: true, width: 500 });

const Map = (props) => {
    // const [word, setWord] = useState("기본값");
    const history = useHistory();
    useEffect(() => {
        let container = document.getElementById("map");
        let options = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567),
            level: 8,
        };
        const map = new kakao.maps.Map(container, options);
        view(map)
    }, [])


    function view(map) {
        for (var i = 0, len = props.location.length; i < len; i++) {
            displayArea(map, props.location[i], props);
        }
    }
    useEffect(() => {
        infowindow.close()
    }, [])
    // useEffect(() => {
    //     console.log(props.place)
    // }, [props.place])

    function displayArea(map, area, props ) {
        
        const customOverlay = new kakao.maps.CustomOverlay({})

        //다각형 생성
        var polygon = new kakao.maps.Polygon({
            map: map, // 다각형을 표시할 지도 객체
            path: area.path,
            strokeWeight: 2,
            strokeColor: '#004c80',
            strokeOpacity: 0.8,
            fillColor: '#fff',
            fillOpacity: 0.7
        });
        // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경 
        // 지역명을 표시하는 커스텀오버레이를 지도위에 표시
        kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
            polygon.setOptions({ fillColor: '#09f' });

            customOverlay.setContent('<div class="area">' + area.name + '</div>');

            customOverlay.setPosition(mouseEvent.latLng);
            // customOverlay.setMap(map);
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
            // var content =
            //   '<div class="info">' +
            //   '   <div class="title">' + area.name + '</div>' +
            //   '   <div class="size">총 면적 : 약 ' + Math.floor(polygon.getArea()) + ' m<sup>2</sup></div>' +
            //   '<div> <input type="button" onclick="location.href=\'api?locate=\'"+"area.name" value="정보보기"></div>' +
            //   '</div>';
            var content =
                '<div class="info" style="width:300px; height:100px;padding:6px 0;">' +
                '<input id="dn" type="text" value="값">' +
                '   <div class="title">' + area.name + '</div>' +
                '   <div class="size">총 면적 : 약 ' + Math.floor(polygon.getArea()) + ' m<sup>2</sup></div>' +
                //'<button type="button" id=\'btn1\' onclick="document.getElementById(\'dn\').value=\'111!\'">' + area.name + '</btton>' +
                // '<button type="button" id=\'btn1\' onclick="console.log(document.getElementById(\'dn\').value)">' + area.name + '</btton>' +
                // '<button type="button" id= \'btn1\'></button>'+
                '<button type="button" onclick="console.log()"></button>' +
                '<button type="button" id= \'btn1\'></button>' +
                '</div>';
            props.setPlace(area.name)
            
            infowindow.setContent(content)
            infowindow.setPosition(mouseEvent.latLng);
            infowindow.setMap(map);
        });

    }
    return (
        <div>
            <h1>상권분석</h1>
            <div id="map" style={{ width: "70vw", height: "100vh" }}></div>
        </div>
    )
}

export default Map