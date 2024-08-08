import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function MessageAndChartContainer({ ...props }) {
  const { sectorsSelected, totalRemainingAmount } = props;
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Amounts",
        data: [],
        backgroundColor: [],
      },
    ],
  });
  const [chartColorList,setChartColorList] = useState([]);

  const messages = {
    noSpecifiedAmount: "Note: Any taxable amount not specifically allocated will be appropriated.",
    addingSector:"If you need to redistribute the amounts, just type a '0' in one of the filled out blanks."
  };

  const chartOptions = {
    options: {
      layout: {
          padding: {
            left: 150
          }
      }
  },
    plugins: {
      legend: {
        display: true, // Show the legend
        position: 'left', // Legend position
        labels: {
          font: {
            size: 13, // Font size for legend labels
          },
          textAlign:"left",
          padding: 10,
          boxWidth:15,
          align:"end",
          maxWidth: 100
        }
      }
    }
  };
  ////////////////////////////////
  ////////////////////////////////
  ////////////////////////////////

  useEffect(() =>{
    const rootStyles = getComputedStyle(document.documentElement);
    const primaryHue = rootStyles.getPropertyValue('--primaryHue');
    const secondaryHue = rootStyles.getPropertyValue('--secondaryHue');

    const getRandomNumber = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    function randomizeLightness(){
      return `hsl(${secondaryHue },70%,${getRandomNumber(20,70)}%)`
    }
    let colors = []

    sectorsSelected.forEach(sector=>{
      const color = randomizeLightness()
      setChartColorList(prev=>[...prev, color])
    })
    
   },[sectorsSelected]);

  useEffect(() => {
    if (sectorsSelected && sectorsSelected.length > 0) {
      const sectorLabels = sectorsSelected.map((sector) => sector.id);
      const sectorData = sectorsSelected.map((sector) => sector.amountEntered || 0);

      const updatedData = {
        labels: sectorLabels,
        datasets: [
          {
            label: "Amounts",
            data: sectorData,
            backgroundColor: chartColorList,
          },
        ],
      };

      setData(updatedData);
    } else {
      console.error("sectorsSelected is empty or undefined");
      setData({
        labels: [],
        datasets: [
          {
            label: "Amounts",
            data: [],
            backgroundColor: [],
          },
        ],
      });
    }
  }, [sectorsSelected,chartColorList]);

  
  

  ////////////////////////////////
  ////////////////////////////////
  ////////////////////////////////

  return (
    <>
      {sectorsSelected.length > 0 ? (
        <div id="messageAndChartContainer" className="flex w-full h-60  bg-primaryTint">
          <div
            id="messages"
            className="w-1/2 flex items-center justify-center text-lg text-right p-4 ">
            {totalRemainingAmount > 0 ? messages.noSpecifiedAmount : ""}
          </div>
          <div className="w-1/2 flex justify-center items-center p-4 border">
            <div className="origin-top-right ">
            <Pie data={data} maintainAspectRatio={true}  options={chartOptions}/>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default MessageAndChartContainer;
