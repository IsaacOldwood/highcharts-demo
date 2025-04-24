let csv_data = load_data();

const dash = Dashboards.board("container", {
  dataPool: {
    connectors: [
      {
        id: "data",
        type: "CSV",
        options: {
          csv: csv_data,
        },
      },
    ],
  },
  gui: {
    layouts: [
      {
        rows: [
          {
            cells: [
              {
                id: "dashboard-col-0",
              },
              {
                id: "dashboard-col-1",
              },
            ],
          },
        ],
      },
    ],
  },
  components: [
    {
      renderTo: "dashboard-col-0",
      type: "Highcharts",
      connector: {
        id: "data",
        columnAssignment: [
          {
            seriesId: "my-series",
            data: {
              x: "Distance",
              y: "Moving Time",
            },
          },
        ],
      },
      chartOptions: {
        title: {
          text: "Distance vs Moving Time",
        },
        legend: {
          enabled: false,
        },
        series: [
          {
            id: "my-series",
            type: "scatter",
            name: "Distance vs Moving Time",
            marker: {
              radius: 5,
            },
          },
        ],
      },
    },
    {
      cell: "dashboard-col-1",
      type: "DataGrid",
      connector: {
        id: "data",
      },
      dataGridOptions: {},
    },
  ],
});

async function load_data() {
  const res = await fetch("activities.csv");

  return await res.text();
}
