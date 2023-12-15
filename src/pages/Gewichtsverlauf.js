import * as React from 'react';
import {LineChart} from '@mui/x-charts';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {Slider} from "@mui/material";
import Box from "@mui/material/Box";


const month = [
    new Date(2023, 0, 1),
    new Date(2023, 0, 2),
    new Date(2023, 0, 3),
    new Date(2023, 0, 4),
    new Date(2023, 0, 5),
    new Date(2023, 0, 6),
    new Date(2023, 0, 7),
    new Date(2023, 0, 8),
    new Date(2023, 0, 9),
    new Date(2023, 0, 10),
    new Date(2023, 0, 11),
    new Date(2023, 0, 12),
    new Date(2023, 0, 13),
    new Date(2023, 0, 14),
    new Date(2023, 0, 15),
    new Date(2023, 0, 16),
    new Date(2023, 0, 17),
    new Date(2023, 0, 18),
    new Date(2023, 0, 19),
    new Date(2023, 0, 20),
    new Date(2023, 0, 21),
    new Date(2023, 0, 22),
    new Date(2023, 0, 23),
    new Date(2023, 0, 24),
    new Date(2023, 0, 25),
    new Date(2023, 0, 26),
    new Date(2023, 0, 27),
    new Date(2023, 0, 28),
    new Date(2023, 0, 29),
    new Date(2023, 0, 30),
    new Date(2023, 0, 31)


];

const year = [
    new Date(2023, 0, 1),
    new Date(2023, 1, 1),
    new Date(2023, 2, 1),
    new Date(2023, 3, 1),
    new Date(2023, 4, 1),
    new Date(2023, 5, 1),
    new Date(2023, 6, 1),
    new Date(2023, 7, 1),
    new Date(2023, 8, 1),
    new Date(2023, 9, 1),
    new Date(2023, 10, 1),
    new Date(2023, 11, 1),
    new Date(2023, 12, 1),

]


const kgperday = [
    60, 60.1, 60.2, 60.3, 60.4, 60.5, 60.6, 60.7, 60.8, 60.9, 61, 61.1, 61.2, 61.3, 61.4, 61.5, 61.6, 61.7, 61.8, 61.9, 62, 62.1, 62.2, 62.3,
    62.4, 62.5, 62.6, 62.7
];

const kgpermonth = [
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71
]

const lineChartsParamsday = {
    series: [
        {
            label: 'Gewicht in kg',
            data: kgperday,
            showMark: true,

        },

    ],
    width: 1200,
    height: 600,
};

const lineChartsParamsmonth = {
    series: [
        {
            label: 'Gewicht in kg',
            data: kgpermonth,
            showMark: true,
        },

    ],
    width: 1200,
    height: 600,
};

const yearFormater = (date) => {
    date.getDate().toString();
    // console.log(date.getDate().toString())
}


export default function Gewichtsverlauf() {
    const [yearOrMonth, setYearOrMonth] = React.useState("month")
    const ColorToggleButton = () => {

        const handleAlignment = (event, newAlignment) => {
            if (newAlignment !== null) {
                setYearOrMonth(newAlignment);
            }
        };


        return (
            <ToggleButtonGroup
                color="primary"
                value={yearOrMonth}
                exclusive
                onChange={handleAlignment}
                aria-label="Platform"
            >
                <ToggleButton value="month">Month</ToggleButton>
                <ToggleButton value="year">Year</ToggleButton>
            </ToggleButtonGroup>
        );
    }


    const Chart = (monthOrYear) => {
        console.log(monthOrYear.monthOrYear)

        if (monthOrYear.monthOrYear === "month") {
            return (
                <LineChart
                    {...lineChartsParamsday}

                    xAxis={[{
                        data: month,
                        scaleType: 'time',
                        valueFormatter: yearFormater,
                        tickMinStep: 3600 * 1000 * 24,
                        tickMaxStep: 3600 * 1000 * 24
                    }]}
                    yAxis={[{max: value[1], min: value[0]}]}
                    series={lineChartsParamsday.series.map((s) => ({
                        ...s,
                    }))}
                />)
        } else if (monthOrYear.monthOrYear === "year") {
            return (
                <LineChart
                    {...lineChartsParamsmonth}
                    orientation="vertical"
                    xAxis={[{data: year, scaleType: 'time', valueFormatter: yearFormater}]}
                    yAxis={[{max: value[1], min: value[0]}]}
                    series={lineChartsParamsmonth.series.map((s) => ({
                        ...s,
                    }))}
                />
            )
        }

    }


    const [value, setValue] = React.useState([0, 200]);
    const minDistance = 0;
    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                setValue([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setValue([clamped - minDistance, clamped]);
            }
        } else {
            setValue(newValue);
        }
    };


    return (
        <div id={"content"}>
            <div id={"content2"}>
                <div id={"verticalSlider"}>
                    <Box sx={{height: 500}}>
                        <Slider
                            sx={{
                                '& input[type="range"]': {
                                    WebkitAppearance: 'slider-vertical',
                                },
                            }}
                            orientation="vertical"
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={200}

                        />
                    </Box>
                </div>
                <div id={"chart"}>
                    <Chart monthOrYear={yearOrMonth}/>
                </div>
            </div>

            <ColorToggleButton/>


        </div>
    );

}