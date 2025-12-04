// routes.js
const GOALS_BASE = '/goals';

const routes = {
    home: "/",
    team: "/the-team",
    goals: GOALS_BASE,
    subscribe: "/subscribe",
    cleanWater: `${GOALS_BASE}/clean-water`,
    climateAction: `${GOALS_BASE}/climate-action`,
    cleanEnergy: `${GOALS_BASE}/clean-energy`
};

module.exports = routes;