<style lang="scss">
    :global(.card) {
        width: 33%;
        background-color: rgba(255, 255, 255, 0.9) !important;
    }

    .wrapper {
        z-index: 10;
        position: relative;
    }
    .row {
        z-index: 1;
        display: flex;
        margin: 1rem 0;
        justify-content: space-between;
    }
    h1 {
        small {
            font-weight: 400;
            font-size: 1.5rem;
            margin-left: 0.25rem;
        }
    }
</style>

<script>
    import { Card, Label } from 'attractions'
</script>

<div class="wrapper">
    <div class="row">
        <Card>
            <h1>24.9<small>C</small></h1>
            <Label>Battery temp</Label>
        </Card>
        <Card>
            <h1>33.2<small>C</small></h1>
            <Label>Outside temp</Label>
        </Card>
    </div>
    
    <div class="row">
        <Card>
            <h1>2.653<small>V</small></h1>
            <Label>Vmin</Label>
        </Card>
        <Card>
            <h1>3.199<small>V</small></h1>
            <Label>Vmax</Label>
        </Card>
    </div>
</div>