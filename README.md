# Adam HossamElden — Portfolio

Personal portfolio site for Adam Waleed Hatem Ahmed HossamElden, a First-Class Computer Science graduate based in Athens, Greece, open to junior software engineering, backend, full-stack, data, and graduate roles.

Live site: [adamwaleedhatemhossamelden.github.io/Adam-portfolio](https://adamwaleedhatemhossamelden.github.io/Adam-portfolio/)

## Overview

A static site built with plain HTML, CSS, and JavaScript — no build step, no framework, no backend. It is deployed as-is to GitHub Pages from the repository root, so all asset paths are relative and work correctly under the `/Adam-portfolio/` base path.

Sections: navigation, hero, featured projects, technical skills, education and achievement, about, contact, footer.

Project cards are generated at runtime from a single data array in `script.js` (`PROJECTS`), so adding, editing, or reordering a project only requires editing that array — no duplicated markup.

## Featured Projects

1. **Restaurant Operations Platform** — In Development. React, TypeScript, Java 21, Spring Boot, MySQL, Docker.
   Repository: [restaurant-operations-platform](https://github.com/AdamWaleedHatemHossamElden/restaurant-operations-platform)
2. **CoS-BA Bias Auditor** — Completed, Final-Year Project (86%). React, Node.js, Express, MySQL, JWT, Recharts.
   Repository: [cosba-bias-auditor](https://github.com/AdamWaleedHatemHossamElden/cosba-bias-auditor)
3. **Attendance Management System v2** — In Development. React, Node.js, Express, MySQL, JWT.
   Repository: [attendance-system](https://github.com/AdamWaleedHatemHossamElden/attendance-system)
4. **TraceAI** — In Development. TypeScript, Express, Python, FastAPI, MySQL, Docker Compose.
   Repository: [TraceAI](https://github.com/AdamWaleedHatemHossamElden/TraceAI)

## Tech Stack

- HTML5, CSS3, vanilla JavaScript (ES6+)
- Data-driven project rendering (no templating framework)
- Native `<dialog>` for the screenshot lightbox
- GitHub Pages deployment (static, no build pipeline)

## Project Structure

```text
.
|-- index.html
|-- styles.css
|-- script.js
|-- favicon.svg
|-- Adam_HossamElden_CV_2026.pdf
`-- images/
    `-- cosba/
        |-- dashboard.webp
        |-- home.webp
        `-- admin.webp
```

## Run Locally

```bash
python -m http.server 4180
```

Then open <http://127.0.0.1:4180/>.

## Contact

- Email: [adamwaleedhossamelden@hotmail.com](mailto:adamwaleedhossamelden@hotmail.com)
- LinkedIn: [adam-hossamelden](https://www.linkedin.com/in/adam-hossamelden-83b242403)
- GitHub: [AdamWaleedHatemHossamElden](https://github.com/AdamWaleedHatemHossamElden)
