var xValues = [
  "Builds Pillow Forts",
  "Treasure Maps",
  "As Note Books",
  "Book Towers",
  "Reads the Book",
];
var yValues = [62, 75, 53, 66, 17];
var barColors = ["red", "green", "blue", "orange", "brown"];

new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues,
      },
    ],
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: "How Kids Use Books, data set as %",
    },
  },
});
