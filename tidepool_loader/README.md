# Tidepool Data Loader

[![Python Version](https://img.shields.io/badge/python-3.8%20|%203.9%20|%203.10-blue)](https://www.python.org/downloads/release/python-310/)
[![License](https://img.shields.io/badge/license-MIT-green)](https://opensource.org/licenses/MIT)

Tidepool is an open-source portal for all my personal health data. It allows me to connect to things like Apple Health, Loop Kit, and Dexcom in one place.

This project downloads the API responses using simple Python scripts into json format which are then used to display data in the webpage.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the project, you can use [Poetry](https://python-poetry.org/). If you don't have Poetry installed, follow the [official installation guide](https://python-poetry.org/docs/#installation).

1. Clone the repository:

   ```bash
   git clone https://github.com/coultonf/coultonf
   cd coultonf/tidepool_loader
   ```

2. Install Dependencies:

   ```bash
   poetry install
   ```

3. Active the python environment:

   ```bash
   poetry shell
   ```

4. Setup Credentials:

   The project depends on the proper setup of a .env file at coultonf/tidepool_loader/tidepool_loader/.env
   An example of the environment variable required:

   ```
   BASE64_AUTH='Basic _pw_for_tidepool_in_base64_'
   ```

5. Run the code:

   ```bash
   python -m tidepool_loader.main
   ```
