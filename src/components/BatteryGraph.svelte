<style lang="scss">
:global(.tab) {
    display: inline-block !important;
    width: 100%;
}

:global(label .content) {
    justify-content: center;
    border-bottom-width: 0.250em !important;
}

.battery-graph {
    margin-top: 2rem;
}
</style>

<script>
    import { Card, Tabs } from 'attractions'
    import { Line } from '../../svelte-chartjs/src/index'

    const data = [
        // ['16', 17.4],
        ['15', 23.4],
        ['14', 21.2],
        ['13', 19.9],
        ['12', 5.7],
        ['11', -2.3],
        ['10', -15.6],
        ['9', -9.5],
        ['8', 2.4],
        ['7', 22.9],
        ['6', 20.7],
        ['5', 35.5],
        ['4', 39.2],
        ['3', 45.9],
        ['2', 50.0],
        ['1', 50.0],
        ['0', 42.9]
    ]
    const values = data.map((r) => r[1]);
    let average = values.reduce((previous, current) => previous + current, 0) / values.length

    const chartData = {
        labels: data.map((r) => r[0]),
        datasets: [
            {
                label: 'Wh',
                borderColor: '#548080',
                borderWidth: 2,
                pointBorderWidth: 2,
                pointRadius: 2,
                data: values,
                fill: {
                    target: 'origin',
                    above: 'rgba(249, 178, 51, 0.7)',
                    below: 'rgba(187, 226, 93, 0.7)'
                },
                yAxisID: 'y',
            }, {
                data: values.map(() => average),
                pointRadius: 0,
                yAxisID: 'avg'
            }
        ]
    }
    const scaleStyle = {
        ticks: {
            color: '#4c8c40',
            font: {
                family: 'Inter',
                weight: 800
            }
        },
        grid: {
            borderDash: [3, 3]
        }
    }
    const chartOptions = {
        scales: {
            x: {
                ticks: {
                    ...scaleStyle.ticks,
                    maxRotation: 0,
                    callback: function (value, index) {
                        const label = this.getLabelForValue(value)
                        return label % 5 === 0 ? label : ''
                    }
                },
                grid: scaleStyle.grid
            },
            y: {
                ...scaleStyle
            },
            avg: {
                type: 'linear',
                display: true,
                position: 'right',

                ticks: {
                    ...scaleStyle.ticks,
                    // maxTicksLimit: 1,
                    stepSize: 0.1,
                    autoSkip: false,
                    // maxRotation: 0,
                    callback: function (value) {
                        const label = this.getLabelForValue(value)
                        // return label
                        return label == average.toFixed(1) ? label : ''
                    }
                },
                grid: {
                    display: false
                },
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }

    let selectedTimeSpan = '15km'
</script>

<div class="battery-graph">
    <Card style="width: calc(100% - 3rem); padding-top: 1em; padding-bottom: 1em;">
        <Tabs
            items={['5km', '15km', '30km']}
            name="timeSpan"
            bind:value={selectedTimeSpan} />
        <Line
            data={chartData}
            options={chartOptions}
        />
    </Card>
</div>