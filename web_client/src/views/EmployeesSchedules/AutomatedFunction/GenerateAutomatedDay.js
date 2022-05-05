const generateAutomatedDay = (constraints,variables) => {
    let solver = require("javascript-lp-solver/src/solver"),
    results,
    model = {
        "optimize": "value",
        "opType": "min",
        "constraints": constraints,
        "variables": variables
    };
    results = solver.Solve(model);
    return results;
}

export default generateAutomatedDay;