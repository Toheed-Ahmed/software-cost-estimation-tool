const costDriverValues = {
    RELY: {
      "v.low": 0.75,
      low: 0.88,
      normal: 1.0,
      high: 1.15,
      "v.high": 1.4,
    },
    DATA: { low: 0.94, normal: 1.0, high: 1.08, "v.high": 1.16 },
    CPLX: {
      "v.low": 0.7,
      low: 0.85,
      normal: 1.0,
      high: 1.15,
      "v.high": 1.3,
    },
    TIME: { normal: 1.0, high: 1.11, "v.high": 1.3 },
    STOR: { normal: 1.0, high: 1.06, "v.high": 1.21 },
    VIRT: { low: 0.87, normal: 1.0, high: 1.15, "v.high": 1.3 },
    TURN: { low: 0.87, normal: 1.0, high: 1.07, "v.high": 1.15 },
    ACAP: {
      "v.low": 1.46,
      low: 1.19,
      normal: 1.0,
      high: 0.86,
      "v.high": 0.71,
    },
    AEXP: {
      "v.low": 1.29,
      low: 1.13,
      normal: 1.0,
      high: 0.91,
      "v.high": 0.82,
    },
    PCAP: {
      "v.low": 1.42,
      low: 1.17,
      normal: 1.0,
      high: 0.86,
      "v.high": 0.7,
    },
    VEXP: { "v.low": 1.21, low: 1.1, normal: 1.0, high: 0.9 },
    LEXP: { "v.low": 1.14, low: 1.07, normal: 1.0, high: 0.95 },
    MODP: {
      "v.low": 1.24,
      low: 1.1,
      normal: 1.0,
      high: 0.91,
      "v.high": 0.82,
    },
    TOOL: {
      "v.low": 1.24,
      low: 1.1,
      normal: 1.0,
      high: 0.91,
      "v.high": 0.83,
    },
    SCED: {
      "v.low": 1.23,
      low: 1.08,
      normal: 1.0,
      high: 1.04,
      "v.high": 1.1,
    },
  };

  const constants = {
    basic: {
      Organic: { a: 2.4, b: 1.05, c: 2.5, d: 0.38 },
      Semidetached: { a: 3.0, b: 1.12, c: 2.5, d: 0.35 },
      Embedded: { a: 3.6, b: 1.2, c: 2.5, d: 0.32 },
    },
    intermediate: {
      Organic: { a: 3.2, b: 1.05, c: 2.5, d: 0.38 },
      Semidetached: { a: 3.0, b: 1.12, c: 2.5, d: 0.35 },
      Embedded: { a: 2.8, b: 1.2, c: 2.5, d: 0.32 },
    },
    detailed: {
      Organic: { a: 3.2, b: 1.05, c: 2.5, d: 0.38 },
      Semidetached: { a: 3.0, b: 1.12, c: 2.5, d: 0.35 },
      Embedded: { a: 2.8, b: 1.2, c: 2.5, d: 0.32 },
    },
  };

  function determineMode(kloc) {
    if (kloc < 50) return "Organic";
    if (kloc <= 300) return "Semidetached";
    return "Embedded";
  }

  function calculateKLOC() {
    const programCode = document.getElementById("program_code").value;
    if (!programCode.trim()) {
      alert("Please enter the program code to calculate KLOC.");
      return;
    }

    const lineCount = programCode
      .split("\n")
      .filter((line) => line.trim() !== "").length;
    const kloc = lineCount / 1000; // Convert lines to thousands

    const klocResult = document.getElementById("kloc_result");
    klocResult.textContent = `Calculated KLOC: ${kloc.toFixed(2)}`;
    klocResult.style.display = "block";
  }

  function calculate() {
    const kloc = parseFloat(document.getElementById("kloc").value);
    if (!kloc || kloc <= 0) {
      alert("Please enter a valid KLOC value.");
      return;
    }

    const modelType = document.getElementById("model_type").value;
    const calculationType = document.getElementById("calculation").value;
    const mode = determineMode(kloc);
    const { a, b, c, d } = constants[modelType][mode];

    let eaf = 1; // Default for Basic and Detailed
    if (modelType === "intermediate") {
      eaf = calculateEAF();
    }

    let resultValue = 0;
    let additionalMessage = "";
    let unit = "";

    switch (calculationType) {
      case "effort":
        resultValue = a * Math.pow(kloc, b) * eaf;
        unit = "person-months";
        if (modelType === "detailed") {
          additionalMessage =
            "Planning and requirements analysis phase: Allocates 6-8% of effort and 10-40% of development time to define the product plan and specifications.";
        }
        break;
      case "development_time":
        const effort = a * Math.pow(kloc, b) * eaf;
        resultValue = c * Math.pow(effort, d);
        unit = "months";
        if (modelType === "detailed") {
          additionalMessage =
            "Product Design phase: Utilizes 19-38% of development time to define product architecture and subsystem specifications.";
        }
        break;
      case "productivity":
        resultValue = kloc / (a * Math.pow(kloc, b) * eaf);
        unit = "KLOC/person-month";
        if (modelType === "detailed") {
          additionalMessage =
            "Programming phase: Focuses on detailed design, coding, and unit testing, utilizing 48-68% of effort to maximize productivity.";
        }
        break;
      case "staff_size":
        const effortForStaff = a * Math.pow(kloc, b) * eaf;
        const devTime = c * Math.pow(effortForStaff, d);
        resultValue = effortForStaff / devTime;
        unit = "persons";
        if (modelType === "detailed") {
          additionalMessage =
            "Integration/Test phase: Combines and tests components before delivery, requiring 16-34% of effort and a coordinated staff size for optimal execution.";
        }
        break;
    }

    const resultContainer = document.getElementById("result");
    resultContainer.textContent = `Mode: ${mode}\nCalculation (${calculationType}): ${resultValue.toFixed(
      2
    )} ${unit}\n${additionalMessage}`;
    resultContainer.style.display = "block";
  }

  function toggleCostDriverFeature() {
    const modelType = document.getElementById("model_type").value;
    const costDriversContainer = document.getElementById(
      "costDriversContainer"
    );
    costDriversContainer.style.display =
      modelType === "intermediate" ? "flex" : "none";
    if (modelType === "intermediate") {
      renderCostDriverCheckboxes();
    }
  }
  // Keep track of the selected state for cost drivers
  const selectedCostDrivers = {};

  function renderCostDriverCheckboxes() {
    const container = document.getElementById("costDriversContainer");
    container.innerHTML = ""; // Clear previous content

    for (const driver in costDriverValues) {
      const driverContainer = document.createElement("div");
      driverContainer.className = "cost-driver";

      const label = document.createElement("label");
      label.textContent = driver;
      driverContainer.appendChild(label);

      for (const level in costDriverValues[driver]) {
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = driver;
        radio.value = costDriverValues[driver][level];

        const radioLabel = document.createElement("label");
        radioLabel.textContent = `${level} (${costDriverValues[driver][level]})`;
        radioLabel.style.marginRight = "10px";

        // Handle selection and deselection
        radio.addEventListener("click", function () {
          // If already selected, unselect it
          if (selectedCostDrivers[driver] === level) {
            radio.checked = false; // Uncheck the radio button
            selectedCostDrivers[driver] = null; // Clear the selection
          } else {
            // Otherwise, update the selection
            selectedCostDrivers[driver] = level;
          }
        });

        driverContainer.appendChild(radio);
        driverContainer.appendChild(radioLabel);
      }

      container.appendChild(driverContainer);
    }
  }

  function calculateEAF() {
    const costDrivers = {};
    const costDriversContainer = document.getElementById(
      "costDriversContainer"
    );

    costDriversContainer
      .querySelectorAll(".cost-driver")
      .forEach((driver) => {
        const selected = driver.querySelector("input:checked");
        if (selected) {
          driver.classList.add("selected");
          costDrivers[driver.querySelector("label").textContent] =
            parseFloat(selected.value);
        }
      });

    const eaf = Object.values(costDrivers).reduce(
      (acc, val) => acc * val,
      1
    );
    showToast(`EAF Value: ${eaf.toFixed(2)}`);

    return eaf;
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show"); // Add the "show" class to trigger the transition
    setTimeout(() => {
      toast.classList.remove("show"); // Remove the "show" class after 3 seconds
    }, 3000);
  }

  function exitApplication() {
    if (confirm("Are you sure you want to exit the application?")) {
      window.close();
    }
  }

