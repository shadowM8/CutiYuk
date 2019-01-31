var ctx = document.getElementById("myChart");
        // let angka = require('../../../routes/manager').angka
        var z = [1,2,3,4]
        // var z = angka
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Purple", "Green", "Yellow", "Blue"],
                datasets: [
                    {
                    label: '# of Votes',
                    data: z,
                    backgroundColor: [ //ujung puncak
                        'rgba(211, 163, 250, 0.2)',
                        'rgba(47, 244, 53, 0.2)',
                        'rgba(244, 172, 47, 0.2)',
                        'rgba(47, 237, 244, 0.2)'
                    ],
                    borderColor: [ //garis
                        'rgba(211, 163, 250, 1)',
                        'rgba(47, 244, 53, 1)',
                        'rgba(244, 172, 47, 1)',
                        'rgba(47, 237, 244, 1)'
                    ],
                    borderWidth: 1,
                    fill : true
                }
            ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
        // myChart.data.datasets[0].data.push(angka)
        