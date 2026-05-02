# 🚀 Pulse Estimate

**A high-performance, lightweight COCOMO-style planning workspace.**

Pulse Estimate is a modern software cost estimation tool designed for quick, accurate project planning. Whether you are a student exploring estimation models or a project manager scoping a new build, Pulse Estimate provides immediate clarity on effort, timelines, and staffing.

**[📱 View Live Demo](https://softwarecostestimationtool.vercel.app/)**

---

## 🛠️ Core Capabilities

The tool transforms raw code or KLOC (Kilo Lines of Code) values into actionable project metrics using standard COCOMO algorithms.

## ✨ Features

- **Multi-Model Support**: Switch between **Basic**, **Intermediate**, and **Detailed** estimation models.
- **Automated KLOC Extraction**: No manual counting required; paste your code and get an instant size estimate.
- **Dynamic Intermediate Planning**: Fine-tune your estimates with an integrated Effort Adjustment Factor (EAF) calculator.
- **Responsive Design**: A clean, "current" dashboard layout optimized for both desktop and mobile devices.
- **Instant Feedback**: Built-in toast notifications and a clear result panel for rapid decision-making.

---

### **Key Functions**

- **`calculateKLOC()`**: Automatically scans pasted source code and filters non-empty lines to estimate size.
- **`calculateEAF()`**: Dynamically computes the **Effort Adjustment Factor** by multiplying selected cost drivers.
- **`calculate()`**: The engine that outputs final values for Effort, Development Time, Productivity, and Staff size.
- **`renderCostDriverCheckboxes()`**: Generates an interactive UI for cost driver selection in the Intermediate model.

---

## Screenshots

Sample screenshots are available in [assets](assets).

- [Main interface](assets/Capture.JPG)
- [Cost driver view](assets/Capture_Drivers.JPG)
- [Result output](assets/Capture_output.JPG)

## 📖 How It Works

Follow this 5-step workflow to generate a project snapshot:

1.  **Input Data**: Paste your source code into the editor or manually enter a **KLOC** value.
2.  **Select Model**: Choose your preferred estimation model (e.g., Intermediate for higher accuracy).
3.  **Define Output**: Select which metric you need (Effort, Time, Productivity, or Staff).
4.  **Adjust Drivers**: (Optional) For the Intermediate model, select your cost driver levels.
5.  **Execute**: Click **Run Estimate** to view your results in the output panel.

---

## 💻 Tech Stack

Built with a minimalist, "no-build-step" approach for maximum portability:

- **HTML5**: Semantic structure.
- **CSS3**: Modern typography, responsive layouts, and a tech-focused aesthetic.
- **Vanilla JavaScript**: Pure logic and interactivity without heavy dependencies.

---

## How To Run

1. Open [index.HTML](index.HTML) in a browser.
2. Paste code into the program code field or enter a KLOC value.
3. Select a model and calculation type.
4. If you selected the intermediate model, choose the cost-driver levels you want to apply.
5. Click **Run estimate** and read the result in the output panel.

## Notes

- The app uses plain browser APIs and does not require a build step.
- `window.close()` may be blocked by the browser depending on how the page was opened.
- The detailed model includes additional explanatory output for estimation phases.

## File Structure

```plaintext
├── index.HTML
├── style.CSS
├── app.JS
├── README.md
└── assets/
    ├── Capture.JPG
    ├── Capture_Drivers.JPG
    └── Capture_output.JPG
```
