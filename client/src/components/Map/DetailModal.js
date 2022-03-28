import React from 'react'
import Modal from 'react-modal'
import { Doughnut, Pie } from 'react-chartjs-2'
import { Chart, ArcElement } from 'chart.js'
Chart.register(ArcElement);

Modal.setAppElement("#root")

const DetailModal = (props) => {


  const expData = {
    labels: ["긍정적", "부정적", "보통"],
    datasets: [
      {
        labels: ["긍정적", "부정적", "보통"],
        data: [60, 13, 27],
        borderWidth: 2,
        hoverBorderWidth: 3,
        backgroundColor: [
          "rgba(238, 102, 121, 1)",
          "rgba(98, 181, 229, 1)",
          "rgba(255, 198, 0, 1)"
        ],
        fill: true
      }
    ]
  }



  return (
    <div className='detailModal'>
      <Modal
        isOpen={props.openModal}
        onRequestClose={props.closeModal}>
        <div className='modalItem'>
          <h3>상세분석</h3>
          {props.selectShop}
          <h1>DB...</h1>
          <div>
            <Pie
              data={{
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [
                  {
                    label: '# of votes',
                    data: [12, 19, 3, 5, 2, 3, 2],
                  },
                ],
              }}
              height={200}
              width={600}
            />
            <Doughnut
              options={{
                legend: {
                  display: true,
                  position: "right"
                }
              }}
              data={expData}
              height={120}
            ></Doughnut>
          </div>


          <button onClick={props.closeModal}>닫기</button>


        </div>
      </Modal>
    </div>
  )
}

export default DetailModal


// import React from 'react'
// import { Doughnut, Pie } from 'react-chartjs-2'
// import {Chart, ArcElement} from 'chart.js'
// Chart.register(ArcElement);

// const Contents = () => {
//     const expData = {
//         labels: ["긍정적", "부정적", "보통"],
//         datasets: [
//             {
//                 labels: ["긍정적", "부정적", "보통"],
//                 data: [60, 13, 27],
//                 borderWidth: 2,
//                 hoverBorderWidth: 3,
//                 backgroundColor: [
//                     "rgba(238, 102, 121, 1)",
//                     "rgba(98, 181, 229, 1)",
//                     "rgba(255, 198, 0, 1)"
//                 ],
//                 fill: true
//             }
//         ]
//     }
//     return (
//         <div>
//              <Pie
//       data={{
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [
//           {
//             label: '# of votes',
//             data: [12, 19, 3, 5, 2, 3,2],
//           },
//         ],
//       }}
//       height={200}
//       width={600}
//     />
//             <Doughnut
//                 options={{
//                     legend: {
//                         display: true,
//                         position: "right"
//                     }
//                 }}
//                 data={expData}
//                 height={120}
//             ></Doughnut>
//         </div>
//     )
// }

// export default Contents




// import React from 'react'
// import { Pie } from 'react-chartjs-2'
// import {Chart, ArcElement} from 'chart.js'
// Chart.register(ArcElement);

// const Contents = () => {
//   return (
    // <Pie
    //   data={{
    //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //     datasets: [
    //       {
    //         label: '# of votes',
    //         data: [12, 19, 3, 5, 2, 3,2],
    //       },
    //     ],
    //   }}
    //   height={200}
    //   width={600}
    // />
//   )
// }
// export default Contents

