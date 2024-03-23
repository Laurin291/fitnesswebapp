import Difficulty from './Difficulty';
import Intensity from './Intensity';

const Durations = {
    [Difficulty.EASY]: {
        [Intensity.WARM_UP]: 10,
        [Intensity.LOW]: 5,
        [Intensity.MEDIUM]: 4,
        [Intensity.HIGH]: 5
    },
    [Difficulty.MEDIUM]: {
        [Intensity.WARM_UP]: 600,
        [Intensity.LOW]: 25,
        [Intensity.MEDIUM]: 5,
        [Intensity.HIGH]: 30
    },
    [Difficulty.HARD]: {
        [Intensity.WARM_UP]: 600,
        [Intensity.LOW]: 20,
        [Intensity.MEDIUM]: 5,
        [Intensity.HIGH]: 35
    },
    [Difficulty.ALTERNATIVE]: {
        [Intensity.WARM_UP]: 600,
        [Intensity.LOW]:15 ,
        [Intensity.MEDIUM]: 5,
        [Intensity.HIGH]: 40
    }
};

export default Durations;