// API endpoint - practice-ku use panra test API
const API_URL = "https://jsonplaceholder.typicode.com/users";

// HTML elements-ah select panrom
const getBtn = document.getElementById("getBtn");
const employeeList = document.getElementById("employeeList");
const output = document.getElementById("output");

const postForm = document.getElementById("postForm");
const putForm = document.getElementById("putForm");
const patchForm = document.getElementById("patchForm");
const deleteForm = document.getElementById("deleteForm");


// API response-ah webpage-la display panna function
function showOutput(data) {
    // Object-ah readable JSON string-ah maathrom
    output.textContent = JSON.stringify(data, null, 2);
}


// Employee list-ah table-la display panna function
function displayEmployees(employees) {
    // Old employee details-ah clear panrom
    employeeList.replaceChildren();

    // Ovvoru employee-kum oru table row create panrom
    employees.forEach((employee) => {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        const nameCell = document.createElement("td");
        const emailCell = document.createElement("td");

        // Employee details-ah table cells-la set panrom
        idCell.textContent = employee.id;
        nameCell.textContent = employee.name;
        emailCell.textContent = employee.email;

        // Cells-ah row-kulla add panrom
        row.append(idCell, nameCell, emailCell);

        // Row-ah table body-kulla add panrom
        employeeList.appendChild(row);
    });
}


// Response success-ah irukka nu check panna helper function
async function readResponse(response) {
    // HTTP status 200-299 range-la illana error throw panrom
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    // DELETE response-la sila neram body irukkadhu
    if (response.status === 204) {
        return { message: "Request successful. No response body." };
    }

    // JSON response-ah JavaScript object-ah maathrom
    return await response.json();
}


// GET - Employees list-ah fetch panrom
getBtn.addEventListener("click", async () => {
    try {
        output.textContent = "Loading employees...";

        // GET request send panrom
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                // Server-kitta JSON response venum nu solrom
                Accept: "application/json"
            }
        });

        // Response status-ah check panni JSON data edukkrom
        const employees = await readResponse(response);

        // Employee details-ah table-la display panrom
        displayEmployees(employees);

        // API response-ah keezha display panrom
        showOutput(employees);

    } catch (error) {
        // Network error illa HTTP error vandha inga handle aagum
        showOutput({ error: error.message });
    }
});


// POST - Pudhu employee create panrom
postForm.addEventListener("submit", async (event) => {
    // Form submit aagumbodhu page reload aagama stop panrom
    event.preventDefault();

    // Input fields-la irundhu values edukkrom
    const name = document.getElementById("postName").value.trim();
    const email = document.getElementById("postEmail").value.trim();

    // Empty values irundha request send panna vendam
    if (!name || !email) {
        showOutput({ error: "Name and email are required." });
        return;
    }

    // API-kku anuppa vendiya employee object
    const employeeData = {
        name: name,
        email: email
    };

    try {
        // POST request moolama employee data send panrom
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                // Anuppura data JSON format-la irukku nu solrom
                "Content-Type": "application/json",
                Accept: "application/json"
            },

            // JavaScript object-ah JSON string-ah maathi send panrom
            body: JSON.stringify(employeeData)
        });

        // Server response-ah read panrom
        const result = await readResponse(response);

        // Created employee details-ah display panrom
        showOutput(result);

        // Form fields-ah clear panrom
        postForm.reset();

    } catch (error) {
        showOutput({ error: error.message });
    }
});


// PUT - Employee details-ah full-ah replace panrom
putForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = document.getElementById("putId").value;
    const name = document.getElementById("putName").value.trim();
    const email = document.getElementById("putEmail").value.trim();

    if (!id || !name || !email) {
        showOutput({ error: "All fields are required." });
        return;
    }

    // PUT-la complete resource data send panrom
    const employeeData = {
        name: name,
        email: email
    };

    try {
        // Specific employee ID-kku PUT request send panrom
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(employeeData)
        });

        const result = await readResponse(response);

        showOutput(result);
        putForm.reset();

    } catch (error) {
        showOutput({ error: error.message });
    }
});


// PATCH - Employee details-la oru part mattum update panrom
patchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = document.getElementById("patchId").value;
    const name = document.getElementById("patchName").value.trim();

    if (!id || !name) {
        showOutput({ error: "Employee ID and name are required." });
        return;
    }

    // PATCH-la update panna vendiya field mattum send panrom
    const employeeData = {
        name: name
    };

    try {
        // Specific employee-oda name mattum update panna request
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(employeeData)
        });

        const result = await readResponse(response);

        showOutput(result);
        patchForm.reset();

    } catch (error) {
        showOutput({ error: error.message });
    }
});


// DELETE - Employee-ah delete panna request send panrom
deleteForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = document.getElementById("deleteId").value;

    if (!id) {
        showOutput({ error: "Employee ID is required." });
        return;
    }

    try {
        // Specific employee ID-kku DELETE request send panrom
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json"
            }
        });

        // DELETE response-la body illama irukkalam
        const result = await readResponse(response);

        // Request success aana response-ah display panrom
        showOutput({
            message: `Delete request completed for employee ID ${id}`,
            result: result
        });

        deleteForm.reset();

    } catch (error) {
        showOutput({ error: error.message });
    }
});