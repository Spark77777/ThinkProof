const addStepBtn = document.getElementById('add-step-btn');
const stepsContainer = document.getElementById('steps-container');
const submitBtn = document.getElementById('submit-btn');
const resultBox = document.getElementById('result-box');

let stepCount = 1;

// Expected solution path
const expectedSteps = [
    '3x - 20 = 40',
    '3x = 60',
    'x = 20'
];

// Add new step input
addStepBtn.addEventListener('click', () => {

    stepCount++;

    const stepDiv = document.createElement('div');
    stepDiv.classList.add('step');

    stepDiv.innerHTML = `
        <label>Step ${stepCount}</label>
        <input type="text" class="step-input" placeholder="Enter next step">
    `;

    stepsContainer.appendChild(stepDiv);

});

// Check if two equations are mathematically equivalent
function isEquivalent(eq1, eq2) {

    try {

        // Split equations into left and right
        const [left1, right1] = eq1.split('=');
        const [left2, right2] = eq2.split('=');

        // Convert equations into expressions
        const expr1 = math.simplify(`(${left1}) - (${right1})`);
        const expr2 = math.simplify(`(${left2}) - (${right2})`);

        // Test equivalence using sample x value
        const testValue = { x: 5 };

        const difference = math.evaluate(
            `(${expr1}) - (${expr2})`,
            testValue
        );

        return difference === 0;

    } catch (error) {

        console.error(error);

        return false;
    }

}

// Submit solution
submitBtn.addEventListener('click', () => {

    const inputs = document.querySelectorAll('.step-input');

    let studentSteps = [];

    inputs.forEach(input => {
        studentSteps.push(input.value.trim());
    });

    let valid = true;
    let errorStep = -1;

    // Check each expected step
    for (let i = 0; i < expectedSteps.length; i++) {

        // Missing step
        if (!studentSteps[i]) {
            valid = false;
            errorStep = i + 1;
            break;
        }

        // Mathematical equivalence check
        if (!isEquivalent(studentSteps[i], expectedSteps[i])) {
            valid = false;
            errorStep = i + 1;
            break;
        }

    }

    // Extra unnecessary steps
    if (studentSteps.length > expectedSteps.length) {

        for (let i = expectedSteps.length; i < studentSteps.length; i++) {

            if (studentSteps[i].trim() !== '') {
                valid = false;
                errorStep = i + 1;
                break;
            }

        }

    }

    // Display result
    if (valid) {

        resultBox.innerHTML = `
            <p class="valid">✅ Valid</p>
            <p>Your reasoning is correct.</p>
        `;

    } else {

        resultBox.innerHTML = `
            <p class="invalid">❌ Not Valid</p>
            <p>Check Step ${errorStep} carefully.</p>
        `;

    }

});
