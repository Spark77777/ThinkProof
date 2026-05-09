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

// Add step input
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

// Normalize equation
function normalize(str) {
    return str
        .replace(/\s+/g, '')
        .replace(/\*/g, '')
        .toLowerCase();
}

// Evaluate steps
submitBtn.addEventListener('click', () => {

    const inputs = document.querySelectorAll('.step-input');

    let studentSteps = [];

    inputs.forEach(input => {
        studentSteps.push(input.value.trim());
    });

    let valid = true;
    let errorStep = -1;

    for (let i = 0; i < expectedSteps.length; i++) {

        if (!studentSteps[i]) {
            valid = false;
            errorStep = i + 1;
            break;
        }

        if (normalize(studentSteps[i]) !== normalize(expectedSteps[i])) {
            valid = false;
            errorStep = i + 1;
            break;
        }
    }

    if (valid) {
        resultBox.innerHTML = `
            <p class="valid">✅ Valid</p>
            <p>Your reasoning is correct.</p>
        `;
    }
    else {
        resultBox.innerHTML = `
            <p class="invalid">❌ Not Valid</p>
            <p>Check Step ${errorStep} carefully.</p>
        `;
    }

});
