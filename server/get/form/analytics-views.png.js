const cache = require('../../modules/cache');
const moment = require('moment-timezone')
const logger = require('../../modules/logger');

const { ChartJSNodeCanvas } = require('chartjs-node-canvas')
module.exports = {
    path: '/form/analytics-views.png',
    async run(app, req, res) {
        try {
            if (req.user == null) return res.redirect('/login');
            if (!req.query.id || req.query.id == 'undefined' || req.query.id == undefined || req.query.id == null) return res.redirect('/logo.png');
            const form = await cache.lookup('form', req.query.id);
            if (form == null) return res.redirect('/logo.png');
            if (form.user != req.user.id) return res.status(403).redirect('/logo.png');

            // Check if logs exist
            if (form.views.length <= 0 || form.views == null) {
                return res.status(200).send("This form doesn't have any views, please wait")
            }
            let yLabels = []
            let xLabels = []

            let currentViews = 0;
            form.views.forEach((view) => {
                currentViews++;
                const time = moment(parseFloat(view.date)).tz(req.user.timezone).format('YYYY / MMM / HH:mm')
                if (xLabels.indexOf(time, -1) >= 0) {
                    yLabels[xLabels.indexOf(time, -1)] = yLabels[xLabels.indexOf(time, -1)] + 1;
                } else {
                    yLabels.push(currentViews);
                    xLabels.push(time)
                }
            })

            // Change the width of the chart based on the number of lines in the log
            switch (true) {
                case yLabels.length <= 30:
                    var width = 500
                    break
                case yLabels.length <= 40:
                    var width = 600
                    break
                case yLabels.length <= 50:
                    var width = 700
                    break
                case yLabels.length <= 60:
                    var width = 900
                    break
                default:
                    var width = 1000
                    break
            }

            // Chart.js
            const chartJSNodeCanvas = new ChartJSNodeCanvas({
                width,
                height: 400,
                backgroundColour: 'rgb(47, 49, 54)'
            })
            const lineColour = { fill: '8, 174, 228', border: '39, 76, 113', colour: '39, 76, 113' }
            const textColour = { time: '253, 253, 253', state: '253, 253, 253', title: '253, 253, 253' }


            const configuration = {
                type: 'line',
                data: {
                    labels: xLabels,
                    datasets: [
                        {
                            label: `Number of views over time`,
                            data: yLabels,
                            fill: true,
                            color: 'rgb(' + lineColour.colour + ')',
                            backgroundColor: 'rgba(' + lineColour.fill + ', 0.2)',
                            borderColor: 'rgba(' + lineColour.border + ', 1)',
                            borderWidth: 2,
                            steppedLine: true
                        }
                    ]
                },
                options: {
                    elements: {
                        point: {
                            radius: 0
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: 'rgb(' + textColour.title + ')',
                                font: {
                                    size: 15
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: 'rgb(' + textColour.state + ')',
                                fontSize: 15,
                                stepSize: 1,
                                max: 1,
                                callback: function (value) {
                                    return value
                                }
                            }
                        },
                        x: {
                            ticks: {
                                color: 'rgb(' + textColour.time + ')',
                                fontSize: 13,
                                stepSize: 1
                            }
                        }
                    }
                }
            }

            const image = await chartJSNodeCanvas.renderToBuffer(configuration)
            return res.contentType('png').send(image)
        } catch (err) {
            logger.error(err.stack)
            return res.redirect('/logo.png')
        }

    }
}