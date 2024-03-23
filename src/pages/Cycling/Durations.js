import Difficulty from './Difficulty';
import Intensity from './Intensity';

const Durations = {
    [Difficulty.EASY]: {
        [Intensity.WARM_UP]: 1,
        [Intensity.LOW]: 1,
        [Intensity.MEDIUM]: 1,
        [Intensity.HIGH]: 1
    },
    [Difficulty.MEDIUM]: {
        [Intensity.WARM_UP]: 12,
        [Intensity.LOW]: 6,
        [Intensity.MEDIUM]: 4,
        [Intensity.HIGH]: 2
    },
    [Difficulty.HARD]: {
        [Intensity.WARM_UP]: 10,
        [Intensity.LOW]: 30,
        [Intensity.MEDIUM]: 5,
        [Intensity.HIGH]: 20
    },
    [Difficulty.ALTERNATIVE]: {
        [Intensity.WARM_UP]: 18,
        [Intensity.LOW]: 6,
        [Intensity.MEDIUM]: 4,
        [Intensity.HIGH]: 2
    }
};

export default Durations;