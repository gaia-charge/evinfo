<style lang="scss">
.battery {
    display: flex;
    flex-direction: column;

    .battery-info {
        display: flex;
        justify-content: space-between;

        h1 {
            margin: 0;
            margin-bottom: 0.25rem;
            font-size: 2rem;

            small {
                font-weight: 400;
                font-size: 1.5rem;
                margin-left: 0.25rem;
            }
        }
    }

    progress {
        width: 100%;
        height: 1rem;
        background-color: white;
        border-radius: 1rem;
    }

    progress::-webkit-progress-bar {
        background-color: #c0efec;
        border-radius: 1rem;
    }

    progress::-webkit-progress-value {
        background-color: #4c8c40;
        border-radius: 1rem;
    }
}
</style>

<script>
    export let percent = 0;
    export let range = 0;
</script>

<div class="battery">
    <div class="battery-info">
        <h1>{ range }<small>km</small></h1>
        <h1>{ percent }<small>%</small></h1>
    </div>
    <progress value={ percent } min="0" max="100" />
</div>
