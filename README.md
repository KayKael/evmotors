# EVMotors - Electric Vehicle Insurance and Loan Calculation Platform

Welcome to the EVMotors project repository! This platform facilitates insurance and loan calculations for electric vehicles. It combines modern technology with accurate vehicle information to provide an efficient and user-friendly experience for users interested in electric cars.

## Key Features

- **Car Listings**: View and filter a comprehensive list of available electric cars by brand and model.
- **Insurance Calculation**: Estimate insurance costs based on driver's age, insurance duration, car price, and power.
- **Loan Calculation**: Calculate monthly payments and total costs for purchasing an electric car based on car price, down payment percentage, and loan duration.

## Technologies Used

- **Frontend**: React.js, Axios
- **Backend**: FastAPI (Python), SQLAlchemy, Docker
- **Microservices**: Separate services for insurance and loan calculations, managed with Docker Compose.

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your local machine.

### Installation and Usage

1. **Clone this repository:**
   ```bash
   git clone https://github.com/your-username/evmotors.git
   cd evmotors
   ```

2. **Start the development environment using Docker Compose:**
  ```bash
  docker-compose up --build
  ```
3. **Access the web application:**
  Open your web browser and go to http://localhost:3000/EVMotors.

### Project Structure

- **frontend/**: Source code for the frontend in React.js.
- **backend/**: Source code for the backend in FastAPI (Python).
- **microservices/**: Directory for microservices such as insurance and loan calculations.
- **docker-compose.yml**: Configuration file for Docker Compose to orchestrate the services.

### Contributions

Contributions are welcome! Feel free to open an issue for suggestions or problems encountered, or submit a pull request with improvements.

### Team

Developed by Your Name and Collaborator's Name.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
